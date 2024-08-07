import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const codexRouter = express.Router();


codexRouter.post("/generateFeedback", verifyUser, async (req, res, next) => {
    const { prompt, task } = req.body;
    const userId = (req.user as IUser)._id;
    if (prompt !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`
Given a set of tasks descriptions, compare the specifications provided in the [student-prompt] with the [task-descriptions]. 

First, try to find a matches description with the student prompt to the task description, 

if not found a match, return matched = no in the JSON.

if found the match, score how fully and accurately the [student-prompt] describes the [task-description] using a number from 0 (completely irrelevant or under-specified) to 5 (fully specified and accurate). also if it is under-specified, provide a list of bullet points about what needs to be added to the [student-prompt] so that it fully describes the [task-descriptions]. 

Include all the missing specifications in the response. If an example is missing, include the example in the missing specifications as well.

Use the following JSON template:
{
    "matched": <yes or no>
    "accuracy-score": <number-0-to-5>,
    "matched-taskId": <taskID>
    "missing-specifications": [
        "<10-15 word missing specification>",
        "<10-15 word missing specification>",
        "<10-15 word missing specification>",
        ...
    ]
}
`,
            },
            {
                role: "user",
                content: `[student-prompt]
                merges the overlapping intervals.
                [end-student-prompt]
                [task-descriptions]
                [
                {id: "1", description:Write a function that takes a list of intervals (e.g., ranges of numbers) and merges any overlapping intervals.},
                {id: "2", description:Write a Python function to calculate the sum of even numbers in a given list.},
                {id:  "3", description:Write a function that takes a list of strings and returns the longest common prefix.}
                ]
                `,
            },
            {
                role: "assistant",
                content: `{
                    "matched": "yes",
                    "accuracy-score": 5,
                    "matched-taskId": "1",
                    "missing-specifications": []
                }`,
            },
            {
                role: "user",
                content: `[student-prompt]
                some prompt
                [end-student-prompt]
                [task-descriptions]
                [
                {id: "1", description:Write a function that takes a list of intervals (e.g., ranges of numbers) and merges any overlapping intervals.},
                {id: "2", description:Write a Python function to calculate the sum of even numbers in a given list.},
                {id:  "3", description:Write a function that takes a list of strings and returns the longest common prefix.}
                ]
                `,
            },
            {
                role: "assistant",
                content: `{
                    "matched": "no",
                    "accuracy-score": 0,
                    "matched-taskId": null,
                    "missing-specifications": []
                }`,
            }
        ];


        messages.push({
            role: "user",
            content: `[task-description]: ${task}\n[student-prompt]: ${prompt}[end-student-prompt]`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-16k",
            messages,
            temperature: 0,
            max_tokens: 200,
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



codexRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    // if there is no context:
    // then just generate new code (like the LLM prompt below) + explanation

    // however, if there is context:
    // we should have a separate LLM prompt
    // examples of correct context + description -> generated code + explanation
    // examples of incorrect context + description -> generated code + explanation
    // example of correct but incomplete context + description -> generated code + explanation

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    `Generate the python code that solves the provided problem. Use the following format to provide explanations for each line.

                    [OUTPUT]
                    <line of code> ### <explanation of line of code in natural language, and how it is solving the problem, also explain important functions or syntax elements used>
                    <line of code> ### <explanation of line of code in natural language, and how it is solving the problem, also explain important functions or syntax elements used>
                        <line of code> ### <explanation of line of code in natural language, and how it is solving the problem, also explain important functions or syntax elements used>
                    <line of code> ### <explanation of line of code in natural language, and how it is solving the problem, also explain important functions or syntax elements used>
                    [END]

                    [OVERALL-EXPLANATION]
                    <now provide a holistic explanation in paragraphs about how the code is solving the problem>`,
            },
        ];

        messages.push({
            role: "user",
            content: `[intended-behavior]: ${description}\n[code]:`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4o",
            messages,
            temperature: 0,
            max_tokens: 2000,
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            if(response){
                const end_code_index = response.indexOf("[end-code]");
                if (end_code_index > 0) {
                    const code = response.substring(0, end_code_index);
                    const explain = response.substring(end_code_index + 25);
                    res.json({
                        bundle:{
                            code: code,
                            explain: explain,
                        },
                        success: true,
                    });
                }
            }
        } else {
            res.json({
                success: false,
            });
        }
    }
});

export const codexWriteCodeRouter = express.Router();

codexRouter.post("/generatecode", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "for each provided [intended-behavior] generate python [code] snippets",
            },
            {
                role: "user",
                content: `[intended-behavior]: say hello world\n[code]:`,
            },
            {
                role: "assistant",
                content: `print("hello world")\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: ask the user for their name\n[code]:`,
            },
            {
                role: "assistant",
                content: `name = input("What is your name? ")\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: ask the user to enter a number\n[code]:`,
            },
            {
                role: "assistant",
                content: `number = int(input("Enter a number: "))\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: generate a random number\n[code]:`,
            },
            {
                role: "assistant",
                content: `import random\nnumber = random.randint(0, 100)\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if the number is greater than 50\n[code]:`,
            },
            {
                role: "assistant",
                content: `if number > 50:\n    print("The number is greater than 50")\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if roll is even\n[code]:`,
            },
            {
                role: "assistant",
                content: `if roll % 2 == 0:\n    print("The roll is even")\n[end-code]`,
            },
        ];

        if (context && context.length > 0) {
            messages.push({
                role: "user",
                content: `[context-code]:\n${context}\n[intended-behavior]: use the above [context-code] as context and ${description}\n[code]:`,
            });
        } else {
            messages.push({
                role: "user",
                content: `[intended-behavior]: ${description}\n[code]:`,
            });
        }

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.1,
            max_tokens: 1000,
            stop: ["[end-code]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const code = result.data.choices[0].message?.content;
            console.log(code);
            res.json({
                code: code,
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    }
});

