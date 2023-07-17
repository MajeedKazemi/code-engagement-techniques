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
                    `Python Tree-sitter allows you to parse source code in different languages and create abstract syntax trees (ASTs) from the code.  By using Python Tree-sitter, consider each code line seperately, separate into each token with short goal of a specific token. Do not forget parentheses together and number value seperately are token. Each token should have a index in incremental order, for each of the token also identify their [parents] index if and only if the current token are in parenthesis in the code logic. If the token is not inside any parenthesis, the [parents] should be empty.  For example "for i in range(1,101)", only 1, 101 should have parent as they are in parenthesis of range().`,
            },
            {
                role: "user",
                content: `number = int(input(“enter a number”))`,
            },
            {
                role: "assistant",
                content: `
[begin-line]number = [index] 0 [parents] [exp] assign the value on the right side to the variable \` number{variable}\` on the left side.[end-line]
[begin-line]int() [index] 1 [parents]  [exp] convert the input string from the user to an integer so it can be assigned to \`number{variable}\` [end-line]
[begin-line]input() [index] 2 [parents][exp] get a string value from the user input [end-line]
[begin-line]“enter a number” [index] 3 [parents] 2 [exp] provide a prompt to the user indicating what they should input, in this case, a number.[end-line]`,
            },

            {
                role: "user",
                content: `number = int(int(input(“enter a number”)) / 2 ) + 1`,
            },
            {
                role: "assistant",
                content: `
[begin-line]number = [index] 0 [parents] [exp] assign the value on the right side to the variable \`number{variable}\` on the left side.[end-line]
[begin-line]int() [index] 1 [parents] 0 [exp] convert the calculated value from the division and addition to an integer, so it can be assigned to \`number{variable}\` [end-line]
[begin-line]int() [index] 2 [parents] 1 [exp] convert the input string from the user to an integer so it can participate in arithmetical operations [end-line]
[begin-line]input() [index] 3 [parents] 2 [exp] get a string value from the user input [end-line]
[begin-line]“enter a number” [index] 4 [parents] 3 [exp] provide a prompt to the user indicating what they should input, in this case, a number.[end-line]
[begin-line]/ [index] 5 [parents] 1 [exp] perform a division operation on the user's input and 2 [end-line]
[begin-line]2 [index] 6 [parents] 1 [exp] this is the divisor in the division operation.[end-line]
[begin-line]+ [index] 7 [parents] 1 [exp] perform an addition operation on the result from the parenthesized expression and 1 [end-line]
[begin-line]1 [index] 8 [parents] [exp] this is the value being added to the result of the operation inside the parentheses.[end-line]`,
            },

            {
                role: "user",
                content: `y = "Hello, World!"
                print(len(y)+x)
                sum_even = 0`,
            },
            {
                role: "assistant",
                content: `
[begin-line]y = [index] 0 [parents] [exp] assign the string "Hello, World!" to \`y{variable}\`[end-line]
[linebreak]
[begin-line]print() [index] 2 [parents] [exp] print the result of the length of y plus \`x{variable}\`[end-line]
[begin-line]len() [index] 3 [parents] 2 [exp] get the length of \`y{variable}\`[end-line]
[begin-line]y [index] 4 [parents] 3 [exp] variable that we want to find the length of [end-line]
[begin-line]+ [index] 5 [parents] 2 [exp] add the length of \`y{variable}\` and the variable \`x{variable}\` together [end-line]
[begin-line]x [index] 6 [parents] 2 [exp] the variable \`x{variable}\` that is being added to the length of \`y{variable}\`[end-line]
[linebreak]
[begin-line]sum_even = [index] 7 [parents] [exp] assign the number 0 to the variable \`sum_even{variable}\` [end-line]
[begin-line]0 [index] 8 [parents]  [exp] a numerical value that is being assigned to \`sum_even{variable}\`[end-line]`,
            },

            {
                role: "user",
                content: `number = random.randint(0, int(input(“enter a number”)) + 1)`,
            },
            {
                role: "assistant",
                content: `
                [begin-line]number = [index] 0 [parents] [exp] assign the value on the right side to the variable \`number{variable}\` on the left side.[end-line]
                [begin-line]random.randint() [index] 1 [parents] [exp] generate a random integer between the two arguments provided, inclusive [end-line]
                [begin-line]0 [index] 2 [parents] 1 [exp] the lower bound for the random integer [end-line]
                [begin-line]int() [index] 3 [parents] 1 [exp] convert the input string from the user to an integer so it can be used as the upper bound for the random integer [end-line]
                [begin-line]input() [index] 4 [parents] 3 [exp] get a string value from the user input [end-line]
                [begin-line]“enter a number” [index] 5 [parents] 4 [exp] provide a prompt to the user indicating what they should input, in this case, a number.[end-line]
                [begin-line]+ [index] 6 [parents] 1 [exp] add 1 to the user's input to serve as the upper bound for the random integer [end-line]
                [begin-line]1 [index] 7 [parents] 1 [exp] the value being added to the user's input to serve as the upper bound for the random integer [end-line]`,
            },

            {
                role: "user",
                content: `
                def my_function(fname):
                    print(fname + " Refsnes")`,
            },
            {
                role: "assistant",
                content: `
                [begin-line]def [index] 0 [parents] [exp] keyword to define a function [end-line]
                [begin-line]my_function() [index] 1 [parents] [exp] the name of the function being defined [end-line]
                [begin-line]fname [index] 2 [parents] 1 [exp] the parameter of the function \`my_function{self-defined-function}\`[end-line]
                [linebreak]
                [begin-line]{indentation}print() [index] 3 [parents] [exp] print the result of the concatenation of \`fname{variable}\` and " Refsnes" [end-line]
                [begin-line]fname [index] 4 [parents] 3 [exp] the parameter of the function \`my_function{self-defined-function}\` that is being concatenated with " Refsnes" [end-line]
                [begin-line]+ [index] 5 [parents] 3 [exp] concatenate \`fname{variable}\` and " Refsnes" [end-line]
                [begin-line]" Refsnes" [index] 6 [parents] 3 [exp] a string of text that is being concatenated with \`fname{variable}\`[end-line]`,
            },
            {
                role: "user",
                content: `
                num = 100
                for i in range(1, num + 1):
                    factorial *= i`,
            },
            {
                role: "assistant",
                content: `
                [begin-line]num = [index] 0 [parents] [exp] assign the number 100 to the variable \`num{variable}\` [end-line]
                [begin-line]100 [index] 1 [parents] [exp] a numerical value that is being assigned to \`num{variable}\`[end-line]
                [linebreak]
                [begin-line]for [index] 2 [parents] [exp] keyword to start a for loop [end-line]
                [begin-line]i [index] 3 [parents] [exp] the variable that will take on each value in the range from 1 to \`num{variable}\` + 1 [end-line]
                [begin-line]in [index] 4 [parents] [exp] keyword to specify that \`i{variable}\` will take on each value in the range [end-line]
                [begin-line]range() [index] 5 [parents]  [exp] the range of values that \`i{variable}\` will take on [end-line]
                [begin-line]1, [index] 6 [parents] 5 [exp] the start of the range [end-line]
                [begin-line]num + 1 [index] 7 [parents] 5 [exp] the end of the range [end-line]
                [linebreak]
                [begin-line]{indentation}factorial *= [index] 11 [parents] [exp] multiply the current value of \`factorial{variable}\` by \`i{variable}\` and assign the result to \`factorial{variable}\` [end-line]
                [begin-line]i [index] 12 [parents] [exp] the variable that is being multiplied with \`factorial{variable}\`[end-line]`,
            },
            {
                role: "user",
                content: `
                def factorial(n):
                    if n == 0:
                        return 1
                    else:
                        return n * factorial(n - 1)`,
            },
            {
                role: "assistant",
                content: `
                [begin-line]def [index] 0 [parents] [exp] keyword to define a function [end-line]
                [begin-line]factorial()[index] 1 [parents] [exp] the name of the function being defined [end-line]
                [begin-line]n[index] 2 [parents] 1 [exp] the parameter of the function \`factorial{self-defined-function}\`[end-line]
                [linebreak]
                [begin-line]{indentation}if [index] 3 [parents] [exp] keyword to start an if statement [end-line]
                [begin-line]n == 0 [index] 4 [parents] [exp] the condition of the if statement [end-line]
                [linebreak]
                [begin-line]{indentation}{indentation}return [index] 5 [parents] [exp] keyword to specify the value to return from the function [end-line]
                [begin-line]1 [index] 6 [parents] [exp] the value to return if the condition of the if statement is true [end-line]
                [linebreak]
                [begin-line]{indentation}else [index] 7 [parents] [exp] keyword to start the else block of the if statement [end-line]
                [linebreak]
                [begin-line]{indentation}{indentation}return [index] 8 [parents] [exp] recursive step to return [end-line]
                [begin-line]n * [index] 9 [parents] [exp]the current value of the parameter \`n{variable}\`[end-line]
                [begin-line] factorial() [index] 10 [parents] [exp] a recursive call to the function \`factorial{self-defined-function}\` with the argument \`n - 1{variable}\`[end-line]
                [begin-line] n + 1 [index] 11 [parents]10 [exp] the argument to the recursive call to the function \`factorial{self-defined-function}\`[end-line]`,
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
    index: number;
    code: string;
    explanation: string;
    parent: number | null;
}

