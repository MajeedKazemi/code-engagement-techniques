import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const selfExplainRouter = express.Router();

function getCodeWithLine(code: string) {
    const lines = code.split('\n');
    let output = '';
    
    lines.forEach((line, index) => {
        output += `${index + 1}. ${line}\n`;
    });

    return output;
};

selfExplainRouter.post("/feedback", verifyUser, async (req, res, next) => {
    const { code, line, question, answer, response } = req.body;
    const userId = (req.user as IUser)._id;
    let messages: Array<ChatCompletionRequestMessage> = [
        {
            role: "system",
            content:
`
You want to generate feedback for novice python programmers, based on the following input: takes in 5 values: a question (string), an code line (string), which provided the question context, an answer (string), which is the correct explanation and a response from the user (string). 
The question is an open-ended explanation of code snippets aimed at novice programmers. Your task is to generate a JSON output with the following structure:

# Use the following JSON template:
{
    "score": [a number between 0 and 5], 
    "feedback": "[10 to 15 words feedback]"
}

Design a system that can generate this JSON output based on the input values provided. The score should represent the quality or correctness of the response, ranging from 0 (poor) to 5 (excellent). The feedback should be a concise comment, consisting of 10 to 15 words, offering constructive feedback on the answer provided.
`,
        }
    ];

    messages.push({
        role: "user",
        content: `[code]: ${code}\n[line] ${line}\n[question] ${question}\n[answer] ${answer}\n[user-response]${response}`,
    });

    const result = await openai.createChatCompletion({
        model: "gpt-4",
        messages,
        temperature: 0.1,
        max_tokens: 100,
        user: userId,
    });

    if (result.data.choices && result.data.choices?.length > 0) {
        const response = result.data.choices[0].message?.content;

        if(response){
            res.json({
                response: JSON.parse(response),
                success: true,
            });
        }
    } else {
        res.json({
            success: false,
        });
    }
});


selfExplainRouter.post("/generateQuestion", verifyUser, async (req, res, next) => {
    const { code, task } = req.body;
    const userId = (req.user as IUser)._id;
    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`
you are helping novice programmers learn about coding.
look at the above Python [practice-code], group it into questions, the question can be either [multiple-choice] or [short-answer] inside each question, include the lines of code from the above [practice-code]. 

Use the following template:

The format should be an array of n items, where n is a number that can average the questions per 4-5 code lines. For example, a 10-line code snippet could have 2 questions, and 12-line code could have 3 questions, combinations of [multiple-choice]  and [short-answer].

example for <comma separated code line numbers based on solution-code> is [6] for the line 6, or [9,10] for line 9 and line 10.



# Template:
{
"format": <a list of format in combinations of "Short Answer" or "Multiple Choice" depends on the number of questions, in this example, I use ["Short Answer", "Multiple Choice"]>
"questions": [
  {
    "type": "Short Answer",
    "question": "<5-10 word question for the student to think about the \"problem solving aspects\" of the task>",
    "answer": "<10-15 word answer>",
    "question-code-lines": [
      "<comma separated code line numbers based on solution-code>"
    ],
    "question-code-lines-explained": "<exact lines of code> # <very concise explanation about the \"purpose\" and \"functionality\" of this code>"
  },
  {
    "type": "Multiple Choice",
    "question": "<5-10 word question for the student to think about the \"problem solving aspects\" of the task>",
    "answer": {
      "correct-choice": "<7-15 word correct answer>",
      "incorrect-choice-1": "<7-15 word plausible distractor>",
      "incorrect-choice-2": "<7-15 word plausible distractor>",
      "incorrect-choice-3": "<7-15 word plausible distractor>"
    },
    "question-code-lines": [
      "<comma separated code line numbers based on solution-code>"
    ],
    "question-code-lines-explained": "<exact lines of code> # <very concise explanation about the \"purpose\" and \"functionality\" of this code>"
  }
]
}
`,
            }
        ];


        messages.push({
            role: "user",
            content: `[task-description]: ${task}\n[solution-code]: ${getCodeWithLine(code)}[end-solution-code]`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.25,
            max_tokens: 4095,
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;

            if(response){
                res.json({
                    response: parseResponse(response),
                    success: true,
                });
            }
        } else {
            res.json({
                success: false,
            });
        }
    }
});

