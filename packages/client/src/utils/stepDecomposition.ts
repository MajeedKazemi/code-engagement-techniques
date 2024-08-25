//define type
type StepDecomposition = {
    important_parts: ImportantPart[]
}

type ImportantPart = {
    description: string,
    lines: {
        begin: number,
        end: number
    },
    important_variables: string[]
}

const warmupDecomp1 = {
    "important_parts": [
        {
            "description": "Function definition and initialization of reversed_list and stack",
            "lines": {
                "begin": 1,
                "end": 3
            },
            "important_variables": ["input_list", "reversed_list", "stack"]
        },
        {
            "description": "While loop to pop elements from stack and append to reversed_list",
            "lines": {
                "begin": 4,
                "end": 5
            },
            "important_variables": ["stack", "reversed_list"]
        },
        {
            "description": "Return the reversed list",
            "lines": {
                "begin": 6,
                "end": 6
            },
            "important_variables": ["reversed_list"]
        }
    ]
}
const warmupDecomp2 = {}
const warmupDecomp3 = {}
const taskDecomp1 = {
    "important_parts": [
        {
            "description": "Function definition and initialization of variables",
            "lines": {
                "begin": 1,
                "end": 4
            },
            "important_variables": ["pattern", "dna_chars", "q", "result"]
        },
        {
            "description": "Main while loop that processes the queue",
            "lines": {
                "begin": 5,
                "end": 15
            },
            "important_variables": ["q", "seq", "result"]
        },
        {
            "description": "Conditional to check if the sequence length matches the pattern length",
            "lines": {
                "begin": 7,
                "end": 8
            },
            "important_variables": ["seq", "result"]
        },
        {
            "description": "Conditional to check if the current character in the pattern is a wildcard",
            "lines": {
                "begin": 10,
                "end": 12
            },
            "important_variables": ["pattern", "seq", "dna_chars", "q"]
        },
        {
            "description": "Else block to handle non-wildcard characters in the pattern",
            "lines": {
                "begin": 13,
                "end": 14
            },
            "important_variables": ["pattern", "seq", "q"]
        }
    ]
}

const taskDecomp2 = {
    "important_parts": [
        {
            "description": "Function definition and initialization of variables",
            "lines": {
                "begin": 1,
                "end": 3
            },
            "important_variables": ["n", "m", "q", "result"]
        },
        {
            "description": "Main loop that processes the queue",
            "lines": {
                "begin": 4,
                "end": 8
            },
            "important_variables": ["q", "result", "s", "opens", "closes", "max_d", "cur_d"]
        },
        {
            "description": "Conditional block to add open parenthesis",
            "lines": {
                "begin": 10,
                "end": 12
            },
            "important_variables": ["q", "s", "opens", "closes", "max_d", "cur_d", "new_max_d"]
        },
        {
            "description": "Conditional block to add close parenthesis",
            "lines": {
                "begin": 13,
                "end": 14
            },
            "important_variables": ["q", "s", "opens", "closes", "max_d", "cur_d"]
        },
        {
            "description": "Return the result",
            "lines": {
                "begin": 15,
                "end": 15
            },
            "important_variables": ["result"]
        }
    ]
}