interface AnimatedTokensProps {
    tokens: Token[];
}

function convertStringToCodeObject(input: string): AnimatedTokensProps[] {
    const animatedTokens: AnimatedTokensProps[] = [];
    const lines = input.split('[linebreak]');
    
    lines.forEach(line => {
        const blockTokens: Token[] = [];
        const tokens = line.split('[begin-line]');
        tokens.shift(); // Removing first empty string

        tokens.forEach(token => {
            const indexStart = token.indexOf('[index]') + 7;
            const parentsStart = token.indexOf('[parents]') + 9;
            const expStart = token.indexOf('[exp]') + 5;
            const endLineStart = token.indexOf('[end-line]');

            // Extracting data
            const code = token.slice(0, indexStart - 7).trim(); // Up to '[index]'
            const index = parseInt(token.slice(indexStart, parentsStart - 9).trim()); // Between '[index] to [parents]'
            let parentString = token.slice(parentsStart, expStart - 5).trim(); // Between '[parents]' to '[exp]'
            const parent = parentString ? parseInt(parentString) : null; // Parsing parents to number or null if empty
            const explanation = token.slice(expStart, endLineStart).trim(); // Between '[exp]' to '[end-line]'

            blockTokens.push({ index, code, explanation, parent });
        });
        animatedTokens.push({ tokens: blockTokens });
    });
    return animatedTokens;
}




