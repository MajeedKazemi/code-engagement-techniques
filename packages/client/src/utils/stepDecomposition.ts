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
            "step": 3,
            "question": "stack",
            "begin-line": 3,
            "end-line": 4,
            "explanation": "How does the initialization and subsequent use of 'stack' in lines 3 affect the logic of the while loop?",
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
            "step": 13,
            "question": "reversed_list",
            "begin-line": 4,
            "end-line": 5,
            "explanation": "What is the final state of 'reversed_list' after the while loop completes in lines 4-5?",
            "aiGeneratedSolution": "After the while loop completes, 'reversed_list' contains all the elements of 'input_list' in reverse order."
        }
    ];

const warmupQuestion1: questionObject[] = [
    {
      "step": 3,
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
      "step": 13,
      "question": "reversed_list",
      "begin-line": 4,
      "end-line": 5,
      "explanation": "How does the final state of 'reversed_list' reflect the operations performed in the while loop?",
      "aiGeneratedSolution": "The final 'reversed_list' contains all elements of 'input_list' in reverse order, achieved by inserting elements at the beginning in each loop iteration."
    }
  ];

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

const warmupQuestion3: questionObject[] = [
    {
        "step": 4,
        "question": "dq",
        "begin-line": 4,
        "end-line": 4,
        "explanation": "How does the condition dq.pop(0) != dq.pop() determine the outcome of the palindrome check?",
        "aiGeneratedSolution": "The condition dq.pop(0) != dq.pop() checks if the first and last characters are different. If they are, the function returns False, indicating the string is not a palindrome."
    },
    {
        "step": 6,
        "question": "dq",
        "begin-line": 4,
        "end-line": 4,
        "explanation": "What is the significance of comparing dq.pop(0) and dq.pop() in the palindrome check?",
        "aiGeneratedSolution": "Comparing dq.pop(0) and dq.pop() checks if the first and last characters of the string are the same, which is crucial for determining if the string is a palindrome."
    },
    {
        "step": 8,
        "question": "dq",
        "begin-line": 4,
        "end-line": 4,
        "explanation": "How does the while loop and the pop operations affect the dq list during the palindrome check?",
        "aiGeneratedSolution": "The while loop and pop operations progressively remove and compare characters from both ends of dq, ensuring that all characters match in a palindrome."
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
        "step": 7,
        "question": "q",
        "begin-line": 10,
        "end-line": 12,
        "explanation": "How does the code ensure that new states are added to the queue 'q' when an opening parenthesis is added?",
        "aiGeneratedSolution": "The code checks if 'opens' is less than 'n' and appends a new state with an additional '('. This ensures all possible valid combinations are explored."
    },
    {
        "step": 17,
        "question": "q",
        "begin-line": 13,
        "end-line": 14,
        "explanation": "How does the code ensure that new states are added to the queue 'q' when a closing parenthesis is added?",
        "aiGeneratedSolution": "The code checks if 'closes' is less than 'opens' and 'max_d' is within 'm', then appends a new state with an additional ')'."
    },
    {
        "step": 28,
        "question": "q",
        "begin-line": 10,
        "end-line": 12,
        "explanation": "How does the code ensure that new states are added to the queue 'q' when an opening parenthesis is added?",
        "aiGeneratedSolution": "The code checks if 'opens' is less than 'n' and appends a new state with an additional '('. This ensures all possible valid combinations are explored."
    },
    {
        "step": 50,
        "question": "s",
        "begin-line": 5,
        "end-line": 5,
       "explanation": "How does the variable 's' change from '(())' to '()()' at this point in the code?",
        "aiGeneratedSolution": "The variable 's' changes as the algorithm explores different valid combinations of parentheses, transitioning from one valid sequence '(())' to another '()()'."
    }
]
;

const taskQuestion2: questionObject[] = [
        {
            "step": 5,
            "question": "char",
            "begin-line": 5,
            "end-line": 6,
            "explanation": "How does the code iterate through each character in the input string?",
            "aiGeneratedSolution": "The code iterates through each character in the input string, updating the 'char' variable with the current character."
        },
        {
            "step": 7,
            "question": "stack",
            "begin-line": 7,
            "end-line": 8,
            "explanation": "How does the stack change when encountering an opening bracket?",
            "aiGeneratedSolution": "When encountering an opening bracket, the index of the bracket is pushed onto the stack, helping to track the positions for matching."
        },
        {
            "step": 16,
            "question": "is_match",
            "begin-line": 10,
            "end-line": 12,
            "explanation": "How is the 'is_match' variable used to determine if a valid bracket sequence is found?",
            "aiGeneratedSolution": "The 'is_match' variable is set to True when a closing bracket is found and the stack is not empty, indicating a valid bracket sequence."
        },
        {
            "step": 19,
            "question": "max_length",
            "begin-line": 13,
            "end-line": 15,
            "explanation": "How is max_length updated when a valid bracket sequence is found?",
            "aiGeneratedSolution": "max_length is updated to the maximum of its current value and the length of the valid bracket sequence found, calculated as the difference between the current index and the new top of the stack."
        },
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
        "step": 11,
        "question": "dq",
        "begin-line": 7,
        "end-line": 9,
        "explanation": "How does the code ensure that only the indices of elements larger than the current element are kept in the deque?",
        "aiGeneratedSolution": "The while loop at lines 7-9 removes indices from the deque if the corresponding elements in nums are smaller than the current element."
    },
    {
        "step": 20,
        "question": "result",
        "begin-line": 10,
        "end-line": 11,
        "explanation": "What condition must be met for an element to be added to the result list, and how is this element determined?",
        "aiGeneratedSolution": "The condition is i >= k - 1. The element added to the result list is nums[dq[0]], the maximum of the current window."
    },
    {
        "step": 29,
        "question": 'dp',
        "begin-line": 5,
        "end-line": 6,
        "explanation": "What does the code do to maintain the deque's validity when the window slides past the first element?",
        "aiGeneratedSolution": "The if statement at lines 5-6 removes the index at the front of the deque if it is out of the current window's range."
    },
    {
        "step": 41,
        "question": "result",
        "begin-line": 7,
        "end-line": 11,
        "explanation": "How do the operations within the loop contribute to building the result list?",
        "aiGeneratedSolution": "The loop maintains a deque of indices of the maximum elements for the current window, and appends the maximum to the result list when the window is valid."
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