const taskDecomp3 = {
    "important_parts": [
        {
            "description": "Function definition and initialization of variables",
            "lines": {
                "begin": 1,
                "end": 4
            },
            "important_variables": ["s", "map", "stack", "max_length"]
        },
        {
            "description": "Loop through each character in the string",
            "lines": {
                "begin": 5,
                "end": 6
            },
            "important_variables": ["i", "char"]
        },
        {
            "description": "Check if the character is an opening bracket and append its index to the stack",
            "lines": {
                "begin": 7,
                "end": 8
            },
            "important_variables": ["char", "stack"]
        },
        {
            "description": "Check if the character is a closing bracket and perform operations accordingly",
            "lines": {
                "begin": 9,
                "end": 17
            },
            "important_variables": ["char", "stack", "not_empty", "last_is_open", "is_match", "max_length"]
        },
        {
            "description": "Return the maximum length of valid brackets",
            "lines": {
                "begin": 18,
                "end": 19
            },
            "important_variables": ["max_length"]
        }
    ]
}
const taskDecomp4 = {
    "important_parts": [
        {
            "description": "Function definition and initialization of variables",
            "lines": {
                "begin": 1,
                "end": 4
            },
            "important_variables": ["s", "stack", "current_string", "current_num"]
        },
        {
            "description": "Loop through each character in the string",
            "lines": {
                "begin": 5,
                "end": 17
            },
            "important_variables": ["char", "current_num", "current_string", "stack", "last_string", "num"]
        },
        {
            "description": "Handling digit characters to form the current number",
            "lines": {
                "begin": 6,
                "end": 7
            },
            "important_variables": ["char", "current_num"]
        },
        {
            "description": "Handling '[' character to push current string and number to stack",
            "lines": {
                "begin": 8,
                "end": 11
            },
            "important_variables": ["char", "current_string", "current_num", "stack"]
        },
        {
            "description": "Handling ']' character to pop from stack and form new current string",
            "lines": {
                "begin": 12,
                "end": 14
            },
            "important_variables": ["char", "current_string", "stack", "last_string", "num"]
        },
        {
            "description": "Handling regular characters to append to current string",
            "lines": {
                "begin": 15,
                "end": 16
            },
            "important_variables": ["char", "current_string"]
        },
        {
            "description": "Return the final decoded string",
            "lines": {
                "begin": 17,
                "end": 17
            },
            "important_variables": ["current_string"]
        }
    ]
}
const taskDecomp5 = {
    "important_parts": [
        {
            "description": "Function definition and initialization of variables `dq` and `char_count`.",
            "lines": {
                "begin": 1,
                "end": 3
            },
            "important_variables": ["s", "k", "dq", "char_count"]
        },
        {
            "description": "Loop through each character in the string `s`, append to `dq`, and update `char_count`.",
            "lines": {
                "begin": 4,
                "end": 6
            },
            "important_variables": ["char", "dq", "char_count"]
        },
        {
            "description": "While loop to remove characters from `dq` if their count is not equal to `k`.",
            "lines": {
                "begin": 7,
                "end": 8
            },
            "important_variables": ["dq", "char_count"]
        },
        {
            "description": "Check if the first character in `dq` has a count equal to `k` and return it.",
            "lines": {
                "begin": 9,
                "end": 10
            },
            "important_variables": ["dq", "char_count"]
        },
        {
            "description": "Return an empty string if no character meets the condition.",
            "lines": {
                "begin": 11,
                "end": 11
            },
            "important_variables": []
        },
        {
            "description": "Function call with example input.",
            "lines": {
                "begin": 12,
                "end": 12
            },
            "important_variables": ["s", "k"]
        }
    ]
}
const taskDecomp6 = {
    "important_parts": [
        {
            "description": "Function definition and initialization of deque and result list",
            "lines": {
                "begin": 1,
                "end": 3
            },
            "important_variables": ["dq", "result"]
        },
        {
            "description": "Main loop iterating over the nums list with index and value",
            "lines": {
                "begin": 4,
                "end": 12
            },
            "important_variables": ["i", "n", "dq", "result"]
        },
        {
            "description": "Condition to remove elements outside the current window",
            "lines": {
                "begin": 5,
                "end": 6
            },
            "important_variables": ["dq", "i", "k"]
        },
        {
            "description": "Inner loop to maintain elements in deque in decreasing order",
            "lines": {
                "begin": 7,
                "end": 8
            },
            "important_variables": ["dq", "n", "nums"]
        },
        {
            "description": "Append current index to deque",
            "lines": {
                "begin": 9,
                "end": 9
            },
            "important_variables": ["dq", "i"]
        },
        {
            "description": "Condition to append the maximum of the current window to result",
            "lines": {
                "begin": 10,
                "end": 11
            },
            "important_variables": ["i", "k", "dq", "result", "nums"]
        },
        {
            "description": "Return the result list",
            "lines": {
                "begin": 12,
                "end": 12
            },
            "important_variables": ["result"]
        }
    ]
}


