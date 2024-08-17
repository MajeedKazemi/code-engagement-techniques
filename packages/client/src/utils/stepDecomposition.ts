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


const warmupQuestion2: questionObject[] = [
        {
            "step": 5,
            "question": "stack",
            "begin-line": 3,
            "end-line": 4,
            "explanation": "How does the initialization and subsequent use of 'stack' in lines 3-4 affect the logic of the while loop?",
            "aiGeneratedSolution": "The 'stack' is initialized as a copy of 'input_list'. It is then used in the while loop to pop elements until empty, reversing the list."
        },
        {
            "step": 7,
            "question": "reversed_list",
            "begin-line": 4,
            "end-line": 5,
            "explanation": "How does the 'reversed_list' change within the while loop in lines 4-5?",
            "aiGeneratedSolution": "In each iteration of the while loop, the last element of 'stack' is popped and appended to 'reversed_list', gradually building the reversed list."
        },
        {
            "step": 11,
            "question": "stack",
            "begin-line": 4,
            "end-line": 5,
            "explanation": "What happens to 'stack' during each iteration of the while loop in lines 4-5?",
            "aiGeneratedSolution": "During each iteration, 'stack' has its last element removed (popped), reducing its size until it becomes empty, which ends the loop."
        },
        {
            "step": 15,
            "question": "reversed_list",
            "begin-line": 4,
            "end-line": 5,
            "explanation": "What is the final state of 'reversed_list' after the while loop completes in lines 4-5?",
            "aiGeneratedSolution": "After the while loop completes, 'reversed_list' contains all the elements of 'input_list' in reverse order."
        }
    ];

const warmupQuestion1: questionObject[] = [
    {
      "step": 5,
      "question": "queue",
      "begin-line": 3,
      "end-line": 4,
      "explanation": "How does the initialization and the while loop condition affect the state of the 'queue' variable?",
      "aiGeneratedSolution": "The 'queue' is initialized as a copy of 'input_list'. The while loop continues until 'queue' is empty, progressively removing elements."
    },
    {
      "step": 7,
      "question": "reversed_list",
      "begin-line": 4,
      "end-line": 5,
      "explanation": "How does the insertion operation within the while loop affect the 'reversed_list' variable?",
      "aiGeneratedSolution": "Each iteration inserts the first element of 'queue' at the beginning of 'reversed_list', effectively reversing the order of elements."
    },
    {
      "step": 11,
      "question": "queue",
      "begin-line": 4,
      "end-line": 5,
      "explanation": "What changes occur to the 'queue' variable during each iteration of the while loop?",
      "aiGeneratedSolution": "In each iteration, the first element of 'queue' is removed using 'pop(0)', reducing the size of 'queue' until it becomes empty."
    },
    {
      "step": 15,
      "question": "reversed_list",
      "begin-line": 4,
      "end-line": 5,
      "explanation": "How does the final state of 'reversed_list' reflect the operations performed in the while loop?",
      "aiGeneratedSolution": "The final 'reversed_list' contains all elements of 'input_list' in reverse order, achieved by inserting elements at the beginning in each loop iteration."
    }
  ];

const warmupQuestion3: questionObject[] = [
    {
      "step": 4,
      "question": "dq",
      "begin-line": 3,
      "end-line": 3,
      "explanation": "How does the length of 'dq' change during each iteration of the while loop, and why is this significant for checking if the string is a palindrome?",
      "aiGeneratedSolution": "The length of 'dq' decreases by 2 each iteration, removing one character from the front and one from the back, ensuring symmetry is checked."
    },
    {
      "step": 6,
      "question": "dq",
      "begin-line": 4,
      "end-line": 5,
      "explanation": "What happens to 'dq' when the characters at the front and back do not match, and how does this affect the function's return value?",
      "aiGeneratedSolution": "If characters don't match, 'dq' is immediately returned as False, indicating the string is not a palindrome."
    },
    {
      "step": 8,
      "question": "dq",
      "begin-line": 3,
      "end-line": 3,
      "explanation": "Why is it important to check the length of 'dq' in the while loop condition, and how does this contribute to the function's logic?",
      "aiGeneratedSolution": "Checking 'dq's length ensures the loop runs only while there are characters to compare, crucial for validating the palindrome property."
    },
    {
      "step": 10,
      "question": "dq",
      "begin-line": 4,
      "end-line": 5,
      "explanation": "How does the comparison of characters at the front and back of 'dq' ensure the string is a palindrome?",
      "aiGeneratedSolution": "Comparing front and back characters ensures symmetry. If all pairs match, the string is a palindrome; otherwise, it is not."
    }
  ]
;

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

