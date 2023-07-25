import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const writeOverRouter = express.Router();

writeOverRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "for each of the python code snippets, generate a short [explanation] for each line, also highlight the keywords of the code classified into {keyword}, {variable}, {build-in-function}, {operation}, {self-defined-function}, {string}, and {module}",
            },
            {
                role: "user",
                content: `import random  
                random_number = random.randint(1, 10) 
                print("Random number between 1 and 10:", random_number) `,
            },
            {
                role: "assistant",
                content: `[line]import \`random{module}\`[explanation]We import the \`random{module}\` module to use its random number generation functions.[end-line]
                [line]\`random_number{variable}\` \`={operation}\` \`random.{module}\`\`randint(1, 10){build-in-function}\`[explanation]To generate a random integer between 1 and 10 and assign it to \`random_number{variable}\`(inclusive).[end-line]
                [line]\`print{build-in-function}\`(\`"Random number between 1 and 10:"{string}\`, \`random_number{variable}\`)[explanation]We print the generated random number along with a descriptive message[end-line][end-code]`,
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
                content: `[line]\`def{keyword}\` \`factorial{self-defined-function}\`(\`n{variable}\`):[explanation]We define a function named \`factorial{self-defined-function}\` that takes one argument 'n'.[end-line]
                [line]{indentation}\`if{keyword}\` \`n{variable}\` \`=={operation}\` \`0{variable}\`:[explanation]We check if the input number \`n{variable}\` is equal to 0.[end-line]
                [line]{indentation}{indentation}\`return{keyword}\` \`1{variable}\`[explanation]If 'n' is 0, we return 1 because the factorial of 0 is 1.[end-line]
                [line]{indentation}\`else{keyword}\`:[explanation]If \`n{variable}\` is not 0, we proceed to the next step.[end-line]
                [line]{indentation}{indentation}\`return{keyword}\` \`n{variable}\` \`*{operation}\` \`factorial{self-defined-function}\`(\`n{variable}\`-1)[explanation]We return the product of 'n' and the factorial of 'n-1'. This is a recursive call to the \`factorial{self-defined-function}\` function.[end-line]
                [line]\`number{variable}\` \`={operation}\` \`5{variable}\`[explanation]We assign the value 5 to the variable 'number'.[end-line]
                [line]\`result{variable}\` \`={operation}\` \`factorial{self-defined-function}\`(\`number{variable}\`)[explanation]We call the \`factorial{self-defined-function}\` function with \`number{variable}\` as the argument and assign the returned value to \`result{variable}\`.[end-line]
                [line]\`print{build-in-function}\`(\`f"The factorial of {number} is: {result}"{string}\`)[explanation]We print the factorial of the number using a formatted string.[end-line][end-code]`,
            },

            {
                role: "user",
                content: `numbers = [1, 2, 3, 4, 5]  
                squared_numbers = [num ** 2 for num in numbers]  
                print("Original numbers:", numbers)  
                print("Squared numbers:", squared_numbers)  `,
            },
            {
                role: "assistant",
                content: `[line]\`numbers{variable}\` \`={operation}\` \`\[1, 2, 3, 4, 5\]{variable}\`[explanation]We define a list named \`numbers{variable}\` containing the integers 1 through 5.[end-line]
                [line]\`squared_numbers{variable}\` \`={operation}\` \`\[num ** 2 for num in numbers\]{variable}\`[explanation]We use a list comprehension to create a new list \`squared_numbers{variable}\`, where each element is the square of the corresponding element in \`numbers{variable}\`.[end-line]
                [line]\`print{build-in-function}\`(\`"Original numbers:"{string}\`, \`numbers{variable}\`)[explanation]We print the original list of numbers.[end-line]
                [line]\`print{build-in-function}\`(\`"Squared numbers:"{string}\`, \`squared_numbers{variable}\`)[explanation]We print the list of squared numbers.[end-line][end-code]`,
            },

            {
                role: "user",
                content: `number = int(int(input(“enter a number”)) / 2 ) + 1`,
            },
            {
                role: "assistant",
                content: `[line]\`number{variable}\` \`={operation}\` \`int{build-in-function}\`(\`int{build-in-function}\`(\`input{build-in-function}\`(\`“enter a number”{string}\`)) \`/{operation}\` \`2{variable}\` ) \`+{operation}\` \`1{variable}\`[explanation]First, it prompts the user to enter a number using the \`input{build-in-function}\` function. The input is then converted to an integer using the \`int{build-in-function}\` function. This integer is divided by 2, and the result is converted to an integer again to remove any decimal points. Finally, 1 is added to this result, and the final value is assigned to the variable \`number{variable}\`.[end-line][end-code]`,
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
                content: `[line]\`sum_even{variable}\` \`={operation}\` \`0{variable}\`[explanation]We initialize a variable \`sum_even{variable}\` to 0. This variable will be used to store the sum of all even numbers.[end-line]
                [line]\`for{keyword}\` \`i{variable}\` \`in{keyword}\` \`range{build-in-function}\`(1, 101):[explanation]We start a for loop where \`i{variable}\` takes on values from 1 to 100 (inclusive). The \`range{build-in-function}\` function generates this sequence of numbers.[end-line]
                [line]{indentation}\`if{keyword}\` \`i{variable}\` \`%{operation}\` \`2{variable}\` \`=={operation}\` \`0{variable}\`:[explanation]We check if the current number \`i{variable}\` is even by using the modulus operator \`%{operation}\`. If \`i{variable}\` is divisible by 2, it is an even number.[end-line]
                [line]{indentation}{indentation}\`sum_even{variable}\` \`+={operation}\` \`i{variable}\`[explanation]If \`i{variable}\` is even, we add it to \`sum_even{variable}\`.[end-line]
                [line]\`print{build-in-function}\`(\`sum_even{variable}\`)[explanation]After the loop finishes, we print the sum of all even numbers from 1 to 100.[end-line][end-code]`,
            },
        ];


        messages.push({
            role: "user",
            content: `${description}`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.1,
            max_tokens: 2000,
            stop: ["[end-code]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const code = result.data.choices[0].message?.content;
            console.log(code);
            res.json({
                code: code,
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    }
});

interface Keyword{
    start: number;
    end: number;
    type: string;
}


interface Line{
    keyword: Keyword[];
    explanation: string;
}

writeOverRouter.post("/generateByLine", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "for each of the python code line, generate a short [explanation] for each line, also highlight the keywords of the code classified into {keyword}, {variable}, {build-in-function}, {operation}, {self-defined-function}, {string}, and {module}",
            },
            {
                role: "user",
                content: `import random`,
            },
            {
                role: "assistant",
                content: `[line]0,5,{keyword}
                7,12,{module}[end-line]
                [explanation]We import the \`random{module}\` module to use its random number generation functions.[end-explanation][end-generation]`,
            },

            {
                role: "user",
                content: `return n * factorial(n-1)`,
            },
            {
                role: "assistant",
                content: `[line]0,5,{keyword}
                7,8,{variable}
                9,10,{operation}
                11,20,{self-defined-function}
                21,22,{operation}
                23,24,{variable}[end-line]
                [explanation]We return the result of performing multiplication on the variable \`n{variable}\` and the result of calling the \`factorial{self-defined-function}\` function with the argument of \`n{variable}\` subtracted by 1.[end-explanation][end-generation]`,
            },

            {
                role: "user",
                content: `squared_numbers = [num ** 2 for num in numbers]`,
            },
            {
                role: "assistant",
                content: `[line]0,16,{variable}
                19,20,{operation}
                21,23,{variable}
                24,26,{operation}
                31,33,{variable}
                36,43,{variable}[end-line]
                [explanation]We use list comprehension to create a new list (\`squared_numbers{variable}\`), where each element is a square (\`**{operation}\`) of the corresponding element in the \`numbers{variable}\` list.[end-explanation][end-generation]`,
            },

            {
                role: "user",
                content: `number = int(int(input(“enter a number”)) / 2 ) + 1`,
            },
            {
                role: "assistant",
                content: `[line]0,6,{variable}
                9,12,{build-in-function}
                13,15,{build-in-function}
                16,32,{string}
                34,35,{operation}
                38,39,{operation}
                42,43,{variable}[end-line]
                [explanation]We prompt the user to input a number with the built-in \`input{build-in-function}\` command. This input is converted to an integer using the \`int{build-in-function}\`, then divided by 2, and increased by 1. The final result is stored in the \`number{variable}\` variable.[end-explanation][end-generation]`,
            },

            {
                role: "user",
                content: `for i in range(1, 101):`,
            },
            {
                role: "assistant",
                content: `[line]0,2,{keyword}
                4,5,{variable}
                8,13,{build-in-function}
                14,24,{operation}[end-line]
                [explanation]We initiate a \`for{keyword}\` loop with the variable \`i{variable}\` iterating over an inclusive range from 1 to 100, generated by the built-in \`range{build-in-function}\` function.[end-explanation][end-generation]`,
            },

        ];


        messages.push({
            role: "user",
            content: `${description}`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0,
            max_tokens: 256,
            stop: ["[end-generation]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const code = result.data.choices[0].message?.content;
            if(code){
                const output = parseOutput(code);
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


function parseOutput(output: string): Line {
    const lines = output.match(/\[line](.*?)\[end-line]/gs)?.[0].replace(/\n/g,'').replace(/\[line]\s*|\s*\[end-line]/g, '');
    const explanation = output.match(/\[explanation](.*?)\[end-explanation]/gs)?.[0].replace(/\n/g,'').replace(/\[explanation]\s*|\s*\[end-explanation]/g, '');
  
    const mappedLines = lines!.split(/\s+/).map(el => {
      const [start, end, type] = el.split(',');
      return { start: parseInt(start), end: parseInt(end), type: type.replace('{', '').replace('}', '') };
    });
  
    return {
      keyword: mappedLines,
      explanation: explanation ? explanation : ''
    };
  }

  