const warmupQuestion2: newQuestionObject[] = [
    {
      "step": 4,
      "begin-line": 3,
      "end-line": 3,
      "question-about-purpose-of-code": "Why is the 'stack' variable initialized with a copy of 'input_list'?",
      "answer": "The 'stack' is initialized with a copy of 'input_list' to prevent modifying the original list and to use stack operations for reversal.",
      "top-two-variables": [
        "stack",
        "input_list"
      ]
    },
    {
      "step": 5,
      "begin-line": 4,
      "end-line": 5,
      "question-about-purpose-of-code": "What is the role of the while loop in the function?",
      "answer": "The while loop pops elements from the 'stack' and appends them to 'reversed_list', effectively reversing the order of the elements.",
      "top-two-variables": [
        "stack",
        "reversed_list"
      ]
    }
  ]

const warmupQuestion1: newQuestionObject[] = [
    {
        "step": 3,
        "begin-line": 2,
        "end-line": 2,
        "question-about-purpose-of-code": "Why is the queue initialized with a copy of the input list on line 3?",
        "answer": "The queue is initialized with a copy of the input list to prevent modification of the original list and to provide a source of elements for the loop's operation.",
        "top-two-variables": ["queue"]
    },
    {
        "step": 5,
        "begin-line": 4,
        "end-line": 5,
        "question-about-purpose-of-code": "What is the role of the while loop in the function reverse_list_with_queue?",
        "answer": "The while loop processes each element in the queue and inserts it at the beginning of the reversed list, thus reversing the order of elements.",
        "top-two-variables": ["queue", "reversed_list"]
    }
]

// const warmupQuestion1: questionObject[] = [
//     {
//         "step": 4,
//         "question": "stack",
//         "begin-line": 4,
//         "end-line": 5,
//         "explanation": "How does the initialization of the stack variable at the beginning of the loop prepare for the subsequent operations?",
//         "aiGeneratedSolution": "The stack is initialized as an empty list to store opening parentheses, which will be used to check for balanced parentheses."
//     },
//     {
//         "step": 9,
//         "question": "stack",
//         "begin-line": 7,
//         "end-line": 9,
//         "explanation": "How does the stack change when a closing parenthesis ')' is encountered, and what conditions are checked?",
//         "aiGeneratedSolution": "When a closing parenthesis ')' is encountered, the code checks if the stack is empty or if the top of the stack is not '('. If either condition is true, it returns False; otherwise, it pops the stack."
//     }
// ];

const warmupQuestion3: newQuestionObject[] = [
    {
        "step": 5,
        "begin-line": 4,
        "end-line": 4,
        "question-about-purpose-of-code": "What is the purpose of the if statement on line 4?",
        "answer": "It checks if the first and last characters of the list are equal, which is the core logic for palindrome validation.",
        "top-two-variables": ["dq"]
    },
    {
        "step": 7,
        "begin-line": 4,
        "end-line": 4,
        "question-about-purpose-of-code": null,
        "answer": null,
        "top-two-variables": ["dq"]
    },
    {
        "step": 9,
        "begin-line": 6,
        "end-line": 6,
        "question-about-purpose-of-code": null,
        "answer": null,
        "top-two-variables": ["dq"]
    }
]

// const taskQuestion1: questionObject[] = [
//     {
//         "step": 6,
//         "question": "q",
//         "begin-line": 5,
//         "end-line": 6,
//         "explanation": "How does the initialization of the queue 'q' with an empty string and the while loop condition impact the generation of DNA sequences?",
//         "aiGeneratedSolution": "The queue 'q' starts with an empty string, and the while loop continues until 'q' is empty, ensuring all possible sequences are generated."
//     },
//     {
//         "step": 14,
//         "question": "q",
//         "begin-line": 11,
//         "end-line": 12,
//         "explanation": "What is the role of appending new sequences to 'q' when the current character in 'pattern' is a wildcard '*'?",
//         "aiGeneratedSolution": "Appending sequences with each DNA character when encountering '*' ensures all possible combinations are explored."
//     },
//     {
//         "step": 26,
//         "question": "q",
//         "begin-line": 7,
//         "end-line": 10,
//         "explanation": "How does the code handle the case when the current character in 'pattern' is not a wildcard '*'?",
//         "aiGeneratedSolution": "The code appends the current character to 'seq' and adds it to 'q', ensuring the sequence follows the given pattern."
//     },
//     {
//         "step": 48,
//         "question": "result",
//         "begin-line": 7,
//         "end-line": 8,
//         "explanation": "What happens when a sequence reaches the same length as the 'pattern'?",
//         "aiGeneratedSolution": "When a sequence matches the pattern's length, it is added to 'result', collecting all valid DNA sequences."
//     }
// ];

