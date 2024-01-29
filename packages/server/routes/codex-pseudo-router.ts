import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

function getCodeWithLine(code: string) {
    const lines = code.split('\n');
    let output = '';
    
    lines.forEach((line, index) => {
        output += `${index + 1}. ${line}\n`;
    });

    return output;
};

export const pseudoRouter = express.Router();

pseudoRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, code } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`You want to generate a pseudo-code for every single line.

based on the above provided [task-description], group the provided [code-solution] into multiple subgoals.
inside each subgoal, repeat the lines of code, and after each line, provide a 10-20 word reasoning and purpose about the purpose, functionality, logic, and some syntax details of that line of code. use backticks for \`keyword\`s.

You must include ALL lines of code into subgoals and provide a pseudo-code for all lines. Even for code lines that might not easily fit into a subgoal (like a function definition). 

The explanation should not simply repeat the pseudo-code, and instead describe the purpose and reasoning of that code, why is that line of code even needed, what is the logic behind it.

# Use the following template:
{
    "subgoals": [
        {
            "title": "<4-8 word subgoal title>",
            "code": [
                {
                    "indent": "<number of indentations>",
                    "line": "<code>",
                    "pseudo-code": "<pseudo-code>",
                    "explanation": "<10-20 word reasoning and purpose>"
                },
                {
                    "indent": "<number of indentations>",
                    "line": "<code>",
                    "pseudo-code": "<pseudo-code>",
                    "explanation": "<10-20 word reasoning and purpose>"
                }
            ]
        },
        {
            "title": "<4-8 word subgoal title>",
            "code": [
                {
                    "indent": "<number of indentations>",
                    "line": "<code>",
                    "pseudo-code": "<pseudo-code>",
                    "explanation": "<10-20 word reasoning and purpose>"
                },
                {
                    "indent": "<number of indentations>",
                    "line": "<code>",
                    "pseudo-code": "<pseudo-code>",
                    "explanation": "<10-20 word reasoning and purpose>"
                }
            ]
        },
        {
            "title": "<4-8 word subgoal title>",
            "code": [
                {
                    "indent": "<number of indentations>",
                    "line": "<code>",
                    "pseudo-code": "<pseudo-code>",
                    "explanation": "<10-20 word reasoning and purpose>"
                },
                {
                    "indent": "<number of indentations>",
                    "line": "<code>",
                    "pseudo-code": "<pseudo-code>",
                    "explanation": "<10-20 word reasoning and purpose>"
                }
            ]
        }
    ]
}`,
            }
        ];

        messages.push({
            role: "user",
            content: `[task-description]: ${description}\n[solution-code]:${getCodeWithLine(code)}[end-solution-code]`,
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
                    steps: parseResponse(response),
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

