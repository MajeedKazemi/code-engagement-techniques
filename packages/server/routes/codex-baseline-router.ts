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
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "for each provided [intended-behavior] generate a short python [code] snippet for a novice child that is learning to code for the first time. Then display an [explanation] of the generated code, end with [end-explanation]. Use novice-friendly terms. Explain the Python keywords, syntax, what they do, and the algorithm (if any).",
            },
            {
                role: "user",
                content: `[intended-behavior]: say hello world\n[code]:`,
            },
            {
                role: "assistant",
                content: `print("hello world")\n[end-code]\n[explanation]:\nThis code prints the phrase "hello world" to the screen. The \`print(){build-in-function}\` function is used to display text or values to the console. In this case, it outputs the specified text that is enclosed in double quotes.\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: ask the user for their name\n[code]:`,
            },
            {
                role: "assistant",
                content: `name = input("What is your name? ")\n[end-code]\n[explanation]:\nThis code asks the user for their name and stores it in the variable \`name{variable}\`. The \`input(){build-in-function}\` function is used to read input from the user. The text inside the parentheses of the \`input(){build-in-function}\` function is the prompt or question displayed to the user. The user's name is then stored in the variable \`name{variable}\`. So when this code is executed, it will first display the message "What is your name?" and the user can enter their name as input. The input provided by the user will be stored in the variable \`name{variable}\` which can be used later in the code.\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: ask the user to enter a number\n[code]:`,
            },
            {
                role: "assistant",
                content: `number = int(input("Enter a number: "))\n[end-code]\n[explanation]:\nThis code displays a message asking the user to enter a number. The \`input(){build-in-function}\` function is used to get input from the user, and the \`int(){build-in-function}\` function is used to convert the input into an integer. The entered number is stored in the \`number{variable}\` variable\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: generate a random number\n[code]:`,
            },
            {
                role: "assistant",
                content: `import random\nnumber = random.randint(0, 100)\n[end-code]\n[explanation]:\nThe program first needs to use the \`random{module}\` module in Python. The \`import{keyword}\` statement is used to bring in the functionality of the \`random\` module. Next, the program generates a random number using the \`random{module}.randint(){build-in-function}\` function. In this case, the \`randint(){build-in-function}\` function generates a random integer between the given range \`a{variable}\` and \`b{variable}\`. In the code, it generates a random number between 1 and 10. The generated random number is stored in the variable called \`random_number{variable}\`\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if the number is greater than 50\n[code]:`,
            },
            {
                role: "assistant",
                content: `if number > 50:\n    print("The number is greater than 50")\n[end-code]\n[explanation]:\nThe program asks the user to enter a number using the \`input(){build-in-function}\` function. The \`input{build-in-function}\` function reads the user's input as a string. To treat it as a number, we use the \`int{build-in-function}\` function to convert the input into an integer. The entered number is stored in a variable called \`number{variable}\`. Next, the program uses an if statement to check if the value of \`number{variable}\` is greater than 50. The \`if{keyword}\` statement evaluates the given condition, and if it is true, the code will print \`The number is greater than 50\`.\n[end-explanation]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if roll is even\n[code]:`,
            },
            {
                role: "assistant",
                content: `if roll % 2 == 0:\n    print("The roll is even")\n[end-code]\n[explanation]:\nThe program asks the user to enter the roll number using the \`input{build-in-function}\` function. The \`input{build-in-function}\` function reads the user's input as a string. To treat it as a number, we use the \`int{build-in-function}\` function to convert the input into an integer. The entered roll number is stored in a variable called \`roll{variable}\`. This code follows a simple algorithm: it asks the user to enter a roll number, performs the modulus operation \`%{operation}\` to check if the roll number is even, and then displays the result based on the comparison.\n[end-explanation]`,
            },
        ];

        if (context && context.length > 0) {
            messages.push({
                role: "user",
                content: `[context-code]:start = 1\nend = 100\nsum_of_evens = 0\n[intended-behavior]: use the above [context-code] as context and write a Python program (exclude the context-code, only include context-code if context-code is incorrect) to find the sum of all even numbers between 1 and 100\n[code]:`,
            });
            messages.push({
                role: "assistant",
                content: `\nfor num in range(start, end + 1):\n    if num % 2 == 0:\n         sum_of_evens += num\nprint("Sum of even numbers between", start, "and", end, "is:", sum_of_evens)\n[end-code]\n[explanation]:\nThe \`for{keyword}\` loop is like a repeating process that goes through a sequence of numbers. The num variable represents each number in the sequence as the loop progresses. The \`range(start, end + 1){build-in-function}\` function generates a sequence of numbers starting from \`start{variable}\` and ending at \`end{variable}\` (including \`end{variable}\`). So, in our case, the loop will go through each number from 1 to 100. The \`if{keyword}\` statement checks whether the current number, \`num{variable}\`, is an even number. The \`%{operation}\` operator calculates the remainder when \`num{variable}\` is divided by 2. If the remainder is 0, it means the number is even. If the number is indeed even, the code inside the if block will execute. \`sum_of_evens += num{variable}\` is a way to add the current even number, \`num{variable}\`, to the running total stored in \`sum_of_evens{variable}\`.
                The \`+={operation}\` operator combines addition and assignment. It adds the value on the right side to the current value on the left side and assigns the result back to the left side.\n[end-explanation]`,
   
            });
            messages.push({
                role: "user",
                content: `[context-code]:\nimport random\nnumber = random.randint(0, 0)\n[intended-behavior]: use the above [context-code] as context and write a Python program (exclude the context-code, only include context-code if context-code is incorrect) check if a random generated number from 0 to 100 is greater than 50\n[code]:`,
            });
            messages.push({
                role: "assistant",
                content: `\nnumber = random.randint(0, 100)\nif number > 50:\n    print("The number is greater than 50")\nelse:\n    print("The number is less than or equal to 50")\n[end-code]\n[explanation]:\nYour previous context code is incorrect because the range of random numbers generated is from 0 to 0, which means that the generated number will always be 0. Therefore, it is not possible to check if the generated number is greater than 50. The generated code checks if the randomly generated number is greater than 50. The \`if{keyword}\` statement checks if the condition inside the parentheses is \`true{keyword}\`. If the condition is \`true{keyword}\`, the code inside the \`if{keyword}\` block will execute. If the condition is false, the code inside the \`else\` block will execute. In this case, if \`number{variable}\` is greater than 50, the message "The number is greater than 50" will be printed. Otherwise, the message "The number is less than or equal to 50" will be printed.\n[end-explanation]`,
            });
            messages.push({
                role: "user",
                content: `[context-code]:\nimport random\ndef generate_random():\n     return random.randint(0, 100)\n[intended-behavior]: use the above [context-code] as context and write a Python program (exclude the context-code, only include context-code if context-code is incorrect) and check if a random generated number from is greater than 50\n[code]:`,
            });
            messages.push({
                role: "assistant",
                content: `number = generate_random()\nif number > 50:\n    print("The number is greater than 50")\nelse:\n    print("The number is less than or equal to 50")\n[end-code]\n[explanation]:\nThis code defines a function called \`generate_random(){self-defined-function}\` that generates a random number between 0 and 100 using the \`random{module}.randint(){build-in-function}\` function and returns it. The function is then called to generate a random number and store it in the \`number{variable}\` variable. The code checks if the randomly generated number is greater than 50. The \`if{keyword}\` statement checks if the condition inside the parentheses is \`true{keyword}\`. If the condition is \`true{keyword}\`, the code inside the \`if{keyword}\` block will execute. If the condition is false, the code inside the \`else{keyword}\` block will execute. In this case, if \`number{variable}\` is greater than 50, the message "The number is greater than 50" will be printed. Otherwise, the message "The number is less than or equal to 50" will be printed.\n[end-explanation]`,
            });
            messages.push({
                role: "user",
                content: `[context-code]:\n${context}\n[intended-behavior]: use the above [context-code] as context and write a Python program (exclude the context-code, only include context-code if context-code is incorrect) ${description}\n[code]:`,
   
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
            max_tokens: 750,
            stop: ["[end-explanation]"],
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

