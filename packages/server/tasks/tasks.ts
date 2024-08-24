import {
    task1Code,
    task1Explanation,
    task2Code,
    task2Explanation,
    task3Code,
    task3Explanation,
    tech1WarmupCode,
    tech1WarmupExplanation,
    tech2WarmupCode,
    tech2WarmupExplanation,
    tech3WarmupCode,
    tech3WarmupExplanation,
} from "./baseline-constant";
import {
    task1Decomposition,
    task2Decomposition,
    task3Decomposition,
    tech1WarmupDecomposition,
    tech2WarmupDecomposition,
    tech3WarmupDecomposition,
} from "./lead-reveal-constant";

export enum TaskType {
    Authoring = "authoring",
    Modifying = "modifying",
    ShortAnswer = "shortAnswer",
    MultipleChoice = "multipleChoice",
    WatchVideo = "watchVideo",
    Coding = "coding",
}

export interface IUserTask {
    sequence: number;
    userId: string;
    taskId: string;
    userTaskId: string;
    startedAt: Date;
    finishedAt: Date;
    log: any;
    data: any;
    completed: boolean;
    submissions: Array<{ code: string; submittedAt: Date; checkedAt?: Date }>;
    beingGraded: boolean;
    passed: boolean;
}

class CodeCheckResult {
    passed: boolean;
    message?: string;

    constructor(passed: boolean, message: string) {
        this.passed = passed;
        this.message = message;
    }
}

export abstract class Task {
    id: string;
    description: string;

    type: TaskType;

    constructor(id: string, description: string, type: TaskType) {
        this.id = id;
        this.description = description;
        this.type = type;
    }
}

export class WatchVideoTask extends Task {
    constructor(id: string, description: string) {
        super(id, description, TaskType.WatchVideo);
    }
}

export class AuthoringTask extends Task {
    // timeLimit: number;
    // output: Array<Array<string>>;
    // solution: string;
    // topic: TaskTopic;
    // stage: TaskStage;
    baselineCode: string;
    explaination: string;
    LeadRevealJson: JSON;

    // constructor(
    //     id: string,
    //     description: string,
    //     output: Array<Array<string>>,
    //     solution: string,
    //     timeLimit: number,
    //     topic: TaskTopic,
    //     stage: TaskStage
    // )
    constructor(
        id: string,
        description: string,
        baselineCode: string,
        explaination: string,
        LeadRevealJson: any
    ) {
        super(id, description, TaskType.Authoring);

        // this.solution = solution;
        // this.output = output;
        // this.timeLimit = timeLimit;
        // this.topic = topic;
        // this.stage = stage;
        this.baselineCode = baselineCode;
        this.explaination = explaination;
        this.LeadRevealJson = LeadRevealJson;
    }

    checkCode(code: string): CodeCheckResult {
        if (code.length > 10) {
            return {
                passed: true,
            };
        } else {
            return {
                passed: false,
                message: "code is too short",
            };
        }
    }
}

export class ManualCodingTask extends Task {
    starterCode: string;
    constructor(id: string, description: string, starterCode: string) {
        super(id, description, TaskType.Coding);

        this.starterCode = starterCode;
    }

    checkCode(code: string): CodeCheckResult {
        if (code.length > 10) {
            return {
                passed: true,
            };
        } else {
            return {
                passed: false,
                message: "code is too short",
            };
        }
    }
}

export class ModifyingTask extends Task {
    starterCode: string;
    timeLimit: number;
    output: Array<Array<string>>;
    solution: string;
    topic: TaskTopic;
    stage: TaskStage;

    constructor(
        id: string,
        description: string,
        starterCode: string,
        output: Array<Array<string>>,
        solution: string,
        timeLimit: number,
        topic: TaskTopic,
        stage: TaskStage
    ) {
        super(id, description, TaskType.Modifying);

        this.solution = solution;
        this.output = output;
        this.timeLimit = timeLimit;
        this.starterCode = starterCode;
        this.topic = topic;
        this.stage = stage;
    }

    checkCode(code: string): CodeCheckResult {
        if (code.length > 10) {
            return {
                passed: true,
            };
        } else {
            return {
                passed: false,
                message: "code is too short",
            };
        }
    }
}

export class MultipleChoiceTask extends Task {
    choices: string[];
    correspondingQuestion: number;
    topic?: string;
    // answer: number;
    // topic: TaskTopic;
    // stage: TaskStage;

