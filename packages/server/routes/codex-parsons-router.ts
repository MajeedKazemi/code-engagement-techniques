import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const parsonsRouter = express.Router();


parsonsRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "convert a given code snippet into a faded Parsons question code, incorporating a placeholder {input} for users to fill in. The faded part of the code should not contain ambiguous input. The {input} block should only accept one correct answer, ensuring a single valid solution. The number of faded part should be more than 1/2 of the total number of lines (only fade expressions/values/keywords, do not fade strings, for example inside a print statement) replace them with {input} holes. The code should be syntactically correct. If the code only contains 1 line, there should include at least 2 {input} holes if possible",
            },
            {
                role: "user",
                content: `sum_even = 0
                for i in range(1, 101):
                    if i % 2 == 0:
                        sum_even += i
                print(sum_even)`,
            },
            {
                role: "assistant",
                content: `sum_even = {input}
                for i in range(1, {input}):
                    if {input} % 2 == {input}:
                        sum_even {input} i
                print(sum_even)[end-code]`,
            },

            {
                role: "user",
                content: `number = int(int(input(“enter a number”)) / 2 ) + 1`,
            },
            {
                role: "assistant",
                content: `number = {input}(int(input(“enter a number”)) {input} 2 ) + {input}`,
            },

            {
                role: "user",
                content: `def factorial(n):  
                if n == 0:
                    return 1
                else:
                    return n * factorial(n-1)  
            number = 5  
            result = factorial(number) 
            print(f"The factorial of {number} is: {result}")`,
            },
            {
                role: "assistant",
                content: `def factorial(n):  
                if n == {input}:
                    return 1
                else:
                    return n * factorial(n-1)  
            number = 5  
            result = factorial(number) 
            print(f"The factorial of {number} is: {result}")[end-code]`,
            },

            {
                role: "user",
                content: `import random  
                random_number = random.randint(1, 10) 
                print("Random number between 1 and 10:", random_number)`,
            },
            {
                role: "assistant",
                content: `import random  
                random_number = random.randint(1, {input}) 
                print("Random number between 1 and 10:", random_number)[end-code]`,
            },

            {
                role: "user",
                content: `nums = [1, 2, 3]
                length = len(nums)
                i = 0
                while i + 1 < length:
                    nums.append(nums[i] + nums[i + 1])
                        i = i + 1
                print(nums[len(nums) - 1])`,
            },
            {
                role: "assistant",
                content: `nums = [1, 2, 3]
                length = len({input})
                i = 0
                while i + 1 < length:
                    nums.append(nums[i] + {input})
                    i = i + 1
                print({input}[len(nums) - 1])[end-code]`,
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
            max_tokens: 1000,
            stop: ["[end-code]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const code = result.data.choices[0].message?.content;
            if(code){
                const output = code;
                res.json({
                    code: output,
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




  