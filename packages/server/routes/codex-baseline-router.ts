import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const codexRouter = express.Router();

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
        const messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "for each provided [intended-behavior] generate a short python [code] snippet for a novice child that is learning to code for the first time. Then display an [explanation] of the generated code. Use novice-friendly terms. Explain the Python keywords, syntax, what they do, and the algorithm (if any).",
            },
            {
                role: "user",
                content: `[intended-behavior]: say hello world\n[code]:`,
            },
            {
                role: "assistant",
                content: `print("hello world")\n[end-code]\n[explanation]:\nThis code prints the phrase "hello world" to the screen. The \`print()\` function is used to display text or values to the console. In this case, it outputs the specified text that is enclosed in double quotes.\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: ask the user for their name\n[code]:`,
            },
            {
                role: "assistant",
                content: `name = input("What is your name? ")\n[end-code]\n[explanation]:\nThis code asks the user for their name and stores it in the variable \`name\`. The \`input()\` function is used to read input from the user. The text inside the parentheses of the \`input()\` function is the prompt or question displayed to the user. The user's name is then stored in the variable \`name\`. So when this code is executed, it will first display the message "What is your name?" and the user can enter their name as input. The input provided by the user will be stored in the variable \`name\` which can be used later in the code.\n[end-explanation]`,
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
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.1,
            max_tokens: 500,
            stop: ["[end-explanation]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const code = result.data.choices[0].message?.content;

            res.json({
                code,
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    }
});