// function convertStringToCodeObject(input: string): AnimatedTokensProps[] {
//     const lines = input.split("[linebreak]").filter(Boolean);
//     const animatedTokens: AnimatedTokensProps[] = lines.map((line) => {
//       const fullline = line.match(/\[full-line\](.*?)\[begin-line\]/s)?.[1].trim() || '';
//       const lineTokens = line.split("[begin-line]").filter(Boolean);
//       let index = 0; 
//       const tokens: Token[] = lineTokens.slice(1).map((lineToken, tokenIndex) => { // Start from the second element
//         const [code, explanation] = lineToken.replace("[end-line]", "").split("[exp]").map((token) => token.trim());
//         index += 1;
//         let currentLevel = getParenthesisCount(fullline, code, getCurrentOccurrence(line, code, tokenIndex));
        
//         return { index, code, explanation, tokenType: `level${currentLevel}` };
//       });
//       return { fullline, tokens };
//     });
//     return animatedTokens;
// }

// function getCurrentOccurrence(inputString: string, targetString: string, index: number): number {
//     const sections = inputString.match(/\[(begin|full)-line\].*?\[end-line\]/g) || [];
//     let targetOccurrence = 0;

//     for(let i = 0; i <= index; i++) {
//         if (i < sections.length && sections[i].includes(targetString)) {
//             targetOccurrence++;
//         }
//     }
  
//     return targetOccurrence;
// }

// function getParenthesisCount(inputString: string, targetString: string, occurrence: number): number {
//     let index = -1;
//     let targetOccurrence = 0;

//     for(let i = 0; i < inputString.length; i++) {
//         //if targetString contains "()"
//         if(targetString.includes("()")){
//             if(inputString.substr(i, targetString.length-1) === targetString.slice(0, -1)) {
//                 targetOccurrence++;
//                 if(targetOccurrence == occurrence) {
//                     let substring = inputString.substring(0, i);
//                     return (substring.match(/\(/g) || []).length;
//                 }
//             }
//         }
//         else{
//             if(inputString.substr(i, targetString.length) === targetString) {
//                 let substring = inputString.substring(0, i);
//                 return (substring.match(/\(/g) || []).length;
//             }
//         }
//     }
//     return 0;
// }

