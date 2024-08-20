import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const tracingRouter = express.Router();

tracingRouter.post("/linesToRewrite", verifyUser, async (req, res, next) => {
    const { code, context } = req.body;
    const userId = (req.user as IUser)._id;
    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "given the below instructions, check if the code need to be rewritten for the given user's goal {prompt},  write out the correct implementation of the python code for novice Python learners The format of the print out should be one of the following structures: {old}{new}{old}, {old1}{new}, or {new}{old}, or {new}. No exceptions, there can only be one {new} block. {old} are the part of the logic and code that is correct and do not need to be changed, {new} are the code that are newly generated or fixed. If the {context} are wrong, the fix of the {new} code should still follow the context's logic. The {new} code should be a whole excutable code.",
            },
            {
                role: "user",
                content: 
                `{code}:Write a Python program that generates a Fibonacci sequence of a given length user input n, starting with the initial values 0 and 1.
                {context}:def generate_fibonacci(n):
                    
                
                
    n = int(input("Enter a number: "))
                
    if n <= 2:
                
    else:`,
            },
            {
                role: "assistant",
                content: 
                
`{new}:def generate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        fib = [0, 1]
        while len(fib) < n:
            fib.append(fib[-1] + fib[-2])
        return fib

n = int(input("Enter a number: "))
if n <= 2:
    print(generate_fibonacci(n))
else:
    print("Value too small")[end]`,
            },
            {
                role: "user",
                content: 
`{code}:Write a Python program that generates a Fibonacci sequence of a given length user input n, starting with the initial values 0 and 1.
{context}:n = int(input("Enter the length of the Fibonacci sequence (greater than 2): "))

fibonacci_sequence = [0, 1]



if n < 2:
    print("Please enter a length greater than or equal to 2.")
else:
    print("Fibonacci Sequence of length", n, ":")
    print(fibonacci_sequence)`,
            },
            {
                role: "assistant",
                content:
`{old}:n = int(input("Enter the length of the Fibonacci sequence (greater than 2): "))
{new}:fibonacci_sequence = [0, 1]
for i in range(2, n):
    fibonacci_sequence.append(fibonacci_sequence[i-1] + fibonacci_sequence[i-2])
{old}:if n < 2:
    print("Please enter a length greater than or equal to 2.")
else:
    print("Fibonacci Sequence of length", n, ":")
    print(fibonacci_sequence)[end]`,
            },
            {
                role: "user",
                content:
`{code}:Write a Python program that generates a Fibonacci sequence of a given length user input n, starting with the initial values 0 and 1.
{context}:def generate_fibonacci(n):
    

try:
    n = int(input("Enter the length of the Fibonacci sequence: "))

    if n <= 0:
        print("Please enter a positive integer.")
    else:
        result = generate_fibonacci(n)
        print("Fibonacci Sequence of length", n, ":")
        print(result)

except ValueError:
    print("Invalid input. Please enter a valid positive integer.")`,
            },
            {
                role: "assistant",
                content:
`{new}:def generate_fibonacci(n):
if n <= 0:
    return []
elif n == 1:
    return [0]
elif n == 2:
    return [0, 1]
else:
    fib = [0, 1]
    while len(fib) < n:
        fib.append(fib[-1] + fib[-2])
    return fib
{old}:try:
n = int(input("Enter the length of the Fibonacci sequence: "))

if n <= 0:
    print("Please enter a positive integer.")
else:
    result = generate_fibonacci(n)
    print("Fibonacci Sequence of length", n, ":")
    print(result)

except ValueError:
print("Invalid input. Please enter a valid positive integer.")[end]`,
            },
            {
                role: "user",
                content:
`{code}:Write a program that creates a variable called sum_even will compute the sum of even numbers from 1 to 100 (inclusive), and print the sum. Then, generate the two random values from 1 to the sum_even, and check if both values are odd numbers.
{context}:import random

sum_even = 0

random_value1 = random.randint(1, sum_even)
random_value2 = random.randint(1, sum_even)

# Check if both generated values are odd
if random_value1 % 2 != 0 and random_value2 % 2 != 0:
    print(f"{random_value1} and {random_value2} are both odd numbers.")
else:
    print(f"{random_value1} and {random_value2} are not both odd numbers.")`,
            },
            {
                role: "assistant",
                content:
`{old}:import random
{new}:sum_even = 0
for num in range(1, 101):
    if num % 2 == 0:  # Check if the number is even
        sum_even += num  # Add the even number to the sum


print("Sum of even numbers from 1 to 100:", sum_even)

{old}:random_value1 = random.randint(1, sum_even)
random_value2 = random.randint(1, sum_even)

if random_value1 % 2 != 0 and random_value2 % 2 != 0:
    print(f"{random_value1} and {random_value2} are both odd numbers.")
else:
    print(f"{random_value1} and {random_value2} are not both odd numbers.")[end]`,
            },
            {
                role: "user",
                content:
`{code}:Write a program that creates a variable called sum_even will compute the sum of even numbers from 1 to 100 (inclusive), and print the sum. Then, generate the two random values from 1 to the sum_even, and check if both values are odd numbers.
{context}:import random

sum_even = 0
for num in range(1, 101):
    if num % 2 == 0:  # Check if the number is even
        sum_even += num  # Add the even number to the sum


print("Sum of even numbers from 1 to 100:", sum_even)`,
            },
            {
                role: "assistant",
                content:
`{old}:import random

sum_even = 0
for num in range(1, 101):
    if num % 2 == 0:  # Check if the number is even
        sum_even += num  # Add the even number to the sum


print("Sum of even numbers from 1 to 100:", sum_even)
{new}:random_value1 = random.randint(1, sum_even)
random_value2 = random.randint(1, sum_even)

# Check if both generated values are odd
if random_value1 % 2 != 0 and random_value2 % 2 != 0:
    print(f"{random_value1} and {random_value2} are both odd numbers.")
else:
    print(f"{random_value1} and {random_value2} are not both odd numbers.")[end]`,
            },
            
        ];


        messages.push({
            role: "user",
            content: `{code}: ${code}\n{context}: ${context}`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.05,
            max_tokens: 500,
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

interface CodeObject {
    format: string[],
    codes: string[],
}
  
function convertStringToCodeObject(codeString: string): CodeObject {
    const re = /\{(.+?)\}:(.?[^\{]*)/gs
    const format: string[] = [];
    const codes: string[] = [];
    let match;
    while ((match = re.exec(codeString)) !== null) {
        format.push(match[1]);
        codes.push(match[2].trim());
    }
    return { format, codes };
}

interface  questionObject{
    step: number,
    variable: string,
}

function convertStringToQuestionObject(codeString: string): questionObject[] {
    return codeString
        .split('\n') // split the string into individual parts based on \n
        .map(line => {
            const [stepPart, variablePart] = line.split(','); // split each line into step and variable parts
            const step = Number(stepPart.split(': ')[1]); // extract the number from the step part
            const variable = variablePart.split(': ')[1]; // extract the name from the variable part
            return { step, variable };
        });
}
 

tracingRouter.post("/generateQuestion", verifyUser, async (req, res, next) => {
    const { code, context } = req.body;
    const userId = (req.user as IUser)._id;
    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "Given the code snippet in python, the goal for showing these code is for noive python programmer to understand the changes of variables when tracing the code.  By the given {excutionsteps} and {code},  generate a list of questions {step, variable} regarding the next value for tracing steps. for each question, generate the step number and trace step number. Only ask meaningful questions, for example, changes of object that will change value in each step. ask 2-3 questions per code snippet. Make sure do not include any questions involving the user input or random. ",
            },
            {
                role: "user",
                content: 
`{excutionSteps}:[{"step":1,"currLine":1,"nextLine":14,"printOutput":[],"frame":[]},{"step":2,"currLine":14,"nextLine":15,"printOutput":[],"frame":[{"name":"n","type":"int","value":5}]},{"step":3,"currLine":15,"nextLine":2,"printOutput":[],"frame":[{"name":"n","type":"int","value":5}]},{"step":4,"currLine":2,"nextLine":4,"printOutput":[],"frame":[{"name":"n","type":"int","value":5}]},{"step":5,"currLine":4,"nextLine":6,"printOutput":[],"frame":[{"name":"n","type":"int","value":5}]},{"step":6,"currLine":6,"nextLine":9,"printOutput":[],"frame":[{"name":"n","type":"int","value":5}]},{"step":7,"currLine":9,"nextLine":10,"printOutput":[],"frame":[{"name":"n","type":"int","value":5},{"name":"fib","type":"str","value":[0,1]}]},{"step":8,"currLine":10,"nextLine":11,"printOutput":[],"frame":[{"name":"n","type":"int","value":5},{"name":"fib","type":"str","value":[0,1]}]},{"step":9,"currLine":11,"nextLine":10,"printOutput":[],"frame":[{"name":"n","type":"int","value":5},{"name":"fib","type":"str","value":[0,1,1]}]},{"step":10,"currLine":10,"nextLine":11,"printOutput":[],"frame":[{"name":"n","type":"int","value":5},{"name":"fib","type":"str","value":[0,1,1]}]},{"step":11,"currLine":11,"nextLine":10,"printOutput":[],"frame":[{"name":"n","type":"int","value":5},{"name":"fib","type":"str","value":[0,1,1,2]}]},{"step":12,"currLine":10,"nextLine":11,"printOutput":[],"frame":[{"name":"n","type":"int","value":5},{"name":"fib","type":"str","value":[0,1,1,2]}]},{"step":13,"currLine":11,"nextLine":10,"printOutput":[],"frame":[{"name":"n","type":"int","value":5},{"name":"fib","type":"str","value":[0,1,1,2,3]}]},{"step":14,"currLine":10,"nextLine":12,"printOutput":[],"frame":[{"name":"n","type":"int","value":5},{"name":"fib","type":"str","value":[0,1,1,2,3]}]},{"step":15,"currLine":12,"nextLine":null,"printOutput":[],"frame":[]}]
{code}:
def generate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        fib = [0, 1]
        while len(fib) < n:
            fib.append(fib[-1] + fib[-2])
        return fib
n = int(input("Enter a number: "))
print(generate_fibonacci(n))`,
            },
            {
                role: "assistant",
                content: 
`step: 10,variable: fib
step: 12,variable: fib[end]`,
            },
            {
                role: "user",
                content: 
`{excutionSteps}:[{"step":1,"currLine":1,"nextLine":14,"printOutput":[],"frame":[]},{"step":2,"currLine":14,"nextLine":15,"printOutput":[],"frame":[{"name":"n","type":"int","value":4}]},{"step":3,"currLine":15,"nextLine":2,"printOutput":[],"frame":[{"name":"n","type":"int","value":4}]},{"step":4,"currLine":2,"nextLine":4,"printOutput":[],"frame":[{"name":"n","type":"int","value":4}]},{"step":5,"currLine":4,"nextLine":6,"printOutput":[],"frame":[{"name":"n","type":"int","value":4}]},{"step":6,"currLine":6,"nextLine":9,"printOutput":[],"frame":[{"name":"n","type":"int","value":4}]},{"step":7,"currLine":9,"nextLine":10,"printOutput":[],"frame":[{"name":"n","type":"int","value":4},{"name":"fib","type":"str","value":[0,1]}]},{"step":8,"currLine":10,"nextLine":11,"printOutput":[],"frame":[{"name":"n","type":"int","value":4},{"name":"fib","type":"str","value":[0,1]},{"name":"i","type":"int","value":2}]},{"step":9,"currLine":11,"nextLine":10,"printOutput":[],"frame":[{"name":"n","type":"int","value":4},{"name":"fib","type":"str","value":[0,1,1]},{"name":"i","type":"int","value":2}]},{"step":10,"currLine":10,"nextLine":11,"printOutput":[],"frame":[{"name":"n","type":"int","value":4},{"name":"fib","type":"str","value":[0,1,1]},{"name":"i","type":"int","value":3}]},{"step":11,"currLine":11,"nextLine":10,"printOutput":[],"frame":[{"name":"n","type":"int","value":4},{"name":"fib","type":"str","value":[0,1,1,2]},{"name":"i","type":"int","value":3}]},{"step":12,"currLine":10,"nextLine":12,"printOutput":[],"frame":[{"name":"n","type":"int","value":4},{"name":"fib","type":"str","value":[0,1,1,2]},{"name":"i","type":"int","value":3}]},{"step":13,"currLine":12,"nextLine":null,"printOutput":[],"frame":[]}]
{code}:
def generate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        fib = [0, 1]
        for i in range(2, n):
            fib.append(fib[i-1] + fib[i-2])
        return fib

n = int(input("Enter the length of the Fibonacci sequence: "))
print(generate_fibonacci(n))`,
            },
            {
                role: "assistant",
                content: 
`step: 8,variable: i
step 11, variable: fib[end]`,
            },
            {
                role: "user",
                content: 
`{excutionSteps}:[
    {"step":1,"currLine":1,"nextLine":22,"printOutput":[],"frame":[]},
    {"step":2,"currLine":22,"nextLine":23,"printOutput":[],"frame":[]},
    {"step":3,"currLine":23,"nextLine":3,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]}]},
    {"step":4,"currLine":3,"nextLine":3,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]}]},{"step":5,"currLine":3,"nextLine":3,"printOutput":[],"frame":[{"name":"x","type":"str","value":[1,3]}]},
    {"step":6,"currLine":3,"nextLine":3,"printOutput":[],"frame":[{"name":"x","type":"str","value":[2,6]}]},
    {"step":7,"currLine":3,"nextLine":3,"printOutput":[],"frame":[{"name":"x","type":"str","value":[8,10]}]},
    {"step":8,"currLine":3,"nextLine":6,"printOutput":[],"frame":[{"name":"x","type":"str","value":[15,18]}]},
    {"step":9,"currLine":6,"nextLine":8,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]}]},
    {"step":10,"currLine":8,"nextLine":10,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3]]}]},{"step":11,"currLine":10,"nextLine":13,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3]]},{"name":"current","type":"str","value":[1,3]}]},
    {"step":12,"currLine":13,"nextLine":14,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3]]},{"name":"current","type":"str","value":[1,3]},{"name":"last","type":"str","value":[1,3]}]},
    {"step":13,"currLine":14,"nextLine":8,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3]]},{"name":"current","type":"str","value":[1,3]},{"name":"last","type":"str","value":[1,3]}]},
    {"step":14,"currLine":8,"nextLine":10,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3]]},{"name":"current","type":"str","value":[1,3]},{"name":"last","type":"str","value":[1,3]}]},
    {"step":15,"currLine":10,"nextLine":13,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3]]},{"name":"current","type":"str","value":[2,6]},{"name":"last","type":"str","value":[1,3]}]},
    {"step":16,"currLine":13,"nextLine":14,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3]]},{"name":"current","type":"str","value":[2,6]},{"name":"last","type":"str","value":[1,3]}]},
    {"step":17,"currLine":14,"nextLine":8,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3]]},{"name":"current","type":"str","value":[2,6]},{"name":"last","type":"str","value":[1,3]}]},
    {"step":18,"currLine":8,"nextLine":10,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3],[8,10]]},{"name":"current","type":"str","value":[2,6]},{"name":"last","type":"str","value":[1,3]}]},
    {"step":19,"currLine":10,"nextLine":13,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3],[8,10]]},{"name":"current","type":"str","value":[8,10]},{"name":"last","type":"str","value":[1,3]}]},{"step":20,"currLine":13,"nextLine":17,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3],[8,10]]},{"name":"current","type":"str","value":[8,10]},{"name":"last","type":"str","value":[1,3]}]},{"step":21,"currLine":17,"nextLine":8,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3],[8,10]]},{"name":"current","type":"str","value":[8,10]},{"name":"last","type":"str","value":[1,3]}]},{"step":22,"currLine":8,"nextLine":19,"printOutput":[],"frame":[{"name":"intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"sorted_intervals","type":"str","value":[[1,3],[2,6],[8,10],[15,18]]},{"name":"merged","type":"str","value":[[1,3],[8,10],[15,18]]},{"name":"current","type":"str","value":[8,10]},{"name":"last","type":"str","value":[1,6]}]},{"step":23,"currLine":19,"nextLine":null,"printOutput":[],"frame":[]}
]
{code}:
def merge_intervals(intervals):
    # Sort the intervals by their starting values
    sorted_intervals = sorted(intervals, key=lambda x: x[0])

    # Initialize the merged list with the first interval
    merged = [sorted_intervals[0]]

    for current in sorted_intervals:
        # Get the last interval in the merged list
        last = merged[-1]

        # If the current interval overlaps with the last interval, merge them
        if current[0] <= last[1]:
            merged[-1] = (last[0], max(last[1], current[1]))
        else:
            # Otherwise, add the current interval to the merged list
            merged.append(current)

    return merged

intervals = [(1, 3), (2, 6), (8, 10), (15, 18)]
print(merge_intervals(intervals))  # Output: [(1, 6), (8, 10), (15, 18)]`,
            },
            {
                role: "assistant",
                content: 
`step: 9, variable: sorted_intervals
step: 11, variable: current
step: 18, variable: merged[end]`,
            },
            
        ];


        messages.push({
            role: "user",
            content: `{excutionSteps}: ${context}\n{code}: ${code}`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-16k",
            messages,
            temperature: 0.1,
            max_tokens: 256,
            stop: ["[end]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;

            if(response){
                // console.log(convertStringToQuestionObject(response));
                res.json({
                    response: convertStringToQuestionObject(response),
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

tracingRouter.post("/generateFeedback", verifyUser, async (req, res, next) => {
    const { codeBlock, currentFrames, variableName, userAnswer, solution, numberOfAttempts, previousResponses } = req.body;
    const userId = (req.user as IUser)._id;
    if (codeBlock !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    `You are an AI assistant that helps users understand programming concepts. Below is the context for the variable at hand.\
                    Current Frame:\
                    This is the current state of the program just before the given code block is executed. It includes the values of all relevant variables.\
                    {currentFrame}\
                    Code Block to be executed:\
                    This is the code block that will be executed. It is a snippet that will modify or affect one or more variables. Pay attention to what this code is meant to do.\
                    {codeBlock}\
                    User Answer:\
                    This is the user's answer to what the value of the specified variable will be after the code block is executed. The user's answer is incorrect.\
                    {userAnswer}\
                    Correct Solution:\
                    This is the actual correct value of the specified variable after the code block is executed.\
                    {solution}\
                    Variable Name to Track:\
                    This is the name of the variable whose value is being tracked after the code block is executed.\
                    {variableName}\
                    Number of Incorrect Attempts:\
                    This is the number of times the user has given an incorrect answer to this question.\
                    {numberOfAttempts}\
                    Previous Responses:\
                    These are the responses of the user from previous attempts. You should consider these responses to provide better and more specific feedback.\
                    {previousResponses}\
                    Given this information and the number of attempts made by the user, provide <less than 20 words> feedback on why the userAnswer is incorrect and suggest how they can find the correct solution. The feedback should increase in engagement level according to the number of attempts, and should not focus too much on disparities in data types (e.g., string vs. integer).`,
            },
            
        ];


        messages.push({
            role: "user",
            content: `{currentFrame}: ${currentFrames}\n{codeBlock}: ${codeBlock}\n\n{variableName}: ${variableName}{userAnswer}: ${userAnswer}\n{solution}: ${solution}\n{numberOfAttempts}: ${numberOfAttempts}\n{previousResponses}: ${previousResponses}`,
        });


        const result = await openai.createChatCompletion({
            model: "gpt-4o-mini",
            messages,
            temperature: 1,
            max_tokens: 256,
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;

            if(response){
                res.json({
                    feedback: response,
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


tracingRouter.post("/generateHint", verifyUser, async (req, res, next) => {
    const { prevCode, currCode, currentFrames, correct, target, answer } = req.body;
    const userId = (req.user as IUser)._id;
    if (currCode !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "Base on the given line of the {code}, the current status of {currentFrames}, the {currentFrames} are the correct value at this step, and {correct} is the correct value for {target} in this step. the user's prediction for the {target} frame is {answer} is wrong, give out one line of hints that help novice python program to answer correctly.   Only focus on the {target}, do not talk about other variables. The correct answer for {target} is {correct}. The hint should not contain the correct answer. Be sure to check the {answer}'s data type as well as the value, if the value is correct but data type is wrong, still show corrresponding hint.",
            },
            {
                role: "user",
                content: 
`{prevcode}:sorted_intervals = sorted(intervals, key=lambda x: x[0])
{currCode}:merged = [sorted_intervals[0]]
{currentFrames}: '[{"name": "intervals", "type": "str", "value": [[1, 3], [2, 6], [8, 10], [15, 18]]}]'
{correct}: [[1,3],[2,6],[8,10],[15,18]]
{target}: sorted_interval
{answer}: [1,2,3,6,8,10,15,18]`,
            },
            {
                role: "assistant",
                content: 
`The \`sorted_intervals\` list should contain the sorted intervals based on the first element of each interval. Make sure you are correctly using the \`key\` parameter in the \`sorted()\` function to specify the sorting criteria.[end]`,
            },
            {
                role: "user",
                content: 
`{prevCode}:
while len(fib) < n:
{currCode}
    fib.append(fib[-1] + fib[-2])
{currentFrames}: [{"name": "n", "type": "int", "value": 5}, {"name": "fib", "type": "str", "value": [0, 1]}]
{correct}:[0,1,1]
{target}: 'fib'
{answer}:[0,1,2]`,
            },
            {
                role: "assistant",
                content: 
`The \`fib\` list should continue to grow until its length reaches \`n\`. Make sure you are correctly updating the \`fib\` list by appending the sum of the last two elements. In this case, the last two elements are 0 and 1, so the next value should be the sum of these two.[end]`,
            },
            {
                role: "user",
                content: 
`{prevCode}:
while len(fib) < n:
{currCode}
    fib.append(fib[-1] + fib[-2])
{currentFrames}: [{"name": "n", "type": "int", "value": 5}, {"name": "fib", "type": "str", "value": [0, 1, 1,2]}]
{correct}:[0,1,1,2,3]
{target}: 'fib'
{answer}:0,1,1,2,3`,
            },
            {
                role: "assistant",
                content: 
`The new element should be appended to the \`fib\` list within square brackets to indicate that it is a list and not individual numbers. Make sure the next element you append is the sum of the previous two elements in the sequence and encased within [].[end]`,
            },

            
        ];


        messages.push({
            role: "user",
            content: `{prevCode}: ${prevCode}\n{currCode}: ${currCode}\n{currentFrames}: ${currentFrames}\n{correct}:${correct}\n{target}:${target}\n{answer}: ${answer}`,
        });

        const result = await openai.createChatCompletion({
            model: "gpt-4-1106-preview",
            messages,
            temperature: 1,
            max_tokens: 256,
            stop: ["[end]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const response = result.data.choices[0].message?.content;

            if(response){
                res.json({
                    response: response,
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

tracingRouter.post("/feedbackFromTracingShortAnswer", verifyUser, async (req, res, next) => {
    const { code, studentSolution, aiGeneratedSolution, question } = req.body;
    const userId = (req.user as IUser)._id;
    if (studentSolution !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content: `The student has been given the provided [code] that certain lines in it have been highlighted. The student has been asked a [question] about these lines. And the student has answered [student-solution]. See if their answer makes sense based on the provided [code], you can also take a look at the AI-generated solution [ai-generated-solution]. The goal is to make sure the student is understanding these highlighted lines correctly and providing a good explanation to the [question]. There is no need for ther [student-solution] to be exactly the same as the [ai-generated-solution]. The student can be creative and provide a different but correct answer.
                
                Please return a JSON object with the following format:
                {
                    "correctness": <0-5>, // 0 means completely wrong, 5 means the student has answered perfectly with a lot of detail.
                    "feedback": "<20-30 word of explanation about what the student got correctly and what they are missing in their answer.>"
                }`,
              },
        ];
  
        messages.push({
          role: "user",
          content: `[code]: ${code}\n
          [student-solution]: ${studentSolution}\n[ai-generated-solution]: ${aiGeneratedSolution}\n[question]: ${question}`,
      });
  
      const result = await openai.createChatCompletion({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.25,
          max_tokens: 256,
          user: userId,
      });
  
      if (result.data.choices && result.data.choices?.length > 0) {
          const response = result.data.choices[0].message?.content;
  
          if(response){
              res.json({
                  response: parseResponse(response),
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
  
  function parseResponse(response: string): any {
    // console.log(response);
    return JSON.parse(response);
}






  
  
  



