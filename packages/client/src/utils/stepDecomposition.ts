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
            "end-line": 8
        },
        {
            "step": 9,
            "question": "q",
            "begin-line": 9,
            "end-line": 10
        },
        {
            "step": 12,
            "question": "current_int",
            "begin-line": 5,
            "end-line": 6
        },
        {
            "step": 14,
            "question": "result",
            "begin-line": 7,
            "end-line": 8
        }
    ];

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
}[]


type TaskQuestions = {
    [key: number]: questionObject[];
};

export const taskQuestions: TaskQuestions = {
    // 0: taskQuestion0,
    // 1: taskQuestion1,
    // 2: taskQuestion2,
    3: taskQuestion3,
    // 4: taskQuestion4
};

export const taskDecompositions: TaskDecompositions = {
    // 0: taskDecomp0,
    // 1: taskDecomp1,
    // 2: taskDecomp2,
    3: taskDecomp3,
    // 4: taskDecomp4
};