const taskQuestion1: newQuestionObject[] = [
    {
        "step": 6,
        "begin-line": 5,
        "end-line": 5,
        "question-about-purpose-of-code": "What is the purpose of line 5 that pops the first element from the queue and unpacks it into multiple variables?",
        "answer": "This line retrieves the next state to process from the queue 'q' and unpacks it into the variables 's', 'opens', 'closes', 'max_d', and 'cur_d'.",
        "top-two-variables": [
          "q",
          "s"
        ]
    },
    {
      "step": 16,
      "begin-line": 9,
      "end-line": 12,
      "question-about-purpose-of-code": "What is the purpose of the code block from lines 9 to 12 that checks the condition 'if opens < n' and updates 'q' and 'new_max_d'?",
      "answer": "This block handles the case when an opening parenthesis can be added. It updates the queue 'q' with the new state after adding an opening parenthesis and updating the maximum depth 'new_max_d'.",
      "top-two-variables": [
        "q",
        "new_max_d"
      ]
    },
    {   
        "step": 32,
        "begin-line": 10,
        "end-line": 10,
        "question-about-purpose-of-code": "What is the purpose of line 10 that calculates the new maximum depth 'new_max_d' when adding an opening parenthesis?",
        "answer": "This line calculates the new maximum depth if an opening parenthesis is added to the current state, which is used to check if the depth restriction is met.",
        "top-two-variables": [
          "new_max_d",
          "cur_d"
        ]
      },
      {
        "step": 46,
        "begin-line": 13,
        "end-line": 14,
        "question-about-purpose-of-code": "What is the purpose of the code block from lines 13 to 14 that checks the condition 'if closes < opens and max_d <= d' and updates 'q'?",
        "answer": "This block handles the case when a closing parenthesis can be added. It updates the queue 'q' with the new state after adding a closing parenthesis and updating the current depth 'cur_d'.",
        "top-two-variables": [
          "q",
          "closes"
        ]
      },
      {
        "step": 54,
        "begin-line": 6,
        "end-line": 7,
        "question-about-purpose-of-code": "What is the purpose of the code block from lines 6 to 7 that checks the condition 'if opens == n and closes == n' and updates 'result'?",
        "answer": "This block checks if the current state represents a valid combination of parentheses (i.e., it has 'n' opening and closing parentheses) and if so, adds it to the result list.",
        "top-two-variables": [
          "result",
          "s"
        ]
      },
      {
        "step": 80,
        "begin-line": 9,
        "end-line": 12,
        "question-about-purpose-of-code": null,
        "answer": null,
        "top-two-variables": [
          "q",
          "new_max_d"
        ]
      },
      {
        "step": 105,
        "begin-line": 13,
        "end-line": 14,
        "question-about-purpose-of-code": null,
        "answer": null,
        "top-two-variables": [
          "q",
          "closes"
        ]
      },


]