function parseResponse(response: string): any {
    return JSON.parse(response);
}

selfExplainRouter.post("/question", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "Based on the provided Python [code] snippets, the goal is to generate a random question base on a random highlight code block that asks the user to show their understanding of the code. the portion of [code] should be 1 line of code, related to a block of logic, the questions should be open-ended (for example: is there a way to change the line to something else to acheive the same goal, explain the highlighted code, how does this line of code help the overall logic and goal, etc). Make sure to highlight the keywords with their types in the question. Make sure only highlight and ask the meaningful questions that related to the structure and logic of the code. If the code snippet is long, then you can ask multiple questions. i.e 10 lines of code, ask 2 questions, each question should be 1 line of code, 15 lines of code, ask 3 questions, etc.",
            },
            {
                role: "user",
                content: `def calculate_average(numbers):
                total = sum(numbers)
                average = total / len(numbers)
                return average
            
            numbers_list = [15, 20, 25, 30, 35]
            result = calculate_average(numbers_list)
            print("The average is:", result)
            `,
            },
            {
                role: "assistant",
                content: `[line]2[question]In the line \`total = sum(numbers)\`, can you explain what the built-in function \`sum(numbers){variable}\` does with the variable \`numbers{variable}\`[end-question]
                [line]7[question]What can be the alternate ways to pass the arguments to the highlighted line, and does changing the way arguments are passed affect the output of the function in any way?[end-question][end]`,
            },

            {
                role: "user",
                content: `#some comment

                def generate_fibonacci_sequence(n):
                sequence = [0, 1]
                while len(sequence) < n:
                    next_num = sequence[-1] + sequence[-2]
                    sequence.append(next_num)
                return sequence`,
            },
            {
                role: "assistant",
                content: `[line]6[question]On the line \`next_num = sequence[-1] + sequence[-2]\`, can you explain the use of the negative indices \`sequence[-1]{variable}\` and \`sequence[-2]{variable}\` and how they contribute to the logic of the Fibonacci sequence? [end-question][end]`,
            },

            {
                role: "user",
                content: `def generate_fibonacci_sequence(n):
                sequence = [0, 1]
                while len(sequence) < n:
                    next_num = sequence[-1] + sequence[-2]
                    sequence.append(next_num)
                return sequence
            
            sequence_length = 8
            fib_sequence = generate_fibonacci_sequence(sequence_length)
            print("Fibonacci Sequence:", fib_sequence)
            `,
            },
            {
                role: "assistant",
                content: `[line]3[question]In the highlighted line \`while len(sequence) < n:\`, explain the purpose of the condition \`len(sequence) < n\`. How does this control the length of the Fibonacci sequence generated? [end-question]
                [line]8[question]Can you explain what the line \`fib_sequence = generate_fibonacci_sequence(sequence_length)\` does? What is the purpose of the variable \`fib_sequence{variable}\` in this context?[end-question][end]`,
            },

            {
                role: "user",
                content: `def assess_exam_results(results):
                passed = 0
                for result in results:
                    if result >= 60:
                        passed += 1
                pass_percentage = (passed / len(results)) * 100
                return passed, pass_percentage
            
            exam_results = [78, 92, 55, 60, 45, 70, 80]
            passed_count, pass_percentage = assess_exam_results(exam_results)`,
            },
            {
                role: "assistant",
                content: `[line]4[question]In the line \`if result >= 60:\` can you explain the logic behind this condition? How does this help to drive the desired outcome of the overall function? [end-question]

                [line]10[question]Can you explain what's happening in this line of code \`passed_count, pass_percentage = assess_exam_results(exam_results)\`? How does this line impact the display of the function's results? [end-question][end]`,
            },

            {
                role: "user",
                content: `def analyze_student_performance(scores):
                total_students = len(scores)
                average_score = sum(scores) / total_students
                highest_score = max(scores)
                lowest_score = min(scores)
                return average_score, highest_score, lowest_score
            
            student_scores = [85, 90, 78, 92, 88]
            average, highest, lowest = analyze_student_performance(student_scores)
            print("Average Score:", average)
            print("Highest Score:", highest)
            print("Lowest Score:", lowest)`,
            },
            {
                role: "assistant",
                content: `[line]3[question]On the line \`average_score = sum(scores) / total_students\`, can you explain what the built-in function \`sum(scores){variable}\` does? How does it help in the calculation of the average score? [end-question]
                [line]8[question]Could you describe what the highlighted line of code \`average, highest, lowest = analyze_student_performance(student_scores)\` does? Why is the \`analyze_student_performance{function}\` function called on the variable \`student_scores{variable}\`?[end-question][end]`,
            },
        ];


        messages.push({
            role: "user",
            content: `${description}`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 1,
            max_tokens: 500,
            stop: ["[end]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const questions = result.data.choices[0].message?.content;
            if(questions){
                const resultArray = convertStringToInterface(questions);
                res.json({
                    result: resultArray,
                    success: true,
                });
            }
        } else {
            res.json({
                success: false,
            });
        }
    }
});

