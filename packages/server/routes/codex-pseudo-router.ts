import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const pseudoRouter = express.Router();

pseudoRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "for each provided [intended-behavior] generate a [pseudocode] snippet with {indentations} and breakdown details for a novice child that is learning to code python for the first time. For each line of the pesudocode, with the correct indentation for each line, follow it up with an [explanation] of the generated code, end with [end-explanation]. Use novice-friendly terms. The explaination for each line of pesudocode should explain the Python keywords, syntax, what they do, and the algorithm (if any). Make sure to include the keyword types in the explaination. For example, if the line of code is num = 10 % 2, the explaination should include the variable and operation in format of \`num{variable}\` and \`%{operation}\`. (only for the explaination, not the code itself). Also make sure to breakdown each of the statements, if statement should break into condition and code block, for loop should break into condition and code block, etc.",
            },
            {
                role: "user",
                content: `[intended-behavior]: Write a program that takes a number as input and prints "Even" if the number is divisible by 2.\n[code]:`,
            },
            {
                role: "assistant",
                content: `[begin-line] Read the input number from the user.[explanation] This line instructs the program to take input from the user. In Python, you can use the \`input(){build-in-function}\` function to achieve this. The input will be stored in a variable that we can use later in the program. [end-explanation][end-line]\n[begin-line]If the input number modulo 2 is equal to 0, then:[explanation] The modulo operator \`%{operation}\` returns the remainder of the division. So, when we perform \`input_number % 2{variable}\`, if the remainder is 0, it means that the number is divisible by 2 without any remainder.The if statement checks whether the condition is true or false. If it's true, the program will execute the indented code block following it. [end-explanation][end-line]\n[begin-line]{indentation}Print "Even"[explanation] This line of code will execute if the condition in the previous if statement is \`true{keyword}\`. It prints the message "Even" to the console, indicating that the input number is divisible by 2. [end-explanation][end-line][end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: Write a program that takes a number as input and prints "Even" if the number is divisible by 2, and "Odd" otherwise.\n[code]:`,
            },
            {
                role: "assistant",
                content: `[begin-line] Read the input number from the user.[explanation] This line instructs the program to take input from the user. In Python, you can use the \`input(){build-in-function}\` function to achieve this. The input will be stored in a variable that we can use later in the program. [end-explanation][end-line]\n[begin-line]If the input number modulo 2 is equal to 0, then:[explanation] The modulo operator \`%{operation}\` returns the remainder of the division. So, when we perform \`input_number % 2{variable}\`, if the remainder is 0, it means that the number is divisible by 2 without any remainder.The if statement checks whether the condition is true or false. If it's true, the program will execute the indented code block following it. [end-explanation][end-line]\n[begin-line]{indentation}Print "Even"[explanation] This line of code will execute if the condition in the previous if statement is \`true{keyword}\`. It prints the message "Even" to the console, indicating that the input number is divisible by 2.[end-explanation][end-line]\n [begin-line]Otherwise:[explanation]This \`else{keyword}\` statement is executed if the condition in the initial \`if{keyword}\` statement is \`false{keyword}\`. In other words, if the number is not divisible by 2 (i.e., if the remainder is not 0), the program will execute the indented code block following it.[end-explanation][end-line]\n[begin-line]{indentation}Print "Odd":[explanation]This line of code will execute \`if{keyword}\` the condition in the previous if statement is \`false{keyword}\`. It prints the message "Odd" to the console, indicating that the input number is not divisible by 2.[end-explanation][end-line][end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: generate a random number from 0 to 1, and print it to the console\n[code]:`,
            },
            {
                role: "assistant",
                content: `[begin-line] Import the random module.[explanation] This line brings in the functionality of the \`random{module}\` module in Python, which provides various functions for generating random numbers.In Python, modules are used to organize and reuse code. By importing the \`random{module}\` module, we gain access to its functions and capabilities. [end-explanation][end-line]\n[begin-line]Generate a random number.[explanation] This line utilizes the functions provided by the random module to generate a random number.The \`random{module}\` module in Python offers functions like \`random(){build-in-function}\` that can be used to generate random numbers. For example, random() generates a random floating-point number between 0 and 1. [end-explanation][end-line]\n[begin-line]Print the random number.[explanation] displays the randomly generated number on the console.The \`print(){build-in-function}\` function is used to output the value of the random number to the console. [end-explanation][end-line][end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if random generated dice roll from 1 to 6 is greater than 3 and even, print "Success" if true\n[code]:`,
            },
            {
                role: "assistant",
                content: `[begin-line] Import the random module.
                [explanation] This line brings in the functionality of the \`random{module}\` module in Python, which provides various functions for generating random numbers.In Python, modules are used to organize and reuse code. By importing the \`random{module}\` module, we gain access to its functions and capabilities. [end-explanation][end-line]\n[begin-line] Generate a random dice roll from 1 to 6.[explanation] This line uses the \`randint(){build-in-function}\` function from the \`random{module}\` module to generate a random integer between 1 and 6, simulating a dice roll. The \`randint(){build-in-function}\` function takes two arguments, representing the range of possible values, and returns a random integer within that range. [end-explanation][end-line]\n[begin-line] Check if the dice roll is greater than 3 and even.[explanation] This line combines two conditions using the logical operators and and \`>{operator}\` to check if the dice roll is greater than 3 and even.The \`>{operator}\` operator checks if the left operand (the dice roll) is greater than the right operand (3), and the \`and{operator}\` operator combines the two conditions. [end-explanation][end-line]\n[begin-line]{indentation}If the dice roll satisfies both conditions, print "Success".[explanation] This line is an \`if{keyword}\` statement that checks if the dice roll satisfies both conditions. If it does, the indented code block following this line will be executed.In this case, the code block contains the \`print(){build-in-function}\` function, which will display the message "Success" on the console. [end-explanation][end-line][end-code]`,
            },
        ];

        if (context && context.length > 0) {
            messages.push({
                role: "user",
                content: `[context-code]:start = 1\nend = 100\nsum_of_evens = 0\n[intended-behavior]: use the above [context-code] as context and write a pseudocode (exclude the generated pseudocode that already covered in context-code, only include context-code with the same structure and variable name if context-code is incorrect) to find the sum of all even numbers between 1 and 100\n[code]:`,
            });
            messages.push({
                role: "assistant",
                content: `[begin-line] Iterate through the numbers from start to end.
                [explanation] This step involves a loop that iterates through each number in the given range, starting from the value of \`start{variable}\` and ending at the value of \`end{variable}\`. It ensures that all numbers within the specified range are considered. [end-explanation][end-line]\n[begin-line]Check if the current number is even, then:[explanation] Within the loop, this step checks whether the current number being processed is even. It uses a condition that evaluates \`if{keyword}\` the current number divided by 2 results in a remainder of 0, which indicates an even number. [end-explanation][end-line]\n[begin-line]{indentation}add it to the \`sum_of_evens{variable}\`.[explanation] This step is executed when the condition in the previous step is \`true{keyword}\`, indicating that the current number is even. In such cases, the current number is added to the \`sum_of_evens{variable}\` variable to accumulate the sum of all even numbers. [end-explanation][end-line]\n[begin-line]{indentation}{indentation}Print the value of sum_of_evens.[explanation] Once the loop completes, this step prints the final value of the \`sum_of_evens{variable}\` variable, which represents the sum of all even numbers within the given range. The output displays this value on the console. [end-explanation][end-line][end-code]`,
            });
            messages.push({
                role: "user",
                content: `[context-code]:start = 1\nend = 10\nsum_of_evens = 0\n[intended-behavior]: use the above [context-code] as context and write a pseudocode (exclude the generated pseudocode that already covered in context-code, only include context-code with the same structure and variable name if context-code is incorrect) to find the sum of all even numbers between 1 and 100\n[code]:`,
            });
            messages.push({
                role: "assistant",
                content: `[begin-line] Set the variable start to 1.[explanation] This line initializes the variable \`start{variable}\` with the value 1. It sets the starting point for iterating through the numbers. [end-explanation][end-line]\n[begin-line] Set the variable end to 100.[explanation] This line assigns the value 100 to the variable \`end{variable}\`. It defines the endpoint for iterating through the numbers. [end-explanation][end-line]\n[begin-line] Set the variable sum_of_evens to 0.[explanation] This line initializes the variable \`sum_of_evens{variable}\` with the value 0. It creates a variable to store the sum of even numbers. [end-explanation][end-line]\n[begin-line] Iterate through the numbers from start to end.[explanation] This step involves a loop that iterates through each number in the given range, starting from the value of \`start{variable}\` and ending at the value of \`end{variable}\`. It ensures that all numbers within the specified range are considered. [end-explanation][end-line]\n[begin-line] {indentation}Check if the current number is even, then:[explanation]Within the loop, this step checks whether the current number being processed is even. It uses a condition that evaluates \`if{keyword}\` the current number divided by 2 results in a remainder of 0, which indicates an even number. [end-explanation][end-line]\n[begin-line]{indentation}{indentation}add it to the \`sum_of_evens{variable}\`.[explanation] This step is executed when the condition in the previous step is \`true{keyword}\`, indicating that the current number is even. In such cases, the current number is added to the \`sum_of_evens{variable}\` variable to accumulate the sum of all even numbers. [end-explanation][end-line]\n[begin-line]Print the value of sum_of_evens.[explanation] Once the loop completes, this step prints the final value of the \`sum_of_evens{variable}\` variable, which represents the sum of all even numbers within the given range. The output displays this value on the console. [end-explanation][end-line][end-code]`,
            });
            messages.push({
                role: "user",
                content: `[context-code]:\nimport random\ndef generate_random():\n     return random.randint(0, 100)\n[intended-behavior]: use the above [context-code] as context and write a Python program (exclude the context-code, only include context-code with the same structure and variable name if context-code is incorrect) and check if a random generated number from 1 to 100 is greater than 50\n[code]:`,
            });
            messages.push({
                role: "assistant",
                content: `[begin-line] Call the generate_random() function and assign the returned value to the variable random_number[explanation]This line executes the \`generate_random(){self-defined-function}\` function and stores the generated random number in the \`random_number{variable}\` variable.[end-explanation][end-line]\n[begin-line]Check if the value of random_number is greater than 50.[explanation]This \`if{keyword}\` statement evaluates whether the value of \`random_number{variable}\` is greater than 50.[end-explanation][end-line]\n[begin-line]{indentation}If the condition in the previous step is true, print "The random number is greater than 50".[explain]This print statement is executed \`if{keyword}\` the condition in the preceding \`if{keyword}\` statement is \`true{keyword}\`. It displays the message "The random number is greater than 50" on the console[end-explain]\n[begin-line]Otherwise:[explanation]This \`else{keyword}\` statement is executed if the condition in the initial \`if{keyword}\` statement is \`false{keyword}\`.[end-explanation][end-line]\n[begin-line]{indentation}If the condition in the previous step is false, print "The random number is not greater than 50".[explanation]This \`print(){build-in-function}\` statement is executed if the condition in the preceding \`if{keyword}\` statement is \`false{keyword}\`. It displays the message "The random number is not greater than 50" on the console.[end-explanation][end-line][end-code]`,
            });
            // messages.push({
            //     role: "user",
            //     content: `[context-code]:\nimport random\nrandom_number = random.randint(0, 0)\n[intended-behavior]: use the above [context-code] as context and write a Python program (exclude the context-code, only include context-code with the same structure and variable name if context-code is incorrect) and check if a random generated number from 1 to 100 is greater than 50\n[code]:`,
            // });
            // messages.push({
            //     role: "assistant",
            //     content: `[begin-line]modify the existing variable random_number to random between 0 to 100[explanation]Your previous context code is incorrect because the range of random numbers generated is from 0 to 0, which means that the generated number will always be 0. Therefore, it is not possible to check if the generated number is greater than 50.[end-explanation][end-line]\n[begin-line]Check if the value of random_number is greater than 50.[explanation]This \`if{keyword}\` statement evaluates whether the value of \`random_number{variable}\` is greater than 50.[end-explanation][end-line]\n[begin-line]      If the condition in the previous step is true, print "The random number is greater than 50".[explain]This print statement is executed \`if{keyword}\` the condition in the preceding \`if{keyword}\` statement is \`true{keyword}\`. It displays the message "The random number is greater than 50" on the console[end-explain]\n[begin-line]Otherwise:[explanation]This \`else{keyword}\` statement is executed if the condition in the initial \`if{keyword}\` statement is \`false{keyword}\`.[end-explanation][end-line]\n[begin-line]      If the condition in the previous step is false, print "The random number is not greater than 50".[explanation]This \`print(){build-in-function}\` statement is executed if the condition in the preceding \`if{keyword}\` statement is \`false{keyword}\`. It displays the message "The random number is not greater than 50" on the console.[end-explanation][end-line][end-code]`,
            // });
            messages.push({
                role: "user",
                content: `[context-code]:\n${context}\n[intended-behavior]: use the above [context-code] as context and write a Python program pseudocode (exclude the context-code, only include context-code if context-code is incorrect) ${description}\n[code]:`,
   
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
                    steps: convertToJSON(response),
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

interface Step {
    line: number;
    content: string;
    explanation: string;
}

function convertToJSON(response: string) {
    const lines = response.split('\n').filter(line => line.trim() !== '');
  
    const steps: Step[] = [];
  
    for (const line of lines) {
    //   console.log(line);
      const beginLineMatch = line.match(/\[begin-line\](.*?)\[explanation\]/);
      const explanationMatch = line.match(/\[explanation\](.*?)\[end-explanation\]/);
  
      if (beginLineMatch && explanationMatch) {
        const content = beginLineMatch[1];
        const explanation = explanationMatch[1].trim();
  
        const step: Step = {
          line: steps.length + 1,
          content,
          explanation,
        };
  
        steps.push(step);
      }
    }
  
    const jsonData = { steps };
    const jsonContent = JSON.stringify(jsonData, null, 2);
    return jsonContent;
}

