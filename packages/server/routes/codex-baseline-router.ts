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
                content: `number = int(input("Enter a number: "))\n[end-code]\n[explanation]:\nThis code displays a message asking the user to enter a number. The \`input()\` function is used to get input from the user, and the \`int()\` function is used to convert the input into an integer. The entered number is stored in the \`number\` variable\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: generate a random number\n[code]:`,
            },
            {
                role: "assistant",
                content: `import random\nnumber = random.randint(0, 100)\n[end-code]\n[explanation]:\nThe program first needs to use the \`random\` module in Python. The \`import\` statement is used to bring in the functionality of the \`random\` module. Next, the program generates a random number using the \`random.randint(a, b)\` function. In this case, the \`randint()\` function generates a random integer between the given range \`a\` and \`b\`. In the code, it generates a random number between 1 and 10. The generated random number is stored in the variable called \`random_number\`\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if the number is greater than 50\n[code]:`,
            },
            {
                role: "assistant",
                content: `if number > 50:\n    print("The number is greater than 50")\n[end-code]\n[explanation]:\nThe program asks the user to enter a number using the \`input\` function. The \`input\` function reads the user's input as a string. To treat it as a number, we use the \`int\` function to convert the input into an integer. The entered number is stored in a variable called \`number\`. Next, the program uses an if statement to check if the value of \`number\` is greater than 50. The \`if\` statement evaluates the given condition, and if it is true, the code will print \`The number is greater than 50\`.\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if roll is even\n[code]:`,
            },
            {
                role: "assistant",
                content: `if roll % 2 == 0:\n    print("The roll is even")\n[end-code]\n[explanation]:\nThe program asks the user to enter the roll number using the \`input\` function. The \`input\` function reads the user's input as a string. To treat it as a number, we use the \`int\` function to convert the input into an integer. The entered roll number is stored in a variable called \`roll\`. This code follows a simple algorithm: it asks the user to enter a roll number, performs the modulus operation \`(%)\` to check if the roll number is even, and then displays the result based on the comparison.\n[end-explanation]`,
            },
        ];

        if (context && context.length > 0) {
            messages.push({
                role: "user",
                content: `[context-code]:\n${context}\n[intended-behavior]: use the above [context-code] as context and ${description}\n[code]:`,
   
            });
            messages.push({
                role: "user",
                content: `[context-code]:start = 1\nend = 100\nsum_of_evens = 0\n[intended-behavior]: Write a Python program to find the sum of all even numbers between 1 and 100\n[code]:`,
            });
            messages.push({
                role: "assistant",
                content: `for num in range(start, end + 1):\n    if num % 2 == 0:\n         sum_of_evens += num\nprint("Sum of even numbers between", start, "and", end, "is:", sum_of_evens)\n[end-code]\n[explanation]:\nThe \`for\` loop is like a repeating process that goes through a sequence of numbers. The num variable represents each number in the sequence as the loop progresses. The \`range(start, end + 1)\` function generates a sequence of numbers starting from \`start\` and ending at \`end\` (including \`end\`). So, in our case, the loop will go through each number from 1 to 100. The \`if\` statement checks whether the current number, \`num\`, is an even number. The \`%\` operator calculates the remainder when \`num\` is divided by 2. If the remainder is 0, it means the number is even. If the number is indeed even, the code inside the if block will execute. \`sum_of_evens += num\` is a way to add the current even number, \`num\`, to the running total stored in \`sum_of_evens\`.
                The \`+=\` operator combines addition and assignment. It adds the value on the right side to the current value on the left side and assigns the result back to the left side.\n[end-explanation]`,
   
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