interface QuestionInterface {
    line: number;
    question: string;
}

function convertStringToInterface(str: string): QuestionInterface[] {
    const strQuestions = str.split('[end-question]');
    
    let questions: QuestionInterface[] = strQuestions
        .filter(questionStr => questionStr.includes('[line]') && questionStr.includes('[question]')) 
        .map(questionStr => {
            let lineStrSplit = questionStr.split('[line]');
            let lineStr = lineStrSplit[1];
            let lineQuestionSplit = lineStr.split('[question]');
            
            let line = lineQuestionSplit[0] ? parseInt(lineQuestionSplit[0]) : 0; // defaulting to 0
            let question = lineQuestionSplit[1] ? lineQuestionSplit[1].trim() : ''; // defaulting to empty string

            return { line, question };
        });

    return questions;
}

selfExplainRouter.post("/feedback", verifyUser, async (req, res, next) => {
    const { code, context, question, response } = req.body;
    const userId = (req.user as IUser)._id;

    if (code !== undefined && context !== undefined && question !== undefined && response !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "given a [context] from a snippet of [code], rate the [response] of the [question] from 0 to 9, only rate the score 0 if the [response] is not at all related to the [question]. Based on the provided [response], also provide the corresponding feedback to perfect the answer, as well as show the perfect explanations. If the response it lower than 3, then give out detailed hints, such as easier and more narrow questions, and do not show the perfect explanation. Please sound as a teacher trying to teach novice python students for the first time. ",
            },
            {
                role: "user",
                content: `[code]def calculate_average(numbers):
                total = sum(numbers)
                average = total / len(numbers)
                return average
            
            numbers_list = [15, 20, 25, 30, 35]
            result = calculate_average(numbers_list)
            print("The average is:", result)
            [context]average = total / len(numbers)
            [question]How does the selected portion of the code contribute to the overall functionality of the program?
            [response]It divides the sum of the numbers stored in the total variable by the count of numbers in the list (len(numbers)), resulting in the average value. This calculation ensures that the program accurately determines the average value of the provided numbers.`,
            },
            {
                role: "assistant",
                content: `[score]7[feedback]The explanation effectively conveys how the selected portion of the code calculates the average of the given numbers. However, it could be improved by explicitly mentioning that the average is a central statistical measure used to represent the typical value of a set of numbers. Additionally, mentioning that the total variable holds the sum of the numbers and len(numbers) retrieves the count of numbers from the list would provide more context. Overall, the response is clear and informative.[end-feedback][end]`,
            },

            {
                role: "user",
                content: `[code]def analyze_student_performance(scores):
                total_students = len(scores)
                average_score = sum(scores) / total_students
                highest_score = max(scores)
                lowest_score = min(scores)
                return average_score, highest_score, lowest_score
            
            student_scores = [85, 90, 78, 92, 88]
            average, highest, lowest = analyze_student_performance(student_scores)
            print("Average Score:", average)
            print("Highest Score:", highest)
            print("Lowest Score:", lowest)
            [context]total_students = len(scores)
            average_score = sum(scores) / total_students
            highest_score = max(scores)
            lowest_score = min(scores)
            [question]How does the selected multi-line portion calculate and store the necessary statistical information about the student scores?
            [response]The total_students variable is assigned the count of scores, which represents the number of students. `,
            },
            {
                role: "assistant",
                content: `[score]3[feedback]While your response explains what the total_students variable represents, it doesn't provide information about how the other statistical calculations (i.e. \`average_score{variable}\`, \`highest_score{variable}\`, and \`lowest_score{variable}\`) are determined and stored. Each aspect of the code should be mentioned as they are all key components to calculating and storing the statistical information about the student scores.
                Hint: Look at the operations being performed on each line of code and consider what they might represent in terms of the context of this student performance analysis. How is \`average_score{variable}\` calculated and what does it signify? What about \`highest_score{variable}\` and \`lowest_score{variable}\`?[end-feedback][end]`,
            },

            {
                role: "user",
                content: `[code]def generate_fibonacci_sequence(n):
                sequence = [0, 1]
                while len(sequence) < n:
                    next_num = sequence[-1] + sequence[-2]
                    sequence.append(next_num)
                return sequence
            
            sequence_length = 8
            fib_sequence = generate_fibonacci_sequence(sequence_length)
            print("Fibonacci Sequence:", fib_sequence)
            [context]next_num = sequence[-1] + sequence[-2]
            [question]In the context of generating a Fibonacci sequence, explain the significance of the selected code snippet and how it contributes to the construction of the sequence.
            [response]ehh I dont know, kejrj jrerewjr wq :(`,
            },
            {
                role: "assistant",
                content: `[score]0[feedback]Let's break it down together. In a Fibonacci sequence, each number is the sum of the two preceding ones. This pattern starts from 0 and 1. Think about how these two facts are reflected in the code snippet. I'll provide more guidance: 
                In the code \`next_num = sequence[-1] + sequence[-2]\`, it's adding the last two numbers of the current Fibonacci sequence. \`sequence[-1]\` represents the last number in the sequence and \`sequence[-2]\` represents the second last number in the sequence. In Python, negative indexing starts from the end. So, this line is crucial for generating each next number in a Fibonacci sequence. Try to explain this in your own words.[end-feedback][end]`,
            },

            {
                role: "user",
                content: `[code]def generate_fibonacci_sequence(n):
                sequence = [0, 1]
                while len(sequence) < n:
                    next_num = sequence[-1] + sequence[-2]
                    sequence.append(next_num)
                return sequence
            
            sequence_length = 8
            fib_sequence = generate_fibonacci_sequence(sequence_length)
            print("Fibonacci Sequence:", fib_sequence)
            [context]next_num = sequence[-1] + sequence[-2]
            [question]In the context of generating a Fibonacci sequence, explain the significance of the selected code snippet and how it contributes to the construction of the sequence.
            [response]In the context of the Fibonacci sequence, each number is the sum of the two preceding numbers. This code calculates the next number (next_num) in the sequence by adding the last number (sequence[-1]) and the second-to-last number (sequence[-2]) in the sequence. This step ensures that each subsequent number in the sequence is generated based on the pattern of adding the two previous numbers. By repeatedly applying this addition logic and appending the calculated next_num to the sequence, the code effectively constructs the entire Fibonacci sequence up to the specified length (n).`,
            },
            {
                role: "assistant",
                content: `[score]9[feedback]Excellent job! Your response correctly and comprehensively explains how the selected code contributes to the generation of the Fibonacci sequence. You also successfully defined the rules of building a Fibonacci sequence, by accurately explaining the pattern of adding the last two numbers in the sequence to yield the next number, and how these steps are repeated to construct the whole sequence up to a given length.[end-feedback][end]`,
            },
        ];


        messages.push({
            role: "user",
            content: `[code]${code}
            [context]${context}
            [question]${question}
            [response]${response}`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 1,
            max_tokens: 800,
            stop: ["[end]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const feedbacks = result.data.choices[0].message?.content;
            if(feedbacks){
                const { score, feedback } = parseFeedbackString(feedbacks);
                res.json({
                    score: score,
                    feedback: feedback,
                    success: true,
                });
            }
        } else {
            res.json({
                success: false,
            });
        }
    }
});

interface FeedbackInterface {
    score: number;
    feedback: string;
}

function parseFeedbackString(str: string): FeedbackInterface {
	const scoreMatch = str.match(/\[score\](.*?)\[feedback\]/);
	const feedbackMatch = str.match(/\[feedback\](.*?)\[end-feedback\]/);
	
	if (!scoreMatch || !feedbackMatch) {
        throw new Error("Invalid feedback string");
	}
	
	return {
		score: parseInt(scoreMatch[1]),
		feedback: feedbackMatch[1],
	};
}