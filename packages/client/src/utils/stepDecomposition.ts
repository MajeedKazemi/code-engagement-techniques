//define type
type StepDecomposition = {
    important_parts: ImportantPart[];
};

type ImportantPart = {
    description: string;
    lines: {
        begin: number;
        end: number;
    };
    important_variables: string[];
};

const warmupQuestion1: newQuestionObject[] = [
    {
        step: 3,
        "begin-line": 2,
        "end-line": 2,
        "question-about-purpose-of-code":
            "Why is the queue initialized with a copy of the input list on line 3?",
        answer: "The queue is initialized with a copy of the input list to prevent modification of the original list and to provide a source of elements for the loop's operation.",
        "top-two-variables": ["queue"],
    },
    {
        step: 5,
        "begin-line": 4,
        "end-line": 5,
        "question-about-purpose-of-code":
            "What is the role of the while loop in the function reverse_list_with_queue?",
        answer: "The while loop processes each element in the queue and inserts it at the beginning of the reversed list, thus reversing the order of elements.",
        "top-two-variables": ["queue", "reversed_list"],
    },
];

const warmupQuestion2: newQuestionObject[] = [
    {
        step: 4,
        "begin-line": 3,
        "end-line": 3,
        "question-about-purpose-of-code":
            "Why is the 'stack' variable initialized with a copy of 'input_list'?",
        answer: "The 'stack' is initialized with a copy of 'input_list' to prevent modifying the original list and to use stack operations for reversal.",
        "top-two-variables": ["stack"],
    },
    {
        step: 5,
        "begin-line": 4,
        "end-line": 5,
        "question-about-purpose-of-code":
            "What is the role of the while loop in the function?",
        answer: "The while loop pops elements from the 'stack' and appends them to 'reversed_list', effectively reversing the order of the elements.",
        "top-two-variables": ["stack", "reversed_list"],
    },
];

const warmupQuestion3: newQuestionObject[] = [
    {
        step: 5,
        "begin-line": 4,
        "end-line": 4,
        "question-about-purpose-of-code":
            "What is the purpose of the if statement on line 4?",
        answer: "It checks if the first and last characters of the list are equal, which is the core logic for palindrome validation.",
        "top-two-variables": ["dq"],
    },
    {
        step: 7,
        "begin-line": 4,
        "end-line": 4,
        "question-about-purpose-of-code": null,
        answer: null,
        "top-two-variables": ["dq"],
    },
    {
        step: 9,
        "begin-line": 6,
        "end-line": 6,
        "question-about-purpose-of-code": null,
        answer: null,
        "top-two-variables": ["dq"],
    },
];

const taskQuestion1: newQuestionObject[] = [
    {
        step: 6,
        "begin-line": 5,
        "end-line": 5,
        "question-about-purpose-of-code":
            "What is the purpose of line 5 that pops the first element from the queue and unpacks it into multiple variables?",
        answer: "This line retrieves the next state to process from the queue 'q' and unpacks it into the variables 's', 'opens', 'closes', 'max_d', and 'cur_d'.",
        "top-two-variables": ["q", "s"],
    },
    {
        step: 16,
        "begin-line": 9,
        "end-line": 12,
        "question-about-purpose-of-code":
            "What is the purpose of the code block from lines 9 to 12 that checks the condition 'if opens < n' and updates 'q' and 'new_max_d'?",
        answer: "This block handles the case when an opening parenthesis can be added. It updates the queue 'q' with the new state after adding an opening parenthesis and updating the maximum depth 'new_max_d'.",
        "top-two-variables": ["q", "new_max_d"],
    },
    {
        step: 32,
        "begin-line": 10,
        "end-line": 10,
        "question-about-purpose-of-code":
            "What is the purpose of line 10 that calculates the new maximum depth 'new_max_d' when adding an opening parenthesis?",
        answer: "This line calculates the new maximum depth if an opening parenthesis is added to the current state, which is used to check if the depth restriction is met.",
        "top-two-variables": ["new_max_d"],
    },
    {
        step: 46,
        "begin-line": 13,
        "end-line": 14,
        "question-about-purpose-of-code":
            "What is the purpose of the code block from lines 13 to 14 that checks the condition 'if closes < opens and max_d <= d' and updates 'q'?",
        answer: "This block handles the case when a closing parenthesis can be added. It updates the queue 'q' with the new state after adding a closing parenthesis and updating the current depth 'cur_d'.",
        "top-two-variables": ["q", "closes"],
    },
    {
        step: 54,
        "begin-line": 6,
        "end-line": 7,
        "question-about-purpose-of-code":
            "What is the purpose of the code block from lines 6 to 7 that checks the condition 'if opens == n and closes == n' and updates 'result'?",
        answer: "This block checks if the current state represents a valid combination of parentheses (i.e., it has 'n' opening and closing parentheses) and if so, adds it to the result list.",
        "top-two-variables": ["result"],
    },
];

