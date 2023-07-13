import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const tokenRouter = express.Router();


tokenRouter.post("/codetotoken", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "Python Tree-sitter allows you to parse source code in different languages and create abstract syntax trees (ASTs) from the code.  By using Python Tree-sitter, for each code snippet, separate into each token with short explanations. Do not forget parentheses together and number value seperately are token",
            },
            {
                role: "user",
                content: `Number = int(input(“enter a number”))`,
            },
            {
                role: "assistant",
                content: `[begin-line]Number = [exp] assigns a value to a variable called \`Number\`[end-line]
                [begin-line]int( [exp] converts to integer[end-line]
                [begin-line]input( [exp] input a value based on the prompt string[end-line]
                [begin-line]“enter a number”)) [exp] user prompt[end-line]`,
            },

            {
                role: "user",
                content: `y = "Hello, World!"
                print(len(y))
                sum_even = 0`,
            },
            {
                role: "assistant",
                content: `[begin-line]y =  [exp] assigns a value to the variable \`y\`[end-line]
                [begin-line]"Hello, World!" [exp] assigned string value of \`y\`[end-line]
                [linebreak]
                [begin-line]print( [exp]  to display output[end-line]
                [begin-line]len(y)) [exp] returns the length of the string \`y\`[end-line]
                [linebreak]
                [begin-line]sum_even = [exp] assigns integer value 0 to variable \`sum_even\`[end-line]
                [begin-line]0 [exp] integer value 0 [end-line]`,
            },

            {
                role: "user",
                content: `def my_function(fname):
                print(fname + " Refsnes")`,
            },
            {
                role: "assistant",
                content: `[begin-line]def [exp] keyword used to define a function[end-line]
                [begin-line]my_function [exp] Name of the function[end-line]
                [begin-line](fname): [exp] input argument \`fname\` to function \`my_function\`[end-line]
                [linebreak]
                [begin-line][indentation]print [exp] to display output[end-line]
                [begin-line](fname + " Refsnes") [exp] string concatenation between the input argument and the string " Refsnes"[end-line]`,
            },

            {
                role: "user",
                content: `num = 100
                for i in range(1, num + 1):
                                factorial *= i`,
            },
            {
                role: "assistant",
                content: `[begin-line]num = [exp] assigns integer value to variable \`num\`[end-line]
                [begin-line] 100 [exp] integer value 100[end-line]
                [linebreak]
                [begin-line]for [exp] keyword to start a loop[end-line]
                [begin-line]i [exp] variable to iterate over in the loop[end-line]
                [begin-line]in [exp] keyword to specify which iterable to use[end-line]
                [begin-line]range [exp] function which generates a list of numbers[end-line]
                [begin-line](1, num + 1): [exp] parameters of \`range\` function, creating a list of numbers from 1 to \`num\` + 1, not including \`num\`+ 1[end-line] 
                [linebreak]
                [begin-line][indentation]factorial *=  [exp] multiplies the variable \`factorial\` by a number and assigns the result back to \`factorial\` [end-line]
                [begin-line] i [exp] numeric value \`i\` [end-line]`,
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
                content: `def factorial(n):
                if n == 0:
                    return 1
                else:
                    return n * factorial(n - 1)`,
            },
            {
                role: "assistant",
                content: `[begin-line]def [exp] keyword used to define a function[end-line]
                [begin-line]factorial [exp] Name of the function is \`factorial\` [end-line]
                [begin-line](n): [exp]  The function takes one argument \`n\`[end-line]
                [linebreak]
                [begin-line][indentation]if [exp] keyword used to perform conditional operations[end-line]
                [begin-line]n == 0: [exp] condition to check if \`n\` is equal to 0[end-line]
                [linebreak]
                [begin-line][double-indentation]return [exp] keyword used to exit a function and return a value[end-line]
                [begin-line]1 [exp] integer value 1[end-line]
                [linebreak]
                [begin-line][indentation]else: [exp] keyword used to perform operations if the \`if\` condition is not met[end-line]
                [linebreak]
                [begin-line][double-indentation]return [exp] keyword used to exit a function and return a value[end-line]
                [begin-line]n * factorial(n - 1) [exp] recursive call to the \`factorial\` function with argument \`n - 1\`, and the result is multiplied by \`n\`[end-line]`,
            },
            {
                role: "user",
                content: `${description}`,
            }
        ];

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.1,
            max_tokens: 2000,
            stop: ["[end-explanation]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            if(response){
                res.json({
                    response: convertStringToCodeObject(response),
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

interface Token {
    code: string;
    explanation: string;
}

interface AnimatedTokensProps {
    tokens: Token[];
}

function convertStringToCodeObject(input: string): AnimatedTokensProps[] {
    console.log(input);
    const lines = input.split("[linebreak]").filter(Boolean);
    const tokenLines = lines.map((line) => line.trim().split("[begin-line]").filter(Boolean));
  
    const animatedTokens: AnimatedTokensProps[] = tokenLines.map((lineTokens) => {
      const tokens: Token[] = lineTokens.map((lineToken) => {
        const [code, explanation] = lineToken.split("[exp]").map((token) => token.trim());
        return { code, explanation };
      });
  
      return { tokens };
    });
    return animatedTokens;
  }
// the goal to to seperate first by [linebreak], and then seperate by each [begin-line] and [end-line], the content between [begin-line] and [end-line] will be the token, the token is seperated with [exp], the part before [exp] is the code, the part after [exp] is the explanation
// example:
// [begin-line]y =  [exp] assigns a value to the variable \`y\`[end-line]
//                 [begin-line]"Hello, World!" [exp] assigned string value of \`y\`[end-line]
//                 [linebreak]
//                 [begin-line]print( [exp]  to display output[end-line]
//                 [begin-line]len(y)) [exp] returns the length of the string \`y\`[end-line]

// convert into:

// [
//     {
//       tokens: [
//         {
//           code: "y =",
//           explanation: "assigns a value to the variable \`y\`",
//         },
//         {
//           code: ""Hello, World!"",
//           explanation: "assigned string value of \`y\`",
//         }
//       ],
//     },
//     {
//       tokens: [
//         {
//           code: "print(",
//           explanation: "to display output",
//         },
//         {
//           code: "len(y))",
//           explanation: "returns the length of the string \`y\`",
//         },
//       ],
//     },
//   ];


