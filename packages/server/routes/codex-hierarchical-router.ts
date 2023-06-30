import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const hierarchicalRouter = express.Router();
export const hierarchicalCodeToPseudocodeRouter = express.Router();

hierarchicalRouter.post("/codetopseudocode", verifyUser, async (req, res, next) => {
    const { code, context } = req.body;
    const userId = (req.user as IUser)._id;
    // console.log("it called here", code);
    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "given the below python {code}, for each line generate a one-line[pseudocode] snippet with {indentations} and breakdown details for a novice child that is learning to code python for the first time. For each line of the pesudocode, with the correct indentation for each line,  also make sure to breakdown each of the statements, if statement should break into condition and code block, for loop should break into condition and code block, etc. ",
            },
            {
                role: "user",
                content: 
                `user_input = input("Enter a number: ")`,
            },
            {
                role: "system",
                content: 
                `[pseudocode]Ask the user to enter a number and store it in a variable called user_input.[end-pseudocode][line]user_input = input("Enter a number: ")[end-line][end]`,
            },
            {
                role: "user",
                content: 
                `if user_input.isdigit():
                number = int(user_input)
                if number % 2 == 0:
                    print("The number is even.")
                else:
                    print("The number is odd.")`,
            },
            {
                role: "system",
                content:
                `[pseudocode]Check if the user_input is a digit.[end-pseudocode][line]if user_input.isdigit():[end-line]
                [pseudocode]{indentation}Convert it to an integer and store it in a variable called number.[end-pseudocode][line]number = int(user_input)[end-line]
                [pseudocode]{indentation}Check if the number is divisible by 2 (i.e., the remainder of number divided by 2 is 0)[end-pseudocode][line]if number % 2 == 0:[end-line]
                [pseudocode]{indentation}{indentation} print "The number is even."[end-pseudocode][line]print("The number is even.")[end-line]
                [pseudocode]{indentation}Otherwise[end-pseudocode][line]else:[end-line]
                [pseudocode]{indentation}{indentation} print "The number is odd."[end-pseudocode][line]print("The number is odd.")[end-line][end]`,
            },
            {
                role: "user",
                content:
                `def factorial(n):
                if n == 0:
                    return 1
                else:
                    return n * factorial(n - 1)`,
            },
            {
                role: "system",
                content:
                `[pseudocode]Define a function called factorial that takes one argument, n.[end-pseudocode][line]def factorial(n):[end-line]
                [pseudocode]{indentation}Check if n is equal to 0.[end-pseudocode][line]if n == 0:[end-line]
                [pseudocode]{indentation}{indentation}Return 1.[end-pseudocode][line]return 1[end-line]
                [pseudocode]{indentation}Otherwise, calculate the factorial of n by multiplying n with the factorial of n-1.[end-pseudocode][line]else:[end-line]
                [pseudocode]{indentation}{indentation}Return n multiplied by the factorial of n-1.[end-pseudocode][line]return n * factorial(n - 1)[end-line][end]`,
            },
            {
                role: "user",
                content:
                `number = int(input("Enter a number: "))`,
            },
            {
                role: "system",
                content:
                `[pseudocode]Ask the user to enter a number and convert it to an integer.[end-pseudocode][line]number = int(input("Enter a number: ")) [end-line][end]`,
            },
            {
                role: "user",
                content:
                `for i in range(1, num + 1):
                factorial *= i`,
            },
            {
                role: "system",
                content:
                `[pseudocode]For each number i in the range from 1 to num (inclusive), multiply the factorial by i.[end-pseudocode][line]for i in range(1, num + 1):[end-line]
                [pseudocode]{indentation}Multiply the factorial by i.[end-pseudocode][line]factorial *= i[end-line][end]`,
            },
            {
                role: "user",
                content:
                `def my_function(fname):
                print(fname + " Refsnes")`,
            },
            {
                role: "system",
                content:
                `[pseudocode]Define a function called my_function that takes one argument, fname.[end-pseudocode][line]def my_function(fname):[end-line]
                [pseudocode]{indentation}Print the value of fname followed by the string "Refsnes".[end-pseudocode][line]print(fname + " Refsnes") [end-line][end].`,
            },
            
        ];


        messages.push({
            role: "user",
            content: `[code]: ${code}\n[begin]:`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.05,
            max_tokens: 1000,
            stop: ["[end]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;
            //the response should be an object that contains the pseudo and the code line by line
            // [{
            //     pseudo: "pseudo",
            //     code: "code",
            // }, ...]
            console.log(response);
            if(response){
                res.json({
                    response: convertStringToPseudoObject(response),
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


hierarchicalRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "given the provided python {code}, write a hierarchical representation with the first level {title} separate by each line.",
            },
            {
                role: "user",
                content: 
                `user_input = input("Enter a number: ")
                if user_input.isdigit():
                    number = int(user_input)
                    if number % 2 == 0:
                        print("The number is even.")
                    else:
                        print("The number is odd.")`,
            },
            {
                role: "system",
                content: 
                `[begin]{title}User Input{code}user_input = input("Enter a number: "){end-code}
                {title}Conditional Statement Validation{code}if user_input.isdigit():
                    number = int(user_input)
                    if number % 2 == 0:
                        print("The number is even.")
                    else:
                        print("The number is odd."){end-code}[end]`,
            },
            {
                role: "user",
                content: 
                `def factorial(n):
                    if n == 0:
                        return 1
                    else:
                        return n * factorial(n - 1)
                
                number = int(input("Enter a number: "))
                
                result = factorial(number)
                
                print("The factorial of", number, "is:", result)`,
            },
            {
                role: "system",
                content:
                `[begin]{title}Function Definition{code}def factorial(n):
                    if n == 0:
                        return 1
                    else:
                        return n * factorial(n - 1){end-code}
                {title}User Input{code}number = int(input("Enter a number: ")){end-code}
                {title}Function Call{code}result = factorial(number){end-code}
                {title}Print Result{code}print("The factorial of", number, "is:", result){end-code}[end]`,
            },
            {
                role: "user",
                content:
                `num = int(input("Enter a number: "))

                factorial = 1
                
                for i in range(1, num + 1):
                    factorial *= i
                
                print("The factorial of", num, "is", factorial)`,
            },
            {
                role: "system",
                content:
                `[begin]{title}User Input{code}num = int(input("Enter a number: ")){end-code}
                {title}Variable Initialization{code}factorial = 1{end-code}
                {title}Loop to Update Factorial{code}for i in range(1, num + 1):
                    factorial *= i{end-code}
                {title}Print Result{code}print("The factorial of", num, "is", factorial){end-code}[end]`,
            },
            {
                role: "user",
                content:
                `def my_function(fname):
                    print(fname + " Refsnes")
                
                my_function("Emil")
                my_function("Tobias")
                my_function("Linus")`,
            },
            {
                role: "system",
                content:
                `[begin]{title}Function Definition{code}def my_function(fname):
                    print(fname + " Refsnes"){end-code}
                {title}Function Calls{code}my_function("Emil")
                my_function("Tobias")
                my_function("Linus"){end-code}[end]`,
            }
            
        ];


        messages.push({
            role: "user",
            content: `[intended-behavior]: ${description}\n[code]:`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.05,
            max_tokens: 1000,
            stop: ["[end]"],
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

interface CodeRepresentation {
    pseudo: string;
    code: string;
  }
  
  function convertStringToPseudoObject(codeString: string): CodeRepresentation[] {
    const codeLines = codeString.split("[end-line]").filter((line) => line !== "");
    // console.log(codeLines.length);
    
    const codeRepresentation: CodeRepresentation[] = codeLines
    .map((line) => {
        // console.log("line "+line + "end line\n");
        // console.log(line.replace("[pseudocode]", "")
        // .replace("[end-pseudocode]", ""));

        const [pseudo, code] = line
        .replace("[pseudocode]", "")
        .replace("[end-pseudocode]", "")
        .trim()
        .split("[line]");
        // console.log("pseudo "+pseudo, "code "+code);
        return {
            pseudo: pseudo.trim(),
            code: code.trim(),
        };
      
    });
    // console.log(codeRepresentation);
    return codeRepresentation;
  }

  interface FunctionObject {
    title: string;
    code: string;
  }

  function convertStringToCodeObject(input: string): FunctionObject[] {
    const regex = /\{title\}([\s\S]+?)\{code\}([\s\S]+?)(?=\{title\}|$)/g;
    const matches = input.matchAll(regex);
    const objectList: { title: string, code: string }[] = [];
  
    for (const match of matches) {
      const title = match[1].trim();
      let code = match[2].trim();
      code = code.replace("{end-code}", "").trim();
      objectList.push({ title, code });
    }
    return objectList;
  }
  

  
  



