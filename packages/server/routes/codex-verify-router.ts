import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const verifyRouter = express.Router();


function getCodeWithLine(code: string) {
    const lines = code.split('\n');
    let output = '';
    
    lines.forEach((line, index) => {
        output += `${index + 1}. ${line}\n`;
    });

    return output;
};

function removeLineNumbers(code: string): string {
    return code.split('\n')
        .map(line => line.indexOf('.') !== -1 ? line.substring(line.indexOf('.') + 2) : line)
        .join('\n');
}

verifyRouter.post("/generateIssue", verifyUser, async (req, res, next) => {
    const { code, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`
Purposefully add some logical issues to the {code-solution} so that the noivce python programmers needs to fix it. Some potential logical issues to fix are: Incorrect Loop Conditions, Wrong Variable Assignments, Incorrect Function Arguments, Misuse of Data Structures, Incorrect Boolean Logic.  For each of the {code-solution} snippet, only generate 2 to 3 issues depends on the code length. The newly generated code should not involve any comments.  The code's line number starts from 1, empty lines should also be count as a line

#output in the below JSON format:

{
"wrong-code": {newly generated code based on the provided {code-solution} with logical issues}
"issues":{
            "logical-issue": {
                    "type": {3-4 words title for the issue type}
                    "line": {line number in the [wrong-code]}
            },
            "logical-issue": {
                    "type": {3-4 words title for the issue type}
                    "line": {line number in the [wrong-code]}
            }
        }
}
`,
            },
        ];

        messages.push({
            role: "user",
            content: `[solution-code]:${getCodeWithLine(code)}[end-solution-code]`,
        });


        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.05,
            max_tokens: 4096,
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            if(response){
                // console.log(response);
                const re = parseResponse(response);

                res.json({
                    wrongCode: removeLineNumbers(re["wrong-code"]),
                    issues: generateQuestions(re.issues),
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

function generateQuestions(issues: { [key: string]: { type: string, line: number } }): Array<{ type: string, line: number }> {
    let questions: Array<{ type: string, line: number }> = [];
    for (let key in issues) {
        let issue = issues[key];
        let question = { type: issue.type, line: issue.line };
        questions.push(question);
    }
    return questions;
}

function parseResponse(response: string): any {
    return JSON.parse(response);
}

verifyRouter.post("/generateHintLevel1", verifyUser, async (req, res, next) => {
    const { code, studentCode } = req.body;
    const userId = (req.user as IUser)._id;

    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`
by comparing [student-code] to [correct-solution], list all the lines of [student-code] that are incorrect and need to be fixed. Use the following JSON template:

{
    "fixes": [
        {
            "line": <number>,
            "issues": <10-15 word description>
        },
        {
            "line": <number>,
            "issues": <10-15 word description>
        },
        ...
    ]
}

if there are no issues, the list of fixes should become empty.
`,
            },
        ];

        messages.push({
            role: "user",
            content: `[student-code]:${getCodeWithLine(studentCode)}[end-student-code][correct-solution]${getCodeWithLine(code)}[end-correct-solution]`,
        });


        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.2,
            max_tokens: 800,
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            if(response){
                // console.log(response);
                const re = parseResponse(response);

                res.json({
                    hint1: re["fixes"],
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

verifyRouter.post("/generateHintLevel2", verifyUser, async (req, res, next) => {
    const { code, studentCode } = req.body;
    const userId = (req.user as IUser)._id;

    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`
by comparing [student-code] to [correct-solution], list all the lines of [student-code] that are incorrect and need to be fixed.

After describing the issues, ask a though provoking question to nudge the student towards thinking about what could potentially be wrong in that line.

Make sure that these questions are novice-friendly and easy to understand for a student learning to code. use a simple english.

Use the following JSON template:

{
    "fixes": [
        {
            "line": <number>,
            "issues": <detailed description>,
            "question": <thought provoking question for student>
        },
        {
            "line": <number>,
            "issues": <detailed description>,
            "question": <thought provoking question for student>
        },
        ...
    ]
}

if there are no issues, the list of fixes should become empty.
`,
            },
        ];

        messages.push({
            role: "user",
            content: `[student-code]:${getCodeWithLine(studentCode)}[end-student-code][correct-solution]${getCodeWithLine(code)}[end-correct-solution]`,
        });


        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.2,
            max_tokens: 800,
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            if(response){
                // console.log(response);
                const re = parseResponse(response);

                res.json({
                    hint2: re["fixes"],
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

verifyRouter.post("/generateHintLevel3", verifyUser, async (req, res, next) => {
    const { code, studentCode } = req.body;
    const userId = (req.user as IUser)._id;

    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`
by comparing [student-code] to [correct-solution], list all the lines of [student-code] that are incorrect and need to be fixed.

After describing the issues, provide a list of hints for that line and its issues to help the student fix that line.

Do not include any code in the hints. Just use natural language. The student should fix the code by themselves.

Use the following JSON template:

{
    "fixes": [
        {
            "line": <number>,
            "issues": <detailed description>,
            "hint": "<natural language hints to fix issues>"
        },
        {
            "line": <number>,
            "issues": <detailed description>,
            "hint": "<natural language hints to fix issues>"
        },
        ...
    ]
}

if there are no issues, the list of fixes should become empty.
`,
            },
        ];

        messages.push({
            role: "user",
            content: `[student-code]:${getCodeWithLine(studentCode)}[end-student-code][correct-solution]${getCodeWithLine(code)}[end-correct-solution]`,
        });


        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.25,
            max_tokens: 4000,
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            if(response){
                // console.log(response);
                const re = parseResponse(response);

                res.json({
                    hint3: re["fixes"],
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