// const taskQuestion1: newQuestionObject[] = [
//     {
//         "step": 6,
//         "begin-line": 5,
//         "end-line": 5,
//         "question-about-purpose-of-code": "What is the purpose of line 5 that pops the first element from the queue and unpacks it into multiple variables?",
//         "answer": "This line retrieves the next state to process from the queue 'q' and unpacks it into the variables 's', 'opens', 'closes', 'max_d', and 'cur_d'.",
//         "top-two-variables": [
//           "q",
//           "s"
//         ]
//     },
//     {
//       "step": 8,
//       "begin-line": 9,
//       "end-line": 12,
//       "question-about-purpose-of-code": "What is the purpose of the code block from lines 9 to 12 that checks the condition 'if opens < n' and updates 'q' and 'new_max_d'?",
//       "answer": "This block handles the case when an opening parenthesis can be added. It updates the queue 'q' with the new state after adding an opening parenthesis and updating the maximum depth 'new_max_d'.",
//       "top-two-variables": [
//         "q",
//         "new_max_d"
//       ]
//     },
//     {
//         "step": 9,
//         "begin-line": 10,
//         "end-line": 10,
//         "question-about-purpose-of-code": "What is the purpose of line 10 that calculates the new maximum depth 'new_max_d' when adding an opening parenthesis?",
//         "answer": "This line calculates the new maximum depth if an opening parenthesis is added to the current state, which is used to check if the depth restriction is met.",
//         "top-two-variables": [
//           "new_max_d",
//           "cur_d"
//         ]
//     },
//     {
//       "step": 24,
//       "begin-line": 13,
//       "end-line": 14,
//       "question-about-purpose-of-code": "What is the purpose of the code block from lines 13 to 14 that checks the condition 'if closes < opens and max_d <= d' and updates 'q'?",
//       "answer": "This block handles the case when a closing parenthesis can be added. It updates the queue 'q' with the new state after adding a closing parenthesis and updating the current depth 'cur_d'.",
//       "top-two-variables": [
//         "q",
//         "closes"
//       ]
//     },
//     {
//       "step": 47,
//       "begin-line": 6,
//       "end-line": 7,
//       "question-about-purpose-of-code": "What is the purpose of the code block from lines 6 to 7 that checks the condition 'if opens == n and closes == n' and updates 'result'?",
//       "answer": "This block checks if the current state represents a valid combination of parentheses (i.e., it has 'n' opening and closing parentheses) and if so, adds it to the result list.",
//       "top-two-variables": [
//         "result",
//         "s"
//       ]
//     },

//   ]

const taskQuestion2: newQuestionObject[] = [
    {
      "step": 8,
      "begin-line": 7,
      "end-line": 8,
      "question-about-purpose-of-code": "Why does the code append the index of the opening brackets to the stack in lines 7 and 8?",
      "answer": "Appending the index of the opening brackets to the stack helps keep track of the brackets and their positions, which is useful for calculating the length of the valid substring.",
      "top-two-variables": [
        "stack",
        "char"
      ]
    },
    {
      "step": 13,
      "begin-line": 10,
      "end-line": 15,
      "question-about-purpose-of-code":null,
      "answer": null,
      "top-two-variables": [
        "stack",
        "max_length"
      ]
    },
    {
      "step": 34,
      "begin-line": 17,
      "end-line": 17,
      "question-about-purpose-of-code": "What is the purpose of updating the top of the stack to the current index in line 17?",
      "answer": "If the conditions are not met, the top of the stack is updated to the current index to prepare for the next comparison of opening and closing brackets.",
      "top-two-variables": [
        "stack",
        "i"
      ]
    },
    {
      "step": 51,
      "begin-line": 7,
      "end-line": 8,
      "question-about-purpose-of-code": null,
      "answer": null,
      "top-two-variables": [
        "stack",
        "char"
      ]
    },
    {
        "step": 61,
        "begin-line": 15,
        "end-line": 15,
        "question-about-purpose-of-code": "How does the line 15 update the max_length variable?",
        "answer": "It updates max_length to be the maximum of the current max_length and the difference between the current index and the top of the stack, representing the length of the valid substring.",
        "top-two-variables": [
          "max_length",
          "i"
        ]
      },
    {
        "step": 85,
        "begin-line": 10,
        "end-line": 15,
        "question-about-purpose-of-code": null,
        "answer": null,
        "top-two-variables": [
          "stack",
          "max_length"
        ]
    },
    {
      "step": 94,
      "begin-line": 10,
      "end-line": 15,
      "question-about-purpose-of-code": null,
      "answer": null,
      "top-two-variables": [
        "stack",
        "max_length"
      ]
    },
  ]

