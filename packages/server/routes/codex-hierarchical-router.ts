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
    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "given the below python {code}, for each line generate a one-line[pseudocode] snippet with {indentations} and breakdown details for a novice child that is learning to code python for the first time. For each [line] of the pesudocode, with the correct indentation for each line,  also make sure to breakdown each of the statements, if statement should break into condition and code block, for loop should break into condition and code block, etc. The response must contain [line] in each line and each indentation with {indentation}.",
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
            max_tokens: 2000,
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
            // console.log(response);
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
                    "given the provided python {code}, write a hierarchical representation with the first level {title} separate by each line. ",
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
                `[begin]{title}User Input{code}user_input = input("Enter a number: "){description}allows the program to interact with the user and obtain a number as input for further processing{end-description}{end-code}
                {title}Conditional Statement Validation{code}if user_input.isdigit():
                    number = int(user_input)
                    if number % 2 == 0:
                        print("The number is even.")
                    else:
                        print("The number is odd."){end-code}{description}checks if the user-provided input is a digit, converts it to an integer, and determines whether it is even or odd before printing the corresponding message{end-discription}[end]`,
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
                    return n * factorial(n - 1){description}the factorial function computes the factorial of a number by breaking it down into smaller subproblems and utilizing the recursive nature of the function{end-discription}{end-code}
            {title}User Input{code}number = int(input("Enter a number: ")){description}allows the program to receive user input for a number and stores it as an integer value in the number variable{end-discription}{end-code}
            {title}Function Call{code}result = factorial(number){description}By calling the factorial function with the number as an argument, the code calculates the factorial of that number and stores it in the result variable.{end-discription}{end-code}
            {title}Print Result{code}print("The factorial of", number, "is:", result){end-code}{description}print a message to the console with the format: "The factorial of number is: result", where number and result are replaced with the actual values{end-discription}[end]`,
            },
            // {
            //     role: "user",
            //     content:
            //     `num = int(input("Enter a number: "))

            //     factorial = 1
                
            //     for i in range(1, num + 1):
            //         factorial *= i
                
            //     print("The factorial of", num, "is", factorial)`,
            // },
            // {
            //     role: "system",
            //     content:
            //     `[begin]{title}User Input{code}num = int(input("Enter a number: ")) {description}allows the program to receive user input for a number and stores it as an integer value in the num variable{end-description}{end-code}
            //     {title}Factorial Calculation{code}factorial = 1
                
            //     for i in range(1, num + 1):
            //         factorial *= i {description}calculates the factorial of the number by iterating through a range of numbers from 1 to num (inclusive) and multiplying each number with the factorial variable{end-description}{end-code}
            //     {title}Print Result{code}print("The factorial of", num, "is", factorial) {end-code}{description}prints a message to the console with the format: "The factorial of num is factorial", where num and factorial are replaced with the actual values{end-description}[end]`,
            // },
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
                print(fname + " Refsnes"){description}defines a function called my_function that takes a parameter fname and prints the value of fname followed by "Refsnes"{end-description}{end-code}
            {title}Function Calls{code}my_function("Emil")
            my_function("Tobias")
            my_function("Linus"){description}calls the my_function with different arguments: "Emil", "Tobias", and "Linus"{end-description}{end-code}[end]`,
            },
            {
                role: "user",
                content:
                `sum_even = 0
                for num in range(1, 101):
                    if num % 2 == 0:
                        sum_even += num
                print("The sum of even numbers from 1 to 100 is:", sum_even)`,
            },
            {
                role: "system",
                content:
                `[begin]{title}Variable Initialization{code}sum_even = 0{description}initializes a variable sum_even to 0 to store the sum of even numbers{end-description}{end-code}
                {title}Loop Iteration{code}for num in range(1, 101):
    if num % 2 == 0:
        sum_even += num{description}iterates through numbers from 1 to 100 (inclusive) and checks if each number is even. If it is, the number is added to the sum_even variable{end-description}{end-code}
                {title}Print Result{code}print("The sum of even numbers from 1 to 100 is:", sum_even){end-code}{description}prints a message to the console with the format: "The sum of even numbers from 1 to 100 is: sum_even", where sum_even is replaced with the actual value{end-description}[end]`,
            }
            
        ];


        messages.push({
            role: "user",
            content: `[intended-behavior]: ${description}\n[code]:`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.1,
            max_tokens: 1200,
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
        .split("[end-pseudocode]");

        // console.log("pseudo "+pseudo, "code "+code);
        return {
            pseudo: pseudo.replace("[pseudocode]", "")
            .replace("[end-pseudocode]", "")
            .trim(),
            code: code.replace("[pseudocode]", "")
            .replace("[end-pseudocode]", "").replace("[line]", "")
            .trim(),
        };
      
    });
    // console.log(codeRepresentation);
    return codeRepresentation;
  }

  interface FunctionObject {
    title: string;
    code: string;
    description: string;
  }

  function convertStringToCodeObject(input: string): FunctionObject[] {
    const regex = /\{title\}([\s\S]+?)\{code\}([\s\S]+?)(?=\{title\}|$)/g;
    const matches = input.matchAll(regex);
    const objectList: FunctionObject[] = [];
  
    for (const match of matches) {
      const title = match[1].trim();
      let code = match[2].trim();
      code = code.replace("{end-code}", "").trim();
      
      const descriptionMatch = code.match(/\{description\}([\s\S]+?)\{end-description\}/);
      const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  
      code = code.replace(/\{description\}([\s\S]+?)\{end-description\}/g, '').trim();
      
      objectList.push({ title, code, description });
    }
    
    return objectList;
  }
  
//example:
//   [
//     {
//         "title": "Variable Initialization",
//         "content": {
//             "description": "initialize the variable sum_even to 0, which will be used to store the sum of even numbers",
//             "details": [
//                 {
//                     "pseudo": "Create a variable called sum_even and set it to 0.",
//                     "code": "sum_even = 0"
//                 }
//             ]
//         }
//     },
//     {
//         "title": "Loop through Numbers",
//         "content": {
//             "description": "iterates through the numbers from 1 to 100 (inclusive) using the range function",
//             "details": [
//                 {
//                     "pseudo": "For each number num in the range from 1 to 100 (inclusive), do the following:",
//                     "code": "for num in range(1, 101):"
//                 }
//             ]
//         }
//     },
//     {
//         "title": "Check for Even Numbers",
//         "content": {
//             "description": "checks if the current number (num) is divisible by 2, indicating that it is an even number",
//             "details": [
//                 {
//                     "pseudo": "Check if num is divisible by 2 (i.e., the remainder of num divided by 2 is 0).",
//                     "code": "if num % 2 == 0:"
//                 }
//             ]
//         }
//     },
//     {
//         "title": "Sum Even Numbers",
//         "content": {
//             "description": "if the current number is even, it is added to the sum_even variable",
//             "details": [
//                 {
//                     "pseudo": "Add the value of num to the sum_even variable.",
//                     "code": "sum_even += num"
//                 }
//             ]
//         }
//     },
//     {
//         "title": "Print Result",
//         "content": {
//             "description": "prints the final result, which is the sum of even numbers from 1 to 100, along with a descriptive message",
//             "details": [
//                 {
//                     "pseudo": "Print the message \"The sum of even numbers from 1 to 100 is:\" followed by the value of the variable sum_even.",
//                     "code": "print(\"The sum of even numbers from 1 to 100 is:\", sum_even)"
//                 }
//             ]
//         }
//     }
// ]
  

  
  



