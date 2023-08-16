import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const selfExplainRouter = express.Router();

selfExplainRouter.post("/question", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "Based on the provided Python [code] snippets, the goal is to generate a random question base on a random highlight code block that asks the user to show their understanding of the code. the portion of [code] should be around 1 to 5 lines, related to a block of logic, the questions should be open-ended. Make sure to highlight the keywords with their types in the question. Make sure only highlight and ask the meaningful questions that related to the structure and logic of the code. (avoid highlighting print statements, variable initializations, module imports, etc.)",
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
                content: `[line]3[question]How does the selected portion of the code contribute to the overall functionality of the program?[end-question][end]`,
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
            print("Fibonacci Sequence:", fib_sequence)`,
            },
            {
                role: "assistant",
                content: `[line]4[question]In the context of generating a Fibonacci sequence, explain the significance of the selected code snippet and how it contributes to the construction of the sequence?[end-question][end]`,
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
            print("Lowest Score:", lowest)
            `,
            },
            {
                role: "assistant",
                content: `[line]2-5[question]How does the selected lines calculate and store the necessary statistical information about the student scores?[end-question][end]`,
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
                content: `[line]2-5[question]Why is calculating the total number of students \`total_students{variable}\` important in this context, and how is it used later in the code?[end-question][end]`,
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
                content: `[line]3-5[question]Describe how the selected lines iterates through the exam results and update the \`passed{variable}\` variable based on the condition.[end-question][end]`,
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
                content: `[line]6[question]In the function \`assess_exam_results()\`, explain \`pass_percentage = (passed / len(results)) * 100\` statement and describe its role in the overall function.[end-question][end]`,
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
                const resultString = convertStringToInterface(questions);
                res.json({
                    start: resultString.start,
                    end: resultString.end,
                    question: resultString.question,
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
    start: number;
    end: number;
    question: string;
}

function convertStringToInterface(str: string): QuestionInterface {
    let start: number = 0, end: number = 0, question: string = '';
    // extract the line(s) and question using regex
    const lineMatch = str.match(/\[line\](.+)\[question\]/);
    const questionMatch = str.match(/\[question\](.+)\[end-question\]/);


    // If the line has dash, split and convert it into number
    if (lineMatch && lineMatch[1].includes('-')) {
        const lines = lineMatch[1].split('-');
        start = parseInt(lines[0], 10);
        end = parseInt(lines[1], 10);
    }
    // If the line doesn't have dash, convert the line into number
    else if (lineMatch) {
        start = parseInt(lineMatch[1], 10);
        end = start;
    }

    // Extract the question
    if (questionMatch) {
        question = questionMatch[1];
    }

    return {
        start,
        end,
        question,
    };
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