// const taskQuestion2: questionObject[] = [
//         {
//             "step": 5,
//             "question": "char",
//             "begin-line": 5,
//             "end-line": 6,
//             "explanation": "How does the code iterate through each character in the input string?",
//             "aiGeneratedSolution": "The code iterates through each character in the input string, updating the 'char' variable with the current character."
//         },
//         {
//             "step": 7,
//             "question": "stack",
//             "begin-line": 7,
//             "end-line": 8,
//             "explanation": "How does the stack change when encountering an opening bracket?",
//             "aiGeneratedSolution": "When encountering an opening bracket, the index of the bracket is pushed onto the stack, helping to track the positions for matching."
//         },
//         {
//             "step": 16,
//             "question": "is_match",
//             "begin-line": 10,
//             "end-line": 12,
//             "explanation": "How is the 'is_match' variable used to determine if a valid bracket sequence is found?",
//             "aiGeneratedSolution": "The 'is_match' variable is set to True when a closing bracket is found and the stack is not empty, indicating a valid bracket sequence."
//         },
//         {
//             "step": 19,
//             "question": "max_length",
//             "begin-line": 13,
//             "end-line": 15,
//             "explanation": "How is max_length updated when a valid bracket sequence is found?",
//             "aiGeneratedSolution": "max_length is updated to the maximum of its current value and the length of the valid bracket sequence found, calculated as the difference between the current index and the new top of the stack."
//         },
//     ]

// const taskQuestion4: questionObject[] = [
//     {
//         "step": 9,
//         "question": "current_num",
//         "begin-line": 6,
//         "end-line": 7,
//         "explanation": "How does the code update the value of current_num when encountering a digit in the string?",
//         "aiGeneratedSolution": "The code multiplies current_num by 10 and adds the integer value of the digit, allowing it to handle multi-digit numbers."
//     },
//     {
//         "step": 13,
//         "question": "stack",
//         "begin-line": 8,
//         "end-line": 11,
//         "explanation": "What happens to the stack when the code encounters an opening bracket '['?",
//         "aiGeneratedSolution": "The current_string and current_num are pushed onto the stack, and both are reset to handle the new substring."
//     },
//     {
//         "step": 25,
//         "question": "current_string",
//         "begin-line": 12,
//         "end-line": 14,
//         "explanation": "How is current_string updated when the code encounters a closing bracket ']'?",
//         "aiGeneratedSolution": "The code pops the last string and number from the stack, then appends the repeated current_string to the last string."
//     },
//     {
//         "step": 51,
//         "question": "current_string",
//         "begin-line": 5,
//         "end-line": 17,
//         "explanation": "How does the code build the final decoded string in current_string?",
//         "aiGeneratedSolution": "The code iterates through the input string, updating current_string by appending characters or expanding substrings based on the stack's stored values."
//     }
// ];

// const taskQuestion5: questionObject[] = [
//     {
//         "step": 7,
//         "question": "dq",
//         "begin-line": 4,
//         "end-line": 6,
//         "explanation": "How does the deque (dq) change as characters are appended and the character count is updated?",
//         "aiGeneratedSolution": "The deque (dq) accumulates characters from the string, and characters are appended to it as they are processed."
//     },
//     {
//         "step": 8,
//         "question": "char_count",
//         "begin-line": 4,
//         "end-line": 6,
//         "explanation": "How does the char_count dictionary update as characters are processed?",
//         "aiGeneratedSolution": "The char_count dictionary increments the count for each character as it is encountered in the string."
//     },
//     {
//         "step": 10,
//         "question": "dq",
//         "begin-line": 7,
//         "end-line": 8,
//         "explanation": "What happens to the deque (dq) when the character count of the first element does not equal k?",
//         "aiGeneratedSolution": "The deque (dq) removes elements from the front until the character count of the first element equals k."
//     },
//     {
//         "step": 15,
//         "question": "char_count",
//         "begin-line": 4,
//         "end-line": 6,
//         "explanation": "How does the char_count dictionary help in determining when to return a character?",
//         "aiGeneratedSolution": "The char_count dictionary helps identify when a character has appeared k times, triggering the return of that character."
//     }
// ];

