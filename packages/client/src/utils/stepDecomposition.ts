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



const taskDecomp0 = {};
const taskDecomp1 = {};
const taskDecomp2 = {};
const taskDecomp4 = {};

const taskDecomp3 = {
    "important_parts": [
        {
            "description": "Function definition and initialization of result list and queue",
            "lines": {
                "begin": 1,
                "end": 3
            },
            "important_variables": ["n1", "n2", "result", "q"]
        },
        {
            "description": "For loop iterating from 0 to n2-1",
            "lines": {
                "begin": 4,
                "end": 10
            },
            "important_variables": ["i", "current", "current_int", "result", "q"]
        },
        {
            "description": "Conditional check and appending to result list",
            "lines": {
                "begin": 7,
                "end": 8
            },
            "important_variables": ["n1", "n2", "current_int", "result"]
        },
        {
            "description": "Appending new binary numbers to the queue",
            "lines": {
                "begin": 9,
                "end": 10
            },
            "important_variables": ["current", "q"]
        },
        {
            "description": "Return the result list",
            "lines": {
                "begin": 11,
                "end": 11
            },
            "important_variables": ["result"]
        }
    ]
}

const taskQuestion3: questionObject[] = [
      {
        "step": 7,
        "question": "result",
        "begin-line": 7,
        "end-line": 8,
        "explanation": "How does the code between lines 7 and 8 modify the 'result' variable, and why is this modification important for the overall logic?",
        "aiGeneratedSolution": "The code updates 'result' by adding the current integer to it, which is crucial for accumulating the sum of integers."
      },
      {
        "step": 9,
        "question": "q",
        "begin-line": 9,
        "end-line": 10,
        "explanation": "What changes occur to the 'q' variable between lines 9 and 10, and how do these changes affect the subsequent code execution?",
        "aiGeneratedSolution": "The code modifies 'q' by appending a new element, impacting the loop's behavior by altering the queue's state."
      },
      {
        "step": 12,
        "question": "current_int",
        "begin-line": 5,
        "end-line": 6,
        "explanation": "How is 'current_int' determined in lines 5 and 6, and why is its value critical for the loop's logic?",
        "aiGeneratedSolution": "'current_int' is set to the next integer from the queue, driving the loop's progression by providing the next value to process."
      },
      {
        "step": 14,
        "question": "result",
        "begin-line": 7,
        "end-line": 8,
        "explanation": "How does the code between lines 7 and 8 modify the 'result' variable, and why is this modification important for the overall logic?",
        "aiGeneratedSolution": "The code updates 'result' by adding the current integer to it, which is crucial for accumulating the sum of integers."
      }
    ]

const taskQuestion0 = {};
const taskQuestion1 = {};
const taskQuestion2 = {};
const taskQuestion4 = {};

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
    // 0: taskQuestion0,
    // 1: taskQuestion1,
    // 2: taskQuestion2,
    1: taskQuestion3,
    // 4: taskQuestion4
};

export const taskDecompositions: TaskDecompositions = {
    // 0: taskDecomp0,
    // 1: taskDecomp1,
    // 2: taskDecomp2,
    1: taskDecomp3,
    // 4: taskDecomp4
};