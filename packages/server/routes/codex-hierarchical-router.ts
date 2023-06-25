import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const hierarchicalRouter = express.Router();

hierarchicalRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "",
            },
            
        ];

        if (context && context.length > 0) {
            messages.push({
                role: "user",
                content: ``,
   
            });
        } else {
            messages.push({
                role: "user",
                content: `[intended-behavior]: ${description}\n[code]:`,
            });
        }

        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.05,
            max_tokens: 1000,
            stop: ["[end-code]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            if(response){

                res.json({
                    response: response,
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



