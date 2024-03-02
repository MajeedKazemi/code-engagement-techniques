import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const writeOverRouter = express.Router();

writeOverRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { code } = req.body;
    const userId = (req.user as IUser)._id;

    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
`
a novice student that is learning to write code is working on the [task-description] as a practice exercise. They are using a special editor that shows each token of the code one by one, the student is supposed to write over the tokens. and while they are typing over the tokens, the editor displays an explanation for that token.

For example \`if not merged or merged[-1][1] < interval[0]:\` has the following tokens: \`if \`, \`not \`, \`merged \`, \`or \`, \`merged\`, \`[-1]\`, \`[1] \`, \`< \`, \`interval\`, \`[0] \`, \`:\`, \`\n\`
Or \`intervals.sort(key=lambda x: x[0])\` has the following tokens: \`intervals\`, \`.\`, \`sort\`, \`(\`, \`key\`, \`=\`, \`lambda \`, \`x\`, \`:\`, \`x\`, \`[0]\`, \`)\`, \`\n\`

Make sure that you include all the punctuations and misc tokens. The system should be able to reconstruct the entire line of code by joining the tokens together.

some tokens are punctuations and do not have any extra info.
some tokens have a logical or syntactical meaning and should have an explanation.

for each line of code, include a thought provoking, critical thinking question that the student should think about. the question can be an all-encompassing question about the entire line. the why, the how... all in one question. it should be about logic, about problem-solving aspect, syntax, ... it should be about the most significant aspect of that line. and should make the student to critically think about that line.

Use the following JSON format:

{
    "lines": [
      {
        "code": "<exact code with indentation of that line>",
        "explanation": "<15-25 word explanation about this entire line>",
        "criticalThinkingQuestion": "<question that the student should think about>",
        "answer": "<answer to the question>",
        "tokens": [
          {
            "token": "<part of code>",
            "explanation": "<5-15 word explanation of that token>"
          },
          {
            "token": "<part of code>"
          },
          {
            "token": "<part of code>",
            "explanation": "<5-15 word explanation of that token>"
          },
          {
            "token": "<part of code>"
          }
        ]
      },
      {
        "code": "<exact code with indentation of that line>",
        "explanation": "<15-25 word explanation about this entire line>",
        "criticalThinkingQuestion": "<question that the student should think about>",
        "answer": "<answer to the question>",
        "tokens": [
          {
            "token": "<part of code>",
            "explanation": "<5-15 word explanation of that token>"
          },
          {
            "token": "<part of code>",
            "explanation": "<5-15 word explanation of that token>"
          },
          {
            "token": "<part of code>"
          },
          {
            "token": "<part of code>",
            "explanation": "<5-15 word explanation of that token>"
          }
        ]
      }
      ... (continue until the end of the code)
    ]
  }  

`,
            },
        ];


        messages.push({
            role: "user",
            content: `[solution-code]: ${code}[end-solution-code]`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.18,
            max_tokens: 4095,
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            if(response){
                const re = JSON.parse(response);
                res.json({
                    lines: re.lines,
                    success: true,
                });
            }
        }
    }
});