const taskQuestion3: newQuestionObject[] = [
    {
      "step": 17,
      "begin-line": 7,
      "end-line": 8,
      "question-about-purpose-of-code": "What is the role of the while loop that pops elements from the deque 'dq'?",
      "answer": "It ensures that 'dq' is in decreasing order, which is crucial for finding the maximum in the sliding window.",
      "top-two-variables": [
        "dq",
      ]
    },
    {
      "step": 28,
      "begin-line": 10,
      "end-line": 11,
      "question-about-purpose-of-code": "Why are we appending 'nums[dq[0]]' to the result list?",
      "answer": "This appends the maximum of the current window to the result list, as 'dq[0]' always holds the index of the maximum.",
      "top-two-variables": [
        "result",
        "dq"
      ]
    },
    {
        "step": 36,
        "begin-line": 10,
        "end-line": 11,
        "question-about-purpose-of-code": null,
        "answer": null,
        "top-two-variables": [
          "result"
        ]
    },
    {
    "step": 50,
      "begin-line": 7,
      "end-line": 8,
      "question-about-purpose-of-code": null,
      "answer": null,
      "top-two-variables": [
        "dq",
      ]
    },
    {
      "step": 63,
      "begin-line": 5,
      "end-line": 6,
      "question-about-purpose-of-code": "Why are elements being popped from the front of the deque 'dq' in the if condition?",
      "answer": "This removes elements that are outside the current window, ensuring the window size remains valid.",
      "top-two-variables": [
        "dq",
      ]
    },
    {
      "step": 80,
      "begin-line": 7,
      "end-line": 8,
      "question-about-purpose-of-code": null,
      "answer": null,
      "top-two-variables": [
        "dq",
      ]
    },

  ]

// const taskQuestion3: newQuestionObject[] = [
//     {
//         "step": 12,
//         "begin-line": 7,
//         "end-line": 8,
//         "question-about-purpose-of-code": "What is the role of the while loop that pops elements from the deque 'dq'?",
//         "answer": "It ensures that 'dq' is in decreasing order, which is crucial for finding the maximum in the sliding window.",
//         "top-two-variables": ["dq", "n"]
//     },
//     {
//         "step": 15,
//         "begin-line": 9,
//         "end-line": 9,
//         "question-about-purpose-of-code": "Why is the current index 'i' being appended to 'dq'?",
//         "answer": "Appending 'i' to 'dq' is essential for tracking elements within the current window.",
//         "top-two-variables": ["dq", "i"]
//     },
//     {
//         "step": 30,
//         "begin-line": 5,
//         "end-line": 6,
//         "question-about-purpose-of-code": "Why are elements being popped from the front of the deque 'dq' in the if condition?",
//         "answer": "This removes elements that are outside the current window, ensuring the window size remains valid.",
//         "top-two-variables": ["dq", "i"]
//     },
//     {
//         "step": 38,
//         "begin-line": 10,
//         "end-line": 11,
//         "question-about-purpose-of-code": "Why are we appending 'nums[dq[0]]' to the result list?",
//         "answer": "This appends the maximum of the current window to the result list, as 'dq[0]' always holds the index of the maximum.",
//         "top-two-variables": ["result", "dq"]
//     },
//     {
//         "step": 63,
//         "begin-line": 11,
//         "end-line": 11,
//         "question-about-purpose-of-code": "What is the significance of appending 'nums[dq[0]]' to 'result'?",
//         "answer": "This adds the maximum of the current window to the result list, as 'dq[0]' always holds the index of the maximum.",
//         "top-two-variables": ["result", "dq"]
//     }
// ]


type TaskDecompositions = {
    [key: number]: StepDecomposition
}

interface newQuestionObject {
    step: number;
    "begin-line": number;
    "end-line": number;
    "question-about-purpose-of-code": string | null;
    answer: string | null;
    "top-two-variables": string[];
}

interface questionObject {
    step: number;
    "question": string;
    "begin-line": number;
    "end-line": number;
    explanation: string;
    aiGeneratedSolution: string;
}[]


type TaskQuestions = {
    [key: number]: newQuestionObject[];
};

export const taskQuestions: TaskQuestions = {
    1: warmupQuestion1,
    2: taskQuestion1,
    3: warmupQuestion2,
    4: taskQuestion2,
    5: warmupQuestion3,
    6: taskQuestion3,
};
