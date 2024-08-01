
export const solution3: { [key: string]: { name: string; type: string; value: number | string | boolean } } = {

    "question-1": { name: "question1", type: "number", value: 42 },

    "question-2": { name: "question2", type: "string", value: "Hello, World!" },

    "question-3": { name: "question3", type: "boolean", value: true },

    "question-4": { name: "question4", type: "string", value: "Code Copilot" },

};


const solution0 = {};
const solution1 = {};
const solution2 = {};
const solution4 = {};

type TaskSolutions = { 
    [key: number]: typeof solution3
};

export const taskSolutions: TaskSolutions = {
    // 0: solution0,
    // 1: solution1,
    // 2: solution2,
    3: solution3,
    // 4: solution4
};
