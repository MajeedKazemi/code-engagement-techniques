import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const verifyRouter = express.Router();

verifyRouter.post("/generateIssue", verifyUser, async (req, res, next) => {
    const { code, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (code !== undefined) {
        let messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "Purposefully add some logical issues to the {code} so that the noivce python programmers needs to fix it. Some potential logical issues to fix are: Incorrect Loop Conditions, Wrong Variable Assignments, Incorrect Function Arguments, Misuse of Data Structures, Incorrect Boolean Logic.  For each of the {code} snippet, only generate 2 issues. The newly generated code should not involve any comments. Do not generate The [/code] tag, and make sure the generated line number with logical issue are corresponding to the {code}. The format of the output should be: [logical issue type]{line number}, [logical issue type]{line number}, [code]: {code snippet}[end], the code's line number starts from 1, empty lines should also be count as a line",
            },
            {
                role: "user",
                content: 
`import random

sum_even = 0
for num in range(1, 101):
    if num % 2 == 0:
        sum_even += num

print("Sum of even numbers from 1 to 100:", sum_even)

random_value1 = random.randint(1, sum_even)
random_value2 = random.randint(1, sum_even)

if random_value1 % 2 == 1 and random_value2 % 2 == 1:
    print(f"{random_value1} and {random_value2} are both odd numbers.")
else:
    print(f"{random_value1} and {random_value2} do not satisfy the condition of being both odd numbers.")`,
            },
            {
                role: "assistant",
                content: 
`[Incorrect Loop Conditions]{4}
[Incorrect Boolean Logic]{13}
[code]:
import random

sum_even = 0
for num in range(1, 50):
    if num % 2 == 0:
        sum_even += num

print("Sum of even numbers from 1 to 100:", sum_even)

random_value1 = random.randint(1, sum_even)
random_value2 = random.randint(1, sum_even)

if random_value1 % 2 == 0 and random_value2 % 2 == 0:
    print(f"{random_value1} and {random_value2} are both odd numbers.")
else:
    print(f"{random_value1} and {random_value2} do not satisfy the condition of being both odd numbers.")[end]`,
            },
            {
                role: "user",
                content: 
`n = int(input("Enter the length of the Fibonacci sequence: "))

fibonacci_sequence = [0, 1]
while len(fibonacci_sequence) < n:
    next_number = fibonacci_sequence[-1] + fibonacci_sequence[-2]
    fibonacci_sequence.append(next_number)

print("Fibonacci sequence of length", n, "is:")
print(fibonacci_sequence)`,
            },
            {
                role: "assistant",
                content: 
`[Wrong Variable Assignments]{5}
[Incorrect Loop Conditions]{4}
[code]:
n = int(input("Enter the length of the Fibonacci sequence: "))

fibonacci_sequence = [0, 1]
while len(fibonacci_sequence) <= n:
    next_number = fibonacci_sequence[-2] + fibonacci_sequence[-3]
    fibonacci_sequence.append(next_number)

print("Fibonacci sequence of length", n, "is:")
print(fibonacci_sequence)[end]`,
            },
//             {
//                 role: "user",
//                 content: 
// `def merge_intervals(intervals):
// if not intervals:
//     return []

// sorted_intervals = sorted(intervals, key=lambda x: x[0])

// merged_intervals = [sorted_intervals[0]]

// for interval in sorted_intervals[1:]:
//     current_interval = merged_intervals[-1]

//     if interval[0] <= current_interval[1]:
//         current_interval = (current_interval[0], max(interval[1], current_interval[1]))
//         merged_intervals[-1] = current_interval
//     else:
//         merged_intervals.append(interval)

// return merged_intervals

// intervals = [(1, 3), (2, 6), (8, 10), (15, 18)]
// result = merge_intervals(intervals)
// print(result)  # Output: [(1, 6), (8, 10), (15, 18)]`,
//             },
//             {
//                 role: "assistant",
//                 content: 
// `[Misuse of Data Structures]{10}
// [Incorrect Function Arguments]{7}
// [code]:
// def merge_intervals(intervals):
//     if not intervals:
//         return []

//     sorted_intervals = sorted(intervals, key=lambda x: x[1])

//     merged_intervals = [sorted_intervals[0]]

//     for interval in sorted_intervals[1:]:
//         current_interval = merged_intervals[-1]

//         if interval[0] <= current_interval[1]:
//             current_interval = [current_interval[0], max(interval[1], current_interval[1])]
//             merged_intervals[-1] = current_interval
//         else:
//             merged_intervals.append(interval)

//     return merged_intervals

// intervals = [(1, 3), (2, 6), (8, 10), (15, 18)]
// result = merge_intervals(intervals)
// print(result)  # Output: [(1, 6), (8, 10), (15, 18)][end]`,
//             },
        ];

        messages.push({
            role: "user",
            content: `${code}`,
        });


        const result = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0.01,
            max_tokens: 800,
            stop: ["[end]"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            // const questions = result.data.choices[0].message?.content;
            const questions = 
`[Incorrect Function Arguments]{1}
[Wrong Variable Assignments]{2}
[code]:
n = str(input("Enter the length of the Fibonacci sequence: "))
a, b = 1, 0
for i in range(n):
    print(a)
    a, b = b, a + b`;
            console.log(questions);
            if(questions){
                const resultArray = convertStringToInterface(questions, code);
                res.json({
                    result: resultArray,
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

interface QuestionInterface {
    type: string;
    line: number;
    content: string;
}

interface IssueCodeInterface {
    question1: QuestionInterface;
    question2: QuestionInterface;
    issueCode: string;
}

function convertStringToInterface(questions: string, code: string): IssueCodeInterface {
    const question1TypeStart = questions.indexOf('[');
    const question1TypeEnd = questions.indexOf(']');
    const lineNumRegex = /\{(\d+)\}/g;
    const matches = questions.match(lineNumRegex);
    const lineNum1 = parseInt(matches![0].replace('{', '').replace('}', ''));
    const lineNum2 = parseInt(matches![1].replace('{', '').replace('}', ''));

    const question1 = {
        type: questions.substring(question1TypeStart + 1, question1TypeEnd),
        line: lineNum1,
        content: code.split("\n")[lineNum1-1].trim()
    };


    const question2TypeStart = questions.indexOf('[', question1TypeEnd + 1);
    const question2TypeEnd = questions.indexOf(']', question2TypeStart + 1);

    const question2 = {
        type: questions.substring(question2TypeStart + 1, question2TypeEnd),
        line: lineNum2,
        content: code.split("\n")[lineNum2-1].trim()
    };


    const issueCodeStart = questions.indexOf(']:', question2TypeEnd + 1) + 3;
    const issueCode = questions.substring(issueCodeStart).trim();


    return {
        question1: question1,
        question2: question2,
        issueCode: issueCode
    };
}





