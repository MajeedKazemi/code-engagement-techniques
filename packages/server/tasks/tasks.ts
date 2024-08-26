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
    new MultipleChoiceTask(
        "0MCQVID",
        `<h1>Watch the Following Video</h1>
<br/>
<br/>
<p>Here is a short video that explains what you will be doing in the study</p>
<iframe
    width="900"
    height="550"
    src="https://www.youtube.com/embed/WzakOxPM0DA"
    title="Study Instructions"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
></iframe>
<br/>
<br/>
<h3>Did you watch the video and learn about the study instructions?</h3>
        `,
        [
            "No - I did not watch the video.",
            "Yes - I understand the study instructions.",
        ],
        2
    ),

    new MultipleChoiceTask(
        "PRE1",
        `<h1>Study Introduction</h1>

<p>Imagine you're working on a large coding project and need to implement several functions. You know their behavior and have some input/output examples but lack the details for implementation. You decided to use an AI tool like ChatGPT to generate the code.</p>
<br/>
<p>For each task, you will first be presented with the task description and examples. Please carefully read them and ensure you understand the problem and the expected behavior of the function you are about to work on. Additionally, you can:</p>
<ul>
    <li>You can simply copy the task description for each task.</li>
    <li>You should test the generated code (with the provided examples) to ensure that it is working properly.</li>
    <li>You will have 5 minutes for the warm-up tasks and 15 minutes for the others.</li>
</ul>

<p><strong>You can then move on to the next task when you feel confident that you understood the AI-generated code.</strong></p>
<br/>
<p>You will be working on six tasks and then at the end of them, you will be given a second series of tasks to review the concepts that were introduced.</p>
<br/>
<br/>
<p>Before you start working on the tasks using the AI-Assisted Programming tool, you must read the instructions carefully.</p>

<h2>Have you thoroughly read the instructions?</h2>`,
        ["No 😞 - And I will not participate in the study.", "Yes 😊"],
        2
    ),

    new MultipleChoiceTask(
        "INST1",
        `<h1>Using Lists as Queues in Python</h1>
        <br/>
        <br/>
<p>In the next two tasks we will be working on two tasks that use the <i>queue</i> data structure to solve complex problems. However, note that we will be using the <b>list</b> data type as a Queue. Here's how:</p>
<br/>
<ul>
    <li>To create a queue, we can simply write: <b>q = []</b></li>
    <li>To initialize the queue with an initial value, we can write: <b>q = ['val']</b></li>
    <li>To add an item to the end of the queue, we use the <b>q.append('val')</b> method.</li>
    <li>To remove an item from the beginning of the queue, we use the <b>q.pop(0)</b> method.</li>
</ul>
<br/>
<p>What will be the result of the following code snippet?</p>
<div class="code-block">
q = [0] # define queue and initialize with 0

for i in range(5):
    item = q.pop(0) # remove the first item from the queue and assign it to item
    q.append(i + item) # add the sum of i and the removed item to the end of the queue

print(q)
</div>

<br/>
<h3>What will be the output of the code snippet?</h3>`,
        ["[0]", "[1, 2, 3, 4]", "[10]", "[4]"],
        2
    ),

    new MultipleChoiceTask(
        "VID1",
        `<h1>Watch the Following Video</h1>
<br/>
<br/>
<p>Here is a short video that explains what you will be doing in the study</p>
<iframe
    width="900"
    height="550"
    src="https://www.youtube.com/embed/-UEJzIbt8L8"
    title="Study Instructions"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
></iframe>
<br/>
<br/>
<h3>Did you watch the video and learn about the study instructions?</h3>
        `,
        [
            "No - I did not watch the video.",
            "Yes - I understand the study instructions.",
        ],
        0,
        "video"
    ),

    new MultipleChoiceTask(
        "T1RB",
        `<h1>Warm-Up Task 1 - <b>Using AI</b>: Reverse List (Using Queue)</h1>
<br/>
<h2>**You will use AI to solve this task**</h2>
<br/>
<h2>A <b>timer</b> is in the top right: Do not spend more than <i>5 minutes</i> on this warm-up task. After learning how the new system works, proceed to the actual task.</h2>
<br/>
<br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a function <b>reverse_list_with_queue(input_list: list) -> list</b> that uses a <b>Queue</b> to reverse the provided list and return it.</p>
<br/>
<p>Examples:</p>
<pre class="code-block">
reverse_list_with_queue(['e', 'f', 'i', 'l'])
# Output: ['l', 'i', 'f', 'e']
</pre>
<pre class="code-block">
reverse_list_with_queue([13, 8, 5, 3, 2, 1, 1])
# Output: [1, 1, 2, 3, 5, 8, 13]
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new AuthoringTask(
        "1",
        "Write a function reverse_list_with_queue(input_list: list) -> list that uses a Queue to reverse the provided list and return it.",
        tech1WarmupCode,
        tech1WarmupExplanation,
        tech1WarmupDecomposition
    ),

    new MultipleChoiceTask(
        "T2RB",
        `<h1>Task 2 - <b>Using AI</b>: Generate Valid Brackets (Using Queue)</h1>
<br/>
<h2>**You will use AI to solve this task, but you will be evaluated on it at the end of the study without AI assistance.**</h2>
<br/>
<h2>A <b>timer</b> is in the top right: Do not spend more than <i>15 minutes</i> on this task. After understanding and testing the solution, proceed to the next task.</h2>
<br/>
<br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a function <b>generate_parentheses(n: int, d: int) -> list[str]</b> that generates all combinations of <b>n</b> pairs of valid parentheses, such that the depth of any valid parentheses substring does not exceed <b>d</b>. The depth of a substring is defined as the maximum number of open parentheses at any point within the substring. For example, in <b>[][[]]</b> the max is 2, in <b>[[][[]]]</b> the max is 3, and in <b>[][][]</b> the max is 1. The function should return a list of all possible valid combinations of parentheses that meet the depth restriction.</p>
<br/>
<p>Examples:</p>
<div class="code-block">
generate_parentheses(2, 2)
# Output: ['[[]]', '[][]']
# Explanation: For n=2, the function needs to generate all valid combinations of 2 pairs of parentheses. Since m=2, there is no restriction on the depth, so both combinations '[[]]' and '[][]' are valid and included in the result.
</div>
<div class="code-block">
generate_parentheses(3, 2)
# Output: ['[][[]]', '[][][]', '[[]][]']
# Explanation: With n=3, the goal is to create valid combinations with 3 pairs of parentheses. The restriction m=2 limits nesting depth to 2, excluding '[[[]]]' but allowing combinations like '[][[]]', '[][][]', and '[[]][]' that respect the depth limit.
</div>
<div class="code-block">
generate_parentheses(3, 1)
# Output: ['[][][]']
# Explanation: When n=3 and m=1, the nesting depth cannot exceed 1, which only allows for the pattern '[][][]', where no parentheses are nested more than one level deep.
</div>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new AuthoringTask(
        "2",
        `Write a function generate_parentheses(n: int, d: int) -> list[str] that generates all combinations of <b>n</b> pairs of valid parentheses, such that the depth of any valid parentheses substring does not exceed d. The depth of a substring is defined as the maximum number of open parentheses at any point within the substring. For example, in [][[]] the max is 2, in [[][[]]] the max is 3, and in [][][] the max is 1. The function should return a list of all possible valid combinations of parentheses that meet the depth restriction.`,
        task1Code,
        task1Explanation,
        task1Decomposition
    ),

    new MultipleChoiceTask(
        "2MCQ1",
        "<h1>(1/11)</h1><br/><h3>Thank you for completing this task. Please take a moment to pause, look away from the screen, and take several deep breaths, and center your thoughts. You can then proceed to answering several questions about your experience.</h3><br/><br/><h3>How many deep breaths did you take?</h3>",
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
        `<h1>(2/11)</h1><br/><h3>How mentally demanding was it to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ3",
        `<h1>(3/11)</h1><br/><h3>How physically demanding was it to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ4",
        `<h1>(4/11)</h1><br/><h3>How pressured did you feel by time while trying to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ5",
        `<h1>(5/11)</h1><br/><h3>How successful do you think you were in fully understanding the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ6",
        `<h1>(6/11)</h1><br/><h3>How much effort did it take to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ7",
        `<h1>(7/11)</h1><br/><h3>How frustrated were you during the process of trying to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        0
    ),

    new MultipleChoiceTask(
        "2MCQ8",
        `<h1>(8/11)</h1><br/><h3>How confident are you that you fully understood the concepts and approaches used in the AI-generated code, and can explain how they contribute to the overall functionality?</h3>`,
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
        "<h1>(9/11)</h1><br/><h3>How confident are you in your ability to independently write, modify, or extend code of similar complexity to the AI-generated code?</h3>",
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
        "<h1>(10/11)</h1><br/><h3>Please skip this question (This is not a bug!)</h3>",
        ["skip"],
        0,
        "Frustrating"
    ),

    new MultipleChoiceTask(
        "2MCQ11",
        "<h1>(11/11)</h1><br/><h3>Please skip this question (This is not a bug!)</h3>",
        ["skip"],
        0,
        "Willing"
    ),

    new MultipleChoiceTask(
        "INST2",
        `<h1>Using Lists as Stacks in Python</h1>
        <br/>
        <br/>
<p>In the next two tasks we will be working on two tasks that use the <i>stack</i> data structure to solve complex problems. However, note that we will be using the <b>list</b> data type as a Stack. Here's how:</p>
<br/>
<ul>
    <li>To create a stack, we can simply write: <b>s = []</b></li>
    <li>To initialize the stack with an initial value, we can write: <b>s = ['val']</b></li>
    <li>To add an item to the top of the stack, we use the <b>s.append('val')</b> method.</li>
    <li>To peek at the top item of the stack (access the top item without removing it), we use the index <b>s[-1]</b>.</li>
    <li>To remove the top item from the stack, we use the <b>s.pop()</b> method.</li>
</ul>
<br/>
<p>What will be the result of the following code snippet?</p>
<div class="code-block">
s = [0, 1]  # define stack and initialize with 0, 1, 2

for i in range(2):
    item = s.pop()  # remove the top item from the stack and assign it to item
    s.append(i)  # add i to the top of the stack
    s.append(item)  # add the removed item back to the top of the stack

print(s)
</div>

<br/>
<h3>What will be the output of the code snippet?</h3>`,
        ["[0, 1]", "[1, 0]", "[0, 1, 0, 1]", "[0, 0, 1, 1]"],
        2
    ),

    new MultipleChoiceTask(
        "VID2",
        `<h1>Watch the Following Video</h1>
<br/>
<br/>
<p>Here is a short video that explains what you will be doing in the study</p>
<iframe
  width="900"
  height="550"
  src="https://www.youtube.com/embed/-UEJzIbt8L8"
  title="Study Instructions"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
<br/>
<br/>
<h3>Did you watch the video and learn about the study instructions?</h3>
      `,
        [
            "No - I did not watch the video.",
            "Yes - I understand the study instructions.",
        ],
        1,
        "video"
    ),

    new MultipleChoiceTask(
        "T3RB",
        `<h1>Warm-Up Task 3 - <b>Using AI</b>: Reverse List (Using Stack)</h1>
<br/>
<h2>**You will use AI to solve this task**</h2>
<br/>
<h2>A <b>timer</b> is in the top right: Do not spend more than <i>5 minutes</i> on this warm-up task. After learning how the new system works, proceed to the actual task.</h2>
<br/>
<br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a function <b>reverse_list_with_stack(input_list: list) -> list</b> that uses a Stack to reverse the provided list and return it.</p>
<br/>
<p>Examples:</p>
<pre class="code-block">
reverse_list_with_queue(['e', 'f', 'i', 'l'])
# Output: ['l', 'i', 'f', 'e']
</pre>
<pre class="code-block">
reverse_list_with_queue([13, 8, 5, 3, 2, 1, 1])
# Output: [1, 1, 2, 3, 5, 8, 13]
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new AuthoringTask(
        "3",
        "Write a function reverse_list_with_stack(input_list: list) -> list that uses a Stack to reverse the provided list and return it.",
        tech2WarmupCode,
        tech2WarmupExplanation,
        tech2WarmupDecomposition
    ),

    new MultipleChoiceTask(
        "T4RB",
        `<h1>Task 4 - <b>Using AI</b>: Longest Valid Brackets and Braces (Using Stack)</h1>
<br/>
<h2>**You will use AI to solve this task, but you will be evaluated on it at the end of the study without AI assistance.**</h2>
<br/>
<h2>A <b>timer</b> is in the top right: Do not spend more than <i>15 minutes</i> on this task. After understanding and testing the solution, proceed to the next task.</h2>
<br/>
<br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a function <b>longest_valid_brackets(s: str) -> int</b> that takes a string consisting of <b><></b>, <b>[]</b>, and <b>{}</b>, and returns the length of the longest valid bracket substring. A sequence is considered valid if every opening bracket has a corresponding closing bracket in the correct order without any mismatches. For example, <b>[<>{}]</b> is valid, but <b><[{]}></b> is not. The function should use a stack to calculate the longest valid parenthesis substring.</p>
<br/>
<p>Examples:</p>
<pre class="code-block">
longest_valid_brackets("(()")
# Output: 2
# Explanation: The valid substring is "()", which starts at index 1 and ends at index 2. Although the first bracket is unmatched, the substring "()" is valid, so the function returns 2.
</pre>
<pre class="code-block">
longest_valid_brackets("((())")
# Output: 4
# Explanation: The longest valid substring is "(())", which starts at index 1 and ends at index 4. The unmatched opening bracket at the start does not affect the longest valid substring, so the function returns 4.
</pre>
<pre class="code-block">
longest_valid_brackets(")()())()()(")
# Output: 4
# Explanation: There are multiple valid substrings, such as "()()" starting at index 1 and ending at index 4. The function returns 4, which is the length of the longest valid substring.
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
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
        "<h1>(1/11)</h1><br/><h3>Thank you for completing this task. Please take a moment to pause, look away from the screen, and take several deep breaths, and center your thoughts. You can then proceed to answering several questions about your experience.</h3><br/><br/><h3>How many deep breaths did you take?</h3>",
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
        `<h1>(2/11)</h1><br/><h3>How mentally demanding was it to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ3",
        `<h1>(3/11)</h1><br/><h3>How physically demanding was it to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ4",
        `<h1>(4/11)</h1><br/><h3>How pressured did you feel by time while trying to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ5",
        `<h1>(5/11)</h1><br/><h3>How successful do you think you were in fully understanding the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ6",
        `<h1>(6/11)</h1><br/><h3>How much effort did it take to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ7",
        `<h1>(7/11)</h1><br/><h3>How frustrated were you during the process of trying to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        1
    ),

    new MultipleChoiceTask(
        "4MCQ8",
        `<h1>(8/11)</h1><br/><h3>How confident are you that you fully understood the concepts and approaches used in the AI-generated code, and can explain how they contribute to the overall functionality?</h3>`,
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
        "<h1>(9/11)</h1><br/><h3>How confident are you in your ability to independently write, modify, or extend code of similar complexity to the AI-generated code?</h3>",
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
        "<h1>(10/11)</h1><br/><h3>Please skip this question (This is not a bug!)</h3>",
        ["skip"],
        1,
        "Frustrating"
    ),

    new MultipleChoiceTask(
        "4MCQ11",
        "<h1>(11/11)</h1><br/><h3>Please skip this question (This is not a bug!)</h3>",
        ["skip"],
        1,
        "Willing"
    ),

    new MultipleChoiceTask(
        "INST3",
        `<h1>Using Lists as a Double-Ended Queue in Python</h1>
        <br/>
        <br/>
<p>Double-Ended Queues (de-queues) are a versatile data structure that allows insertion and deletion at both the front and back of the queue.</p>
<br/>
<p>In the next two tasks we will be working on two tasks that use the <i>double-ended queue</i> (or de-queue) data structure to solve complex problems. However, note that we will be using the <b>list</b> data type as a Double-Ended Queue. Here's how:</p>
<br/>
<ul>
    <li>To create a double-ended queue, we can simply write: <b>dq = []</b></li>
    <li>To initialize the dq with an initial value, we can write: <b>dq = ['val']</b></li>
    <li>To add an item to the end of the queue, we use the <b>dq.append('val')</b> method.</li>
    <li>To see the end of the queue, we use the <b>dq[-1]</b> method.</li>
    <li>To remove an item from the end of the queue, we use the <b>dq.pop()</b> method.</li>
    <li>To add an item to the front of the queue, we use the <b>dq.insert(0, 'val')</b> method.</li>
    <li>To remove an item from the front of the queue, we use the <b>dq.pop(0)</b> method.</li>
    <li>To see the front of the queue, we use the <b>dq[0]</b> method.</li>
</ul>
<br/>
<p>What will be the result of the following code snippet?</p>
<div class="code-block">
dq = [2] # define an empty double-ended queue

for i in range(2):
    dq.append(i) # add i to the end of the queue
    dq.pop(0) # remove the first item from the queue
    dq.insert(0, i) # add i to the front of the queue
    dq.pop() # remove the last item from the queue

print(dq)
</div>

<br/>
<h3>What will be the output of the code snippet?</h3>`,
        ["[1]", "[0, 1, 0]", "[2]", "[1, 0, 1]"],
        2
    ),

    new MultipleChoiceTask(
        "VID3",
        `<h1>Watch the Following Video</h1>
<br/>
<br/>
<p>Here is a short video that explains what you will be doing in the study</p>
<iframe
  width="900"
  height="550"
  src="https://www.youtube.com/embed/-UEJzIbt8L8"
  title="Study Instructions"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
<br/>
<br/>
<h3>Did you watch the video and learn about the study instructions?</h3>
      `,
        [
            "No - I did not watch the video.",
            "Yes - I understand the study instructions.",
        ],
        2,
        "video"
    ),

    new MultipleChoiceTask(
        "T5RB",
        `<h1>Warm-Up Task 5 - <b>Using AI</b>: Sliding Window Maximum (Using Double-Ended Queue)</h1>
<br/>
<h2>**You will use AI to solve this task**</h2>
<br/>
<h2>A <b>timer</b> is in the top right: Do not spend more than <i>5 minutes</i> on this warm-up task. After learning how the new system works, proceed to the actual task.</h2>
<br/>
<br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a function <b>is_palindrome(s: str) -> bool</b> that checks if the input string <b>s</b> is palindrome. A palindrome is a sequence of characters that reads the same forward and backward. For example, <b>"racecar"</b> is a palindrome.</p>
<br/>
<p>Examples:</p>
<pre class="code-block">
is_palindrome("kayak")
# Output: True
</pre>
<pre class="code-block">
is_palindrome("step on no pets")
# Output: True
</pre>
<pre class="code-block">
is_palindrome("raider")
# Output: False
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new AuthoringTask(
        "5",
        "Write a function `is_palindrome(s: str) -> bool` that checks if the input string `s` is palindrome. A palindrome is a sequence of characters that reads the same forward and backward. For example, `racecar` is a palindrome.",
        tech3WarmupCode,
        tech3WarmupExplanation,
        tech3WarmupDecomposition
    ),

    new MultipleChoiceTask(
        "T6RB",
        `<h1>Task 6 - <b>Using AI</b>: Sliding Window Maximum (Using Double-Ended Queue)</h1>
<br/>
<h2>**You will use AI to solve this task, but you will be evaluated on it at the end of the study without AI assistance.**</h2>
<br/>
<h2>A <b>timer</b> is in the top right: Do not spend more than <i>15 minutes</i> on this task. After understanding and testing the solution, proceed to the next task.</h2>
<br/>
<br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a function <b>max_sliding_window(nums: list[int], k: int) -> list[int]</b> that takes an array of integers <b>nums</b> and an integer <b>k</b>, and returns a list containing the maximum value from each sliding window of size <b>k</b> as it moves from left to right across the array. A sliding window is a contiguous subarray of length <b>k</b> that slides one element at a time from the start to the end of the array. The function should find the maximum value in each window efficiently using a double-ended queue (deque) to ensure an optimal time complexity of O(n). For example, given <b>nums = [1,3,-1,-3,5,3,6,7]</b> and <b>k = 3</b>, the function should return <b>[3, 3, 5, 5, 6, 7]</b>.</p>
<br/>
<p>Examples:</p>
<pre class="code-block">
sliding_window_maximum([1,3,-1,-3,5,3,6,7], 3)
# Output: [3, 3, 5, 5, 6, 7]
# Explanation: The sliding windows are:
# - [1, 3, -1] -> max is 3
# - [3, -1, -3] -> max is 3
# - [-1, -3, 5] -> max is 5
# - [-3, 5, 3] -> max is 5
# - [5, 3, 6] -> max is 6
# - [3, 6, 7] -> max is 7
</pre>
<pre class="code-block">
sliding_window_maximum([4, 2, 12, 3, 7], 4)
# Output: [12, 12]
# Explanation: The sliding windows are:
# - [4, 2, 12, 3] -> max is 12
# - [2, 12, 3, 7] -> max is 12
</pre>
<pre class="code-block">
sliding_window_maximum([9, 11, 8, 5, 7, 10], 2)
# Output: [11, 11, 8, 7, 10]
# Explanation: The sliding windows are:
# - [9, 11] -> max is 11
# - [11, 8] -> max is 11
# - [8, 5] -> max is 8
# - [5, 7] -> max is 7
# - [7, 10] -> max is 10
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
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
        "<h1>(1/11)</h1><br/><h3>Thank you for completing this task. Please take a moment to pause, look away from the screen, and take several deep breaths, and center your thoughts. You can then proceed to answering several questions about your experience.</h3><br/><br/><h3>How many deep breaths did you take?</h3>",
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
        `<h1>(2/11)</h1><br/><h3>How mentally demanding was it to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ3",
        `<h1>(3/11)</h1><br/><h3>How physically demanding was it to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ4",
        `<h1>(4/11)</h1><br/><h3>How pressured did you feel by time while trying to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ5",
        `<h1>(5/11)</h1><br/><h3>How successful do you think you were in fully understanding the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ6",
        `<h1>(6/11)</h1><br/><h3>How much effort did it take to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ7",
        `<h1>(7/11)</h1><br/><h3>How frustrated were you during the process of trying to fully understand the AI-generated code?</h3>`,
        ["1: Very Low", "2: Low", "3: Moderate", "4: High", "5: Very High"],
        2
    ),

    new MultipleChoiceTask(
        "6MCQ8",
        `<h1>(8/11)</h1><br/><h3>How confident are you that you fully understood the concepts and approaches used in the AI-generated code, and can explain how they contribute to the overall functionality?</h3>`,
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
        "<h1>(9/11)</h1><br/><h3>How confident are you in your ability to independently write, modify, or extend code of similar complexity to the AI-generated code?</h3>",
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
        "<h1>(10/11)</h1><br/><h3>Please skip this question. (This is not a bug!)</h3>",
        ["skip"],
        2,
        "Frustrating"
    ),

    new MultipleChoiceTask(
        "6MCQ11",
        "<h1>(11/11)</h1><br/><h3>Please skip this question. (This is not a bug!)</h3>",
        ["skip"],
        2,
        "Willing"
    ),

    new MultipleChoiceTask(
        "PRE2",
        "<h1>Take a Short Break</h1><p>Thank you for completing the six tasks using our AI tools. Before proceeding to the next set of tasks, please take a short break (~5-10 minutes).</p><br/><p>After that you can continue with the next set of tasks.</p>",
        ["I didn't take a break.", "I took a break. Let's continue."],
        2
    ),

    new MultipleChoiceTask(
        "PRE3",
        `<h1>Next Phase of Study</h1>
        <p>In the upcoming tasks, you will be given several programming tasks very similar in complexity to the previous tasks that you solved using AI.</p>
        <p>In these tasks you will need to fill in the blanks in the provided code snippets to implement the requested behavior.</p>
        <p>You will not have access to the AI anymore and you will need to complete the provided code manually.</p>
        <br/>
        <br/>
        <p>Are you ready?</p>`,
        ["I am not ready.", "I am ready for the next phase."],
        2
    ),

    new MultipleChoiceTask(
        "MC1RB",
        `<h1>Task 1: Generate Valid Parentheses (Using Queue)</h1>
        <br/>
        <h2>A <b>timer</b> is in the top right of your screen: Do not spend more than <i>10 minutes</i> on this task. If you can't solve it within 10 minutes, please submit and skip the task.</h2>
        <br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a function <b>generate_brackets(n: int, d: int) -> list[str]</b> that generates all combinations of <b>n</b> pairs of valid square brackets, such that the maximum number of consecutive opening brackets does not exceed <b>d</b>. For example, the maximum consecutive opening brackets in <b>[][[]]</b> is 2, in <b>[[]][[]]</b> is again 2, in <b>[][][]</b> is 1, but in <b>[[[]][]]</b> is 3. The function should return a list of all possible valid combinations of square brackets that meet the depth restriction.</p>
<br/>
<p>Examples:</p>
<pre class="code-block">
generate_brackets(2, 1)
# Output: ["[][]"]
# Explanation: For 2 pairs of square brackets with a maximum of 1 consecutive opening bracket, the only valid combination is "[][]". Any combination with more than one consecutive opening bracket, such as "[[]]", is not allowed.
</pre>
<pre class="code-block">
generate_brackets(2, 2)
# Output: ["[[]]", "[][]"]
# Explanation: For 2 pairs of square brackets with a maximum of 2 consecutive opening brackets, there are two valid combinations: "[[]]" and "[][]". Both satisfy the requirement of having no more than 2 consecutive opening brackets.
</pre>
<pre class="code-block">
generate_brackets(3, 1)
# Output: ["[][][]"]
# Explanation: For 3 pairs of square brackets with a maximum of 1 consecutive opening bracket, the only valid combination is "[][][]". All other combinations, such as "[[]][]", "[[][]]", or "[[[]]]", exceed the depth restriction of 1 consecutive opening bracket.
</pre>
<pre class="code-block">
generate_brackets(3, 2)
# Output: ['[[][]]', '[[]][]', '[][[]]', '[][][]']
# Explanation: For 3 pairs of square brackets with a maximum of 2 consecutive opening brackets, there are three valid combinations: "[[][]]", "[[]][]", "[][[]]", and "[][][]". These combinations do not exceed the depth restriction of 2 consecutive opening brackets.
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    // coding tasks for evaluations
    new ManualCodingTask(
        "mc1",
        "Write a function `generate_brackets(n: int, d: int) -> list[str]` that generates all combinations of `n` pairs of valid square brackets, such that the maximum number of consecutive opening brackets does not exceed `d`. For example, the maximum consecutive opening brackets in `[][[]]` is 2, in `[[]][[]]` is again 2, in `[][][]` is 1, but in `[[[]][]]` is 3. The function should return a list of all possible valid combinations of square brackets that meet the depth restriction.",
        `def generate_brackets(n: int, d: int) -> list[str]:
    """
    Write a function 'generate_brackets(n: int, d: int) -> list[str]' that generates all combinations of 'n' pairs of valid square brackets, such that the maximum number of consecutive opening brackets does not exceed 'd'. For example, the maximum consecutive opening brackets in '[][[]]' is 2, in '[[]][[]]' is again 2, in '[][][]' is 1, but in '[[[]][]]' is 3. The function should return a list of all possible valid combinations of square brackets that meet the depth restriction.

    Please fill out the #TODO parts.

    >>> generate_brackets(2, 1)
    # Output: ["[][]"]
    # Explanation: For 2 pairs of square brackets with a maximum of 1 consecutive opening bracket, the only valid combination is "[][]". Any combination with more than one consecutive opening bracket, such as "[[]]", is not allowed.

    >>> generate_brackets(2, 2)
    # Output: ["[[]]", "[][]"]
    # Explanation: For 2 pairs of square brackets with a maximum of 2 consecutive opening brackets, there are two valid combinations: "[[]]" and "[][]". Both satisfy the requirement of having no more than 2 consecutive opening brackets.

    >>> generate_brackets(3, 1)
    # Output: ["[][][]"]
    # Explanation: For 3 pairs of square brackets with a maximum of 1 consecutive opening bracket, the only valid combination is "[][][]". All other combinations, such as "[[]][]", "[[][]]", or "[[[]]]", exceed the depth restriction of 1 consecutive opening bracket.

    >>> generate_brackets(3, 2)
    # Output: ['[[][]]', '[[]][]', '[][[]]', '[][][]']
    # Explanation: For 3 pairs of square brackets with a maximum of 2 consecutive opening brackets, there are three valid combinations: "[[][]]", "[[]][]", "[][[]]", and "[][][]". These combinations do not exceed the depth restriction of 2 consecutive opening brackets.
    """
    result = []
    q = [["", 0, 0, 0]]

    while q:
        s, opens, closes, conseq_opens = # TODO: fill this part
        
        if opens == n and closes == n:
            result.append(s)
        else:
            if opens < n:
                # TODO: fill this part
                
                if new_conseq_opens <= d:
                    # TODO: fill this part
                    
            if closes < opens:
                # TODO: fill this part
                
    return result

assert generate_brackets(2, 1) == ["[][]"]
assert generate_brackets(2, 2) == ["[[]]", "[][]"]
assert generate_brackets(3, 1) == ["[][][]"]
assert generate_brackets(3, 2) == ['[[][]]', '[[]][]', '[][[]]', '[][][]']
`
    ),

    new MultipleChoiceTask(
        "MC2RB",
        `<h1>Task 2: Generate DNA Sequences (Using Queue)</h1>
        <br/>
        <h2>A <b>timer</b> is in the top right of your screen: Do not spend more than <i>10 minutes</i> on this task. If you can't solve it within 10 minutes, please submit and skip the task.</h2>
        <br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a Python function named <b>dna_sequences(pattern: str) -> list[str]</b> that generates all possible DNA sequences based on a given pattern. The function should accept a single string argument ('pattern') and return a list of strings. The input pattern consists of the characters 'A', 'T', 'C', 'G', and a special placeholder 'N'. The 'N' acts as a wildcard that can be replaced by any of the four DNA bases ('A', 'C', 'G', 'T'). Your function should return a list of strings, each representing a unique DNA sequence obtained by substituting every 'N' in the input pattern with each possible DNA base. Use a queue data structure to generate and explore all combinations of sequences.</p>
<br/>
<p>Examples:</p>
<pre class="code-block">
dna_sequences("N")
# Output: ['A', 'C', 'G', 'T']
# Explanation: The pattern contains one 'N', which can be replaced by any of the four DNA bases (A, C, G, T). Therefore, the output is a list of all possible single-character DNA sequences.
</pre>
<pre class="code-block">
dna_sequences("AN")
# Output: ['AA', 'AC', 'AG', 'AT']
# Explanation: The pattern "AN" has one 'N'. The function replaces 'N' with each of the four DNA bases, resulting in the sequences "AA", "AC", "AG", and "AT".
</pre>
<pre class="code-block">
dna_sequences("NN")
# Output: ['AA', 'AC', 'AG', 'AT', 'CA', 'CC', 'CG', 'CT', 'GA', 'GC', 'GG', 'GT', 'TA', 'TC', 'TG', 'TT']
# Explanation: The pattern "NN" contains two 'N's. Each 'N' can be replaced with A, C, G, or T, resulting in 4x4=16 possible combinations.
</pre>
<pre class="code-block">
# Output: ['AAA', 'AAC', 'AAG', 'AAT']
# Explanation: The pattern "AAN" has one 'N', which can be replaced by any of the four DNA bases, resulting in the sequences "AAA", "AAC", "AAG", and "AAT".
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new ManualCodingTask(
        "mc2",
        "Write a Python function named `dna_sequences(pattern: str) -> list[str]` that generates all possible DNA sequences based on a given pattern. The function should accept a single string argument (`pattern`) and return a list of strings. The input pattern consists of the characters `A`, `T`, `C`, `G`, and a special placeholder `N`. The `N` acts as a wildcard that can be replaced by any of the four DNA bases (`A`, `C`, `G`, `T`). Your function should return a list of strings, each representing a unique DNA sequence obtained by substituting every `N` in the input pattern with each possible DNA base. Use a queue data structure to generate and explore all combinations of sequences.",
        `def dna_sequences(pattern: str) -> list[str]:
    """
    Write a Python function named 'dna_sequences(pattern: str) -> list[str]' that generates all possible DNA sequences based on a given pattern. The function should accept a single string argument ('pattern') and return a list of strings. The input pattern consists of the characters 'A', 'T', 'C', 'G', and a special placeholder 'N'. The 'N' acts as a wildcard that can be replaced by any of the four DNA bases ('A', 'C', 'G', 'T'). Your function should return a list of strings, each representing a unique DNA sequence obtained by substituting every 'N' in the input pattern with each possible DNA base. Use a queue data structure to generate and explore all combinations of sequences.

    Please fill out the #TODO parts.

    >>> dna_sequences("N")
    # Output: ['A', 'C', 'G', 'T']
    # Explanation: The pattern contains one 'N', which can be replaced by any of the four DNA bases (A, C, G, T). Therefore, the output is a list of all possible single-character DNA sequences.

    >>> dna_sequences("AN")
    # Output: ['AA', 'AC', 'AG', 'AT']
    # Explanation: The pattern "AN" has one 'N'. The function replaces 'N' with each of the four DNA bases, resulting in the sequences "AA", "AC", "AG", and "AT".

    >>> dna_sequences("NN")
    # Output: ['AA', 'AC', 'AG', 'AT', 'CA', 'CC', 'CG', 'CT', 'GA', 'GC', 'GG', 'GT', 'TA', 'TC', 'TG', 'TT']
    # Explanation: The pattern "NN" contains two 'N's. Each 'N' can be replaced with A, C, G, or T, resulting in 4x4=16 possible combinations.

    >>> dna_sequences("AAN")
    # Output: ['AAA', 'AAC', 'AAG', 'AAT']
    # Explanation: The pattern "AAN" has one 'N', which can be replaced by any of the four DNA bases, resulting in the sequences "AAA", "AAC", "AAG", and "AAT".
    """
    dna_chars = ['A', 'C', 'G', 'T']
    q = ['']
    result = []

    while len(q) > 0:
        seq = q.pop(0)

        if # TODO: fill this part
            result.append(seq)
        else:
            index = len(seq)

            if # TODO: fill this part:
                for ch in dna_chars:
                    # TODO: fill this part
            else:
                # TODO: fill this part
                
    return result

assert dna_sequences("N") == ['A', 'C', 'G', 'T']
assert dna_sequences("AN") == ['AA', 'AC', 'AG', 'AT']
assert dna_sequences("NN") == ['AA', 'AC', 'AG', 'AT', 'CA', 'CC', 'CG', 'CT', 'GA', 'GC', 'GG', 'GT', 'TA', 'TC', 'TG', 'TT']
assert dna_sequences("AAN") == ['AAA', 'AAC', 'AAG', 'AAT']`
    ),

    new MultipleChoiceTask(
        "MC3RB",
        `<h1>Task 3: Longest Valid Parentheses (Using Stack)</h1>
        <br/>
        <h2>A <b>timer</b> is in the top right of your screen: Do not spend more than <i>10 minutes</i> on this task. If you can't solve it within 10 minutes, please submit and skip the task.</h2>
        <br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>
<p>Write a function <b>longest_valid_parentheses(s: str) -> int</b> that determines the length of the longest valid (well-formed) parentheses substring within the string 's'. The function should return the maximum length of such a substring. For example, given the input 's = "(()"', the output should be '2', as the longest valid substring is '"()"'. For 's = ")()())"', the output should be '4' due to the substring '"()()"'. Another example would be 's = ""', where the output should be '0' since there are no valid parentheses.</p>
<br/>
<p>Examples:</p>
<pre class="code-block">
longest_valid_parentheses("(()")
# Output: 2
# Explanation: The longest valid substring is "()", which has a length of 2.
</pre>
<pre class="code-block">
longest_valid_parentheses(")()())")
# Output: 4
# Explanation: The longest valid substring is "()()", which has a length of 4.
</pre>
<pre class="code-block">
longest_valid_parentheses("((())(()")
# Output: 4
# Explanation: The longest valid substring is "(())", which has a length of 4.
</pre>
<pre class="code-block">
longest_valid_parentheses("()(())))")
# Output: 6
# Explanation: The longest valid substring is "()(()))", which has a length of 6.
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new ManualCodingTask(
        "mc3",
        "Write a function 'longest_valid_parentheses(s: str) -> int' that determines the length of the longest valid (well-formed) parentheses substring within the string 's'. The function should return the maximum length of such a substring. For example, given the input 's = \"(()\"', the output should be '2', as the longest valid substring is '\"()\"'. For 's = \")()())\"', the output should be '4' due to the substring '\"()()\"'. Another example would be 's = \"\"', where the output should be '0' since there are no valid parentheses.",
        `def longest_valid_parentheses(s: str) -> int:
    """
    Write a function 'longest_valid_parentheses(s: str) -> int' that determines the length of the longest valid (well-formed) parentheses substring within the string 's'. The function should return the maximum length of such a substring. For example, given the input 's = "(()"', the output should be '2', as the longest valid substring is '"()"'. For 's = ")()())"', the output should be '4' due to the substring '"()()"'. Another example would be 's = ""', where the output should be '0' since there are no valid parentheses.

    Please fill out the #TODO parts.

    >>> longest_valid_parentheses("(()")
    # Output: 2
    # Explanation: The longest valid substring is "()", which has a length of 2.

    >>> longest_valid_parentheses(")()())")
    # Output: 4
    # Explanation: The longest valid substring is "()()", which has a length of 4.

    >>> longest_valid_parentheses("((())(()")
    # Output: 4
    # Explanation: The longest valid substring is "(())", which has a length of 4.

    >>> longest_valid_parentheses("()(())))")
    # Output: 6
    # Explanation: The longest valid substring is "()(()))", which has a length of 6.
    """
    stack = [-1]
    max_length = 0
    
    for i in range(len(s)):
        char = s[i]
        
        if char == "(":
            # TODO: fill this part
        elif char == ")":
            if len(stack) > 1:
                # TODO: fill this part
                # TODO: fill this part
            else:
                # TODO: fill this part
                
    return max_length

assert longest_valid_parentheses("(()") == 2
assert longest_valid_parentheses(")()())") == 4
assert longest_valid_parentheses("((())(()") == 4
assert longest_valid_parentheses("()(())))") == 6`
    ),

    new MultipleChoiceTask(
        "MC4RB",
        `<h1>Task 4: Invalid Parentheses Indicies (Using Stack)</h1>
        <br/>
        <h2>A <b>timer</b> is in the top right of your screen: Do not spend more than <i>10 minutes</i> on this task. If you can't solve it within 10 minutes, please submit and skip the task.</h2>
        <br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>

<p>Write a function <b>invalid_parentheses_indices(s: str) -> int</b> that calculates the minimum number of invalid parentheses that need to be removed to make the input string <b>s</b> valid. The function should traverse the string <b>s</b>, keeping track of the indices of unmatched opening and closing parentheses. It returns the total number of unmatched parentheses indices. For example, given the input <b>s = "())()"</b>, the function should return <b>1</b> because removing one closing parenthesis at index <b>2</b> would make the string valid. If the input is <b>s = "(()"</b>, it should return <b>1</b> as well because removing one opening parenthesis at index <b>0</b> would make the string valid.</p>

<br/>
<p>Examples:</p>
<pre class="code-block">
invalid_parentheses_indices(")()(")
# Output: [0, 3]
# Explanation: Parentheses at indices 0 and 3 are unmatched and need removal.
</pre>
<pre class="code-block">
invalid_parentheses_indices("())()")
# Output: [2]
# Explanation: The parenthesis at index 2 is unmatched and needs removal.
</pre>
<pre class="code-block">
invalid_parentheses_indices(")((")
# Output: [0, 1, 2]
# Explanation: All three parentheses are unmatched and need removal.
</pre>
<pre class="code-block">
invalid_parentheses_indices(")()(")
# Output: [0, 3]
# Explanation: Parentheses at indices 0 and 3 are unmatched and need removal.
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new ManualCodingTask(
        "mc4",
        `Write a function 'invalid_parentheses_indices(s: str) -> int' that calculates the minimum number of invalid parentheses that need to be removed to make the input string 's' valid. The function should traverse the string 's', keeping track of the indices of unmatched opening and closing parentheses. It returns the total number of unmatched parentheses indices. For example, given the input 's = "())()"', the function should return 1 because removing one closing parenthesis at index 2 would make the string valid. If the input is 's = "(()"', it should return 1 as well because removing one opening parenthesis at index 0 would make the string valid.`,
        `def invalid_parentheses_indices(s: str) -> list[int]:
    """
    Write a function 'invalid_parentheses_indices(s: str) -> int' that calculates the minimum number of invalid parentheses that need to be removed to make the input string 's' valid. The function should traverse the string 's', keeping track of the indices of unmatched opening and closing parentheses. It returns the total number of unmatched parentheses indices. For example, given the input 's = "())()"', the function should return 1 because removing one closing parenthesis at index 2 would make the string valid. If the input is 's = "(()"', it should return 1 as well because removing one opening parenthesis at index 0 would make the string valid.

    Please fill out the #TODO parts.

    >>> invalid_parentheses_indices(")()(")
    # Output: [0, 3]
    # Explanation: Parentheses at indices 0 and 3 are unmatched and need removal.

    >>> invalid_parentheses_indices("())()")
    # Output: [2]
    # Explanation: The parenthesis at index 2 is unmatched and needs removal.

    >>> invalid_parentheses_indices(")((")
    # Output: [0, 1, 2]
    # Explanation: All three parentheses are unmatched and need removal.

    >>> invalid_parentheses_indices(")()(")
    # Output: [0, 3]
    # Explanation: Parentheses at indices 0 and 3 are unmatched and need removal.
    """
    invalid_indices = []
    stack = # TODO: fill this part
    
    for i in range(len(s)):
        char = s[i]
        
        if char == '(':
            stack.append(i)
        elif char == ')':
            if stack:
                stack.pop()
            else:
                # TODO: fill this part
	
	# TODO: fill this part
	# TODO: fill this part
	
    return invalid_indices

assert invalid_parentheses_indices(")()(") == [0, 3]
assert invalid_parentheses_indices("())()") == [2]
assert invalid_parentheses_indices(")((") == [0, 2, 1]
assert invalid_parentheses_indices(")()(") == [0, 3]`
    ),

    new MultipleChoiceTask(
        "MC5RB",
        `<h1>Task 5: Sliding Window Minimum (Using Stack)</h1>
        <br/>
        <h2>A <b>timer</b> is in the top right of your screen: Do not spend more than <i>10 minutes</i> on this task. If you can't solve it within 10 minutes, please submit and skip the task.</h2>
        <br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>

<p>Write a function <b>sliding_window_minimum(nums: list[int], k: int) -> list[tuple[int, int]]</b> that finds the minimum value within every sliding window of size <b>k</b> in the given list <b>nums</b>, and returns a list of tuples where each tuple contains the minimum value and its index within the window. The sliding window moves one position at a time from left to right across the list. For example, given <b>nums = [4, 2, 12, 3, 8]</b> and <b>k = 3</b>, the function should return <b>[(2, 1), (2, 1), (3, 3)]</b>, and for <b>nums = [1, 3, -1, -3, 5]</b> with <b>k = 2</b>, it should return <b>[(1, 0), (-1, 2), (-3, 3), (-3, 3)]</b>.</p>

<br/>
<p>Examples:</p>
<pre class="code-block">
sliding_window_minimum([4, 2, 12, 3, 8], 3)
# Output: [(2, 1), (2, 1), (3, 3)]
# Explanation: For k=3, the sliding windows are [4, 2, 12], [2, 12, 3], and [12, 3, 8]. The minimums are 2 at index 1, 2 at index 1, and 3 at index 3.
</pre>
<pre class="code-block">
sliding_window_minimum([1, 3, -1, -3, 5], 2)
# Output: [(1, 0), (-1, 2), (-3, 3), (-3, 3)]
# Explanation: For k=2, the sliding windows are [1, 3], [3, -1], [-1, -3], and [-3, 5]. The minimums are 1 at index 0, -1 at index 2, -3 at index 3, and -3 at index 3.
</pre>
<pre class="code-block">
sliding_window_minimum([10, 5, 2, 7, 8, 7], 3)
# Output: [(2, 2), (2, 2), (2, 2), (7, 3)]
# Explanation: For k=3, the sliding windows are [10, 5, 2], [5, 2, 7], [2, 7, 8], and [7, 8, 7]. The minimums are 2 at index 2, 2 at index 2, 2 at index 2, and 7 at index 3.
</pre>
<pre class="code-block">
sliding_window_minimum([4, 5, 6, 3, 2, 1], 4)
# Output: [(3, 3), (2, 4), (1, 5)]
# Explanation: For k=4, the sliding windows are [4, 5, 6, 3], [5, 6, 3, 2], and [6, 3, 2, 1]. The minimums are 3 at index 3, 2 at index 4, and 1 at index 5.
</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new ManualCodingTask(
        "mc5",
        `Write a function 'sliding_window_minimum(nums: list[int], k: int) -> list[tuple[int, int]]' that finds the minimum value within every sliding window of size 'k' in the given list 'nums', and returns a list of tuples where each tuple contains the minimum value and its index within the window. The sliding window moves one position at a time from left to right across the list. For example, given 'nums = [4, 2, 12, 3, 8]' and 'k = 3', the function should return '[(2, 1), (2, 1), (3, 3)]', and for 'nums = [1, 3, -1, -3, 5]' with 'k = 2', it should return '[(1, 0), (-1, 2), (-3, 3), (-3, 3)]'.`,
        `def sliding_window_minimum(nums: list[int], k: int) -> list[tuple[int, int]]:
    """
    Write a function 'sliding_window_minimum(nums: list[int], k: int) -> list[tuple[int, int]]' that finds the minimum value within every sliding window of size 'k' in the given list 'nums', and returns a list of tuples where each tuple contains the minimum value and its index within the window. The sliding window moves one position at a time from left to right across the list. For example, given 'nums = [4, 2, 12, 3, 8]' and 'k = 3', the function should return '[(2, 1), (2, 1), (3, 3)]', and for 'nums = [1, 3, -1, -3, 5]' with 'k = 2', it should return '[(1, 0), (-1, 2), (-3, 3), (-3, 3)]'..

    Please fill out the #TODO parts.

    >>> sliding_window_minimum([4, 2, 12, 3, 8], 3)
    # Output: [(2, 1), (2, 1), (3, 3)]
    # Explanation: For k=3, the sliding windows are [4, 2, 12], [2, 12, 3], and [12, 3, 8]. The minimums are 2 at index 1, 2 at index 1, and 3 at index 3.

    >>> sliding_window_minimum([1, 3, -1, -3, 5], 2)
    # Output: [(1, 0), (-1, 2), (-3, 3), (-3, 3)]
    # Explanation: For k=2, the sliding windows are [1, 3], [3, -1], [-1, -3], and [-3, 5]. The minimums are 1 at index 0, -1 at index 2, -3 at index 3, and -3 at index 3.

    >>> sliding_window_minimum([10, 5, 2, 7, 8, 7], 3)
    # Output: [(2, 2), (2, 2), (2, 2), (7, 3)]
    # Explanation: For k=3, the sliding windows are [10, 5, 2], [5, 2, 7], [2, 7, 8], and [7, 8, 7]. The minimums are 2 at index 2, 2 at index 2, 2 at index 2, and 7 at index 3.
    """
    dq = []
    result = []
    
    for i, n in enumerate(nums):
        if dq and # TODO: fill this part
            dq.pop(0)
            
        while # TODO: fill this part
            dq.pop()
            
        dq.append(i)
        
        if i >= k - 1:
            # TODO: fill this part
            
    return result

assert sliding_window_minimum([4, 2, 12, 3, 8], 3) == [(2, 1), (2, 1), (3, 3)]
assert sliding_window_minimum([1, 3, -1, -3, 5], 2) == [(1, 0), (-1, 2), (-3, 3), (-3, 3)]
assert sliding_window_minimum([10, 5, 2, 7, 8, 7], 3) == [(2, 2), (2, 2), (2, 2), (7, 3)]`
    ),

    new MultipleChoiceTask(
        "MC6RB",
        `<h1>Task 6: Sliding Even Count (Using Dequeue)</h1>
        <br/>
        <h2>A <b>timer</b> is in the top right of your screen: Do not spend more than <i>10 minutes</i> on this task. If you can't solve it within 10 minutes, please submit and skip the task.</h2>
        <br/>
<p>Please read the task description and the provided examples carefully to ensure you fully understand the desired behavior of the requested function.</p>
<h2>Task Description:</h2>

<p>Write a function named <b>sliding_even_count(nums: list[int], k: int) -> list[int]</b> that computes the count of even numbers in each sliding window of size <b>k</b> across a list of integers <b>nums</b>. The function takes two arguments: <b>nums</b>, a list of integers, and <b>k</b>, an integer specifying the window size. It returns a list of integers where each value represents the number of even numbers within each window as it moves from the start to the end of <b>nums</b>. The function should handle edge cases, such as windows extending beyond the list's bounds or having no even numbers, and efficiently compute the counts for each window position.</p>

<br/>
<p>Examples:</p>
<pre class="code-block">
sliding_even_count([2, 4, 6, 1, 3, 5], 4)
# Output: [3, 2, 1]
# Explanation: The sliding windows and their counts of even numbers are:
# - [2, 4, 6, 1] -> 3 even numbers (2, 4, 6)
# - [4, 6, 1, 3] -> 2 even numbers (4, 6)
# - [6, 1, 3, 5] -> 1 even number (6)
</pre>
<pre class="code-block">
sliding_even_count([1, 2, 1, 2, 1, 2, 1, 2], 3)
# Output: [1, 2, 1, 2, 1, 2]
# Explanation: The sliding windows and their counts of even numbers are:
# - [1, 2, 1] -> 1 even number (2)
# - [2, 1, 2] -> 2 even numbers (2, 2)
# - [1, 2, 1] -> 1 even number (2)
# - [2, 1, 2] -> 2 even numbers (2, 2)
# - [1, 2, 1] -> 1 even number (2)
# - [2, 1, 2] -> 2 even numbers (2, 2)
</pre>
<pre class="code-block">
sliding_even_count([2, 3, 6, 8, 1], 2)
# Output: [1, 1, 2, 1]
# Explanation: The sliding windows and their counts of even numbers are:
# - [2, 3] -> 1 even number (2)
# - [3, 6] -> 1 even number (6)
# - [6, 8] -> 2 even numbers (6, 8)
# - [8, 1] -> 1 even number (8)
</pre>
<pre class="code-block">

</pre>
<br/>
<br/>
<h2>Select how well did you understand the task?</h2>`,
        [
            "0: Not at all 😞",
            "1: Slightly 😐",
            "2: Moderately 🙂",
            "3: Mostly 😊",
            "4: Completely 🤩",
        ],
        2
    ),

    new ManualCodingTask(
        "mc6",
        ``,
        `def sliding_even_count(nums: list[int], k: int) -> list[int]:
    """
    Write a function named 'sliding_even_count(nums: list[int], k: int) -> list[int]' that computes the count of even numbers in each sliding window of size 'k' across a list of integers 'nums'. The function takes two arguments: 'nums', a list of integers, and 'k', an integer specifying the window size. It returns a list of integers where each value represents the number of even numbers within each window as it moves from the start to the end of 'nums'. The function should handle edge cases, such as windows extending beyond the list's bounds or having no even numbers, and efficiently compute the counts for each window position.

    Please fill out the #TODO parts.

    >>> sliding_even_count([2, 4, 6, 1, 3, 5], 4)
    # Output: [3, 2, 1]
    # Explanation: The sliding windows and their counts of even numbers are:
    # - [2, 4, 6, 1] -> 3 even numbers (2, 4, 6)
    # - [4, 6, 1, 3] -> 2 even numbers (4, 6)
    # - [6, 1, 3, 5] -> 1 even number (6)

    >>> sliding_even_count([1, 2, 1, 2, 1, 2, 1, 2], 3)
    # Output: [1, 2, 1, 2, 1, 2]
    # Explanation: The sliding windows and their counts of even numbers are:
    # - [1, 2, 1] -> 1 even number (2)
    # - [2, 1, 2] -> 2 even numbers (2, 2)
    # - [1, 2, 1] -> 1 even number (2)
    # - [2, 1, 2] -> 2 even numbers (2, 2)
    # - [1, 2, 1] -> 1 even number (2)
    # - [2, 1, 2] -> 2 even numbers (2, 2)

    >>> sliding_even_count([2, 3, 6, 8, 1], 2)
    # Output: [1, 1, 2, 1]
    # Explanation: The sliding windows and their counts of even numbers are:
    # - [2, 3] -> 1 even number (2)
    # - [3, 6] -> 1 even number (6)
    # - [6, 8] -> 2 even numbers (6, 8)
    # - [8, 1] -> 1 even number (8)
    """
    dq = []
    result = []

    for i, n in enumerate(nums):
        if dq and dq[0] < i - k + 1:
            dq.pop(0)
        
        while dq and # TODO: fill out this part
            dq.pop()
        
        # TODO: fill out this part
        # TODO: fill out this part

        if i >= k - 1:
            result.append(len(dq))

    return result

assert sliding_even_count([2, 4, 6, 1, 3, 5], 4) == [3, 2, 1]
assert sliding_even_count([1, 2, 1, 2, 1, 2, 1, 2], 3) == [1, 2, 1, 2, 1, 2]
assert sliding_even_count([2, 3, 6, 8, 1], 2) == [1, 1, 2, 1]`
    ),

    new MultipleChoiceTask(
        "FIN0",
        `<h1>Post-Study Interview!</h1>
<br/>
<h2>Please take the time to fill out this form and provide your detailed feedback on the two systems that we developed: <a target="_blank" href="https://forms.office.com/r/pCL6RKDcTP">https://forms.office.com/r/pCL6RKDcTP</a></h2>`,
        [
            "I did not email it.",
            "I emailed my e-transfer email address to receive the study compensation.",
        ],
        2
    ),

    new MultipleChoiceTask(
        "FIN1",
        `<h1>Thank you for participating!</h1>
<br/>
<h2>Please email me (majeed@dgp.toronto.edu or majeed.kazemitabaar@mail.utoronto.ca) your INTERAC e-transfer email address so I can send you the compensation.</h2>
<br/>
<h3>After this you can close the tab and end the study.</h3>
<br/>
<h1>Thank you!</h1>
<br/>
`,
        [
            "I did not email it.",
            "I emailed my e-transfer email address to receive the study compensation.",
        ],
        2
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