    constructor(
        id: string,
        description: string,
        choices: string[],
        correspondingQuestion: number,

        // answer: number,
        topic?: string
        // stage: TaskStage
    ) {
        super(id, description, TaskType.MultipleChoice);
        this.choices = choices;
        this.correspondingQuestion = correspondingQuestion;
        this.topic = topic;
        // this.answer = answer;
        // this.topic = topic;
        // this.stage = stage;
    }
}

export class ShortAnswerTask extends Task {
    constructor(id: string, description: string) {
        super(id, description, TaskType.ShortAnswer);
    }
}

export enum TaskTopic {
    basics = "basics",
    types = "types",
    conditionals = "conditionals",
    loops = "loops",
    arrays = "arrays",
}

export enum TaskStage {
    train = "train",
    test = "test",
    retention = "retention",
}

export const CodingTasks = [
    new AuthoringTask(
        "1",
        "Write a function reverse_list_with_queue(input_list: list) -> list that uses a Queue to reverse the provided list and return it.",
        tech1WarmupCode,
        tech1WarmupExplanation,
        tech1WarmupDecomposition
    ),

    new AuthoringTask(
        "2",
        `Write a function 'generate_parentheses(n: int, d: int) -> list[str]' that generates all combinations of 'n' pairs of valid parentheses, such that the depth of any valid parentheses substring does not exceed 'd'. The depth of a substring is defined as the maximum number of open parentheses at any point within the substring. For example, in '[][[]]' the max is 2, in '[[][[]]]' the max is 3, and in '[][][]' the max is 1. The function should return a list of all possible valid combinations of parentheses that meet the depth restriction.`,
        task1Code,
        task1Explanation,
        task1Decomposition
    ),

    new MultipleChoiceTask(
        "2MCQ1",
        "Thank you for completing this task. Please take a moment to pause, look away from the screen, and take several deep breaths, and center your thoughts. You can then proceed to answering several questions about your experience.\n\n How many deep breaths did you take?",
        [
            "- One! 😄",
            "- Two!! 👏😊👏",
            "- Three!!! 🌟😍🌟",
            "- Four!!!! 🔥🤯🔥",
            "- None ☹️",
        ],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ2",
        `How mentally demanding was it to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ3",
        `How physically demanding was it to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ4",
        `How pressured did you feel by time while trying to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ5",
        `How successful do you think you were in fully understanding the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ6",
        `How much effort did it take to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ7",
        `How frustrated were you during the process of trying to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ8",
        `How confident are you that you fully understood the concepts and approaches used in the AI-generated code, and can explain how they contribute to the overall functionality?`,
        [
            "1: Not at all Confident",
            "2: Slightly Confident",
            "3: Moderately Confident",
            "4: Very Confident",
            "5: Extremely Confident",
        ],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ9",
        "How confident are you in your ability to independently write, modify, or extend code of similar complexity to the AI-generated code?",
        [
            "1: Not at all Confident",
            "2: Slightly Confident",
            "3: Moderately Confident",
            "4: Very Confident",
            "5: Extremely Confident",
        ],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ10",
        "Please skip this question",
        ["skip"],
        0,
        "Frustrating"
    ),

    new MultipleChoiceTask(
        "2MCQ11",
        "Please skip this question",
        ["skip"],
        0,
        "Willing"
    ),

    new AuthoringTask(
        "3",
        "Write a function reverse_list_with_stack(input_list: list) -> list that uses a Stack to reverse the provided list and return it.",
        tech2WarmupCode,
        tech2WarmupExplanation,
        tech2WarmupDecomposition
    ),

    new AuthoringTask(
        "4",
        "Write a function 'longest_valid_brackets(s: str) -> int' that takes a string consisting of '<>', '[]', and '{}', and returns the length of the longest valid bracket substring. A sequence is considered valid if every opening bracket has a corresponding closing bracket in the correct order without any mismatches. For example, '[<>{}]' is valid, but '<[{]}>' is not. The function should use a stack to calculate the longest valid parenthesis substring.",
        task2Code,
        task2Explanation,
        task2Decomposition
    ),

    new MultipleChoiceTask(
        "4MCQ1",
        "Thank you for completing this task. Please take a moment to pause, look away from the screen, and take several deep breaths, and center your thoughts. You can then proceed to answering several questions about your experience.\n\n How many deep breaths did you take?",
        [
            "- One! 😄",
            "- Two!! 👏😊👏",
            "- Three!!! 🌟😍🌟",
            "- Four!!!! 🔥🤯🔥",
            "- None ☹️",
        ],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ2",
        `How mentally demanding was it to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ3",
        `How physically demanding was it to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ4",
        `How pressured did you feel by time while trying to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ5",
        `How successful do you think you were in fully understanding the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ6",
        `How much effort did it take to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ7",
        `How frustrated were you during the process of trying to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ8",
        `How confident are you that you fully understood the concepts and approaches used in the AI-generated code, and can explain how they contribute to the overall functionality?`,
        [
            "1: Not at all Confident",
            "2: Slightly Confident",
            "3: Moderately Confident",
            "4: Very Confident",
            "5: Extremely Confident",
        ],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ9",
        "How confident are you in your ability to independently write, modify, or extend code of similar complexity to the AI-generated code?",
        [
            "1: Not at all Confident",
            "2: Slightly Confident",
            "3: Moderately Confident",
            "4: Very Confident",
            "5: Extremely Confident",
        ],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ10",
        "Please skip this question",
        ["skip"],
        1,
        "Frustrating"
    ),

    new MultipleChoiceTask(
        "4MCQ11",
        "Please skip this question",
        ["skip"],
        1,
        "Willing"
    ),

    new AuthoringTask(
        "5",
        "Write a function `is_palindrome(s: str) -> bool` that checks if the input string `s` is palindrome. A palindrome is a sequence of characters that reads the same forward and backward. For example, `racecar` is a palindrome.",
        tech3WarmupCode,
        tech3WarmupExplanation,
        tech3WarmupDecomposition
    ),

    new AuthoringTask(
        "6",
        "Given an array of integers nums and an integer k, find the maximum value in each sliding window of size k. If we didn't want to use the built-in max method",
        task3Code,
        task3Explanation,
        task3Decomposition
    ),

    new MultipleChoiceTask(
        "6MCQ1",
        "Thank you for completing this task. Please take a moment to pause, look away from the screen, and take several deep breaths, and center your thoughts. You can then proceed to answering several questions about your experience.\n\n How many deep breaths did you take?",
        [
            "- One! 😄",
            "- Two!! 👏😊👏",
            "- Three!!! 🌟😍🌟",
            "- Four!!!! 🔥🤯🔥",
            "- None ☹️",
        ],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ2",
        `How mentally demanding was it to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ3",
        `How physically demanding was it to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ4",
        `How pressured did you feel by time while trying to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ5",
        `How successful do you think you were in fully understanding the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ6",
        `How much effort did it take to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ7",
        `How frustrated were you during the process of trying to fully understand the AI-generated code?`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ8",
        `How confident are you that you fully understood the concepts and approaches used in the AI-generated code, and can explain how they contribute to the overall functionality?`,
        [
            "1: Not at all Confident",
            "2: Slightly Confident",
            "3: Moderately Confident",
            "4: Very Confident",
            "5: Extremely Confident",
        ],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ9",
        "How confident are you in your ability to independently write, modify, or extend code of similar complexity to the AI-generated code?",
        [
            "1: Not at all Confident",
            "2: Slightly Confident",
            "3: Moderately Confident",
            "4: Very Confident",
            "5: Extremely Confident",
        ],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ10",
        "Please skip this question",
        ["skip"],
        2,
        "Frustrating"
    ),

    new MultipleChoiceTask(
        "6MCQ11",
        "Please skip this question",
        ["skip"],
        2,
        "Willing"
    ),

    // coding tasks for evaluations
    new ManualCodingTask(
        "mc1",
        "Write a function 'generate_brackets(n: int, d: int) -> list[str]' that generates all combinations of 'n' pairs of valid square brackets, such that the maximum number of consecutive opening brackets does not exceed 'd'. For example, the maximum consecutive opening brackets in '[][[]]' is 2, in '[[]][[]]' is again 2, in '[][][]' is 1, but in '[[[]][]]' is 3. The function should return a list of all possible valid combinations of square brackets that meet the depth restriction.",
        `def generate_brackets(n: int, d: int) -> list[str]:
    """
    Write a function 'generate_brackets(n: int, d: int) -> list[str]' that generates all combinations of 'n' pairs of valid square brackets, such that the maximum number of consecutive opening brackets does not exceed 'd'. For example, the maximum consecutive opening brackets in '[][[]]' is 2, in '[[]][[]]' is again 2, in '[][][]' is 1, but in '[[[]][]]' is 3. The function should return a list of all possible valid combinations of square brackets that meet the depth restriction.
        
    Args:
        n (int): The number of pairs of square brackets to generate.
        d (int): The maximum allowed depth of consecutive opening brackets.
        
    Returns:
        list[str]: A list of strings, each representing a valid combination of 'n' pairs of square brackets that meets the depth restriction.
        
    Examples:
        >>> generate_brackets(2, 1)
        ['[][]']
        
        >>> generate_brackets(2, 2)
        ['[[]]', '[][]']
        
        >>> generate_brackets(3, 2)
        ['[[][]]', '[[]][]', '[][[]]', '[][][]']
        
        >>> generate_brackets(4, 1)
        ['[][][][]']
        
        >>> generate_brackets(3, 3)
        ['[[[]]]', '[[][]]', '[[]][]', '[][[]]', '[][][]']
    """
`
    ),

    new ManualCodingTask(
        "fc2",
        `The function 'word_ladder(begin_word: str, end_word: str, word_list: list[str]) -> int' is supposed to find the shortest transformation sequence from 'begin_word' to 'end_word' using only words from 'word_list', where each step can only change one letter and must form a valid word. The function should return the length of the shortest transformation sequence. If no such sequence exists, it returns '0'. Please fill out the #TODO parts.`,
        `def word_ladder(begin_word: str, end_word: str, word_list: list[str]) -> int:
    """
    The function 'word_ladder(begin_word: str, end_word: str, word_list: list[str]) -> int' is supposed to find the shortest transformation sequence from 'begin_word' to 'end_word' using only words from 'word_list', where each step can only change one letter and must form a valid word. The function should return the length of the shortest transformation sequence. If no such sequence exists, it returns '0'.
    
    Please fill out the #TODO parts.
    """

    word_set = set(word_list)
    q = # TODO: fill this part
    
    while q:
        current_word, steps = # TODO: fill this part
        
        if # TODO: fill this part
            return steps
        
        for i in range(len(current_word)):
            for char in 'abcdefghijklmnopqrstuvwxyz':
                next_word = current_word[:i] + char + current_word[i+1:]
                
                if next_word in word_set:
                    q.append( # TODO: fill this part
                    word_set.remove(next_word)
    
    return 0
`
    ),

    new ManualCodingTask(
        "mc3",
        "Write a function 'longest_valid_parentheses(s: str) -> int' that determines the length of the longest valid (well-formed) parentheses substring within the string 's'. The function should return the maximum length of such a substring. For example, given the input 's = \"(()\"', the output should be '2', as the longest valid substring is '\"()\"'. For 's = \")()())\"', the output should be '4' due to the substring '\"()()\"'. Another example would be 's = \"\"', where the output should be '0' since there are no valid parentheses.",
        `def longest_valid_parentheses(s: str) -> int:
    """
    Write a function 'longest_valid_parentheses(s: str) -> int' that determines the length of the longest valid (well-formed) parentheses substring within the string 's'. The function should return the maximum length of such a substring. For example, given the input 's = "(()"', the output should be '2', as the longest valid substring is '"()"'. For 's = ")()())"', the output should be '4' due to the substring '"()()"'. Another example would be 's = ""', where the output should be '0' since there are no valid parentheses.
    
    Args:
        s (str): The input string containing only '(' and ')'.
        
    Returns:
        int: The length of the longest valid parentheses substring.
        
    Examples:
        >>> longest_valid_parentheses("(()")
        2
        
        >>> longest_valid_parentheses(")()())")
        4
        
        >>> longest_valid_parentheses("((())(()")
        4
                
        >>> longest_valid_parentheses(")(()")
        2
                
        >>> longest_valid_parentheses("()(())))")
        6
    """
`
    ),

    new ManualCodingTask(
        "fc4",
        `Write a function 'longest_valid_dna_subsequence(s: str) -> str' that finds and returns the longest valid subsequence of a DNA string where each 'A' is paired with a 'T' and each 'C' is paired with a 'G'. The DNA string is considered valid if the sequence of pairs is correctly balanced, meaning every 'A' has a corresponding 'T' after it and every 'C' has a corresponding 'G'. For example, in the string '"ATCGGCAT"', the longest valid subsequence is '"ATCGGC"', while in the string '"ATATGC"', the longest valid subsequence is '"ATAT"'. The function should return this subsequence as a string.`,
        `def longest_valid_dna_subsequence(s: str) -> str:
    """
    Write a function 'longest_valid_dna_subsequence(s: str) -> str' that finds and returns the longest valid subsequence of a DNA string where each 'A' is paired with a 'T' and each 'C' is paired with a 'G'. The DNA string is considered valid if the sequence of pairs is correctly balanced, meaning every 'A' has a corresponding 'T' after it and every 'C' has a corresponding 'G'. For example, in the string '"ATCGGCAT"', the longest valid subsequence is '"ATCGGC"', while in the string '"ATATGC"', the longest valid subsequence is '"ATAT"'. The function should return this subsequence as a string.

    Please fill out the #TODO parts.
    """
    pair_map = {'A': 'T', 'C': 'G'}
    stack = [-1]
    max_length = 0
    start_index = 0
    
    for i in range(len(s)):
        char = s[i]
        
        if char in pair_map:
            stack.append(i)
        else:
            not_empty = len(stack) > 1
            last_is_open = stack[-1] != -1 and s[stack[-1]] in pair_map
            is_match = last_is_open and pair_map[s[stack[-1]]] == char
            
            if not_empty and is_match:
                # TODO: fill this part
            else:
                # TODO: fill this part
    
    return # TODO: fill this part
`
    ),

    new ManualCodingTask(
        "mc5",
        `Write a function 'sliding_window_minimum(nums: list[int], k: int) -> list[tuple[int, int]]' that finds the minimum value within every sliding window of size 'k' in the given list 'nums', and returns a list of tuples where each tuple contains the minimum value and its index within the window. The sliding window moves one position at a time from left to right across the list. For example, given 'nums = [4, 2, 12, 3, 8]' and 'k = 3', the function should return '[(2, 1), (2, 1), (3, 3)]', and for 'nums = [1, 3, -1, -3, 5]' with 'k = 2', it should return '[(1, 0), (-1, 2), (-3, 3), (-3, 3)]'.`,
        `def sliding_window_minimum(nums: list[int], k: int) -> list[tuple[int, int]]:
    """
    Write a function 'sliding_window_minimum(nums: list[int], k: int) -> list[tuple[int, int]]' that finds the minimum value within every sliding window of size 'k' in the given list 'nums', and returns a list of tuples where each tuple contains the minimum value and its index within the window. The sliding window moves one position at a time from left to right across the list. For example, given 'nums = [4, 2, 12, 3, 8]' and 'k = 3', the function should return '[(2, 1), (2, 1), (3, 3)]', and for 'nums = [1, 3, -1, -3, 5]' with 'k = 2', it should return '[(1, 0), (-1, 2), (-3, 3), (-3, 3)]'.
    
    Args:
        nums (list[int]): The list of integers to process.
        k (int): The size of the sliding window.
        
    Returns:
        list[tuple[int, int]]: A list of tuples, each containing the minimum value within the sliding window and its corresponding index in the original list.
        
    Examples:
        >>> sliding_window_minimum([4, 2, 12, 3, 8], 3)
        [(2, 1), (2, 1), (3, 3)]
        
        >>> sliding_window_minimum([1, 3, -1, -3, 5], 2)
        [(1, 0), (-1, 2), (-3, 3), (-3, 3)]
        
        >>> sliding_window_minimum([10, 5, 2, 7, 8, 7], 3)
        [(2, 2), (2, 2), (2, 2), (7, 3)]
        
        >>> sliding_window_minimum([4, 5, 6, 3, 2, 1], 4)
        [(3, 3), (2, 4), (1, 5)]
        
        >>> sliding_window_minimum([7, 2, 5, 3, 6, 4], 2)
        [(2, 1), (2, 1), (3, 3), (3, 3), (4, 5)]
    """
`
    ),
];

export const getNextTask = (completedTasks: IUserTask[]): Task | null => {
    for (let i = 0; i < CodingTasks.length; i++) {
        if (!completedTasks.find((t) => t.taskId === CodingTasks[i].id)) {
            return CodingTasks[i];
        }
    }

    return null;
};

export const getTaskSequenceFromTaskId = (taskId: string): number =>
    CodingTasks.findIndex((task) => task.id === taskId) + 1000;

export const getTaskFromTaskId = (taskId: string): Task | undefined =>
    CodingTasks.find((task) => task.id === taskId);

(function checkUniqueIds() {
    const taskIds = CodingTasks.map((task) => task.id);

    if (new Set(taskIds).size !== taskIds.length) {
        throw new Error("Task ids must be unique");
    }
})();
