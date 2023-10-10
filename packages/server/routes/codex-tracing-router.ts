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
                role: "system",
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
                role: "system",
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
                role: "system",
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
                role: "system",
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
                role: "system",
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


  
  
  



