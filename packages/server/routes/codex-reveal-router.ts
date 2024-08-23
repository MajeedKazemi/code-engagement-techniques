import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const revealRouter = express.Router();

function getCodeWithLine(code: string) {
    const lines = code.split('\n');
    let output = '';
    
    lines.forEach((line, index) => {
        output += `${index + 1}. ${line}\n`;
    });

    return output;
};

revealRouter.post("/generateQuestion", verifyUser, async (req, res, next) => {
    const { code, task } = req.body;
    const userId = (req.user as IUser)._id;
    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`
# Overview:
you are helping novice programmers learn about coding. Look at the provided Python [solution-code] and the [task-description], then divide the provided code into a list of [subgoal] items. For each [subgoal], provide a concise [title] and then divide it into [sub-subgoal-items]. The student has only be given the [task-description] and cannot see the [solution-code], instead you, the assistant that is helping this novice student learn about coding by asking a series of leading questions. These leading questions are multiple-choice question about each sub-subgoal parts of the task. These questions are supposed to promote critical thinking, problem solving, algorithmic thinking, and computational thinking, and help the student think about the task before they see the code. The student does not know about the [solution-code], they have only be given the [task-description. Our system shows the mcq-questions that you generate, one by one. If the student correctly answers the leading question, our system will reveal the code lines associated with that [sub-subgoal] and then the system displays the next question.

# Important Notes:
[sub-subgoal-items] can be one line of code, can be a function definition, can be the \`for item in items\` part of a loop, can be a return statement. Make sure that for more complicated sub-subgoals, there are multiple questions. Sometimes, a single line of code also deserves its own question, such as a for loop (asking questions about how many times we need to check, what items, what indices, from what index to what index), or the if statement (what different states can X be when Y, how can we make sure Z, etc.).

[code-lines-to-be-revealed]: a comma separated list of numbers that represent the lines of code from [solution-code] related to that [sub-subgoal-item].

[mcq-question]: the provided choices in the distractors [incorrect-choice] should be "plausible" but incorrect answers: these distractors are reasonable answers that might be selected if a student did not think deeply about the task, missed edge-cases and over-generalized, and did not think critically enough. These "plausible" choices should focus on conceptual misunderstandings, common mistakes that students might make, missing corner-cases and edge-cases, incorrect assumptions that students might make, off-by-one errors (such as looping one time too many, or too few), incorrect choice of data structures, overlooking the behavior of a program or algorithm for special or extreme values, and other logical errors. Each question will help the student to think deeply about "how" this task needs to be solved (focusing on the logic, on the important data representations, operations, etc.) ... the code for that subgoal will only be revealed if the student answers the question about that part correctly. Make sure that all lines of code from [solution-codes] are covered with the [sub-subgoals] and [mcq-questions], even misc lines, or purely syntactic lines like a function definition. For example, the function definition line (e.g. \`def function_name(input_val)\`) should also become a [subgoal] and the [mcq-question] can ask about the inputs, and how the input is represented, using what data types. For example: "what type best represents an interval?" The leading questions should make the student think about the logic, particularly the what, why, and how of actions.



# Generate using the following JSON template precisely:
{
  "subgoals": [
    {
      "title": "<2-5 word concise title for this subgoal>",
      "sub-subgoal-items": [
        {
          "leading-questions": [
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            },
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            },
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            },
          ],
          "code-lines-to-be-revealed": [<comma separated code line numbers based on solution-code>]
        },
        {
          "leading-questions": [
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            },
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            },
          ],
          "code-lines-to-be-revealed": [<comma separated code line numbers based on solution-code>]
        },
      ]
    },
    {
      "title": "<2-5 word concise title for this subgoal>",
      "sub-subgoal-items": [
        {
          "leading-questions": [
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            }
          ],
          "code-lines-to-be-revealed": [<comma separated code line numbers based on solution-code>]
        },
        {
          "leading-questions": [
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            },
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            },
            {
              "mcq-question": "<multiple-choice question>",
              "correct-choice": "<7-15 word correct answer>",
              "incorrect-choice-1": "<7-15 word plausible distractor>",
              "incorrect-choice-2": "<7-15 word plausible distractor>",
              "incorrect-choice-3": "<7-15 word plausible distractor>"
            }
          ],
          "code-lines-to-be-revealed": [<comma separated code line numbers based on solution-code>]
        },
      ]
    },
  ]
}
`,
            }
        ];


        messages.push({
            role: "user",
            content: `[task-description]: ${task}\n[solution-code]: ${getCodeWithLine(code)}[end-solution-code]\n\nFocus a lot of the questions on the complex part of the algorithm. For those parts, you can include one question per line, or even two questions per line.`,
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
    // console.log(response);
    return JSON.parse(response);
}


revealRouter.post("/feedbackFromRevealShortAnswer", verifyUser, async (req, res, next) => {
  const { code, studentSolution, aiGeneratedSolution, question } = req.body;
  const userId = (req.user as IUser)._id;
  if (studentSolution !== undefined) {
    let messages: Array<ChatCompletionRequestMessage> = [
        {
            role: "system",
            content: `The student has been given the provided [code] that certain lines in it have been highlighted. The student has been asked a [question] about these lines. And the student has answered [student-solution]. See if their answer makes sense based on the provided [code], you can also take a look at the AI-generated solution [ai-generated-solution]. The goal is to make sure the student is understanding these highlighted lines correctly and providing a good explanation to the [question]. There is no need for ther [student-solution] to be exactly the same as the [ai-generated-solution]. The student can be creative and provide a different but correct answer.
            
            Please return a JSON object with the following format:
            {
                "correctness": <0-5>, // 0 means completely wrong, 5 means the student has answered perfectly with a lot of detail.
                "feedback": "<20-30 word of explanation about what the student got correctly and what they are missing in their answer.>"
            }`,
          },
    ];

    messages.push({
      role: "user",
      content: `[code]: ${code}\n
      [student-solution]: ${studentSolution}\n[ai-generated-solution]: ${aiGeneratedSolution}\n[question]: ${question}`,
  });

    const result = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.25,
        max_tokens: 256,
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