const taskQuestion1: questionObject[] = [
    {
        "step": 4,
        "question": "q",
        "begin-line": 2,
        "end-line": 3,
        "explanation": "How does the initialization of the queue 'q' and the result list set up the initial state for generating parentheses?",
        "aiGeneratedSolution": "The queue 'q' starts with an empty string and counters for open/close parentheses and depth, setting up the initial state for BFS."
    },
    {
        "step": 7,
        "question": "s",
        "begin-line": 5,
        "end-line": 6,
        "explanation": "What role does the variable 's' play when checking the length of the current string in the queue?",
        "aiGeneratedSolution": "The variable 's' represents the current string of parentheses. If its length equals 2*n, it is added to the result list."
    },
    {
        "step": 10,
        "question": "new_max_d",
        "begin-line": 11,
        "end-line": 12,
        "explanation": "How is 'new_max_d' calculated and why is it important for the logic of generating valid parentheses?",
        "aiGeneratedSolution": "The 'new_max_d' is calculated as the maximum of 'max_d' and 'cur_d + 1', ensuring the depth constraint is respected when adding an open parenthesis."
    },
    {
        "step": 19,
        "question": "q",
        "begin-line": 13,
        "end-line": 14,
        "explanation": "How does the queue 'q' change when a close parenthesis is added, and why is the depth constraint checked?",
        "aiGeneratedSolution": "When a close parenthesis is added, 'q' is updated with the new string and counters. The depth constraint ensures the maximum depth does not exceed 'm'."
    }
]
;

const taskQuestion2: questionObject[] = [
        {
            "step": 9,
            "question": "stack",
            "begin-line": 7,
            "end-line": 8,
            "explanation": "How does the stack change when encountering an opening bracket?",
            "aiGeneratedSolution": "When encountering an opening bracket, the index of the bracket is pushed onto the stack, helping to track the positions for matching."
        },
        {
            "step": 13,
            "question": "stack",
            "begin-line": 7,
            "end-line": 8,
            "explanation": "How does the stack change when encountering a closing bracket?",
            "aiGeneratedSolution": "When encountering a closing bracket, if it matches the last opening bracket, the index of the last opening bracket is popped from the stack."
        },
        {
            "step": 22,
            "question": "max_length",
            "begin-line": 13,
            "end-line": 15,
            "explanation": "How is max_length updated when a valid bracket sequence is found?",
            "aiGeneratedSolution": "max_length is updated to the maximum of its current value and the length of the valid bracket sequence found, calculated as the difference between the current index and the new top of the stack."
        },
        {
            "step": 24,
            "question": "max_length",
            "begin-line": 18,
            "end-line": 19,
            "explanation": "What happens to max_length when an unmatched closing bracket is encountered?",
            "aiGeneratedSolution": "When an unmatched closing bracket is encountered, max_length remains unchanged, and the index of the unmatched closing bracket is set as the new base in the stack."
        }
    ]

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

const taskQuestion3: questionObject[] = [
    {
        "step": 9,
        "question": "dq",
        "begin-line": 9,
        "end-line": 9,
        "explanation": "How does appending the current index to dq affect the tracking of the maximum values in the sliding window?",
        "aiGeneratedSolution": "Appending the current index ensures dq contains indices of elements in descending order, maintaining the maximum value at the front."
    },
    {
        "step": 16,
        "question": "dq",
        "begin-line": 7,
        "end-line": 8,
        "explanation": "What is the purpose of removing elements from dq while the current element is greater than the elements at dq's indices?",
        "aiGeneratedSolution": "Removing elements ensures dq only contains indices of elements that could be the maximum in the current window, maintaining efficiency."
    },
    {
        "step": 23,
        "question": "result",
        "begin-line": 10,
        "end-line": 11,
        "explanation": "Why is the maximum value of the current window appended to the result list when the index is greater than or equal to k-1?",
        "aiGeneratedSolution": "Appending the maximum value ensures the result list contains the maximum values for each sliding window of size k."
    },
    {
        "step": 40,
        "question": "result",
        "begin-line": 10,
        "end-line": 11,
        "explanation": "How does the condition 'if i >= k - 1' ensure the correct maximum values are appended to the result list?",
        "aiGeneratedSolution": "The condition ensures that only when the window is fully formed (i.e., has at least k elements), the maximum value is appended to the result."
    }
];


type TaskDecompositions = {
    [key: number]: StepDecomposition
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
    [key: number]: questionObject[];
};

export const taskQuestions: TaskQuestions = {
    1: warmupQuestion1,
    2: taskQuestion1,
    3: warmupQuestion2,
    4: taskQuestion2,
    5: warmupQuestion3,
    6: taskQuestion3,
};