const taskQuestion2: newQuestionObject[] = [
    {
        step: 8,
        "begin-line": 7,
        "end-line": 8,
        "question-about-purpose-of-code":
            "Why does the code append the index of the opening brackets to the stack in lines 7 and 8?",
        answer: "Appending the index of the opening brackets to the stack helps keep track of the brackets and their positions, which is useful for calculating the length of the valid substring.",
        "top-two-variables": ["stack"],
    },
    {
        step: 13,
        "begin-line": 10,
        "end-line": 15,
        "question-about-purpose-of-code": null,
        answer: null,
        "top-two-variables": ["stack", "max_length"],
    },
    {
        step: 34,
        "begin-line": 17,
        "end-line": 17,
        "question-about-purpose-of-code":
            "What is the purpose of updating the top of the stack to the current index in line 17?",
        answer: "If the conditions are not met, the top of the stack is updated to the current index to prepare for the next comparison of opening and closing brackets.",
        "top-two-variables": ["stack", "i"],
    },
    {
        step: 61,
        "begin-line": 15,
        "end-line": 15,
        "question-about-purpose-of-code":
            "How does the line 15 update the max_length variable?",
        answer: "It updates max_length to be the maximum of the current max_length and the difference between the current index and the top of the stack, representing the length of the valid substring.",
        "top-two-variables": ["max_length", "i"],
    },
    {
        step: 85,
        "begin-line": 10,
        "end-line": 15,
        "question-about-purpose-of-code": null,
        answer: null,
        "top-two-variables": ["stack", "max_length"],
    },
];

const taskQuestion3: newQuestionObject[] = [
    {
        step: 17,
        "begin-line": 7,
        "end-line": 8,
        "question-about-purpose-of-code":
            "What is the role of the while loop that pops elements from the deque 'dq'?",
        answer: "It ensures that 'dq' is in decreasing order, which is crucial for finding the maximum in the sliding window.",
        "top-two-variables": ["dq"],
    },
    {
        step: 28,
        "begin-line": 10,
        "end-line": 11,
        "question-about-purpose-of-code":
            "Why are we appending 'nums[dq[0]]' to the result list?",
        answer: "This appends the maximum of the current window to the result list, as 'dq[0]' always holds the index of the maximum.",
        "top-two-variables": ["result", "dq"],
    },
    {
        step: 36,
        "begin-line": 10,
        "end-line": 11,
        "question-about-purpose-of-code": null,
        answer: null,
        "top-two-variables": ["result"],
    },
    {
        step: 63,
        "begin-line": 5,
        "end-line": 6,
        "question-about-purpose-of-code":
            "Why are elements being popped from the front of the deque 'dq' in the if condition?",
        answer: "This removes elements that are outside the current window, ensuring the window size remains valid.",
        "top-two-variables": ["dq"],
    },
    {
        step: 80,
        "begin-line": 7,
        "end-line": 8,
        "question-about-purpose-of-code": null,
        answer: null,
        "top-two-variables": ["dq"],
    },
];

type TaskDecompositions = {
    [key: number]: StepDecomposition;
};

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
    question: string;
    "begin-line": number;
    "end-line": number;
    explanation: string;
    aiGeneratedSolution: string;
}
[];

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
