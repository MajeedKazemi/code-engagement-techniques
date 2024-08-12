import { warmupCode, warmupExplanation, task1Code, task1Explanation, task2Code, task2Explanation, task3Code, task3Explanation, task4Code, task4Explanation } from "./baseline-constant";
import { task1Decomposition, task2Decomposition, task3Decomposition, task4Decomposition, warmupDecomposition } from "./lead-reveal-constant";

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
    pseudoCodeJson: JSON;
    SelfExplainJson: JSON;
    writeOverJson: JSON;
    VerifyReviewJson: JSON;
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
        pseudoCodeJson: any,
        writeOverJson: any,
        SelfExplainJson: any,
        VerifyReviewJson: any,
        LeadRevealJson: any,
    ){
        super(id, description, TaskType.Authoring);

        // this.solution = solution;
        // this.output = output;
        // this.timeLimit = timeLimit;
        // this.topic = topic;
        // this.stage = stage;
        this.baselineCode = baselineCode;
        this.explaination = explaination;
        this.pseudoCodeJson = pseudoCodeJson;
        this.SelfExplainJson = SelfExplainJson;
        this.writeOverJson = writeOverJson;
        this.VerifyReviewJson = VerifyReviewJson;
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
    constructor(
        id: string,
        description: string,
        starterCode: string,
    ) {
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
    // answer: number;
    // topic: TaskTopic;
    // stage: TaskStage;

    constructor(
        id: string,
        description: string,
        choices: string[],
        // answer: number,
        // topic: TaskTopic,
        // stage: TaskStage
    ) {
        super(id, description, TaskType.MultipleChoice);

        this.choices = choices;
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
    "warmup",
    "Write a function called `reverse_stack` that receives a list of items and reverses it using a temporary stack.",
    warmupCode,
    warmupExplanation,
{
  "subgoals": [
      {
          "title": "Function Definition",
          "code": [
              {
                  "indent": 0,
                  "line": "def reverse_stack(items: list) -> list:",
                  "pseudo-code": "Define a function named 'reverse_stack' that takes a list 'items' as input and returns a list.",
                  "syntax-hint": "`def` is used to define a function in Python. The `:` at the end indicates the start of a new block of code. The `-> list` is a type hint indicating the function returns a list.",
                  "explanation": "This line is needed to define the function and specify its input and output types."
              }
          ]
      },
      {
          "title": "Initialize Temporary Stack",
          "code": [
              {
                  "indent": 1,
                  "line": "temp = []",
                  "pseudo-code": "Initialize an empty list 'temp'.",
                  "syntax-hint": "In Python, `=` is used for assignment. `[]` is used to create an empty list.",
                  "explanation": "This line is needed to create a temporary stack for reversing the input list."
              }
          ]
      },
      {
          "title": "Reverse List Using Stack",
          "code": [
              {
                  "indent": 1,
                  "line": "while items:",
                  "pseudo-code": "Start a while loop that continues as long as 'items' is not empty.",
                  "syntax-hint": "In Python, `while` is used to start a loop. The loop continues as long as the condition after `while` is true. Here, `items` is truthy if it is not empty.",
                  "explanation": "This line is needed to start a loop that continues until 'items' is empty."
              },
              {
                  "indent": 2,
                  "line": "temp.append(items.pop())",
                  "pseudo-code": "Remove the last item from 'items' and add it to the end of 'temp'.",
                  "syntax-hint": "In Python, `.append()` is used to add an item to the end of a list. `.pop()` is used to remove and return the last item from a list.",
                  "explanation": "This line is needed to reverse the order of 'items' by moving its items to 'temp' one by one."
              }
          ]
      },
      {
          "title": "Return Reversed List",
          "code": [
              {
                  "indent": 1,
                  "line": "return temp",
                  "pseudo-code": "Return the list 'temp'.",
                  "syntax-hint": "In Python, `return` is used to specify the result that a function should produce.",
                  "explanation": "This line is needed to provide the reversed list as the result of the function."
              }
          ]
      }
  ]
},
{
  "lines": [
    {
      "code": "def reverse_stack(items: list) -> list:",
      "explanation": "This line defines a function called 'reverse_stack' that takes a list as an argument and returns a list.",
      "tokens": [
        {
          "token": "def ",
          "explanation": "Keyword to start a function definition"
        },
        {
          "token": "reverse_stack",
          "explanation": "Name of the function"
        },
        {
          "token": "("
        },
        {
          "token": "items",
          "explanation": "Parameter of the function"
        },
        {
          "token": ": list"
        },
        {
          "token": ") -> list",
          "explanation": "Indicates the function returns a list"
        },
        {
          "token": ":",
          "explanation": "End of function definition line"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "    temp = []",
      "explanation": "This line initializes an empty list 'temp' to store the reversed items.",
      "tokens": [
        {
          "token": "    "
        },
        {
          "token": "temp",
          "explanation": "Variable to store reversed items"
        },
        {
          "token": " = "
        },
        {
          "token": "[]",
          "explanation": "Empty list"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "    while items:",
      "explanation": "This line starts a while loop that continues as long as 'items' is not empty.",
      "tokens": [
        {
          "token": "    while ",
          "explanation": "Start of while loop"
        },
        {
          "token": "items",
          "explanation": "Condition for while loop"
        },
        {
          "token": ":",
          "explanation": "End of while loop condition"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "        temp.append(items.pop())",
      "explanation": "This line removes the last item from 'items' and appends it to 'temp'.",
      "tokens": [
        {
          "token": "        "
        },
        {
          "token": "temp",
          "explanation": "List to append to"
        },
        {
          "token": ".append("
        },
        {
          "token": "items",
          "explanation": "List to pop from"
        },
        {
          "token": ".pop()"
        },
        {
          "token": ")",
          "explanation": "End of append method"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "    return temp",
      "explanation": "This line returns the reversed list 'temp'.",
      "tokens": [
        {
          "token": "    return ",
          "explanation": "Keyword to return a value from a function"
        },
        {
          "token": "temp",
          "explanation": "Variable to return"
        },
        {
          "token": "\n"
        }
      ]
    }
  ]
},
{
  "questions": [
    {
      "type": "Short Answer",
      "question": "What is the purpose of the 'temp' variable in this code?",
      "answer": "It serves as a temporary stack to reverse the order of items.",
      "question-code-lines": [
        "2"
      ],
      "question-code-lines-explained": "temp = [] # This line initializes an empty list that will serve as a temporary stack to reverse the order of items."
    },
    {
      "type": "Multiple Choice",
      "question": "What would happen if 'items.pop()' was replaced with 'items.pop(0)'?",
      "answer": {
        "correct-choice": "The order of the items would not be reversed.",
        "incorrect-choice-1": "The function would throw an error.",
        "incorrect-choice-2": "The function would still reverse the order of items.",
        "incorrect-choice-3": "The function would return an empty list."
      },
      "question-code-lines": [
        "4"
      ],
      "question-code-lines-explained": "temp.append(items.pop()) # This line removes the last item from the 'items' list and adds it to the 'temp' list. If 'items.pop(0)' was used instead, it would remove the first item, not reversing the order."
    },
    {
      "type": "Short Answer",
      "question": "What is the role of the 'while' loop in this function?",
      "answer": "It continues to pop items from the original list and append them to 'temp' until 'items' is empty.",
      "question-code-lines": [
        "3", "4"
      ],
      "question-code-lines-explained": "while items: temp.append(items.pop()) # This loop continues to pop items from the original list and append them to 'temp' until 'items' is empty."
    },
    {
      "type": "Multiple Choice",
      "question": "What would be the output of the function if an empty list was passed as an argument?",
      "answer": {
        "correct-choice": "An empty list.",
        "incorrect-choice-1": "A list with one None element.",
        "incorrect-choice-2": "A list with one zero element.",
        "incorrect-choice-3": "The function would throw an error."
      },
      "question-code-lines": [
        "5"
      ],
      "question-code-lines-explained": "return temp # This line returns the 'temp' list. If 'items' was empty to begin with, 'temp' would also be empty."
    }
  ]
},
{
  "wrong-code": 
`def reverse_stack(items: list) -> list:
    temp = []
    while not items:
        temp.append(items.pop())
    return items`,
  
  "issues":{
              "logical-issue-1": {
                      "type": "Incorrect Loop Condition",
                      "line": 3
              },
              "logical-issue-2": {
                      "type": "Wrong Return Value",
                      "line": 5
              }
          }
},
warmupDecomposition,
),

  new MultipleChoiceTask(
    "warmupRating",
    "Rate your experience",
    ["1", "2", "3", "4", "5"]
  ),

  new AuthoringTask(
    "1",
    "Write a function named calculate_span that receives a list of daily stock prices as integers. The function calculates the stock span for each day. The stock span Si for a day i is the count of consecutive days leading up and including day i, for which the stock price on day i is not less than or equal to the price on those days.",
    task1Code,
    task1Explanation,
{
  "subgoals": [
      {
          "title": "Function Definition",
          "code": [
              {
                  "indent": 0,
                  "line": "def calculate_span(prices: list[int]) -> list[int]:",
                  "pseudo-code": "Define a function named 'calculate_span' that takes a list of integers 'prices' as input and returns a list of integers.",
                  "syntax-hint": "`def` is used to define a function in Python. The `:` indicates the start of a new block of code. The `-> list[int]` is a type hint indicating the function returns a list of integers.",
                  "explanation": "This line is needed to define the function and specify its input and output types."
              }
          ]
      },
      {
          "title": "Initialize Variables",
          "code": [
              {
                  "indent": 1,
                  "line": "stack = []",
                  "pseudo-code": "Initialize an empty list 'stack'.",
                  "syntax-hint": "`=` is the assignment operator in Python. `[]` is an empty list.",
                  "explanation": "This line is needed to create a stack that will be used to keep track of the indices of the days with higher stock prices."
              },
              {
                  "indent": 1,
                  "line": "span = [0] * len(prices)",
                  "pseudo-code": "Initialize a list 'span' with the same length as 'prices', filled with zeros.",
                  "syntax-hint": "`[0] * len(prices)` creates a new list with the same length as 'prices', filled with zeros.",
                  "explanation": "This line is needed to create a list that will store the stock span for each day."
              }
          ]
      },
      {
          "title": "Calculate Stock Span",
          "code": [
              {
                  "indent": 1,
                  "line": "for i in range(len(prices)):",
                  "pseudo-code": "Start a loop over the indices of the 'prices' list.",
                  "syntax-hint": "`for` starts a loop in Python. `range(len(prices))` generates a sequence of numbers from 0 to the length of 'prices' minus 1.",
                  "explanation": "This line is needed to iterate over each day's stock price."
              },
              {
                  "indent": 2,
                  "line": "while stack and prices[stack[-1]] <= prices[i]:",
                  "pseudo-code": "Start a loop while 'stack' is not empty and the price on the day at the top of the stack is less than or equal to the price on day 'i'.",
                  "syntax-hint": "`while` starts a loop in Python. `stack and prices[stack[-1]] <= prices[i]` is a condition that checks if 'stack' is not empty and if the price on the day at the top of the stack is less than or equal to the price on day 'i'.",
                  "explanation": "This line is needed to find the most recent day with a higher stock price."
              },
              {
                  "indent": 3,
                  "line": "stack.pop()",
                  "pseudo-code": "Remove the top element from 'stack'.",
                  "syntax-hint": "`stack.pop()` removes and returns the last element from 'stack'.",
                  "explanation": "This line is needed to remove the day at the top of the stack because its price is less than or equal to the price on day 'i'."
              },
              {
                  "indent": 2,
                  "line": "if not stack:",
                  "pseudo-code": "Check if 'stack' is empty.",
                  "syntax-hint": "`if not stack:` checks if 'stack' is empty.",
                  "explanation": "This line is needed to handle the case where there are no previous days with a higher stock price."
              },
              {
                  "indent": 3,
                  "line": "span[i] = i + 1",
                  "pseudo-code": "Set the stock span for day 'i' to 'i' plus 1.",
                  "syntax-hint": "`span[i] = i + 1` assigns the value of 'i' plus 1 to the 'i'-th element of 'span'.",
                  "explanation": "This line is needed to set the stock span for day 'i' when there are no previous days with a higher stock price."
              },
              {
                  "indent": 2,
                  "line": "else:",
                  "pseudo-code": "Handle the case where 'stack' is not empty.",
                  "syntax-hint": "`else:` is used to specify a block of code to be executed if the condition in the `if` statement is false.",
                  "explanation": "This line is needed to handle the case where there are previous days with a higher stock price."
              },
              {
                  "indent": 3,
                  "line": "span[i] = i - stack[-1]",
                  "pseudo-code": "Set the stock span for day 'i' to the difference between 'i' and the day at the top of the stack.",
                  "syntax-hint": "`span[i] = i - stack[-1]` assigns the value of 'i' minus the last element of 'stack' to the 'i'-th element of 'span'.",
                  "explanation": "This line is needed to set the stock span for day 'i' when there are previous days with a higher stock price."
              },
              {
                  "indent": 2,
                  "line": "stack.append(i)",
                  "pseudo-code": "Add 'i' to the end of 'stack'.",
                  "syntax-hint": "`stack.append(i)` adds 'i' to the end of 'stack'.",
                  "explanation": "This line is needed to add the current day to the stack for future comparisons."
              }
          ]
      },
      {
          "title": "Return Result",
          "code": [
              {
                  "indent": 1,
                  "line": "return span",
                  "pseudo-code": "Return the list 'span'.",
                  "syntax-hint": "`return` is used to specify the result that a function should return.",
                  "explanation": "This line is needed to provide the final result of the function, which is the stock span for each day."
              }
          ]
      }
  ]
},
{
  "lines": [
    {
      "code": "def calculate_span(prices: list[int]) -> list[int]:",
      "explanation": "This line defines the function calculate_span that takes a list of integers as input and returns a list of integers.",
      "tokens": [
        {
          "token": "def ",
          "explanation": "Keyword to start a function definition"
        },
        {
          "token": "calculate_span",
          "explanation": "Name of the function"
        },
        {
          "token": "(",
          "explanation": "Start of function parameters"
        },
        {
          "token": "prices",
          "explanation": "Name of the parameter"
        },
        {
          "token": ": ",
          "explanation": "Used to specify the type of parameter"
        },
        {
          "token": "list[int]",
          "explanation": "Type of the parameter, a list of integers"
        },
        {
          "token": ") ",
          "explanation": "End of function parameters"
        },
        {
          "token": "-> ",
          "explanation": "Used to specify the return type of the function"
        },
        {
          "token": "list[int]",
          "explanation": "Return type of the function, a list of integers"
        },
        {
          "token": ":",
          "explanation": "End of function definition"
        }
      ]
    },
    {
      "code": "    stack = []",
      "explanation": "This line initializes an empty list named stack which will be used to keep track of the indices of the days.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code inside the function"
        },
        {
          "token": "stack",
          "explanation": "Name of the variable"
        },
        {
          "token": " = ",
          "explanation": "Assignment operator"
        },
        {
          "token": "[]",
          "explanation": "An empty list"
        }
      ]
    },
    {
      "code": "    span = [0] * len(prices)",
      "explanation": "This line initializes a list named span with the same length as prices, filled with zeros. This list will store the span for each day.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code inside the function"
        },
        {
          "token": "span",
          "explanation": "Name of the variable"
        },
        {
          "token": " = ",
          "explanation": "Assignment operator"
        },
        {
          "token": "[0]",
          "explanation": "A list with a single element 0"
        },
        {
          "token": " * ",
          "explanation": "Multiplication operator"
        },
        {
          "token": "len(",
          "explanation": "Start of function call to get the length of a list"
        },
        {
          "token": "prices",
          "explanation": "Name of the list"
        },
        {
          "token": ")",
          "explanation": "End of function call"
        }
      ]
    },
    {
      "code": "    for i in range(len(prices)):",
      "explanation": "This line starts a for loop that iterates over the indices of the prices list.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code inside the function"
        },
        {
          "token": "for ",
          "explanation": "Keyword to start a for loop"
        },
        {
          "token": "i",
          "explanation": "Variable to hold the current index"
        },
        {
          "token": " in ",
          "explanation": "Keyword to specify the iterable"
        },
        {
          "token": "range(",
          "explanation": "Start of function call to create an iterable of indices"
        },
        {
          "token": "len(",
          "explanation": "Start of function call to get the length of a list"
        },
        {
          "token": "prices",
          "explanation": "Name of the list"
        },
        {
          "token": ")",
          "explanation": "End of function call"
        },
        {
          "token": ")",
          "explanation": "End of function call"
        },
        {
          "token": ":",
          "explanation": "End of for loop definition"
        }
      ]
    },
    {
      "code": "        while stack and prices[stack[-1]] <= prices[i]:",
      "explanation": "This line starts a while loop that continues as long as the stack is not empty and the price on the day at the top of the stack is less than or equal to the price on the current day.",
      "tokens": [
        {
          "token": "        ",
          "explanation": "Indentation for code inside the for loop"
        },
        {
          "token": "while ",
          "explanation": "Keyword to start a while loop"
        },
        {
          "token": "stack",
          "explanation": "Name of the list"
        },
        {
          "token": " and ",
          "explanation": "Logical operator to combine conditions"
        },
        {
          "token": "prices[",
          "explanation": "Start of indexing into the list"
        },
        {
          "token": "stack[-1]",
          "explanation": "Indexing into the stack to get the last element"
        },
        {
          "token": "]",
          "explanation": "End of indexing into the list"
        },
        {
          "token": " <= ",
          "explanation": "Less than or equal to operator"
        },
        {
          "token": "prices[",
          "explanation": "Start of indexing into the list"
        },
        {
          "token": "i",
          "explanation": "Variable holding the current index"
        },
        {
          "token": "]",
          "explanation": "End of indexing into the list"
        },
        {
          "token": ":",
          "explanation": "End of while loop definition"
        }
      ]
    },
    {
      "code": "            stack.pop()",
      "explanation": "This line removes the last element from the stack. This is done because the price on the current day is greater than the price on the day at the top of the stack.",
      "tokens": [
        {
          "token": "            ",
          "explanation": "Indentation for code inside the while loop"
        },
        {
          "token": "stack",
          "explanation": "Name of the list"
        },
        {
          "token": ".",
          "explanation": "Dot operator to access methods of the list"
        },
        {
          "token": "pop",
          "explanation": "Method to remove the last element from the list"
        },
        {
          "token": "()",
          "explanation": "Parentheses to call the method"
        }
      ]
    },
    {
      "code": "        if not stack:",
      "explanation": "This line starts an if statement that checks if the stack is empty. If it is, it means that the current price is the highest so far.",
      "tokens": [
        {
          "token": "        ",
          "explanation": "Indentation for code inside the for loop"
        },
        {
          "token": "if ",
          "explanation": "Keyword to start an if statement"
        },
        {
          "token": "not ",
          "explanation": "Logical operator to negate a condition"
        },
        {
          "token": "stack",
          "explanation": "Name of the list"
        },
        {
          "token": ":",
          "explanation": "End of if statement definition"
        }
      ]
    },
    {
      "code": "            span[i] = i + 1",
      "explanation": "This line sets the span for the current day to the current index plus one. This is done because the current price is the highest so far.",
      "tokens": [
        {
          "token": "            ",
          "explanation": "Indentation for code inside the if statement"
        },
        {
          "token": "span[",
          "explanation": "Start of indexing into the list"
        },
        {
          "token": "i",
          "explanation": "Variable holding the current index"
        },
        {
          "token": "]",
          "explanation": "End of indexing into the list"
        },
        {
          "token": " = ",
          "explanation": "Assignment operator"
        },
        {
          "token": "i",
          "explanation": "Variable holding the current index"
        },
        {
          "token": " + ",
          "explanation": "Addition operator"
        },
        {
          "token": "1",
          "explanation": "Integer literal"
        }
      ]
    },
    {
      "code": "        else:",
      "explanation": "This line starts an else statement that is executed if the stack is not empty. This means that there is a day with a higher price before the current day.",
      "tokens": [
        {
          "token": "        ",
          "explanation": "Indentation for code inside the for loop"
        },
        {
          "token": "else",
          "explanation": "Keyword to start an else statement"
        },
        {
          "token": ":",
          "explanation": "End of else statement definition"
        }
      ]
    },
    {
      "code": "            span[i] = i - stack[-1]",
      "explanation": "This line sets the span for the current day to the difference between the current index and the index at the top of the stack. This is the number of consecutive days with a lower or equal price.",
      "tokens": [
        {
          "token": "            ",
          "explanation": "Indentation for code inside the else statement"
        },
        {
          "token": "span[",
          "explanation": "Start of indexing into the list"
        },
        {
          "token": "i",
          "explanation": "Variable holding the current index"
        },
        {
          "token": "]",
          "explanation": "End of indexing into the list"
        },
        {
          "token": " = ",
          "explanation": "Assignment operator"
        },
        {
          "token": "i",
          "explanation": "Variable holding the current index"
        },
        {
          "token": " - ",
          "explanation": "Subtraction operator"
        },
        {
          "token": "stack[",
          "explanation": "Start of indexing into the list"
        },
        {
          "token": "-1",
          "explanation": "Index to get the last element of the list"
        },
        {
          "token": "]",
          "explanation": "End of indexing into the list"
        }
      ]
    },
    {
      "code": "        stack.append(i)",
      "explanation": "This line adds the current index to the stack. This is done to keep track of the days with a higher price.",
      "tokens": [
        {
          "token": "        ",
          "explanation": "Indentation for code inside the for loop"
        },
        {
          "token": "stack",
          "explanation": "Name of the list"
        },
        {
          "token": ".",
          "explanation": "Dot operator to access methods of the list"
        },
        {
          "token": "append",
          "explanation": "Method to add an element to the end of the list"
        },
        {
          "token": "(",
          "explanation": "Start of method parameters"
        },
        {
          "token": "i",
          "explanation": "Variable holding the current index"
        },
        {
          "token": ")",
          "explanation": "End of method parameters"
        }
      ]
    },
    {
      "code": "    return span",
      "explanation": "This line returns the list span. This list contains the span for each day.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code inside the function"
        },
        {
          "token": "return ",
          "explanation": "Keyword to return a value from the function"
        },
        {
          "token": "span",
          "explanation": "Name of the list to return"
        }
      ]
    }
  ]
},
{
  "questions": [
    {
      "type": "Short Answer",
      "question": "What is the purpose of the 'stack' in this function?",
      "answer": "The 'stack' is used to keep track of the indices of the days with higher stock prices.",
      "question-code-lines": [
        "2"
      ],
      "question-code-lines-explained": "stack = [] # An empty list is initialized to be used as a stack to store the indices of the days with higher stock prices."
    },
    {
      "type": "Multiple Choice",
      "question": "What does the 'while' loop inside the 'for' loop do?",
      "answer": {
        "correct-choice": "It pops elements from the stack while the top of the stack has a price less than or equal to the current price.",
        "incorrect-choice-1": "It pushes elements to the stack while the top of the stack has a price less than or equal to the current price.",
        "incorrect-choice-2": "It pops elements from the stack while the top of the stack has a price greater than the current price.",
        "incorrect-choice-3": "It pushes elements to the stack while the top of the stack has a price greater than the current price."
      },
      "question-code-lines": [
        "5"
      ],
      "question-code-lines-explained": "while stack and prices[stack[-1]] <= prices[i]: stack.pop() # This loop pops elements from the stack while the top of the stack has a price less than or equal to the current price."
    },
    {
      "type": "Multiple Choice",
      "question": "What does 'span[i] = i + 1' do when the stack is empty?",
      "answer": {
        "correct-choice": "It sets the span of the current day to be the number of days so far.",
        "incorrect-choice-1": "It sets the span of the current day to be the total number of days.",
        "incorrect-choice-2": "It sets the span of the current day to be the number of days remaining.",
        "incorrect-choice-3": "It sets the span of the current day to be the number of days with higher stock prices."
      },
      "question-code-lines": [
        "8"
      ],
      "question-code-lines-explained": "span[i] = i + 1 # If the stack is empty, it means that the current price is the highest so far. Therefore, the span of the current day is set to be the number of days so far."
    },
    {
      "type": "Short Answer",
      "question": "What does 'span[i] = i - stack[-1]' do when the stack is not empty?",
      "answer": "It sets the span of the current day to be the number of consecutive days with prices not less than the current price.",
      "question-code-lines": [
        "10"
      ],
      "question-code-lines-explained": "span[i] = i - stack[-1] # If the stack is not empty, it means that there are days with higher prices before the current day. Therefore, the span of the current day is set to be the number of consecutive days with prices not less than the current price."
    }
  ]
},
{
  "wrong-code": 
`def calculate_span(prices: list[int]) -> list[int]:
    stack = [-1]
    span = [0] * len(prices)
    for i in range(len(prices)):
        while stack and prices[stack[-1]] >= prices[i]:
            stack.pop()
            stack.pop()
        if stack:
            span[i] = i + 1
        else:
            span[i] = i - stack[0]
        stack.append(i)
    return span[:-1]`,
  "issues":{
              
          }
},
task1Decomposition,
  ),

  new MultipleChoiceTask(
    "1Rating",
    "Rate your experience",
    ["1", "2", "3", "4", "5"]
  ),

  new AuthoringTask(
    "2",
    "Write a function called longest_valid_brackets that takes a string consisting of only opening ( and closing ) parenthesis, and returns the length of the longest valid parenthesis substring. A sequence is considered valid if every opening bracket has a corresponding closing bracket in the correct order without any mismatches. The function should use a stack to calculate the longest valid parenthesis substring.",
    task2Code,
    task2Explanation,
{
  "subgoals": [
      {
          "title": "Function Definition",
          "code": [
              {
                  "indent": 0,
                  "line": "def longest_valid_brackets(s: str) -> int:",
                  "pseudo-code": "Define a function named 'longest_valid_brackets' that takes a string 's' as input and returns an integer.",
                  "syntax-hint": "The `def` keyword is used to define a function in Python. The `->` symbol is used to denote the return type of the function.",
                  "explanation": "This line is needed to define the function and specify its input and output types."
              }
          ]
      },
      {
          "title": "Initialize Variables",
          "code": [
              {
                  "indent": 1,
                  "line": "map = {'(': ')', '[': ']'}",
                  "pseudo-code": "Create a dictionary 'map' where the keys are opening brackets and the values are the corresponding closing brackets.",
                  "syntax-hint": "In Python, dictionaries are defined using curly braces `{}` with key-value pairs separated by a colon `:`.",
                  "explanation": "This line is needed to map opening brackets to their corresponding closing brackets."
              },
              {
                  "indent": 1,
                  "line": "stack = [-1]",
                  "pseudo-code": "Initialize a list 'stack' with a single element -1.",
                  "syntax-hint": "In Python, lists are defined using square brackets `[]`.",
                  "explanation": "This line is needed to initialize the stack that will be used to track the indices of the opening brackets."
              },
              {
                  "indent": 1,
                  "line": "max_length = 0",
                  "pseudo-code": "Initialize a variable 'max_length' to 0.",
                  "syntax-hint": "In Python, variables are defined using the `=` operator.",
                  "explanation": "This line is needed to keep track of the length of the longest valid parenthesis substring."
              }
          ]
      },
      {
          "title": "Iterate Over String",
          "code": [
              {
                  "indent": 1,
                  "line": "for i, char in enumerate(s):",
                  "pseudo-code": "Start a loop that iterates over each character 'char' in the string 's', with 'i' being the index of the character.",
                  "syntax-hint": "The `for` keyword is used to start a loop in Python. The `enumerate` function is used to get both the index and value of each element in a sequence.",
                  "explanation": "This line is needed to iterate over each character in the string."
              }
          ]
      },
      {
          "title": "Handle Opening Brackets",
          "code": [
              {
                  "indent": 2,
                  "line": "if char in map:",
                  "pseudo-code": "Check if the current character 'char' is an opening bracket.",
                  "syntax-hint": "The `in` keyword is used to check if a value is present in a sequence or dictionary in Python.",
                  "explanation": "This line is needed to check if the current character is an opening bracket."
              },
              {
                  "indent": 3,
                  "line": "stack.append(i)",
                  "pseudo-code": "If the current character is an opening bracket, append its index 'i' to the 'stack'.",
                  "syntax-hint": "The `append` method is used to add an element to the end of a list in Python.",
                  "explanation": "This line is needed to keep track of the indices of the opening brackets."
              }
          ]
      },
      {
          "title": "Handle Closing Brackets",
          "code": [
              {
                  "indent": 2,
                  "line": "else:",
                  "pseudo-code": "If the current character is not an opening bracket, it must be a closing bracket.",
                  "syntax-hint": "The `else` keyword is used to specify a block of code to be executed if the condition in the `if` statement is false.",
                  "explanation": "This line is needed to handle the case where the current character is a closing bracket."
              },
              {
                  "indent": 3,
                  "line": "not_empty = len(stack) > 1",
                  "pseudo-code": "Check if the 'stack' has more than one element.",
                  "syntax-hint": "The `len` function is used to get the number of elements in a sequence in Python.",
                  "explanation": "This line is needed to check if the stack is not empty."
              },
              {
                  "indent": 3,
                  "line": "last_is_open = stack[-1] != -1 and s[stack[-1]] in map",
                  "pseudo-code": "Check if the last element in the 'stack' is an index of an opening bracket.",
                  "syntax-hint": "The `-1` index is used to access the last element in a sequence in Python.",
                  "explanation": "This line is needed to check if the last element in the stack is an index of an opening bracket."
              },
              {
                  "indent": 3,
                  "line": "is_match = last_is_open and map[s[stack[-1]]] == char",
                  "pseudo-code": "Check if the current character 'char' is a match for the last opening bracket in the 'stack'.",
                  "syntax-hint": "The `and` keyword is used to combine two conditions in Python.",
                  "explanation": "This line is needed to check if the current character is a match for the last opening bracket in the stack."
              },
              {
                  "indent": 3,
                  "line": "if not_empty and is_match:",
                  "pseudo-code": "If the 'stack' is not empty and the current character is a match for the last opening bracket, then the current substring is valid.",
                  "syntax-hint": "The `if` keyword is used to start a conditional statement in Python.",
                  "explanation": "This line is needed to check if the current substring is valid."
              },
              {
                  "indent": 4,
                  "line": "stack.pop()",
                  "pseudo-code": "If the current substring is valid, remove the last element from the 'stack'.",
                  "syntax-hint": "The `pop` method is used to remove the last element from a list in Python.",
                  "explanation": "This line is needed to remove the index of the last opening bracket from the stack."
              },
              {
                  "indent": 4,
                  "line": "max_length = max(max_length, i - stack[-1])",
                  "pseudo-code": "Update 'max_length' to be the maximum of its current value and the length of the current valid substring.",
                  "syntax-hint": "The `max` function is used to get the maximum of two or more values in Python.",
                  "explanation": "This line is needed to update the length of the longest valid parenthesis substring."
              },
              {
                  "indent": 3,
                  "line": "else:",
                  "pseudo-code": "If the 'stack' is empty or the current character is not a match for the last opening bracket, then the current substring is not valid.",
                  "syntax-hint": "The `else` keyword is used to specify a block of code to be executed if the condition in the `if` statement is false.",
                  "explanation": "This line is needed to handle the case where the current substring is not valid."
              },
              {
                  "indent": 4,
                  "line": "stack[-1] = i",
                  "pseudo-code": "If the current substring is not valid, update the last element in the 'stack' to be the index of the current character.",
                  "syntax-hint": "In Python, you can modify the value of an element in a list by accessing it using its index and the `=` operator.",
                  "explanation": "This line is needed to update the index of the last opening bracket in the stack."
              }
          ]
      },
      {
          "title": "Return Result",
          "code": [
              {
                  "indent": 1,
                  "line": "return max_length",
                  "pseudo-code": "Return the length of the longest valid parenthesis substring.",
                  "syntax-hint": "The `return` keyword is used to specify the result that a function should return.",
                  "explanation": "This line is needed to return the result of the function."
              }
          ]
      }
  ]
},
{
  "lines": [
    {
      "code": "def longest_valid_brackets(s: str) -> int:",
      "explanation": "This line defines the function 'longest_valid_brackets' which takes a string 's' as input and returns an integer.",
      "tokens": [
        {
          "token": "def ",
          "explanation": "Keyword to start a function definition"
        },
        {
          "token": "longest_valid_brackets",
          "explanation": "Name of the function"
        },
        {
          "token": "(s: str) -> int:",
          "explanation": "Function parameters and return type"
        }
      ]
    },
    {
      "code": "    map = {'(': ')', '[': ']'}",
      "explanation": "This line creates a dictionary 'map' that maps opening brackets to their corresponding closing brackets.",
      "tokens": [
        {
          "token": "map ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "{'(': ')', '[': ']'}",
          "explanation": "Dictionary of opening and closing brackets"
        }
      ]
    },
    {
      "code": "    stack = [-1]",
      "explanation": "This line initializes a stack with -1. The stack will be used to keep track of the indices of the opening brackets.",
      "tokens": [
        {
          "token": "stack ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "[-1]",
          "explanation": "Initial stack with -1"
        }
      ]
    },
    {
      "code": "    max_length = 0",
      "explanation": "This line initializes 'max_length' to 0. 'max_length' will be used to keep track of the longest valid parenthesis substring.",
      "tokens": [
        {
          "token": "max_length ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "0",
          "explanation": "Initial value"
        }
      ]
    },
    {
      "code": "    for i, char in enumerate(s):",
      "explanation": "This line starts a for loop that iterates over the string 's', with 'i' being the index and 'char' being the character at that index.",
      "tokens": [
        {
          "token": "for ",
          "explanation": "Keyword to start a for loop"
        },
        {
          "token": "i, char ",
          "explanation": "Loop variables"
        },
        {
          "token": "in ",
          "explanation": "Keyword to specify the iterable"
        },
        {
          "token": "enumerate(s):",
          "explanation": "Function to get index and value from iterable"
        }
      ]
    },
    {
      "code": "        if char in map:",
      "explanation": "This line checks if the current character is an opening bracket by checking if it is a key in the 'map' dictionary.",
      "tokens": [
        {
          "token": "if ",
          "explanation": "Keyword to start an if statement"
        },
        {
          "token": "char ",
          "explanation": "Variable name"
        },
        {
          "token": "in ",
          "explanation": "Keyword to check membership in a collection"
        },
        {
          "token": "map:",
          "explanation": "Dictionary of opening and closing brackets"
        }
      ]
    },
    {
      "code": "            stack.append(i)",
      "explanation": "This line appends the index of the opening bracket to the stack.",
      "tokens": [
        {
          "token": "stack",
          "explanation": "Variable name"
        },
        {
          "token": ".append",
          "explanation": "Method to add an item to the end of a list"
        },
        {
          "token": "(i)",
          "explanation": "Index of the opening bracket"
        }
      ]
    },
    {
      "code": "        else:",
      "explanation": "This line starts an else block that will be executed if the current character is not an opening bracket.",
      "tokens": [
        {
          "token": "else:",
          "explanation": "Keyword to start an else block"
        }
      ]
    },
    {
      "code": "            not_empty = len(stack) > 1",
      "explanation": "This line checks if the stack is not empty by checking if its length is greater than 1.",
      "tokens": [
        {
          "token": "not_empty ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "len(stack) > 1",
          "explanation": "Check if stack is not empty"
        }
      ]
    },
    {
      "code": "            last_is_open = stack[-1] != -1 and s[stack[-1]] in map",
      "explanation": "This line checks if the last item in the stack is an opening bracket.",
      "tokens": [
        {
          "token": "last_is_open ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "stack[-1] != -1 and s[stack[-1]] in map",
          "explanation": "Check if last item in stack is an opening bracket"
        }
      ]
    },
    {
      "code": "            is_match = last_is_open and map[s[stack[-1]]] == char",
      "explanation": "This line checks if the last opening bracket in the stack matches the current closing bracket.",
      "tokens": [
        {
          "token": "is_match ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "last_is_open and map[s[stack[-1]]] == char",
          "explanation": "Check if last opening bracket matches current closing bracket"
        }
      ]
    },
    {
      "code": "            if not_empty and is_match:",
      "explanation": "This line checks if the stack is not empty and the last opening bracket matches the current closing bracket.",
      "tokens": [
        {
          "token": "if ",
          "explanation": "Keyword to start an if statement"
        },
        {
          "token": "not_empty and is_match:",
          "explanation": "Check if stack is not empty and brackets match"
        }
      ]
    },
    {
      "code": "                stack.pop()",
      "explanation": "This line removes the last item from the stack, which is the index of the matching opening bracket.",
      "tokens": [
        {
          "token": "stack",
          "explanation": "Variable name"
        },
        {
          "token": ".pop",
          "explanation": "Method to remove the last item from a list"
        },
        {
          "token": "()",
          "explanation": "Call the method"
        }
      ]
    },
    {
      "code": "                max_length = max(max_length, i - stack[-1])",
      "explanation": "This line updates 'max_length' to be the maximum of its current value and the difference between the current index and the last item in the stack.",
      "tokens": [
        {
          "token": "max_length ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "max(max_length, i - stack[-1])",
          "explanation": "Update max_length with the maximum value"
        }
      ]
    },
    {
      "code": "            else:",
      "explanation": "This line starts an else block that will be executed if the stack is empty or the last opening bracket does not match the current closing bracket.",
      "tokens": [
        {
          "token": "else:",
          "explanation": "Keyword to start an else block"
        }
      ]
    },
    {
      "code": "                stack[-1] = i",
      "explanation": "This line updates the last item in the stack to be the current index.",
      "tokens": [
        {
          "token": "stack[-1] ",
          "explanation": "Last item in the stack"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "i",
          "explanation": "Current index"
        }
      ]
    },
    {
      "code": "    return max_length",
      "explanation": "This line returns 'max_length', which is the length of the longest valid parenthesis substring.",
      "tokens": [
        {
          "token": "return ",
          "explanation": "Keyword to return a value from a function"
        },
        {
          "token": "max_length",
          "explanation": "Variable holding the length of the longest valid parenthesis substring"
        }
      ]
    }
  ]
},
{
  "questions": [
    {
      "type": "Short Answer",
      "question": "What is the purpose of the 'map' dictionary in the function?",
      "answer": "It is used to map opening brackets to their corresponding closing brackets.",
      "question-code-lines": [
        "2"
      ],
      "question-code-lines-explained": "map = {'(': ')', '[': ']'} # This line creates a dictionary that maps opening brackets to their corresponding closing brackets."
    },
    {
      "type": "Multiple Choice",
      "question": "What does the 'stack' list represent in the function?",
      "answer": {
        "correct-choice": "It keeps track of the indices of the opening brackets.",
        "incorrect-choice-1": "It stores the characters of the string.",
        "incorrect-choice-2": "It holds the lengths of valid parenthesis substrings.",
        "incorrect-choice-3": "It is used to reverse the string."
      },
      "question-code-lines": [
        "3"
      ],
      "question-code-lines-explained": "stack = [-1] # This line initializes a list with -1, which is used to store the indices of the opening brackets."
    },
    {
      "type": "Multiple Choice",
      "question": "What does the 'max_length' variable represent in the function?",
      "answer": {
        "correct-choice": "It stores the length of the longest valid parenthesis substring found so far.",
        "incorrect-choice-1": "It represents the total length of the string.",
        "incorrect-choice-2": "It holds the number of valid parenthesis substrings in the string.",
        "incorrect-choice-3": "It is used to keep track of the current index in the string."
      },
      "question-code-lines": [
        "4"
      ],
      "question-code-lines-explained": "max_length = 0 # This line initializes a variable to keep track of the length of the longest valid parenthesis substring found so far."
    },
    {
      "type": "Short Answer",
      "question": "What is the purpose of the 'is_match' variable in the function?",
      "answer": "It checks if the current character matches the last opening bracket in the stack.",
      "question-code-lines": [
        "11"
      ],
      "question-code-lines-explained": "is_match = last_is_open and map[s[stack[-1]]] == char # This line checks if the current character matches the last opening bracket in the stack."
    },
    {
      "type": "Multiple Choice",
      "question": "What happens when a matching closing bracket is found for the last opening bracket in the stack?",
      "answer": {
        "correct-choice": "The last opening bracket is popped from the stack and the length of the current valid substring is updated.",
        "incorrect-choice-1": "The closing bracket is added to the stack.",
        "incorrect-choice-2": "The function returns the current length of the valid substring.",
        "incorrect-choice-3": "The matching closing bracket is removed from the string."
      },
      "question-code-lines": [
        "10", "11"
      ],
      "question-code-lines-explained": "if not_empty and is_match: stack.pop(); max_length = max(max_length, i - stack[-1]) # If a matching closing bracket is found, the last opening bracket is popped from the stack and the length of the current valid substring is updated."
    }
  ]
},

{
  "wrong-code": 
`def longest_valid_brackets(s: str) -> int:
    map = {'(': ')', '[': ']'}
    stack = []
    max_length = 0
    for i, char in enumerate(s):
        if char in map:
            stack.append(i)
        else:
            not_empty = len(stack) > 1
            last_is_open = stack[-1] != -1 and s[stack[-1]] in map
            is_match = last_is_open and s[stack[-1]] == char
            if not_empty or is_match:
                stack.pop()
                max_length = max(max_length, stack[-1] - i)
            else:
                stack.append(i)     
    return max_length`,
  "issues":{
          }
  },
task2Decomposition,
  ),

  new MultipleChoiceTask(
    "2Rating",
    "Rate your experience",
    ["1", "2", "3", "4", "5"]
  ),


new AuthoringTask(
  "3",
  "Write a function called `binary_numbers` that receives two numbers `n1` and `n2` as integers and returns a list of all binary numbers (as strings) between `n1` and `n2`. The function should use a queue to generate these binary numbers efficiently.",
  task3Code,
  task3Explanation,
{
  "subgoals": [
      {
          "title": "Function Definition",
          "code": [
              {
                  "indent": 0,
                  "line": "def binary_numbers(n1: int, n2: int) -> list[str]:",
                  "pseudo-code": "Define a function named `binary_numbers` that takes two parameters, `n1` and `n2`.",
                  "syntax-hint": "`def` is used to define a function in Python. The `:` at the end indicates the start of a new block of code.",
                  "explanation": "This line defines the function `binary_numbers` that will be used to generate binary numbers between `n1` and `n2`."
              }
          ]
      },
      {
          "title": "Initialize Variables",
          "code": [
              {
                  "indent": 1,
                  "line": "result = []",
                  "pseudo-code": "Initialize an empty list `result`.",
                  "syntax-hint": "In Python, `[]` is used to create an empty list.",
                  "explanation": "This line creates an empty list `result` that will be used to store the binary numbers."
              },
              {
                  "indent": 1,
                  "line": "q = ['1']",
                  "pseudo-code": "Initialize a list `q` with a single element '1'.",
                  "syntax-hint": "In Python, `['1']` is used to create a list with a single string element '1'.",
                  "explanation": "This line creates a list `q` that will be used as a queue to generate binary numbers."
              }
          ]
      },
      {
          "title": "Generate Binary Numbers",
          "code": [
              {
                  "indent": 1,
                  "line": "for i in range(n2):",
                  "pseudo-code": "Start a loop that iterates `n2` times.",
                  "syntax-hint": "`for` is used to start a loop in Python. `range(n2)` generates a sequence of numbers from 0 to `n2`-1.",
                  "explanation": "This line starts a loop that will be used to generate binary numbers."
              },
              {
                  "indent": 2,
                  "line": "current = q.pop(0)",
                  "pseudo-code": "Remove and get the first element from `q` and assign it to `current`.",
                  "syntax-hint": "`pop(0)` is used to remove and return the first element of a list in Python.",
                  "explanation": "This line gets the first binary number from the queue `q`."
              },
              {
                  "indent": 2,
                  "line": "current_int = int(current, 2)",
                  "pseudo-code": "Convert `current` from binary to integer and assign it to `current_int`.",
                  "syntax-hint": "`int(current, 2)` is used to convert a binary string to an integer in Python.",
                  "explanation": "This line converts the binary number to an integer for comparison."
              },
              {
                  "indent": 2,
                  "line": "if n1 <= current_int <= n2:",
                  "pseudo-code": "Check if `current_int` is between `n1` and `n2`.",
                  "syntax-hint": "`if` is used to start a conditional statement in Python. `<=` is a comparison operator that checks if the left operand is less than or equal to the right operand.",
                  "explanation": "This line checks if the current binary number is within the specified range."
              },
              {
                  "indent": 3,
                  "line": "result.append(current)",
                  "pseudo-code": "Add `current` to the end of `result`.",
                  "syntax-hint": "`append` is a list method in Python that adds an element to the end of the list.",
                  "explanation": "This line adds the current binary number to the result list if it is within the specified range."
              },
              {
                  "indent": 2,
                  "line": "q.append(current + '0')",
                  "pseudo-code": "Add `current` concatenated with '0' to the end of `q`.",
                  "syntax-hint": "`+` is used to concatenate strings in Python.",
                  "explanation": "This line generates the next binary number by appending '0' to the current binary number."
              },
              {
                  "indent": 2,
                  "line": "q.append(current + '1')",
                  "pseudo-code": "Add `current` concatenated with '1' to the end of `q`.",
                  "syntax-hint": "`+` is used to concatenate strings in Python.",
                  "explanation": "This line generates the next binary number by appending '1' to the current binary number."
              }
          ]
      },
      {
          "title": "Return Result",
          "code": [
              {
                  "indent": 1,
                  "line": "return result",
                  "pseudo-code": "Return the list `result`.",
                  "syntax-hint": "`return` is used to specify the result that a function should return.",
                  "explanation": "This line returns the list of binary numbers that were generated."
              }
          ]
      }
  ]
},
{
  "lines": [
    {
      "code": "def binary_numbers(n1: int, n2: int) -> list[str]:",
      "explanation": "This line defines the function binary_numbers that takes two integers and returns a list of strings.",
      "tokens": [
        {
          "token": "def ",
          "explanation": "Keyword to start function definition"
        },
        {
          "token": "binary_numbers",
          "explanation": "Name of the function"
        },
        {
          "token": "("
        },
        {
          "token": "n1: int",
          "explanation": "First parameter of the function, an integer"
        },
        {
          "token": ", "
        },
        {
          "token": "n2: int",
          "explanation": "Second parameter of the function, an integer"
        },
        {
          "token": ") -> list[str]:",
          "explanation": "Function return type, a list of strings"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "    result = []",
      "explanation": "This line initializes an empty list to store the binary numbers.",
      "tokens": [
        {
          "token": "    "
        },
        {
          "token": "result ",
          "explanation": "Variable to store the binary numbers"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "[]",
          "explanation": "Empty list"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "    q = ['1']",
      "explanation": "This line initializes a queue with the binary number '1'.",
      "tokens": [
        {
          "token": "    "
        },
        {
          "token": "q ",
          "explanation": "Variable to store the queue"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "['1']",
          "explanation": "List with the binary number '1'"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "    for i in range(n2):",
      "explanation": "This line starts a loop that will iterate n2 times.",
      "tokens": [
        {
          "token": "    "
        },
        {
          "token": "for ",
          "explanation": "Keyword to start a loop"
        },
        {
          "token": "i ",
          "explanation": "Loop variable"
        },
        {
          "token": "in ",
          "explanation": "Keyword to specify the iterable"
        },
        {
          "token": "range(n2)",
          "explanation": "Function that generates numbers from 0 to n2-1"
        },
        {
          "token": ":",
          "explanation": "Start of the loop body"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "        current = q.pop(0)",
      "explanation": "This line removes and returns the first element of the queue.",
      "tokens": [
        {
          "token": "        "
        },
        {
          "token": "current ",
          "explanation": "Variable to store the first element of the queue"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "q.pop(0)",
          "explanation": "Method that removes and returns the first element of the queue"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "        current_int = int(current, 2)",
      "explanation": "This line converts the binary number to an integer.",
      "tokens": [
        {
          "token": "        "
        },
        {
          "token": "current_int ",
          "explanation": "Variable to store the integer representation of the binary number"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "int(current, 2)",
          "explanation": "Function that converts a binary number to an integer"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "        if n1 <= current_int <= n2:",
      "explanation": "This line checks if the integer is between n1 and n2.",
      "tokens": [
        {
          "token": "        "
        },
        {
          "token": "if ",
          "explanation": "Keyword to start a conditional statement"
        },
        {
          "token": "n1 <= current_int <= n2",
          "explanation": "Condition that checks if the integer is between n1 and n2"
        },
        {
          "token": ":",
          "explanation": "Start of the conditional body"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "            result.append(current)",
      "explanation": "This line adds the binary number to the result list if the condition is true.",
      "tokens": [
        {
          "token": "            "
        },
        {
          "token": "result.append",
          "explanation": "Method that adds an element to the end of the list"
        },
        {
          "token": "("
        },
        {
          "token": "current",
          "explanation": "The binary number to add to the list"
        },
        {
          "token": ")",
          "explanation": "End of the method call"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "        q.append(current + '0')",
      "explanation": "This line adds the binary number with an appended '0' to the queue.",
      "tokens": [
        {
          "token": "        "
        },
        {
          "token": "q.append",
          "explanation": "Method that adds an element to the end of the queue"
        },
        {
          "token": "("
        },
        {
          "token": "current + '0'",
          "explanation": "The binary number with an appended '0'"
        },
        {
          "token": ")",
          "explanation": "End of the method call"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "        q.append(current + '1')",
      "explanation": "This line adds the binary number with an appended '1' to the queue.",
      "tokens": [
        {
          "token": "        "
        },
        {
          "token": "q.append",
          "explanation": "Method that adds an element to the end of the queue"
        },
        {
          "token": "("
        },
        {
          "token": "current + '1'",
          "explanation": "The binary number with an appended '1'"
        },
        {
          "token": ")",
          "explanation": "End of the method call"
        },
        {
          "token": "\n"
        }
      ]
    },
    {
      "code": "    return result",
      "explanation": "This line returns the list of binary numbers.",
      "tokens": [
        {
          "token": "    "
        },
        {
          "token": "return ",
          "explanation": "Keyword that ends the function and returns a value"
        },
        {
          "token": "result",
          "explanation": "The list of binary numbers to return"
        },
        {
          "token": "\n"
        }
      ]
    }
  ]
},
{
  "questions": [
    {
      "type": "Short Answer",
      "question": "Why is the queue 'q' initialized with the binary number '1'?",
      "answer": "It's the starting point for generating binary numbers.",
      "question-code-lines": [
        3
      ],
      "question-code-lines-explained": "q = ['1'] # Initializes the queue with the binary number '1'"
    },
    {
      "type": "Multiple Choice",
      "question": "What is the effect of popping the first element of 'q' in each iteration?",
      "answer": {
        "correct-choice": "It ensures the oldest binary number is processed first.",
        "incorrect-choice-1": "It ensures the newest binary number is processed first.",
        "incorrect-choice-2": "It removes the binary number from the queue.",
        "incorrect-choice-3": "It has no effect on the queue."
      },
      "question-code-lines": [
        5
      ],
      "question-code-lines-explained": "current = q.pop(0) # Pops the first element from the queue, which is the oldest binary number"
    },
    {
      "type": "Short Answer",
      "question": "What is the purpose of the 'current_int' variable?",
      "answer": "It converts the binary number to an integer for comparison.",
      "question-code-lines": [
        6
      ],
      "question-code-lines-explained": "current_int = int(current, 2) # Converts the binary number to an integer"
    },
    {
      "type": "Multiple Choice",
      "question": "What is the effect of appending 'current + '0'' and 'current + '1'' to 'q'?",
      "answer": {
        "correct-choice": "It generates the next binary numbers in sequence.",
        "incorrect-choice-1": "It doubles the size of the queue.",
        "incorrect-choice-2": "It converts the binary numbers to integers.",
        "incorrect-choice-3": "It has no effect on the queue."
      },
      "question-code-lines": [
        9, 10
      ],
      "question-code-lines-explained": "q.append(current + '0')\nq.append(current + '1') # Appends the next binary numbers in sequence to the queue"
    }
  ]
},
{
  "wrong-code": 
`def binary_numbers(n1: int, n2: int) -> list[str]:
    result = ['1']
    q = ['0']
    for i in range(n2):
        current = q.pop(0)
        current_int = int(current, 2)
        if n1 <= current_int:
            result.append(current_int)
        q.append(current + '1')
        q.append(current + '0')
    return result
`,
  "issues":{
          }
  },
  task3Decomposition,
),

new MultipleChoiceTask(
  "3Rating",
  "Rate your experience",
  ["1", "2", "3", "4", "5"]
),

new AuthoringTask(
  "4",
  "Write a Python function named `dna_sequences` that generates all possible DNA sequences based on a given pattern. The function should accept a single string argument (`pattern`) and return a list of strings. The input pattern consists of the characters `A`, `T`, `C`, `G`, and a special placeholder `N`. The `N` acts as a wildcard that can be replaced by any of the four DNA bases (`A`, `C`, `G`, `T`). Your function should return a list of strings, each representing a unique DNA sequence obtained by substituting every `N` in the input pattern with each possible DNA base. Use a queue data structure to generate and explore all combinations of sequences.",
  task4Code,
  task4Explanation,
{
  "subgoals": [
      {
          "title": "Function Definition",
          "code": [
              {
                  "indent": 0,
                  "line": "def dna_sequences(pattern: str) -> list[str]:",
                  "pseudo-code": "Define a function named dna_sequences that takes a string argument pattern and returns a list of strings",
                  "syntax-hint": "`def` is used to define a function in Python. The `:` indicates the start of a new block of code. The `-> list[str]` is a type hint indicating the function returns a list of strings.",
                  "explanation": "This line defines the function dna_sequences, which will generate all possible DNA sequences based on a given pattern."
              }
          ]
      },
      {
          "title": "Initialize Variables",
          "code": [
              {
                  "indent": 1,
                  "line": "dna_chars = [\"A\", \"C\", \"G\", \"T\"]",
                  "pseudo-code": "Create a list dna_chars containing the four DNA bases",
                  "syntax-hint": "In Python, lists are defined using square brackets `[]` and items are separated by commas.",
                  "explanation": "This line initializes a list of the four DNA bases that will be used to replace the wildcard 'N' in the pattern."
              },
              {
                  "indent": 1,
                  "line": "q = [\"\"]",
                  "pseudo-code": "Initialize an empty queue q with an empty string",
                  "syntax-hint": "In Python, lists can be used as queues. Here, `q` is initialized with an empty string.",
                  "explanation": "This line initializes a queue that will be used to generate and explore all combinations of sequences."
              },
              {
                  "indent": 1,
                  "line": "result = []",
                  "pseudo-code": "Initialize an empty list result",
                  "syntax-hint": "In Python, an empty list is created by `[]`.",
                  "explanation": "This line initializes an empty list that will store the final DNA sequences."
              }
          ]
      },
      {
          "title": "Generate DNA Sequences",
          "code": [
              {
                  "indent": 1,
                  "line": "while len(q) > 0:",
                  "pseudo-code": "Start a while loop that continues as long as the queue q is not empty",
                  "syntax-hint": "The `while` keyword is used to start a loop in Python. The `len()` function returns the number of items in a list.",
                  "explanation": "This line starts a loop that will continue until all possible DNA sequences have been generated and added to the result list."
              },
              {
                  "indent": 2,
                  "line": "seq = q.pop(0)",
                  "pseudo-code": "Remove and get the first element from the queue q and assign it to the variable seq",
                  "syntax-hint": "The `pop()` method removes the item at the specified position in the list, and returns the removed item.",
                  "explanation": "This line retrieves the next sequence from the queue to be processed."
              },
              {
                  "indent": 2,
                  "line": "if len(seq) == len(pattern):",
                  "pseudo-code": "Check if the length of the sequence seq is equal to the length of the pattern",
                  "syntax-hint": "The `if` keyword is used to start a conditional statement in Python. The `==` operator checks for equality.",
                  "explanation": "This line checks if the current sequence has reached the desired length. If it has, it's a valid DNA sequence and should be added to the result list."
              },
              {
                  "indent": 3,
                  "line": "result.append(seq)",
                  "pseudo-code": "Add the sequence seq to the result list",
                  "syntax-hint": "The `append()` method adds an item to the end of the list.",
                  "explanation": "This line adds the current sequence to the result list because it's a valid DNA sequence."
              },
              {
                  "indent": 2,
                  "line": "else:",
                  "pseudo-code": "Start the else block for the if statement",
                  "syntax-hint": "The `else` keyword is used to define a block of code to be executed if the condition in the `if` statement is false.",
                  "explanation": "This line starts the else block, which will be executed if the current sequence hasn't reached the desired length yet."
              },
              {
                  "indent": 3,
                  "line": "if pattern[len(seq)] == \"N\":",
                  "pseudo-code": "Check if the character at the current position in the pattern is the wildcard 'N'",
                  "syntax-hint": "The `[]` operator is used to access an item at a specific position in a list or string.",
                  "explanation": "This line checks if the character at the current position in the pattern is the wildcard 'N'. If it is, it needs to be replaced by each of the four DNA bases."
              },
              {
                  "indent": 4,
                  "line": "for ch in dna_chars:",
                  "pseudo-code": "Start a for loop that iterates over each character ch in the list dna_chars",
                  "syntax-hint": "The `for` keyword is used to start a loop in Python. The `in` keyword is used to check if a value is present in a list or other collection.",
                  "explanation": "This line starts a loop that will iterate over each of the four DNA bases."
              },
              {
                  "indent": 5,
                  "line": "q.append(seq + ch)",
                  "pseudo-code": "Add the sequence seq concatenated with the character ch to the queue q",
                  "syntax-hint": "The `+` operator is used to concatenate strings in Python.",
                  "explanation": "This line generates a new sequence by replacing the wildcard 'N' with the current DNA base, and adds it to the queue for further processing."
              },
              {
                  "indent": 3,
                  "line": "else:",
                  "pseudo-code": "Start the else block for the inner if statement",
                  "syntax-hint": "The `else` keyword is used to define a block of code to be executed if the condition in the `if` statement is false.",
                  "explanation": "This line starts the else block, which will be executed if the character at the current position in the pattern is not the wildcard 'N'."
              },
              {
                  "indent": 4,
                  "line": "q.append(seq + pattern[len(seq)])",
                  "pseudo-code": "Add the sequence seq concatenated with the character at the current position in the pattern to the queue q",
                  "syntax-hint": "The `+` operator is used to concatenate strings in Python.",
                  "explanation": "This line generates a new sequence by adding the character at the current position in the pattern to the current sequence, and adds it to the queue for further processing."
              }
          ]
      },
      {
          "title": "Return Result",
          "code": [
              {
                  "indent": 1,
                  "line": "return result",
                  "pseudo-code": "Return the result list",
                  "syntax-hint": "The `return` keyword is used to end the execution of a function and return a value.",
                  "explanation": "This line returns the final list of DNA sequences."
              }
          ]
      }
  ]
},
{
  "lines": [
    {
      "code": "def dna_sequences(pattern: str) -> list[str]:",
      "explanation": "This line defines the function dna_sequences, which will generate all possible DNA sequences based on a given pattern.",
      "tokens": [
        {
          "token": "def ",
          "explanation": "Keyword to start a function definition"
        },
        {
          "token": "dna_sequences",
          "explanation": "Name of the function"
        },
        {
          "token": "(",
          "explanation": "Start of function parameters"
        },
        {
          "token": "pattern: str",
          "explanation": "Function parameter with type hint"
        },
        {
          "token": ") -> list[str]",
          "explanation": "End of function parameters and return type hint"
        },
        {
          "token": ":",
          "explanation": "Start of function body"
        }
      ]
    },
    {
      "code": "    dna_chars = [\"A\", \"C\", \"G\", \"T\"]",
      "explanation": "This line initializes a list of the four DNA bases that will be used to replace the wildcard 'N' in the pattern.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "dna_chars ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "[\"A\", \"C\", \"G\", \"T\"]",
          "explanation": "List of DNA bases"
        }
      ]
    },
    {
      "code": "    q = [\"\"]",
      "explanation": "This line initializes a queue that will be used to generate and explore all combinations of sequences.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "q ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "[\"\"]",
          "explanation": "List with an empty string"
        }
      ]
    },
    {
      "code": "    result = []",
      "explanation": "This line initializes an empty list that will store the final DNA sequences.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "result ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "[]",
          "explanation": "Empty list"
        }
      ]
    },
    {
      "code": "    while len(q) > 0:",
      "explanation": "This line starts a loop that will continue until all possible DNA sequences have been generated and added to the result list.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "while ",
          "explanation": "Keyword to start a while loop"
        },
        {
          "token": "len(q) > 0",
          "explanation": "Condition for the while loop"
        },
        {
          "token": ":",
          "explanation": "Start of while loop body"
        }
      ]
    },
    {
      "code": "        seq = q.pop(0)",
      "explanation": "This line retrieves the next sequence from the queue to be processed.",
      "tokens": [
        {
          "token": "        ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "seq ",
          "explanation": "Variable name"
        },
        {
          "token": "= ",
          "explanation": "Assignment operator"
        },
        {
          "token": "q.pop(0)",
          "explanation": "Method to remove and return the first item from the list"
        }
      ]
    },
    {
      "code": "        if len(seq) == len(pattern):",
      "explanation": "This line checks if the current sequence has reached the desired length. If it has, it's a valid DNA sequence and should be added to the result list.",
      "tokens": [
        {
          "token": "        ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "if ",
          "explanation": "Keyword to start a conditional statement"
        },
        {
          "token": "len(seq) == len(pattern)",
          "explanation": "Condition for the if statement"
        },
        {
          "token": ":",
          "explanation": "Start of if statement body"
        }
      ]
    },
    {
      "code": "            result.append(seq)",
      "explanation": "This line adds the current sequence to the result list because it's a valid DNA sequence.",
      "tokens": [
        {
          "token": "            ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "result.append(seq)",
          "explanation": "Method to add an item to the end of the list"
        }
      ]
    },
    {
      "code": "        else:",
      "explanation": "This line starts the else block, which will be executed if the current sequence hasn't reached the desired length yet.",
      "tokens": [
        {
          "token": "        ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "else",
          "explanation": "Keyword to start an else block"
        },
        {
          "token": ":",
          "explanation": "Start of else block body"
        }
      ]
    },
    {
      "code": "            if pattern[len(seq)] == \"N\":",
      "explanation": "This line checks if the character at the current position in the pattern is the wildcard 'N'. If it is, it needs to be replaced by each of the four DNA bases.",
      "tokens": [
        {
          "token": "            ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "if ",
          "explanation": "Keyword to start a conditional statement"
        },
        {
          "token": "pattern[len(seq)] == \"N\"",
          "explanation": "Condition for the if statement"
        },
        {
          "token": ":",
          "explanation": "Start of if statement body"
        }
      ]
    },
    {
      "code": "                for ch in dna_chars:",
      "explanation": "This line starts a loop that will iterate over each of the four DNA bases.",
      "tokens": [
        {
          "token": "                ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "for ",
          "explanation": "Keyword to start a for loop"
        },
        {
          "token": "ch ",
          "explanation": "Loop variable"
        },
        {
          "token": "in ",
          "explanation": "Keyword to specify the collection to iterate over"
        },
        {
          "token": "dna_chars",
          "explanation": "List to iterate over"
        },
        {
          "token": ":",
          "explanation": "Start of for loop body"
        }
      ]
    },
    {
      "code": "                    q.append(seq + ch)",
      "explanation": "This line generates a new sequence by replacing the wildcard 'N' with the current DNA base, and adds it to the queue for further processing.",
      "tokens": [
        {
          "token": "                    ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "q.append(seq + ch)",
          "explanation": "Method to add an item to the end of the list"
        }
      ]
    },
    {
      "code": "            else:",
      "explanation": "This line starts the else block, which will be executed if the character at the current position in the pattern is not the wildcard 'N'.",
      "tokens": [
        {
          "token": "            ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "else",
          "explanation": "Keyword to start an else block"
        },
        {
          "token": ":",
          "explanation": "Start of else block body"
        }
      ]
    },
    {
      "code": "                q.append(seq + pattern[len(seq)])",
      "explanation": "This line generates a new sequence by adding the character at the current position in the pattern to the current sequence, and adds it to the queue for further processing.",
      "tokens": [
        {
          "token": "                ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "q.append(seq + pattern[len(seq)])",
          "explanation": "Method to add an item to the end of the list"
        }
      ]
    },
    {
      "code": "    return result",
      "explanation": "This line returns the final list of DNA sequences.",
      "tokens": [
        {
          "token": "    ",
          "explanation": "Indentation for code block"
        },
        {
          "token": "return ",
          "explanation": "Keyword to return a value from a function"
        },
        {
          "token": "result",
          "explanation": "Variable to return"
        }
      ]
    }
  ]
},
{
  "questions": [
    {
      "type": "Short Answer",
      "question": "What does the 'while' loop do in this code?",
      "answer": "It processes all sequences in the queue until the queue is empty.",
      "question-code-lines": [
        "5"
      ],
      "question-code-lines-explained": "while len(q) > 0: # This loop continues until the queue is empty."
    },
    {
      "type": "Multiple Choice",
      "question": "What happens when the length of the sequence equals the length of the pattern?",
      "answer": {
        "correct-choice": "The sequence is added to the result list.",
        "incorrect-choice-1": "The sequence is discarded.",
        "incorrect-choice-2": "The sequence is added to the queue.",
        "incorrect-choice-3": "The sequence is ignored."
      },
      "question-code-lines": [
        "6", "7"
      ],
      "question-code-lines-explained": "if len(seq) == len(pattern): result.append(seq) # If the length of the sequence equals the length of the pattern, the sequence is added to the result list."
    },
    {
      "type": "Multiple Choice",
      "question": "What does the 'N' placeholder represent in the pattern?",
      "answer": {
        "correct-choice": "A wildcard that can be replaced by any DNA base.",
        "incorrect-choice-1": "A specific DNA base.",
        "incorrect-choice-2": "A null value.",
        "incorrect-choice-3": "A placeholder for a space."
      },
      "question-code-lines": [
        "10", 
      ],
      "question-code-lines-explained": "if pattern[len(seq)] == \"N\": for ch in dna_chars: q.append(seq + ch) # If the current character in the pattern is 'N', a new sequence is added to the queue for each possible DNA base."
    },
    {
      "type": "Short Answer",
      "question": "What would happen if the queue was implemented as a stack?",
      "answer": "The order of the generated sequences would change, but the final result would remain the same.",
      "question-code-lines": [
       "12", 
      ],
      "question-code-lines-explained": "while len(q) > 0: seq = q.pop(0) ... q.append(seq + ch) ... q.append(seq + pattern[len(seq)]) # The queue is used to store intermediate sequences. If it was a stack, the order of processing these sequences would change."
    }
  ]
},
{
  "wrong-code": 
`def dna_sequences(pattern: str) -> list[str]:
    dna_chars = ['A', 'C', 'G', 'X']
    stack = []
    result = []
    while len(stack) >= 0:
        seq = stack.pop()
        if seq == len(pattern):
            stack.append(seq)
        else:
            if pattern[len(stack) - 1] == 'N':
                for ch in dna_chars:
                    stack.append(seq + ch)
                stack.pop()
            else:
                result.append(seq + pattern[len(stack)])
    result.pop()    
    return pattern`,
  "issues":{

          }
  },
  task4Decomposition,
),

new MultipleChoiceTask(
  "4Rating",
  "Rate your experience",
  ["1", "2", "3", "4", "5"]
),

// coding tasks for evaluations
new ManualCodingTask(
  "mc1",
  "Write a function named temperature_potential that receives a list of daily temperatures as integers. The function calculates the temperature potential for each day. The temperature potential Ti for a day i is the count of consecutive days leading up and including day i, for which the temperature on day i is not greater than the temperature on those days. Based on the usages of Queue and Stack that you learned from during the training tasks, you should now use either a Queue or a Stack to solve this task.",
`def temperature_potential(temperatures: list[int]) -> list[int]:
`,
),
new ManualCodingTask(
  "mc2",
  "Write a function called `char_permutations` that receives a string `s` and an integer `n` as inputs and returns a list of all unique permutations of length `n` that can be formed with the characters in `s`. The function should use a queue to generate these permutations efficiently.",
`def char_permutations(s: str, n: int) -> list[str]:
`,
),



    // new AuthoringTask(
    //     "1a",
    //     "Write a program that creates a variable called <i>sum_even</i> will compute the sum of even numbers from 1 to 100 (inclusive), and print the sum.\n Then, generate the two random values from 1 to the <i>sum_even</i>, and check if both values are <b>odd</b> numbers.",
    //     [["output: <b>The sum is 2550</b>"]],
    //     [`print("I'm Wall-E!")`].join("\n"),
    //     60 * 3,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),
    // print another string
    // new ModifyingTask(
    //     "1b",
    //     "Modify the given program so it displays another message after the first one: <b>Beep Boop</b>",
    //     `print("I'm Wall-E!")`,
    //     [["output: <b>I'm Wall-E!</b>"], ["output: <b>Beep Boop</b>"]],
    //     [`print("I'm Wall-E!")`, `print("Beep Boop")`].join("\n"),
    //     60 * 2,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // print the value of a variable
    // new AuthoringTask(
    //     "2a",
    //     "Write a program that first, creates a variable called <i>name</i> and sets its value to <b>Wall-E</b>. Then, display the value of the variable.",
    //     [["output: <b>Wall-E</b>"]],
    //     [`name = "Wall-E"`, `print(name)`].join("\n"),
    //     60 * 4,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),
    // // rename the variable
    // new ModifyingTask(
    //     "2b",
    //     "Modify the given program's variable name from <i>name</i> to <i>robot_name</i>.",
    //     [`name = "Wall-E"`, `print(name)`].join("\n"),
    //     [["output: <b>Wall-E</b>"]],
    //     [`robot_name = "Wall-E"`, `print(robot_name)`].join("\n"),
    //     60 * 2,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // // join a string variable with a literal
    // new AuthoringTask(
    //     "3a",
    //     "Write a program that creates a variable called <i>name</i> and sets its value to <b>Wall-E</b>. Then, display the message <b>My name is <i>name</i></b>.",
    //     [[`output: <b>My name is Wall-E</b>`]],
    //     [`name = "Wall-E"`, `print("My name is " + name)`].join("\n"),
    //     60 * 5,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),
    // // join the variable with another literal
    // new ModifyingTask(
    //     "3b",
    //     "Modify the given program so that it displays the following message: <b>Hi, <i>name</i>! Nice to meet you!</b>.",
    //     [`name = "Wall-E"`, `print("My name is " + name)`].join("\n"),
    //     [["output: <b>Hi, Wall-E! Nice to meet you!</b>"]],
    //     [`name = "Wall-E"`, `print("Hi, " + name + "! Nice to meet you!)`].join(
    //         "\n"
    //     ),
    //     60 * 2,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // // join a string variable with a literal
    // new AuthoringTask(
    //     "3ia",
    //     "Write a program that creates a variable called <i>name</i> and sets its value to <b>ro</b>. Then, update the <i>name</i> variable by adding the value <b>bot</b> to it's previous value. Finally, display the message <b>Created: <i>name</i></b>.",
    //     [[`output: <b>Created: robot</b>`]],
    //     [`name = "ro"`, `name += "bot"`, `print("Created: " + name)`].join(
    //         "\n"
    //     ),
    //     60 * 4,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),
    // // join the variable with another literal
    // new ModifyingTask(
    //     "3ib",
    //     "Modify the given program so that instead of adding <b>bot</b> to the <i>name</i> variable at once, it adds the characters b, o, and t one at a time. Print the value of the variable <i>name</i> after adding each of the characters. Finally, display the message <b>Created: <i>name</i></b>.",
    //     [`name = "ro"`, `name += "bot"`, `print("Created: " + name)`].join(
    //         "\n"
    //     ),
    //     [
    //         ["output: <b>rob</b>"],
    //         ["output: <b>robo</b>"],
    //         ["output: <b>robot</b>"],
    //         ["output: <b>Created: robot</b>"],
    //     ],
    //     [
    //         `name = "ro"`,
    //         `name += "b"`,
    //         `print(name)`,
    //         `name += "o"`,
    //         `print(name)`,
    //         `name += "t"`,
    //         `print(name)`,
    //         `print("Created: " + name)`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // // get input from user -> store variable -> and add a string to it
    // new AuthoringTask(
    //     "4a",
    //     "Write a program that asks the user for their name and then stores their name into a variable called <i>name</i>. Finally, display the message <b>Hello, <i>name</i>!</b>.",
    //     [
    //         [
    //             "output: <b>What is your name?</b>",
    //             "input: <b>Bob</b>",
    //             "output: <b>Hello, Bob!</b>",
    //         ],
    //         [
    //             "output: <b>What is your name?</b>",
    //             "input: <b>James</b>",
    //             "output: <b>Hello, James!</b>",
    //         ],
    //     ],
    //     [
    //         `name = input("What is your name? ")`,
    //         `print("Hello, " + name + "!")`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),
    // // ask the user for another name -> store it -> and add it to the message
    // new ModifyingTask(
    //     "4b",
    //     "Modify the following program so that it also asks the user for their family name and stores it into <i>family_name</i>. Then, display the message <b>Hello, <i>name</i> <i>family_name</i>!</b>.",
    //     [
    //         `name = input("What is your name? ")`,
    //         `print("Hello, " + name + "!")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>What is your name?</b>",
    //             "input: <b>Bob</b>",
    //             "output: <b>What is your family name?</b>",
    //             "input: <b>Dylan</b>",
    //             "output: <b>Hello, Bob Dylon!</b>",
    //         ],
    //         [
    //             "output: <b>What is your name?</b>",
    //             "input: <b>James</b>",
    //             "output: <b>What is your family name?</b>",
    //             "input: <b>Madison</b>",
    //             "output: <b>Hello, James Madison!</b>",
    //         ],
    //     ],
    //     [
    //         `name = input("What is your name? ")`,
    //         `family_name = input("What is your family name? ")`,
    //         `print("Hello, " + name + " " + family_name + "!")`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // // join two string variables
    // new AuthoringTask(
    //     "5a",
    //     "Write a program that first, creates a variable called <i>food1</i> and set its value to <b>nuts</b>. Then, creates another variable called <i>food2</i> sets it to <b>bolts</b>. Afterwards, create a third variable called <i>robot_food</i> and sets it to the value of <b><i>food1</i> and <i>food2</i></b>. Finally, display the message <b>I like <i>robot_food</i>.</b>. <br/>Note: pay attention to the space between and after the <b>and</b>.",
    //     [[`output: <b>I like nuts and bolts</b>`]],
    //     [
    //         `food1 = "nuts"`,
    //         `food2 = "bolts"`,
    //         `robot_food = food1 + " and " + food2`,
    //         `print("I like " + robot_food + ".")`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),
    // // add another variable to be displayed + change the literal
    // new ModifyingTask(
    //     "5b",
    //     "Modify the following program so that it includes a third food (called <i>food3</i>) set to <b>screws</b>. Then modify <i>robot_food</i> to be the value of <b><i>food1</i>, <i>food2</i> and <i>food3</i></b>. Finally display the message <b>I like <i>robot_food</i>.</b>.",
    //     [
    //         `food1 = "nuts"`,
    //         `food2 = "bolts"`,
    //         `robot_food = food1 + " and " + food2`,
    //         `print("I like " + robot_food + ".")`,
    //     ].join("\n"),
    //     [[`output: <b>I like nuts, bolts and screws</b>`]],
    //     [
    //         `food1 = "nuts"`,
    //         `food2 = "bolts"`,
    //         `food3 = "screws"`,
    //         `robot_food = food1 + ", " + food2 + " and " + food3`,
    //         `print("I like " + robot_food + ".")`,
    //     ].join("\n"),
    //     60 * 2,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // // TODO: add string from input to avariable

    // // numbers -> add -> print
    // new AuthoringTask(
    //     "6a",
    //     "Write a program that sets <i>num1</i> to 20, and<i>num2</i> to 5. Then set another variable called <i>add</i> to the addition of num1 and num2, <i>sub</i> to their subtraction, <i>mult</i> to their multiplication, and <i>div</i> to their division. Finally, display each of the <i>add</i>, <i>sub</i>, <i>mult</i> and <i>div</i> variables.",
    //     [
    //         ["output: <b>25</b>"],
    //         ["output: <b>15</b>"],
    //         ["output: <b>100</b>"],
    //         ["output: <b>4.0</b>"],
    //     ],
    //     [
    //         `num1 = 20`,
    //         `num2 = 5`,
    //         `add = num1 + num2`,
    //         `sub = num1 - num2`,
    //         `mult = num1 * num2`,
    //         `div = num1 / num2`,
    //         `print(add)`,
    //         `print(sub)`,
    //         `print(mult)`,
    //         `print(div)`,
    //     ].join("\n"),

    //     60 * 3,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "6b",
    //     "Modify the following program so that it sets a new variable called <i>some_num</i> to the addition of all <i>add</i>, <i>sub</i>, <i>mult</i> and <i>div</i>. Then, in another line, update <i>some_num</i> by multiplying it by 2. Finally, display the value of <i>some_num</i>.",
    //     [
    //         `num1 = 20`,
    //         `num2 = 5`,
    //         `add = num1 + num2`,
    //         `sub = num1 - num2`,
    //         `mult = num1 * num2`,
    //         `div = num1 / num2`,
    //         `print(add)`,
    //         `print(sub)`,
    //         `print(mult)`,
    //         `print(div)`,
    //     ].join("\n"),
    //     [
    //         ["output: <b>25</b>"],
    //         ["output: <b>15</b>"],
    //         ["output: <b>100</b>"],
    //         ["output: <b>2.5</b>"],
    //         ["output: <b>285.0</b>"],
    //     ],
    //     [
    //         `num1 = 20`,
    //         `num2 = 5`,
    //         `add = num1 + num2`,
    //         `sub = num1 - num2`,
    //         `mult = num1 * num2`,
    //         `div = num1 / num2`,
    //         `print(add)`,
    //         `print(sub)`,
    //         `print(mult)`,
    //         `print(div)`,
    //         `some_num = add + sub + mult + div`,
    //         `some_num = some_num * 2`,
    //         `print(some_num)`,
    //     ].join("\n"),
    //     60 * 2,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc1",
    //     `What is the output of the following Python code? <div class="code-block">${[
    //         `print("(1 + 7)")`,
    //     ].join("\n")}</div>`,
    //     [`8`, `(1 + 7)`, `(8)`, `1 + 7`, `I don't know.`],
    //     1,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc2",
    //     `What is the output of the following Python code? <div class="code-block">${[
    //         `x = "10"`,
    //         `y = "-"`,
    //         `z = "5"`,
    //         `ans = x + y + z`,
    //         `print(ans)`,
    //     ].join("\n")}</div>`,
    //     [`5`, `10-5`, `"10"-"5"`, `"5"`, `I don't know.`],
    //     1,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc3",
    //     `What is the output of the following Python code? <div class="code-block">${[
    //         `x = "x"`,
    //         `y = "y"`,
    //         `y = y + "y"`,
    //         `x = x + y`,
    //         `print(x + y)`,
    //     ].join("\n")}</div>`,
    //     [`xyy`, `xy`, `xyyyy`, `xyyxyy`, `I don't know.`],
    //     2,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc4",
    //     `Which of the following python codes <u>cannot</u> be executed (and throws an error)?
    //     `,
    //     [
    //         `<div class="code-block">${`name = print("Hello, ") + input("what's your name?")`}</div>`,
    //         `<div class="code-block">${`name = print(input("what's your name?"))`}</div>`,
    //         `<div class="code-block">${`greetings = "Hello, " + input("what's your name?")`}</div>`,
    //         `<div class="code-block">${`name = input("what's your name?")`}</div>`,

    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc5",
    //     `What is the right way to initialize a variable in Python?`,
    //     [
    //         `<div class="code-block">${`var num = 10`}</div>`,
    //         `<div class="code-block">${`num == 10`}</div>`,
    //         `<div class="code-block">${`let num = 10`}</div>`,
    //         `<div class="code-block">${`num = 10`}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc6",
    //     `What is the output of the following Python code? <div class="code-block">${[
    //         `var1 = "hfz"`,
    //         `var2 = "kvq"`,
    //         `var1 = "hfz" + var2`,
    //         `print(var2)`,
    //     ].join("\n")}</div>`,
    //     [`hfz`, `kvq`, `hfzkvq`, `kvqhfz`, `I don't know.`],
    //     1,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // // random number -> print
    // new AuthoringTask(
    //     "7a",
    //     "Write a program that generates a random number between 1 and 10 and sets it to a variable called <i>num</i>. Then, display the value of <i>num</i>.",
    //     [["output: <b>3</b>"], ["output: <b>5</b>"], ["output: <b>7</b>"]],
    //     [`import random`, `num = random.randint(1, 10)`, `print(num)`].join(
    //         "\n"
    //     ),
    //     60 * 5,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "7b",
    //     "Modify the following program so it generates a second random number between 50 and 100 and sets it to another variable named <i>num2</i>. Then, display the value of <i>num2</i> below the value of <i>num</i>.",
    //     [`import random`, `num = random.randint(1, 10)`, `print(num)`].join(
    //         "\n"
    //     ),
    //     [
    //         ["output: <b>5</b>", "output: <b>63</b>"],
    //         ["output: <b>7</b>", "output: <b>99</b>"],
    //         ["output: <b>3</b>", "output: <b>53</b>"],
    //     ],
    //     [
    //         `import random`,
    //         `num = random.randint(1, 10)`,
    //         `num2 = random.randint(50, 100)`,
    //         `print(num)`,
    //         `print(num2)`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.basics,
    //     TaskStage.train
    // ),

    // // number + text -> cast
    // new AuthoringTask(
    //     "8a",
    //     "Write a program that first, sets the variable <i>num</i> to a random number between 1 and 10. Then create another variable called <i>message</i> and set it to the message <b>num is: <i>num</i></b>. Then, display the value of <i>message</i>.",
    //     [
    //         ["output: <b>num is: 3</b>"],
    //         ["output: <b>num is: 5</b>"],
    //         ["output: <b>num is: 7</b>"],
    //     ],
    //     [
    //         `import random`,
    //         `num = random.randint(1, 10)`,
    //         `message = "num is: " + str(num)`,
    //         `print(message)`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "8b",
    //     "Modify the following program by creating a second variable called <i>num2</i> and setting it to the number 5. Then change <i>message</i> to display the following message: <b>num is: <i>num</i> and num2 is: <i>num2</i></b>.",
    //     [
    //         `import random`,
    //         `num = random.randint(1, 10)`,
    //         `message = "num is: " + str(num)`,
    //         `print(message)`,
    //     ].join("\n"),
    //     [
    //         ["output: <b>num is: 3 and num2 is: 5</b>"],
    //         ["output: <b>num is: 5 and num2 is: 5</b>"],
    //         ["output: <b>num is: 7 and num2 is: 5</b>"],
    //     ],
    //     [
    //         `import random`,
    //         `num = random.randint(1, 10)`,
    //         `num2 = 5`,
    //         `message = "num is: " + str(num) + " and num2 is: " + str(num2)`,
    //         `print(message)`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),

    // // number + text -> cast
    // new AuthoringTask(
    //     "8ia",
    //     "Write a program that first, sets <i>num1</i> to 12, and <i>num2</i> to 21. Then sets a variable named <i>message</i> to the value <b>num1 times num2 = <i>the multiplication of num1 and num2</i></b>. Finally, print <i>message</i>.",
    //     [["output: <b>num1 times num2 = 252</b>"]],
    //     [
    //         `num1 = 12`,
    //         `num2 = 21`,
    //         `message = "num1 times num2 = " + str(num1 * num2)`,
    //         `print(message)`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "8ib",
    //     "Modify the value of <i>message</i> so that it displays the value of <i>num1</i> times <i>num2</i> like the following example. <br/> <b>Note: </b> the values of <i>num1</i> and <i>num2</i> can be anything and your code should work regardless of their values.",
    //     [
    //         `num1 = 12`,
    //         `num2 = 21`,
    //         `message = "num1 times num2 = " + str(num1 * num2)`,
    //         `print(message)`,
    //     ].join("\n"),
    //     [["output: <b>12 times 21 = 252</b>"]],
    //     [
    //         `num1 = 12`,
    //         `num2 = 21`,
    //         `message = str(num1) + " times " + str(num2) + " = " + str(num1 * num2)`,
    //         `print(message)`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),

    // // convert input to int
    // new AuthoringTask(
    //     "9a",
    //     "Write a program that asks the user for two numbers and then displays the sum of them.",
    //     [
    //         [
    //             "output: <b>Enter a number: </b>",
    //             "input: <b>20</b>",
    //             "output: <b>Enter another number: </b>",
    //             "input: <b>10</b>",
    //             "output: <b>30</b>",
    //         ],
    //         [
    //             "output: <b>Enter a number: </b>",
    //             "input: <b>73</b>",
    //             "output: <b>Enter another number: </b>",
    //             "input: <b>48</b>",
    //             "output: <b>121</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("Enter a number: "))`,
    //         `num2 = int(input("Enter another number: "))`,
    //         `print(num1 + num2)`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "9b",
    //     "Modify the following program so that after displaying the sum of <i>num1</i> and <i>num2</i>, it would ask for another number from the user and then display the sum of all three numbers.",
    //     [
    //         `num1 = int(input("Enter a number: "))`,
    //         `num2 = int(input("Enter another number: "))`,
    //         `print(num1 + num2)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter a number: </b>",
    //             "input: <b>20</b>",
    //             "output: <b>Enter another number: </b>",
    //             "input: <b>10</b>",
    //             "output: <b>30</b>",
    //             "output: <b>Enter the last number: </b>",
    //             "input: <b>5</b>",
    //             "output: <b>35</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("Enter a number: "))`,
    //         `num2 = int(input("Enter another number: "))`,
    //         `print(num1 + num2)`,
    //         `num3 = int(input("Enter the last number: "))`,
    //         `print(num1 + num2 + num3)`,
    //     ].join("\n"),
    //     60 * 3,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),

    // // convert input to int + accumulator
    // new AuthoringTask(
    //     "9ia",
    //     "Write a program that asks the user for four numbers and then displays the sum of them. Note that your program should ONLY use ONE variable called <i>total</i>. The display message when asking the user to enter a new number should also include the value of <i>total</i> so far. At the end, it should display the value of total like this: <b>Total: <i>total</i></b>.",
    //     [
    //         [
    //             "output: <b>Enter a number: </b>",
    //             "input: <b>20</b>",
    //             "output: <b>Total: 20, Enter another number: </b>",
    //             "input: <b>10</b>",
    //             "output: <b>Total: 30, Enter another number: </b>",
    //             "input: <b>5</b>",
    //             "output: <b>Total: 35, Enter another number: </b>",
    //             "input: <b>15</b>",
    //             "output: <b>Total is: 50</b>",
    //         ],
    //     ],
    //     [
    //         `total = 0`,
    //         `total = total + int(input("Enter a number: "))`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `print("Total: " + str(total))`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "9ib",
    //     "Modify the following program by including a variable called <i>count</i> that would be incremented whenever a new number is entered. The display message when asking the user to enter a new number should also include the <i>count</i> of numbers entered so far. Finally, it should display the total and the count like this: <b>The sum is: <i>total</i> from <i>count</i> entries.</b>.",
    //     [
    //         `total = 0`,
    //         `total = total + int(input("Enter a number: "))`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `print("Total: " + str(total))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter a number: </b>",
    //             "input: <b>20</b>",
    //             "output: <b>Total: 20, Count: 1, Enter another number: </b>",
    //             "input: <b>10</b>",
    //             "output: <b>Total: 30, Count: 2, Enter another number: </b>",
    //             "input: <b>5</b>",
    //             "output: <b>Total: 35, Count: 3, Enter another number: </b>",
    //             "input: <b>15</b>",
    //             "output: <b>The sum is: 50 from 4 entries.</b>",
    //         ],
    //     ],
    //     [
    //         `total = 0`,
    //         `count = 0`,
    //         `total = total + int(input("Enter a number: "))`,
    //         `count = count + 1`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `count = count + 1`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `count = count + 1`,
    //         `total = total + int(input("Total: " + str(total) + " Enter another number: "))`,
    //         `count = count + 1`,
    //         `print("The sum is: " + str(total) + " from " + str(count) + " entries.")`,
    //     ].join("\n"),
    //     60 * 3,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),

    // // using if and ==
    // new AuthoringTask(
    //     "10a",
    //     "Write a program that first, generates a random number between 1 and 6 and assigns it to a variable called <i>roll</i> and then display <i>roll</i>. Finally, display the message <b>rolled six</b> only if <i>roll</i> is equal to six.",
    //     [
    //         ["output: <b>4</b>"],
    //         ["output: <b>2</b>"],
    //         ["output: <b>6</b>", "output: <b>rolled six</b>"],
    //     ],
    //     [
    //         `import random`,
    //         `roll = random.randint(1, 6)`,
    //         `print(roll)`,
    //         `if roll == 6:`,
    //         `    print("rolled six")`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "10b",
    //     "Modify the following program so that it generates a second random number between 1 and 6 and sets it to another variable named <i>roll2</i>. Display both variables and finally, display the message <b>rolled the same</b> only if both rolls were equal to each other.",
    //     [
    //         `import random`,
    //         `roll = random.randint(1, 6)`,
    //         `print(roll)`,
    //         `if roll == 6:`,
    //         `    print("rolled six")`,
    //     ].join("\n"),
    //     [
    //         ["output: <b>4</b>", "output: <b>2</b>"],
    //         [
    //             "output: <b>1</b>",
    //             "output: <b>1</b>",
    //             "output: <b>rolled the same</b>",
    //         ],
    //     ],
    //     [
    //         `import random`,
    //         `roll = random.randint(1, 6)`,
    //         `roll2 = random.randint(1, 6)`,
    //         `print(roll)`,
    //         `print(roll2)`,
    //         `if roll == roll2:`,
    //         `    print("rolled the same")`,
    //     ].join("\n"),
    //     60 * 3,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // // using `and` and > + multiple statements in the if statement
    // new AuthoringTask(
    //     "11a",
    //     "Write a program that first, generates two random numbers between 1 and 6 and check if both of the variables are greater than 3 (either 4, 5, or 6). If both are greater than 3, then first display their values and then in another line, display the message: <b>both rolled greater than 3</b>",
    //     [["output: <b>both rolled greater than 3</b>"]],
    //     [
    //         `import random`,
    //         `roll1 = random.randint(1, 6)`,
    //         `roll2 = random.randint(1, 6)`,
    //         `if roll1 > 3 and roll2 > 3:`,
    //         `    print("roll1: " + str(roll1))`,
    //         `    print("roll2: " + str(roll2))`,
    //         `    print("both rolled greater than 3")`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "11b",
    //     "Modify the following program so that it would generate a third random number called <i>grade</i> between 25 and 100. Then check if <i>roll1</i> and <i>roll2</i> are greater than 3 in addition to <i>grade</i> being greater than 50. If yes, display the values of each of the three variables and display the message <b>All three above half</b>.",
    //     [
    //         `import random`,
    //         `roll1 = random.randint(1, 6)`,
    //         `roll2 = random.randint(1, 6)`,
    //         `if roll1 > 3 and roll2 > 3:`,
    //         `    print("roll1: " + str(roll1))`,
    //         `    print("roll2: " + str(roll2))`,
    //         `    print("both rolled greater than 3")`,
    //     ].join("\n"),
    //     [["output: <b>All three above half</b>"]],
    //     [
    //         `import random`,
    //         `roll1 = random.randint(1, 6)`,
    //         `roll2 = random.randint(1, 6)`,
    //         `grade = random.randint(25, 100)`,
    //         `if roll1 > 3 and roll2 > 3 and grade > 50:`,
    //         `    print("roll1: " + str(roll1))`,
    //         `    print("roll2: " + str(roll2))`,
    //         `    print("grade: " + str(grade))`,
    //         `    print("All three above half")`,
    //     ].join("\n"),
    //     60 * 3,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // // ask -> convert using int -> check -> if + else
    // new AuthoringTask(
    //     "12a",
    //     "Write a program that asks the user to enter a number between 10 and 100. Then, check if the number is greater than 75. If it is, display the message <b>Greater than 75</b>; otherwise, display the message <b>Less than 75</b>. Note that only one of these messages should be displayed.",
    //     [
    //         [
    //             "output: <b>enter a number between 10 and 100:</b>",
    //             "input: <b>43</b>",
    //             "output: <b>Less than 75</b>",
    //         ],
    //         [
    //             "output: <b>enter a number between 10 and 100:</b>",
    //             "input: <b>88</b>",
    //             "output: <b>Greater than 75</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number between 10 and 100: "))`,
    //         `if num > 75:`,
    //         `    print("Greater than 75")`,
    //         `else:`,
    //         `    print("Less than 75")`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "12b",
    //     "Modify the following program so that it asks for a second number as well. Check if the first number is greater than the second. If it is, display the message <b>First number is greater</b>; otherwise, display the message <b>Second number is greater</b>. Note that only one of these messages should be displayed.",
    //     [
    //         `num = int(input("enter a number between 10 and 100: "))`,
    //         `if num > 75:`,
    //         `    print("Greater than 75")`,
    //         `else:`,
    //         `    print("Less than 75")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number between 10 and 100:</b>",
    //             "input: <b>80</b>",
    //             "output: <b>enter another number between 10 and 100:</b>",
    //             "input: <b>50</b>",
    //             "output: <b>First number is greater</b>",
    //         ],
    //         [
    //             "output: <b>enter a number between 10 and 100:</b>",
    //             "input: <b>60</b>",
    //             "output: <b>enter another number between 10 and 100:</b>",
    //             "input: <b>70</b>",
    //             "output: <b>Second number is greater</b>",
    //         ],
    //     ],
    //     [
    //         `first = int(input("enter a number between 10 and 100: "))`,
    //         `second = int(input("enter a number between 10 and 100: "))`,
    //         `if first > second:`,
    //         `    print("First number is greater")`,
    //         `else:`,
    //         `    print("Second number is greater")`,
    //     ].join("\n"),
    //     60 * 3,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc7",
    //     `Assuming we have the following code: <br/> <div class="code-block">${[
    //         `a = input("enter a number: ")`,
    //         `b = 10`,
    //         `c = "20"`,
    //     ].join(
    //         "\n"
    //     )}</div> <br/> How can we correctly compute the arithmetic sum of all the three numbers?`,
    //     [
    //         `<div class="code-block">${[`print(int(a) + int(b) + int(c))`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`print(str(a) + str(b) + str(c))`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`print(int(a) + str(b) + int(c))`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`print(a + b + int(c))`].join(
    //             "\n"
    //         )}</div>`,

    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc8",
    //     `Assuming we have the following code, which of the following print statements is correct and does NOT throw an error? <br/> <div class="code-block">${[
    //         `v1 = "10"`,
    //         `v2 = 20`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[`print(v1 + v2)`].join("\n")}</div>`,

    //         `<div class="code-block">${[`print(int(v1) + v2)`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`print(str(v1) + int(v2))`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`print(int(v1) + str(v2))`].join(
    //             "\n"
    //         )}</div>`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc9",
    //     `Assuming we have the following code: <br/> <div class="code-block">${[
    //         `import random`,
    //         `num = input("enter a number between 10 and 100: ")`,
    //         `print("number is: " + num)`,
    //         ``,
    //         `if random.randint(1, num) == 10:`,
    //         `    print("nice")`,
    //     ].join(
    //         "\n"
    //     )}</div> <br/> However, this code has an issue. Which of the following will fix the code?`,
    //     [
    //         `<div class="code-block">${[
    //             `num = int(input("enter a number between 10 and 100: "))`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[`print("number is: " + str(num))`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[
    //             `if int(random.randint(1, num)) == 10:`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `if random.randint(1, int(num)) == 10:`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc10",
    //     `From the following codes, which one is correct and does not throw an error?`,
    //     [
    //         `<div class="code-block">${[
    //             `x = input(int("enter a number: "))`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `x = int.input("enter a number: ")`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `x = int[(input("enter a number: ")]`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `x = int(input("enter a number: "))`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.types,
    //     TaskStage.train
    // ),

    // // wrong question
    // // new MultipleChoiceTask(
    // //     "mc11",
    // //     `Assuming we have the following code: <br/> <div class="code-block">${[
    // //         `import random`,
    // //         `rand = random.randint(1, 10)`,
    // //     ].join(
    // //         "\n"
    // //     )}</div> <br/> Which of the following codes correctly checks if rand is equal to 5?`,
    // //     [
    // //         `<div class="code-block">${[
    // //             `if rand = 5:`,
    // //             `print("rand is equal to 5")`,
    // //         ].join("\n")}</div>`,

    // //         `<div class="code-block">${[
    // //             `if rand = 5:`,
    // //             `   print("rand is equal to 5")`,
    // //         ].join("\n")}</div>`,

    // //         `<div class="code-block">${[
    // //             `if rand == 5:`,
    // //             `   print("rand is equal to 5")`,
    // //         ].join("\n")}</div>`,

    // //         `<div class="code-block">${[
    // //             `if rand == 5: print("rand is equal to 5")`,
    // //         ].join("\n")}</div>`,

    // //         `I don't know.`,
    // //     ],
    // //     2,
    // //     TaskTopic.conditionals
    // // ),

    // // if - elif - else usage
    // new AuthoringTask(
    //     "13a",
    //     "Write a program that asks the user to enter a number between 0 and 100 and set it to a variable called <i>score</i>. Additionally, create a variable called <i>grade</i> and set it to an empty text. Then check if the <i>score</i> is less than 50, if it is, then set <i>grade</i> to the letter <b>C</b>, if it's between 50 and 75, set <i>grade</i> to <b>B</b>, otherwise, set <i>grade</i> to <b>A</b>. Then display the message <b>Grade: <i>grade</i></b>.",
    //     [
    //         [
    //             "output: <b>enter a number between 0 and 100:</b>",
    //             "input: <b>80</b>",
    //             "output: <b>Grade: A</b>",
    //         ],
    //         [
    //             "output: <b>enter a number between 0 and 100:</b>",
    //             "input: <b>60</b>",
    //             "output: <b>Grade: B</b>",
    //         ],
    //     ],
    //     [
    //         `score = int(input("enter a number between 0 and 100: "))`,
    //         `grade = ""`,
    //         `if score < 50:`,
    //         `    grade = "C"`,
    //         `elif score < 75:`,
    //         `    grade = "B"`,
    //         `else:`,
    //         `    grade = "A`,
    //         `print("Grade: " + grade)`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "13b",
    //     "Modify the following program so that if the score is less than 20 set <i>grade</i> to <b>F</b>, if it's between 20 and 40 set <i>grade</i> to <b>E</b>, if it's between 40 and 60 set <i>grade</i> to <b>D</b>, if it's between 60 and 80 set <i>grade</i> to <b>C</b>, if it's between 80 and 90 set <i>grade</i> to <b>B</b>, otherwise, sets <i>grade</i> to <b>A</b>.",
    //     [
    //         `score = int(input("enter a number between 0 and 100: "))`,
    //         `grade = ""`,
    //         `if score < 50:`,
    //         `    grade = "C"`,
    //         `elif score < 75:`,
    //         `    grade = "B"`,
    //         `else:`,
    //         `    grade = "A`,
    //         `print("Grade: " + grade)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number between 0 and 100:</b>",
    //             "input: <b>85</b>",
    //             "output: <b>Grade: B</b>",
    //         ],
    //         [
    //             "output: <b>enter a number between 0 and 100:</b>",
    //             "input: <b>65</b>",
    //             "output: <b>Grade: C</b>",
    //         ],
    //     ],
    //     [
    //         `score = int(input("enter a number between 0 and 100: "))`,
    //         `grade = ""`,
    //         `if score < 20:`,
    //         `    grade = "F"`,
    //         `elif score < 40:`,
    //         `    grade = "E"`,
    //         `elif score < 60:`,
    //         `    grade = "D"`,
    //         `elif score < 80:`,
    //         `    grade = "C"`,
    //         `elif score < 90:`,
    //         `    grade = "B"`,
    //         `else:`,
    //         `    grade = "A`,
    //         `print("Grade: " + grade)`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "14a",
    //     "Write a program that creates a variable called <i>coin</i>. Then use a random number generator to generate a number between 1 and 2. If the number is 1, set <i>coin</i> to <b>heads</b>, otherwise, set it to <b>tails</b>. Then display the message <b>Coin:</b> followed by the value of <i>coin</i>.",
    //     [["output: <b>Coin: heads</b>"], ["output: <b>Coin: tails</b>"]],
    //     [
    //         `import random`,
    //         `coin = random.randint(1, 2)`,
    //         ``,
    //         `if coin == 1:`,
    //         `    coin = "heads"`,
    //         `else:`,
    //         `    coin = "tails"`,
    //         `print("Coin: " + coin)`,
    //     ].join("\n"),
    //     6 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new ModifyingTask(
    //     "14b",
    //     `Modify the program so that it would generate a random number between 1 and 7, and then display one of the days in the week based on the number generated.`,
    //     [
    //         `import random`,
    //         `coin = random.randint(1, 2)`,
    //         ``,
    //         `if coin == 1:`,
    //         `    coin = "heads"`,
    //         `else:`,
    //         `    coin = "tails"`,
    //         `print("Coin: " + coin)`,
    //     ].join("\n"),
    //     [
    //         ["output: <b>Tuesday</b>"],
    //         ["output: <b>Saturday</b>"],
    //         ["output: <b>Monday</b>"],
    //     ],
    //     [
    //         `import random`,
    //         `rand = random.randint(1, 7)`,
    //         ``,
    //         `if rand == 1:`,
    //         `    print("Monday")`,
    //         `elif rand == 2:`,
    //         `    print("Tuesday")`,
    //         `elif rand == 3:`,
    //         `    print("Wednesday")`,
    //         `elif rand == 4:`,
    //         `    print("Thursday")`,
    //         `elif rand == 5:`,
    //         `    print("Friday")`,
    //         `elif rand == 6:`,
    //         `    print("Saturday")`,
    //         `else:`,
    //         `    print("Sunday")`,
    //     ].join("\n"),
    //     6 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "15a",
    //     "Write a program that gets two numbers from the user and then asks for an operator (from one of the following choices: +, -, *, and /). Then it should check which operator the user has entered, and then perform the appropriate operation. For example if the user enters + then it should add the two numbers and display the result.",
    //     [
    //         [
    //             "output: <b>enter the first number:</b>",
    //             "input: <b>41</b>",
    //             "output: <b>enter the second number:</b>",
    //             "input: <b>58</b>",
    //             "output: <b>enter an operator</b>",
    //             "input: <b>+</b>",
    //             "output: <b>99</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("enter the first number: "))`,
    //         `num2 = int(input("enter the second number: "))`,
    //         `operator = input("enter an operator: ")`,
    //         `if operator == "+":`,
    //         `    print(num1 + num2)`,
    //         `elif operator == "-":`,
    //         `    print(num1 - num2)`,
    //         `elif operator == "*":`,
    //         `    print(num1 * num2)`,
    //         `elif operator == "/":`,
    //         `    print(num1 / num2)`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "15b",
    //     "Modify the program so that it would ask a third number. And then perform the appropriate operation between the three numbers for + and *. If the user enters a different operator, then display an error message: <b>Error: Invalid operator</b>.",
    //     [
    //         `num1 = int(input("enter the first number: "))`,
    //         `num2 = int(input("enter the second number: "))`,
    //         `operator = input("enter an operator: ")`,
    //         `if operator == "+":`,
    //         `    print(num1 + num2)`,
    //         `elif operator == "-":`,
    //         `    print(num1 - num2)`,
    //         `elif operator == "*":`,
    //         `    print(num1 * num2)`,
    //         `elif operator == "/":`,
    //         `    print(num1 / num2)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>first number: 7</b>",
    //             "output: <b>second number: 5</b>",
    //             "output: <b>second number: 2</b>",
    //             "output: <b>enter an operator</b>",
    //             "input: <b>*</b>",
    //             "output: <b>70</b>",
    //         ],
    //         [
    //             "output: <b>first number: 7</b>",
    //             "output: <b>second number: 5</b>",
    //             "output: <b>second number: 2</b>",
    //             "output: <b>enter an operator</b>",
    //             "input: <b>/</b>",
    //             "output: <b>Error: Invalid operator</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("enter the first number: "))`,
    //         `num2 = int(input("enter the second number: "))`,
    //         `num3 = int(input("enter the third number: "))`,
    //         `operator = input("enter an operator: ")`,

    //         `if operator == "+":`,
    //         `    print(num1 + num2 + num3)`,
    //         `elif operator == "-":`,
    //         `    print("Error: Invalid operator")`,
    //         `elif operator == "*":`,
    //         `    print(num1 * num2 * num3)`,
    //         `elif operator == "/":`,
    //         `    print("Error: Invalid operator")`,
    //     ].join("\n"),
    //     60 * 3,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // // using % and remaineder and checking divisibility
    // new AuthoringTask(
    //     "16a",
    //     "Ask the user to enter a number and store it in a variable called <i>num</i>. Check if it is even or odd. If it is odd, display the message <b>The number <i>num</i> is odd</b> otherwise display the message <b>The number <i>num</i> is even</b>. <br/> <b>Hint:</b> a number is even if the remainder of the division of the number by 2 is 0 (or in other words, it's divisble by two).",
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>41</b>",
    //             "output: <b>The number 41 is odd</b>",
    //         ],
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>28</b>",
    //             "output: <b>The number 28 is even</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `if num % 2 == 0:`,
    //         `    print("The number " + str(num) + " is even")`,
    //         `else:`,
    //         `    print("The number " + str(num) + " is odd")`,
    //     ].join("\n"),
    //     60 * 7,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new ModifyingTask(
    //     "16b",
    //     "Modify the program so that it asks for another number called <i>divisor</i> then, checks if the entered number is divisible by the divisor. If it is, display the message <b>The number <i>num</i> is divisible by <i>divisor</i></b> otherwise display the message <b>The number <i>num</i> is not divisible by <i>divisor</i></b>.",
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `if num % 2 == 0:`,
    //         `    print(num / 2)`,
    //         `else:`,
    //         `    print(num)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>42</b>",
    //             "output: <b>enter the divisor:</b>",
    //             "input: <b>7</b>",
    //             "output: <b>The number 42 is divisible by 7</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `divisor = int(input("enter the divisor: "))`,
    //         `if num % divisor == 0:`,
    //         `    print("The number " + str(num) + " is divisible by " + str(divisor))`,
    //         `else:`,
    //         `    print("The number " + str(num) + " is not divisible by " + str(divisor))`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // // nested if
    // new AuthoringTask(
    //     "16ia",
    //     "Set two variables called <i>num1</i> and <i>num2</i> to a random number between 1 and 1000 and a third variable called <i>result</i> to 0. Ask the user to enter one of the two options: <b>greater</b>, or <b>smaller</b> and then check which one the user has entered. (display an error message: <b>Invalid Option</b> if the user didn't enter any of the two). If the user enters <b>greater</b>, then check if the <i>num1</i> is greater than <i>num2</i>. If it is, set <i>result</i> to <i>num1</i> and otherwise, set <i>result</i> to <i>num2</i>. However, if the user enters <b>smaller</b>, then check if the <i>num1</i> is smaller than <i>num2</i>. If it is, set <i>result</i> to <i>num1</i> and otherwise, set <i>result</i> to <i>num2</i>. Finally, if the user did not enter an invalid input, display the message: <b>You entered <i>option</i> and the result is <i>result</i></b>",
    //     [
    //         [
    //             "output: <b>enter one of the options:</b>",
    //             "input: <b>smaller</b>",
    //             "output: <b>You entered smaller and the result is 51</b>",
    //         ],
    //         [
    //             "output: <b>enter one of the options:</b>",
    //             "input: <b>greater</b>",
    //             "output: <b>You entered greater and the result is 472</b>",
    //         ],
    //     ],
    //     [
    //         `import random`,
    //         ``,
    //         `num1 = random.randint(1, 1000)`,
    //         `num2 = random.randint(1, 1000)`,
    //         `result = 0`,
    //         `option = input("enter one of the options: ")`,
    //         ``,
    //         `if option == "greater":`,
    //         `    if num1 > num2:`,
    //         `        result = num1`,
    //         `    else:`,
    //         `        result = num2`,
    //         `elif option == "smaller":`,
    //         `    if num1 < num2:`,
    //         `        result = num1`,
    //         `    else:`,
    //         `        result = num2`,
    //         `else:`,
    //         `    print("Invalid Option")`,
    //         ``,
    //         `print("You entered " + option + " and the result is " + str(result))`,
    //     ].join("\n"),
    //     10 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "16ib",
    //     "Modify the code by adding a third option called <b>equal</b> that would check if the two numbers are equal or not. If they are, then display the message <b>The numbers are equal</b> otherwise, display three messages (each in a line): the value of <i>num1</i>, the value of <i>num2</i>, and the message <b>The numbers are not equal</b>.",
    //     [
    //         `import random`,
    //         ``,
    //         `num1 = random.randint(1, 1000)`,
    //         `num2 = random.randint(1, 1000)`,
    //         `result = 0`,
    //         `option = input("enter one of the options: ")`,
    //         ``,
    //         `if option == "greater":`,
    //         `    if num1 > num2:`,
    //         `        result = num1`,
    //         `    else:`,
    //         `        result = num2`,
    //         `elif option == "smaller":`,
    //         `    if num1 < num2:`,
    //         `        result = num1`,
    //         `    else:`,
    //         `        result = num2`,
    //         `else:`,
    //         `    print("Invalid Option")`,
    //         ``,
    //         `print("You entered " + option + " and the result is " + str(result))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter one of the options:</b>",
    //             "input: <b>equal</b>",
    //             "output: <b>395</b>",
    //             "output: <b>78</b>",
    //             "output: <b>The numbers are not equal</b>",
    //         ],
    //         [
    //             "output: <b>enter one of the options:</b>",
    //             "input: <b>equal</b>",
    //             "output: <b>The numbers are equal</b>",
    //         ],
    //     ],
    //     [
    //         `import random`,
    //         ``,
    //         `num1 = random.randint(1, 1000)`,
    //         `num2 = random.randint(1, 1000)`,
    //         `result = 0`,
    //         `option = input("enter one of the options: ")`,
    //         ``,
    //         `if option == "greater":`,
    //         `    if num1 > num2:`,
    //         `        result = num1`,
    //         `    else:`,
    //         `        result = num2`,
    //         `elif option == "smaller":`,
    //         `    if num1 < num2:`,
    //         `        result = num1`,
    //         `    else:`,
    //         `        result = num2`,
    //         `elif option == "equal":`,
    //         `    if num1 == num2:`,
    //         `        print("The numbers are equal")`,
    //         `    else:`,
    //         `        print(num1)`,
    //         `        print(num2)`,
    //         `        print("The numbers are not equal")`,
    //         `else:`,
    //         `    print("Invalid Option")`,
    //         ``,
    //         `print("You entered " + option + " and the result is " + str(result))`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "17a",
    //     "display <b>Hello</b> 10 times using a loop.",
    //     [
    //         [
    //             "output: <b>Hello</b>",
    //             "output: <b>Hello</b>",
    //             "output: <b>Hello</b>",
    //             "...",
    //             "output: <b>Hello</b>",
    //         ],
    //     ],
    //     [`for i in range(10):`, `    print("Hello")`].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "17b",
    //     "Modify the code so that it would instead repeat the following program for 5 times: display <b>Hello</b> then display <b>World!</b>. Then finally, display <b>Bye Bye</b> only once afterwards.",
    //     [`for i in range(10):`, `    print("Hello")`].join("\n"),
    //     [
    //         [
    //             "output: <b>Hello</b>",
    //             "output: <b>World</b>",
    //             "output: <b>Hello</b>",
    //             "output: <b>World</b>",
    //             "...",
    //             "output: <b>Hello</b>",
    //             "output: <b>World</b>",
    //             "output: <b>Bye Bye</b>",
    //         ],
    //     ],
    //     [
    //         `for i in range(5):`,
    //         `    print("Hello")`,
    //         `    print("World!")`,
    //         `print("Bye Bye")`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc12",
    //     `What value for <i>x</i> will make the following code display the message <b>yes</b>? <br/> <div class="code-block">${[
    //         `if x > 5:`,
    //         `    print("yes")`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[`x = 3`].join("\n")}</div>`,

    //         `<div class="code-block">${[`x = 4`].join("\n")}</div>`,

    //         `<div class="code-block">${[`x = 5`].join("\n")}</div>`,

    //         `None of the values above will make the code display the message <b>yes</b>.`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc13",
    //     `What will the following program display in the output when it runs? <br/> <div class="code-block">${[
    //         `number = 10`,
    //         `if number >= 10:`,
    //         `    number = number + 1`,
    //         `else:`,
    //         `    number = number - 1`,
    //         `print(number)`,
    //     ].join("\n")}</div>`,
    //     [`9`, `10`, `11`, `number`, `I don't know.`],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc14",
    //     `What values for <i>month</i> and <i>day</i> will make the following expression become <b>True</b>? <br/> <div class="code-block">${[
    //         `(month == "january" and day > 15) or (month == "march" and day < 15)`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[`month = "january"`, `day = 15`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`month = "march"`, `day = 15`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`month = "january"`, `day = 14`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`month = "march"`, `day = 14`].join(
    //             "\n"
    //         )}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc15",
    //     `Which of the following expressions checks if <i>number</i> is positive and <i>coin</i> is equal to <b>heads</b>?`,
    //     [
    //         `<div class="code-block">${[
    //             `coin == "heads" or number == 0 or number > 0 `,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[`coin == "heads" and 0 > number`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`coin == "heads" and number > 0`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`0 < number and coin = "heads" `].join(
    //             "\n"
    //         )}</div>`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc16",
    //     `What will this program display in the output? <b>heads</b> <div class="code-block">${[
    //         `var1 = 5`,
    //         `var2 = 10`,
    //         ``,
    //         `if var1 < 10`,
    //         `    var1 = 10`,
    //         ``,
    //         `    if var2 != var1`,
    //         `        var2 = var1 - 5`,
    //         `    else:`,
    //         `        var2 = var1 + 5`,
    //         ``,
    //         `print(var2)`,
    //     ].join("\n")}</div>`,
    //     [`5`, `10`, `15`, `20`, `I don't know.`],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc17",
    //     `Assume that <i>roll1</i>, <i>roll2</i> and <i>roll3</i> are three random numbers <b>between 1 and 10</b>. Which of the following codes checks if they are all equal to <b>10</b>?`,
    //     [
    //         `<div class="code-block">${[
    //             `roll1 == roll2 and roll1 == roll3`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[`roll1 and roll2 and roll3 == 10`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[
    //             `roll1 == roll2 and roll2 and roll3 == 10`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `roll1 == roll2 and roll3 == 10 and roll1 == roll3`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc18",
    //     `What will the following code display in the output? <br/> <div class="code-block">${[
    //         `msg = ""`,
    //         `usr1 = "jon"`,
    //         `usr2 = "john"`,
    //         `usr3 = "jonathan"`,
    //         ``,
    //         `if usr1 == "jonathan":`,
    //         `    msg = usr1`,
    //         `elif usr2 == "john":`,
    //         `    msg = usr2`,
    //         `elif usr3 == "jon":`,
    //         `    msg = usr3`,
    //         `else:`,
    //         `    msg = "jack"`,
    //         ``,
    //         `print(msg)`,
    //     ].join("\n")}</div>`,
    //     [`jack`, `john`, `jonathan`, `jon`, `I don't know.`],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc19",
    //     `What will the following code display in the output? <br/> <div class="code-block">${[
    //         `import random`,
    //         `x = random.randint(1, 3)`,
    //         `y = random.randint(10, 15)`,
    //         `z = random.randint(50, 100)`,
    //         ``,
    //         `if x > 5 or y > 5:`,
    //         `    if x > y:`,
    //         `        print("X > Y")`,
    //         `    else:`,
    //         `        print("Y > X")`,
    //         `else:`,
    //         `    print("Z > X and Z > Y")`,
    //     ].join("\n")}</div>`,
    //     [
    //         `X > Y`,
    //         `Y > X`,
    //         `Z > X and Z > Y`,
    //         `This program will not display any message.`,
    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc20",
    //     `What will the following code display in the output? <br/> <div class="code-block">${[
    //         `num1 = 10 - 20`,
    //         `num2 = 20 - 10`,
    //         `num3 = 5`,
    //         ``,
    //         `if num1 > 0:`,
    //         `    print("first")`,
    //         `elif num2 > 10:`,
    //         `    print("second")`,
    //         `elif num3 > 5:`,
    //         `    print("third")`,
    //     ].join("\n")}</div>`,
    //     [
    //         `first`,
    //         `second`,
    //         `third`,
    //         `This program will not display any message.`,
    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc21",
    //     `Which set of values for <i>num</i> will make the following code only display <b>YES</b> in the output? <br/> <div class="code-block">${[
    //         `import random`,
    //         `num = random.randint(0, 50)`,
    //         ``,
    //         `if num <= 47 and num >= 4:`,
    //         `    print("NO")`,
    //         `else:`,
    //         `    print("YES")`,
    //     ].join("\n")}</div>`,
    //     [
    //         `any of the values between 0 and 50`,
    //         `[0, 1, 2, 3, 4, 47, 48, 49, 50]`,
    //         `[0, 1, 2, 3, 48, 49, 50]`,
    //         `[5, 6, 45, 46]`,
    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "18a",
    //     "Set a variable called <i>num</i> to 0 and then create a loop that would add the number 5 to <i>num</i> for <b>25 times</b> and display the value of the variable as it increases inside the loop.",
    //     [
    //         [
    //             "output: <b>5</b>",
    //             "output: <b>10</b>",
    //             "output: <b>15</b>",
    //             "...",
    //             "output: <b>125</b>",
    //         ],
    //     ],
    //     [
    //         `num = 0`,
    //         `for i in range(25):`,
    //         `    num += 5`,
    //         `    print(num)`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "18b",
    //     "Modify the program so that it includes another variable that is initially set to 125. Then the loop would reduce its value by 5 for 25 times. Display the value of both variables everytime their value changes in the loop.",
    //     [
    //         `num = 0`,
    //         `for i in range(25):`,
    //         `    num += 5`,
    //         `    print(num)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>5</b>",
    //             "output: <b>120</b>",
    //             "output: <b>10</b>",
    //             "output: <b>115</b>",
    //             "...",
    //             "output: <b>0</b>",
    //             "output: <b>125</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = 125`,
    //         `num2 = 0`,
    //         `for i in range(25):`,
    //         `    num1 -= 5`,
    //         `    num2 += 5`,
    //         `    print(num1)`,
    //         `    print(num2)`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "19a",
    //     "Set a variable called <i>text</i> to the text <b>w</b>. Then create a loop that would repeatedly add the letter <b>e</b> to the <i>text</i> for 5 times and displaying the text every time. After the loop, add an exclamation mark <b>!</b> to the <i>text</i> variable and then display its value.",
    //     [
    //         [
    //             "output: <b>we</b>",
    //             "output: <b>wee</b>",
    //             "output: <b>weee</b>",
    //             "output: <b>weeee</b>",
    //             "output: <b>weeeee</b>",
    //             "output: <b>weeeee!</b>",
    //         ],
    //     ],
    //     [
    //         `text = "w"`,
    //         `for i in range(5):`,
    //         `    text += "e"`,
    //         `    print(text)`,
    //         `text += "!"`,
    //         `print(text)`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "19b",
    //     "Add another loop to the program (after the first loop) that would add the the text <b>*</b> for 3 times to the <i>text</i> variable and display the text every time. Finally, after the loop, add a dot <b>.</b> to the <i>text</i> variable and display its value.",
    //     [
    //         `text = "w"`,
    //         `for i in range(5):`,
    //         `    text += "e"`,
    //         `    print(text)`,
    //         `text += "!"`,
    //         `print(text)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>we</b>",
    //             "output: <b>wee</b>",
    //             "...",
    //             "output: <b>weeeee!</b>",
    //             "output: <b>weeeee!*</b>",
    //             "output: <b>weeeee!**</b>",
    //             "output: <b>weeeee!***</b>",
    //             "output: <b>weeeee!***.</b>",
    //         ],
    //     ],
    //     [
    //         `text = "w"`,
    //         `for i in range(5):`,
    //         `    text += "e"`,
    //         `    print(text)`,
    //         `text += "!"`,
    //         `print(text)`,
    //         `for i in range(3):`,
    //         `    text += "*"`,
    //         `    print(text)`,
    //         `text += "."`,
    //         `print(text)`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "19ia",
    //     "Set a variable called <i>fruits</i> to the text <b>I like these fruits: </b>. Then create a loop that would repeatedly do the following things for 5 times: first, ask the user to enter a fruit name and then adding what the user entered to the fruits (separated with a space). After the loop, display the value of the <i>fruits</i> variable.",
    //     [
    //         [
    //             "output: <b>Enter a fruit: </b>",
    //             "input: <b>apple</b>",
    //             "...",
    //             "output: <b>Enter a fruit: </b>",
    //             "input: <b>banana</b>",
    //             "output: <b>I like these fruits: apple orange strawberry grapes banana</b>",
    //         ],
    //     ],
    //     [
    //         `fruits = "I like these fruits: "`,
    //         `for i in range(5):`,
    //         `    fruit = input("Enter a fruit: ")`,
    //         `    fruits += fruit + " "`,
    //         `print(fruits)`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "19ib",
    //     "Change the program so that when it is done with the first loop, it would then create another variable called <i>movies</i> and set it to <b>I like these movies: </b> and then use another loop that would repeat for 5 times to ask the user for their favorite movies and then add them to a the variable <i>movies</i> one by one. After the second loop, display the value of the <i>movies</i> variable.",
    //     [
    //         `fruits = "I like these fruits: "`,
    //         `for i in range(5):`,
    //         `    fruit = input("Enter a fruit: ")`,
    //         `    fruits += fruit + " "`,
    //         `print(fruits)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter a fruit: </b>",
    //             "input: <b>apple</b>",
    //             "...",
    //             "output: <b>Enter a fruit: </b>",
    //             "input: <b>banana</b>",
    //             "output: <b>I like these fruits: apple orange strawberry grapes banana</b>",
    //         ],
    //     ],
    //     [
    //         `fruits = "I like these fruits: "`,
    //         `for i in range(5):`,
    //         `    fruit = input("Enter a fruit: ")`,
    //         `    fruits += fruit + " "`,
    //         `print(fruits)`,
    //         `movies = "I like these movies: "`,
    //         `for i in range(5):`,
    //         `    movie = input("Enter your favorite movie: ")`,
    //         `    movies += movie + " "`,
    //         `print(movies)`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "20a",
    //     "Display all the numbers from 1 to 100 line by line using a loop.",
    //     [
    //         [
    //             "output: <b>1</b>",
    //             "output: <b>2</b>",
    //             "...",
    //             "output: <b>99</b>",
    //             "output: <b>100</b>",
    //         ],
    //     ],
    //     [`for i in range(1, 101):`, `    print(i)`].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "20b",
    //     "Modify the following program so that it would display all the numbers from 250 to 300 line by line and after each line (inside the loop), it would also display the number multiplied by 2.",
    //     [`for i in range(1, 101):`, `    print(i)`].join("\n"),
    //     [
    //         [
    //             "output: <b>250</b>",
    //             "output: <b>500</b>",
    //             "output: <b>251</b>",
    //             "output: <b>502</b>",
    //             "...",
    //             "output: <b>300</b>",
    //             "output: <b>600</b>",
    //         ],
    //     ],
    //     [`for i in range(250, 301):`, `    print(i)`, `    print(i * 2)`].join(
    //         "\n"
    //     ),
    //     60 * 3,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "20ia",
    //     "Ask the user to enter a number, then display all the numbers from 1 to the number entered line by line.",
    //     [
    //         [
    //             "output: <b>Enter a number: </b>",
    //             "input: <b>10</b>",
    //             "output: <b>1</b>",
    //             "output: <b>2</b>",
    //             "...",
    //             "output: <b>9</b>",
    //             "output: <b>10</b>",
    //         ],
    //     ],
    //     [
    //         `number = int(input("Enter a number: "))`,
    //         `for i in range(1, number + 1):`,
    //         `    print(i)`,
    //     ].join("\n"),
    //     60 * 7,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "20ib",
    //     "Modify the following program so that it would ask two numbers, then display all the numbers from the first number to the second number line by line.",
    //     [
    //         `number = int(input("Enter a number: "))`,
    //         `for i in range(1, number + 1):`,
    //         `    print(i)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter a number: </b>",
    //             "input: <b>5</b>",

    //             "output: <b>Enter a number: </b>",
    //             "input: <b>15</b>",

    //             "output: <b>5</b>",
    //             "output: <b>6</b>",
    //             "...",
    //             "output: <b>14</b>",
    //             "output: <b>15</b>",
    //         ],
    //     ],
    //     [
    //         `number1 = int(input("Enter a number: "))`,
    //         `number2 = int(input("Enter a number: "))`,
    //         `for i in range(number1, number2 + 1):`,
    //         `    print(i)`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "21a",
    //     "Write a program that would ask the user to enter a number, then use a loop to calculate the total sum of all numbers from 1 to the given number (including the given number). Finally, display the total.",
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>50</b>",
    //             "output: <b>1275</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `total = 0`,
    //         `for i in range(1, num + 1):`,
    //         `    total += i`,
    //         `print(total)`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "21b",
    //     "Modify the program so that it would ask the user for two numbers and then use a loop to calculate the total sum of all numbers between the first and the second one (including both first and second numbers). (<b>Note</b> that the second number should always be greater than the first number). So for example, if the user enters 3 and 8, it should calculate the sum of 3, 4, 5, 6, 7, and 8. Within the loop, also display the value of the total as it increases every time. Then finally, display the total.",
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `total = 0`,
    //         `for i in range(1, num + 1):`,
    //         `    total += i`,
    //         `print(total)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>3</b>",
    //             "output: <b>enter another number (greater than the previous one):</b>",
    //             "input: <b>8</b>",
    //             "output: <b>3</b>",
    //             "output: <b>7</b>",
    //             "output: <b>12</b>",
    //             "output: <b>18</b>",
    //             "output: <b>25</b>",
    //             "output: <b>33</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("enter a number: "))`,
    //         `num2 = int(input("enter a number: "))`,
    //         `total = 0`,
    //         `for i in range(num1, num2 + 1):`,
    //         `    total += i`,
    //         `    print(total)`,
    //         `print(total)`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "21ia",
    //     "Write a program that would calculate the sum of all even numbers between 1 to a number asked from the user (including that number). Finally, display the sum. <br/><b>Hint:</b> a number is even when the remainder of its division by 2 is 0.",
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>50</b>",
    //             "output: <b>600</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `total = 0`,
    //         `for i in range(1, num + 1):`,
    //         `    if i % 2 == 0:`,
    //         `        total += i`,
    //         `print(total)`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "21ib",
    //     "Modify the loop so that it would also calculate the sum of all odd numbers between 1 to the given number at the same time. Then display two messages, first the sum of all even numbers, then the sum of all odd numbers. <br/><b>Hint:</b> a number is even when the remainder of its division by 2 is 0, and odd when the remainder of its division by 2 is 1.",
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `total = 0`,
    //         `for i in range(1, num + 1):`,
    //         `    if i % 2 == 0:`,
    //         `        total += i`,
    //         `print(total)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>50</b>",
    //             "output: <b>600</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `total_even = 0`,
    //         `total_odd = 0`,
    //         `for i in range(1, num + 1):`,
    //         `    if i % 2 == 0:`,
    //         `        total_even += i`,
    //         `    if i % 2 == 1:`,
    //         `        total_odd += i`,
    //         `print(total_even)`,
    //         `print(total_odd)`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "22a",
    //     "Write a program that uses a <b>while</b> loop to repeatedly ask the user to enter a password (as a number) and check if the password is equal to 123. If it is, display the message <b>Password is correct</b>. If it is not, display the message <b>Password is incorrect</b> and ask the user to re-enter the password. The program should stop when the user enters the number 123. Finally, after the user gets the correct password, display the message <b>Password is correct</b>.",
    //     [
    //         [
    //             "output: <b>Enter the password:</b>",
    //             "input: <b>321</b>",
    //             "output: <b>Password is incorrect</b>",
    //             "output: <b>Re-enter the password:</b>",
    //             "input: <b>123</b>",
    //             "output: <b>Password is correct</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("Enter the password: "))`,
    //         `while num != 123:`,
    //         `    print("Password is incorrect")`,
    //         `    num = int(input("Re-enter the password: "))`,
    //         `print("Password is correct")`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "22b",
    //     "Modify the program by changing the password from 123 to 7512 and also count the number of incorrect attempts (each time the user enters the password incorrectly). Finally display the incorrect attempts at the end of the loop.",
    //     [
    //         `num = int(input("Enter the password: "))`,
    //         `while num != 123:`,
    //         `    print("Password is incorrect")`,
    //         `    num = int(input("Re-enter the password: "))`,
    //         `print("Password is correct")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter the password:</b>",
    //             "input: <b>7321</b>",
    //             "output: <b>Password is incorrect</b>",
    //             "output: <b>Re-enter the password:</b>",
    //             "input: <b>2422</b>",
    //             "output: <b>Password is incorrect</b>",
    //             "output: <b>Re-enter the password:</b>",
    //             "input: <b>7512</b>",
    //             "output: <b>Password is correct</b>",
    //             "output: <b>Incorrect attempts: 2</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("Enter the password: "))`,
    //         `incorrect_attempts = 0`,
    //         ``,
    //         `while num != 7512:`,
    //         `    print("Password is incorrect")`,
    //         `    num = int(input("Re-enter the password: "))`,
    //         `print("Password is correct")`,
    //         `print("Incorrect attempts: " + str(incorrect_attempts))`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "23a",
    //     "Write a program that repeatedly does the following until the user enters the number <b>0</b>: ask the user for a number, and then add it up to a variable called <b>total</b>. If the user enters <b>0</b>, display the total at the end (only once).",
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>7</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>25</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>0</b>",
    //             "output: <b>total: 32</b>",
    //         ],
    //     ],
    //     [
    //         `total = 0`,
    //         `num = int(input("enter a number: "))`,
    //         `while num != 0:`,
    //         `    total += num`,
    //         `    num = int(input("enter another number: "))`,
    //         `print("total: " + str(total))`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "23b",
    //     "Modify the program so that it calculates the average of all numbers entered by the user. <br/> <b>Note</b>: the average is the sum of all numbers entered, divided by the count of numbers entered. <br/><b>Hint:</b> use another variable to count the number of numbers entered by the user.",
    //     [
    //         `total = 0`,
    //         `num = int(input("enter a number: "))`,
    //         `while num != 0:`,
    //         `    total += num`,
    //         `    num = input("enter another number: ")`,
    //         `print("total: " + str(total))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>15</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>7</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>0</b>",
    //             "output: <b>the average is: 11.0</b>",
    //         ],
    //     ],
    //     [
    //         `total = 0`,
    //         `count = 0`,
    //         `num = int(input("enter a number: "))`,
    //         `while num != 0:`,
    //         `    total += num`,
    //         `    count += 1`,
    //         `    num = input("enter another number: ")`,
    //         `print("the average is: " + str(total / count))`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "23ia",
    //     "Write a program that asks the user to enter a number between 1 and 100 and then display the difference of that number with the value <b>50</b>. The difference between two numbers is always a positive number. <br/> <b>Note</b>: you can use the <b>abs( )</b> function to calculate the positive value of any number.",
    //     [
    //         [
    //             "output: <b>enter a number between 1 and 100:</b>",
    //             "input: <b>32</b>",
    //             "output: <b>the difference with 50 is: 18</b>",
    //         ],
    //         [
    //             "output: <b>enter a number between 1 and 100:</b>",
    //             "input: <b>59</b>",
    //             "output: <b>the difference with 50 is: 9</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number between 1 and 100: "))`,
    //         `print("the difference with 50 is: " + str(abs(num - 50)))`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "23ib",
    //     "Modify the program so that asks the user for two numbers and then display the difference between each of the numbers. Again, note that the difference between two numbers is always a positive number.",
    //     [
    //         `num = int(input("enter a number between 1 and 100: "))`,
    //         `print("the difference with 50 is: " + str(abs(num - 50)))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>7</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>5</b>",
    //             "output: <b>The difference is: 2</b>",
    //         ],
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>51</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>60</b>",
    //             "output: <b>The difference is: 9</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("enter a number: "))`,
    //         `num2 = int(input("enter another number: "))`,
    //         `print("The difference is: " + str(abs(num1 - num2)))`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "24a",
    //     "Write a guess a number game: the program will first set the variable <i>picked_number</i> to a random number between 1 and 1000. Then it should *repeatedly* do the following until the user guesses the number (if it's equal to <i>picked_number</i>): If the user guesses a number that is too high, the program should display the message <b>The number is too high</b>. If the user guesses a number that is too low, the program should display the message <b>The number is too low</b>. Finally, if the user guesses the number, the while loop should stop repeating and the program should display the message <b>You guessed the number!</b>.",
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>500</b>",
    //             "output: <b>The number is too high</b>",
    //             "output: <b>enter a number:</b>",
    //             "input: <b>250</b>",
    //             "output: <b>The number is too low</b>",
    //             "output: <b>enter a number:</b>",
    //             "input: <b>375</b>",
    //             "output: <b>You guessed the number!</b>",
    //         ],
    //     ],
    //     [
    //         `picked_number = random.randint(1, 1000)`,
    //         `num_guess = int(input("enter a number: "))`,
    //         `while num_guess != picked_number:`,
    //         `    if num_guess > picked_number:`,
    //         `        print("The number is too high")`,
    //         `    else:`,
    //         `        print("The number is too low")`,
    //         `    num_guess = int(input("enter a number: "))`,
    //         `print("You guessed the number!")`,
    //     ].join("\n"),
    //     60 * 12,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "24b",
    //     "Modify the program so that it would count the number of incorrect attempts the user has made and display it at the end. Additionally, on every guess it should check if the difference between the guessed number and the picked number is less than 50. If it is, the program should display another message <b>You are close!</b>. <br/><b>Note</b>: you can use the <b>abs( )</b> function to calculate the positive value of any number.",
    //     [
    //         `picked_number = random.randint(1, 1000)`,
    //         `num_guess = int(input("enter a number: "))`,
    //         `while num_guess != picked_number:`,
    //         `    if num_guess > picked_number:`,
    //         `        print("The number is too high")`,
    //         `    else:`,
    //         `        print("The number is too low")`,
    //         `    num_guess = int(input("enter a number: "))`,
    //         `print("You guessed the number!")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>500</b>",
    //             "output: <b>The number is too high</b>",
    //             "output: <b>enter a number:</b>",
    //             "input: <b>250</b>",
    //             "output: <b>The number is too low</b>",
    //             "output: <b>enter a number:</b>",
    //             "input: <b>375</b>",
    //             "output: <b>You guessed the number after 2 incorrect attempts!</b>",
    //         ],
    //     ],
    //     [
    //         `picked_number = random.randint(1, 1000)`,
    //         `incorrect_guesses = 0`,
    //         `num_guess = int(input("enter a number: "))`,
    //         `while num_guess != picked_number:`,
    //         `    if num_guess > picked_number:`,
    //         `        print("The number is too high")`,
    //         `    else:`,
    //         `        print("The number is too low")`,
    //         `    if abs(num_guess - picked_number) < 50:`,
    //         `        print("You are close!")`,
    //         `    incorrect_guesses += 1`,
    //         `    num_guess = int(input("enter a number: "))`,
    //         `print("You guessed the number!")`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // // using break
    // new AuthoringTask(
    //     "24ia",
    //     "Write a program that would use a while loop to repeatedly ask the user to guess a number until the user enters the number <b>0</b>. Inside the loop, check if the number is divisble by both 2 and 3, if it is, then display the message <b>The number is divisble by 2 and 3</b> and then break out of the loop. At the end of the loop it should simply display the message <b>Finished loop</b>",
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>10</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>0</b>",
    //             "output: <b>Finished loop</b>",
    //         ],
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>14</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>30</b>",
    //             "output: <b>The number is divisble by 2 and 3</b>",
    //             "output: <b>Finished loop</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number: "))`,
    //         ``,
    //         `while num != 0:`,
    //         `    if num % 2 == 0 and num % 3 == 0:`,
    //         `        print("The number is divisble by 2 and 3")`,
    //         `        break`,
    //         ``,
    //         `    num = input("enter another number: ")`,
    //         ``,
    //         `print("Finished loop")`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "24ib",
    //     "Modify the program by adding another if statement inside the while loop to check if the number is divisible by 5, if it is then display the message <b>The number is divisble by 5</b> and then break out of the loop. The program should also include another variable called <i>did_break</i> that is set to <b>False</b> and then set to <b>True</b> if one of the breaks are triggered. At the end, display the message <b>breaked the loop</b> only if the variable <i>did_break</i> is equal to <b>True</b>.",
    //     [
    //         `num = int(input("enter a number: "))`,
    //         ``,
    //         `while num != 0:`,
    //         `    if num % 2 == 0 and num % 3 == 0:`,
    //         `        print("The number is divisble by 2 and 3")`,
    //         `        break`,
    //         `    num = input("enter another number: ")`,
    //         ``,
    //         `print("Finished loop")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>15</b>",
    //             "output: <b>The number is divisble by 5</b>",
    //             "output: <b>breaked the loop</b>",
    //             "output: <b>Finished loop</b>",
    //         ],
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>7</b>",
    //             "output: <b>enter another number:</b>",
    //             "input: <b>0</b>",
    //             "output: <b>Finished loop</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `did_break = False`,
    //         `while num != 0:`,
    //         `    if num % 2 == 0 and num % 3 == 0:`,
    //         `        print("The number is divisble by 2 and 3")`,
    //         `        did_break = True`,
    //         `        break`,
    //         ``,
    //         `    if num % 5 == 0:`,
    //         `        print("The number is divisble by 5")`,
    //         `        did_break = True`,
    //         `        break`,
    //         ``,
    //         `    num = input("enter a number: ")`,
    //         ``,
    //         `print("Finished loop")`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "25a",
    //     "Write a program that asks the user to enter a number between 1 and 100. The program should then repeatedly decrease the number by 1 until it reaches 0 and display the number each time.",
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>73</b>",
    //             "output: <b>73</b>",
    //             "output: <b>72</b>",
    //             "...",
    //             "output: <b>1</b>",
    //             "output: <b>0</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `while num >= 0:`,
    //         `    print(num)`,
    //         `    num -= 1`,
    //     ].join("\n"),
    //     60 * 7,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "25b",
    //     "Modify the program so that it would first ask the user to enter a number greater than 100 and then use the loop to continuously decreases the number <b>by 10</b> every time while the number is greater than 100. At this point the number should be equal or less than 100, use <b>another</b> loop to continuously decrease the number by 3 every time while the number is greater than zero.",
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `while num >= 0:`,
    //         `    print(num)`,
    //         `    num -= 1`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number between 100 and 200:</b>",
    //             "input: <b>135</b>",
    //             "output: <b>125</b>",
    //             "output: <b>115</b>",
    //             "output: <b>105</b>",
    //             "output: <b>95</b>",
    //             "output: <b>92</b>",
    //             "output: <b>89</b>",
    //             "output: <b>86</b>",
    //             "...",
    //             "output: <b>8</b>",
    //             "output: <b>5</b>",
    //             "output: <b>2</b>",
    //         ],
    //     ],
    //     [
    //         `num = int(input("enter a number between 100 and 200: "))`,
    //         `while num >= 100:`,
    //         `    print(num)`,
    //         `    num -= 10`,
    //         `while num >= 0:`,
    //         `    print(num)`,
    //         `    num -= 3`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "26a",
    //     "Write a program that generates a number between 1 and 999999. Then, it displays the number of digits in the number by repeatedly dividing the number by 10 until the number becomes less than 10 and counting the number of times it was divided. For example, 1874 ÷ 10 = 187 (first) -> 187 ÷ 10 = 18 (second) -> 18 ÷ 10 = 1 (third) -> 1 ÷ 10 = 0 (fourth). Therefore, 1874 has four digits.",
    //     [
    //         [
    //             "output: <b>Generated 1874:</b>",
    //             "output: <b>The number has 4 digits</b>",
    //         ],
    //         [
    //             "output: <b>Generated 95:</b>",
    //             "output: <b>The number has 2 digits</b>",
    //         ],
    //     ],
    //     [
    //         `import random`,
    //         `num = random.randint(1, 999999)`,
    //         `num_digits = 0`,
    //         ``,
    //         `while num > 10:`,
    //         `    num = num // 10`,
    //         `    num_digits += 1`,
    //         `print("The number has " + str(num_digits) + " digits")`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "26b",
    //     "Modify the program so that it displays each digit of the number from the right to the left as the number is being divided by 10. To obtain the digit, the program should use the modulus operator (<b>%</b>) to obtain the remainder of the division.",
    //     [
    //         `num = random.randint(1, 999999)`,
    //         `num_digits = 0`,
    //         ``,
    //         `while num > 10:`,
    //         `    num = num // 10`,
    //         `    num_digits += 1`,
    //         `print("The number has " + str(num_digits) + " digits")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Generated 1874:</b>",
    //             "output: <b>4</b>",
    //             "output: <b>7</b>",
    //             "output: <b>8</b>",
    //             "output: <b>1</b>",
    //             "output: <b>The number has 4 digits</b>",
    //         ],
    //         [
    //             "output: <b>Generated 95:</b>",
    //             "output: <b>5</b>",
    //             "output: <b>9</b>",
    //             "output: <b>The number has 2 digits</b>",
    //         ],
    //     ],
    //     [
    //         `num = random.randint(1, 999999)`,
    //         `num_digits = 0`,
    //         ``,
    //         `while num > 10:`,
    //         `    num = num // 10`,
    //         `    num_digits += 1`,
    //         `    print(num % 10)`,
    //         `print("The number has " + str(num_digits) + " digits")`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // // nested loops
    // new AuthoringTask(
    //     "26ia",
    //     "Write a program that includes a for loop that uses the variable <i>i</i> to go from 0 to 1 (including 1). Then inside the loop, have another loop that uses the variable <i>j</i> to go from 0 to 1 (including 1). The program should display the value of <i>i</i> and <i>j</i> every time like the provided sample.",
    //     [
    //         [
    //             "output: <b>i: 0, j: 0:</b>",
    //             "output: <b>i: 0, j: 1:</b>",
    //             "output: <b>i: 1, j: 0:</b>",
    //             "output: <b>i: 1, j: 1:</b>",
    //         ],
    //     ],
    //     [
    //         `for i in range(0, 2):`,
    //         `    for j in range(0, 2):`,
    //         `        print("i: " + str(i) + " j: " + str(j))`,
    //     ].join("\n"),
    //     60 * 6,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "26ib",
    //     "Modify the program so that the first loop would go from 0 to 10 (instead of 0 to 1) and the second loop to go from 0 to 2 instead (including 2). It should also display the message <b>i changed to <i>i</i></b> whenever the value of <i>i</i> (in the outer loop) changes.",
    //     [
    //         `for i in range(0, 2):`,
    //         `    for j in range(0, 2):`,
    //         `        print("i: " + str(i) + " j: " + str(j))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>i: 0, j: 0:</b>",
    //             "output: <b>i: 0, j: 1:</b>",
    //             "output: <b>i: 0, j: 2:</b>",
    //             "output: <b>i changed to 1:</b>",
    //             "output: <b>i: 1, j: 0:</b>",
    //             "output: <b>i: 1, j: 1:</b>",
    //             "output: <b>i: 1, j: 2:</b>",
    //             "output: <b>i changed to 2:</b>",
    //             "...",
    //             "output: <b>i changed to 10:</b>",
    //             "output: <b>i: 10, j: 0:</b>",
    //             "output: <b>i: 10, j: 1:</b>",
    //             "output: <b>i: 10, j: 2:</b>",
    //         ],
    //     ],
    //     [
    //         `for i in range(0, 11):`,
    //         `    print("i changed to " + str(i))`,
    //         `    for j in range(0, 3):`,
    //         `        print("i: " + str(i) + " j: " + str(j))`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "27a",
    //     "Write a program that repeatedly generates a random number between 0 and 100 until the random number that it generates becomes equal to 50 (and then stop). Then display the number of attempts it took to generate the number.",
    //     [
    //         ["output: <b>It took 27 attempts.</b>"],
    //         ["output: <b>It took 14 attempts.</b>"],
    //     ],
    //     [
    //         `import random`,
    //         `num = random.randint(0, 100)`,
    //         `attempts = 0`,
    //         `while num != 50:`,
    //         `    num = random.randint(0, 100)`,
    //         `    attempts += 1`,
    //         `print("It took " + str(attempts) + " attempts.")`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "27b",
    //     "Modify the program so that it stops when when the random number becomes equal to any of hte numbers 25, 50, or 75. It should also display which number it stopped on after displaying the number of attempts after the loop.",
    //     [
    //         `import random`,
    //         `num = random.randint(0, 100)`,
    //         `attempts = 0`,
    //         `while num != 50:`,
    //         `    num = random.randint(0, 100)`,
    //         `    attempts += 1`,
    //         `print("It took " + str(attempts) + " attempts.")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>It took 6 attempts.</b>",
    //             "output: <b>It stopped on 75.</b>",
    //         ],
    //         [
    //             "output: <b>It took 9 attempts.</b>",
    //             "output: <b>It stopped on 25.</b>",
    //         ],
    //     ],
    //     [
    //         `import random`,
    //         `num = random.randint(0, 100)`,
    //         `attempts = 0`,
    //         `while num != 25 and num != 50 and num != 75:`,
    //         `    num = random.randint(0, 100)`,
    //         `    attempts += 1`,
    //         `print("It took " + str(attempts) + " attempts.")`,
    //         `print("It stopped on " + str(num))`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "28a",
    //     "Repeatedly roll a dice for 1000 times. At the end, display the total times it rolled six.",
    //     [
    //         ["output: <b>It rolled six for 165 times.</b>"],
    //         ["output: <b>It rolled six for 166 times.</b>"],
    //     ],
    //     [
    //         `import random`,
    //         `times = 0`,
    //         `for i in range(1000):`,
    //         `    if random.randint(1, 6) == 6:`,
    //         `        times += 1`,
    //         `print("It rolled six for " + str(times) + " times.")`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "28b",
    //     "Modify the program so that it counts the number of times it rolled each of the six faces (using six variables) and then finally display the value of all six variables.",
    //     [
    //         `times = 0`,
    //         `for i in range(1000):`,
    //         `    if random.randint(1, 6) == 6:`,
    //         `        times += 1`,
    //         `print("It rolled six for " + str(times) + " times.")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>It rolled one for 166</b>",
    //             "output: <b>It rolled two for 168</b>",
    //             "output: <b>It rolled three for 162</b>",
    //             "output: <b>It rolled four for 170</b>",
    //             "output: <b>It rolled five for 164</b>",
    //             "output: <b>It rolled six for 170</b>",
    //         ],
    //     ],
    //     [
    //         `ones = 0`,
    //         "twos = 0",
    //         "thress = 0",
    //         "fours = 0",
    //         "fives = 0",
    //         `sixes = 0`,
    //         ``,
    //         `for i in range(1000):`,
    //         `    num = random.randint(1, 6)`,
    //         `    if num == 1:`,
    //         `        ones += 1`,
    //         `    elif num == 2:`,
    //         `        twos += 1`,
    //         `    elif num == 3:`,
    //         `        thress += 1`,
    //         `    elif num == 4:`,
    //         `        fours += 1`,
    //         `    elif num == 5:`,
    //         `        fives += 1`,
    //         `    elif num == 6:`,
    //         `        sixes += 1`,
    //         `print("It rolled one for " + str(ones) + " times.")`,
    //         `print("It rolled two for " + str(twos) + " times.")`,
    //         `print("It rolled three for " + str(thress) + " times.")`,
    //         `print("It rolled four for " + str(fours) + " times.")`,
    //         `print("It rolled five for " + str(fives) + " times.")`,
    //         `print("It rolled six for " + str(sixes) + " times.")`,
    //     ].join("\n"),
    //     60 * 7,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc22",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `x = 2`,
    //         `for i in range(6):`,
    //         `    x += 4`,
    //         `print(x)`,
    //     ].join("\n")}</div>`,
    //     [`24`, `26`, `28`, `30`, `I don't know.`],
    //     1,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc23",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `number = 10`,
    //         `for x in range(5):`,
    //         `    if x == 2:`,
    //         `        number = 0`,
    //         `    else:`,
    //         `        number += 5`,
    //         `print(number)`,
    //     ].join("\n")}</div>`,
    //     [`10`, `15`, `20`, `25`, `I don't know.`],
    //     0,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc24",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `num = 10`,
    //         `while num >= 5:`,
    //         `    num = num - 2`,
    //         `print(num)`,
    //     ].join("\n")}</div>`,
    //     [`5`, `4`, `6`, `3`, `I don't know.`],
    //     1,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc25",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `num = 0`,
    //         `for i in range(3):`,
    //         `    for j in range(4):`,
    //         `        for k in range(5):`,
    //         `            num += 1`,
    //         `print(num)`,
    //     ].join("\n")}</div>`,
    //     [`12`, `60`, `24`, `20`, `I don't know.`],
    //     1,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc26",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `num = 5`,
    //         `while num > 10:`,
    //         `    num = num + 1`,
    //         `    if num == 8:`,
    //         `        num = num + 2`,
    //         `    elif num == 9:`,
    //         `        num = num + 3`,
    //         `print(num)`,
    //     ].join("\n")}</div>`,
    //     [`11`, `9`, `7`, `5`, `I don't know.`],
    //     3,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc27",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `import random`,
    //         `count_six = 3`,
    //         `while count_six != 10:`,
    //         `    if random.randint(1, 6) == 6:`,
    //         `        count_six = count_six + 1`,
    //         `    if count_six == 5:`,
    //         `        break`,
    //         `print(count_six)`,
    //     ].join("\n")}</div>`,
    //     [`3`, `5`, `6`, `10`, `I don't know.`],
    //     1,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc28",
    //     `We want the following while loop to STOP when <i>item</i> is either equal to <b>"stop"</b> or an empty string <b>""</b>. Which of the following conditions will do this?<br/> <div class="code-block">${[
    //         "item = input('Enter an item: ')",
    //         `message = ""`,
    //         `while (CONDITION):`,
    //         `    message = message + " " + item`,
    //         `    item = input("Enter another item: ")`,
    //         `print(message)`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${`item != "" or item != "stop"`}</div>`,
    //         `<div class="code-block">${`item == "" or item == "stop"`}</div>`,
    //         `<div class="code-block">${`item != "" and item != "stop"`}</div>`,
    //         `<div class="code-block">${`item == "" and item == "stop"`}</div>`,
    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc29",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `x = 11`,
    //         `while True:`,
    //         `    x = x - 1`,
    //         `    if x == 5:`,
    //         `        x = x + 1`,
    //         `        break`,
    //         `    elif x == 9:`,
    //         `        x = x + 1`,
    //         `        break`,
    //         `    elif x == 7:`,
    //         `        x = x + 1`,
    //         `        break`,
    //         `print(x)`,
    //     ].join("\n")}</div>`,
    //     [`6`, `8`, `10`, `5`, `I don't know.`],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc30",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `x = 10`,
    //         `y = 0`,
    //         `while x > y:`,
    //         `    x = x - 1`,
    //         `    y = y + 1`,
    //         `print("x = " + str(x) + ", y = " + str(y))`,
    //     ].join("\n")}</div>`,
    //     [
    //         `x = 5, y = 5`,
    //         `x = 9, y = 1`,
    //         `x = 6, y = 4`,
    //         `x = 10, y = 0`,
    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.loops,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "29a",
    //     "Create a list with these values: 1, 5, 9, 13, 17, 21. Then, display the first item in the list by accessing the list using the appropriate indicies. Then, display the length of the list.<br/> <b>Hint: </b>you should use a special function that returns the length of a list.",
    //     [["output: <b>First item: 1</b>", "output: <b>Length: 6</b>"]],
    //     [
    //         `list = [1, 5, 9, 13, 17, 21]`,
    //         `print("First item: " + str(list[0]))`,
    //         `print("Length: " + str(len(list)))`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "29b",
    //     "Modify the program so that it displays the last item in the list by accessing the list using the appropriate index. You have to calculate the index of the last item of the list using the length of the list (ask your self what is the relationship between the index of the last item of a list and the length of a list.<br/> <b>Note:</b>You must use the <b>len</b> function to determine the length of the list.",
    //     [
    //         `list = [1, 5, 9, 13, 17, 21]`,
    //         `print("First item: " + str(list[0]))`,
    //         `print("Length: " + str(len(list)))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>First item: 1</b>",
    //             "output: <b>Length: 6</b>",
    //             "output: <b>Last item: 21</b>",
    //         ],
    //     ],
    //     [
    //         `list = [1, 5, 9, 13, 17, 21]`,
    //         `print("First item: " + str(list[0]))`,
    //         `print("Length: " + str(len(list)))`,
    //         `print("Last item: " + str(list[len(list) - 1]))`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "30a",
    //     `Write a program that creates a list with the following textual values: "math", "history", "programming", and "art". Then use a while loop and an index variable to display all of the items in the list one by one.`,
    //     [
    //         [
    //             "output: <b>math</b>",
    //             "output: <b>history</b>",
    //             "output: <b>programming</b>",
    //             "output: <b>art</b>",
    //         ],
    //     ],
    //     [
    //         `list = ["math", "history", "programming", "art"]`,
    //         `i = 0`,
    //         `while i < len(list):`,
    //         `    print(list[i])`,
    //         `    i += 1`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "30b",
    //     "Modify the program so that it displays the items in the list in reverse order.",
    //     [
    //         `list = ["math", "history", "programming", "art"]`,
    //         `i = 0`,
    //         `while i < len(list):`,
    //         `    print(list[i])`,
    //         `    i += 1`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>art</b>",
    //             "output: <b>programming</b>",
    //             "output: <b>history</b>",
    //             "output: <b>math</b>",
    //         ],
    //     ],
    //     [
    //         `list = ["math", "history", "programming", "art"]`,
    //         `i = len(list) - 1`,
    //         `while i >= 0:`,
    //         `    print(list[i])`,
    //         `    i -= 1`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "31a",
    //     `Write a program that creates an empty list and then, inside a for loop that repeats for 10 times, ask the user to enter a number and then add it to the end of the list. At the end, display the length of the list.`,
    //     [
    //         [
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>13</b>",
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>4</b>",
    //             "...",
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>22</b>",
    //             "output: <b>Length: 10</b>",
    //         ],
    //     ],
    //     [
    //         `list = []`,
    //         `for i in range(10):`,
    //         `    num = int(input("Enter a number: "))`,
    //         `    list.append(num)`,
    //         `print("Length: " + str(len(list)))`,
    //     ].join("\n"),
    //     60 * 7,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "31b",
    //     "Rename the list to <i>grades</i> and create another empty list called <i>students</i> before the loop. Then, inside the loop, first ask the user to enter a student name (as a text/string) and then add the student name into the <i>students</i> list. Then, ask the user to enter a grade (as a number/integer) and then add the grade into the <i>grades</i> list. Finally, after the loop, display the length of both lists.",
    //     [
    //         `list = []`,
    //         `for i in range(10):`,
    //         `    num = int(input("Enter a number: "))`,
    //         `    list.append(num)`,
    //         `print("Length: " + str(len(list)))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter a student name:</b>",
    //             "input: <b>Sophie</b>",
    //             "output: <b>Enter a grade:</b>",
    //             "input: <b>85</b>",
    //             "...",
    //             "output: <b>Enter a student name:</b>",
    //             "input: <b>Michael</b>",
    //             "output: <b>Enter a grade:</b>",
    //             "input: <b>69</b>",
    //             "output: <b>Students length: 10</b>",
    //             "output: <b>Grades length: 10</b>",
    //         ],
    //     ],
    //     [
    //         `grades = []`,
    //         `students = []`,
    //         `for i in range(10):`,
    //         `    student = input("Enter a student name: ")`,
    //         `    students.append(student)`,
    //         `    grade = int(input("Enter a grade: "))`,
    //         `    grades.append(grade)`,
    //         `print("Students length: " + str(len(students)))`,
    //         `print("Grades length: " + str(len(grades)))`,
    //     ].join("\n"),
    //     60 * 4,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "32a",
    //     `Create an empty list called <i>grades</i>. Then, repeatedly add a random number between 50 to 100 to the list, for a random number of times (between 15 and 25). Finally, use another loop to display all the items in the grades list.<br/> <b>Note:</b> your program should use the for loop with the range function, not a while loop.`,
    //     [
    //         [
    //             "output: <b>51</b>",
    //             "output: <b>78</b>",
    //             "output: <b>66</b>",
    //             "...",
    //             "output: <b>89</b>",
    //         ],
    //     ],
    //     [
    //         `grades = []`,
    //         `for i in range(random.randint(15, 25)):`,
    //         `    grades.append(random.randint(50, 100))`,
    //         `for item in grades:`,
    //         `    print(item)`,
    //     ].join("\n"),
    //     60 * 7,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "32b",
    //     "Modify the code so that it defines a second list called <i>grades2</i> and uses another loop to repeatedly add a random number between 1 to 10 to the <i>grades2</i> list for a random number of times (between 100 to 500). In summary, your code should define two lists with random values and random lengths, then display the contents of both lists.",
    //     [
    //         `grades = []`,
    //         `for i in range(random.randint(15, 25)):`,
    //         `    grades.append(random.randint(50, 100))`,
    //         `for item in grades:`,
    //         `    print(item)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Grades list:</b>",
    //             "output: <b>88</b>",
    //             "output: <b>59</b>",
    //             "output: <b>97</b>",
    //             "...",
    //             "output: <b>62</b>",
    //             "output: <b>Grades 2 list:</b>",
    //             "output: <b>3</b>",
    //             "output: <b>1</b>",
    //             "output: <b>2</b>",
    //             "...",
    //             "output: <b>5</b>",
    //         ],
    //     ],
    //     [
    //         `grades = []`,
    //         `grades2 = []`,
    //         `for i in range(random.randint(15, 25)):`,
    //         `    grades.append(random.randint(50, 100))`,
    //         `for i in range(random.randint(100, 500)):`,
    //         `    grades2.append(random.randint(1, 10))`,
    //         `print("Grades list:")`,
    //         `for item in grades:`,
    //         `    print(item)`,
    //         `print("Grades 2 list:")`,
    //         `for item in grades2:`,
    //         `    print(item)`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "33a",
    //     `Create a list called <i>numbers</i>, and then use a for loop that repeats for 5 times to repeatedly ask the user to enter a number (as an integer) and add it to the list. Then use another loop to go through the items of the <i>numbers</i> list and find the largest number. Finally, display the value of the largest number. (Note: you can NOT use the <i>max</i> function.)`,
    //     [
    //         [
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>14</b>",
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>58</b>",
    //             "...",
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>25</b>",
    //             "output: <b>The largest number is: 58</b>",
    //         ],
    //     ],
    //     [
    //         `numbers = []`,
    //         `for i in range(5):`,
    //         `    number = int(input("Enter a number: "))`,
    //         `    numbers.append(number)`,
    //         `largest = numbers[0]`,
    //         `for num in range(numbers):`,
    //         `    if num > largest:`,
    //         `        largest = num`,
    //         `print("The largest number is: " + str(largest))`,
    //     ].join("\n"),
    //     60 * 10,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),
    // new ModifyingTask(
    //     "33b",
    //     "Modify the program so that it also finds the smallest number in the list and displays it at the end. (Note: you can NOT use the <i>min</i> or <i>max</i> function.)",
    //     [
    //         `numbers = []`,
    //         `for i in range(5):`,
    //         `    number = int(input("Enter a number: "))`,
    //         `    numbers.append(number)`,
    //         `largest = numbers[0]`,
    //         `for num in range(numbers):`,
    //         `    if num > largest:`,
    //         `        largest = num`,
    //         `print("The largest number is: " + str(largest))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>14</b>",
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>58</b>",
    //             "...",
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>25</b>",
    //             "output: <b>The largest number is: 58</b>",
    //             "output: <b>The smallest number is: 14</b>",
    //         ],
    //     ],
    //     [
    //         `numbers = []`,
    //         `for i in range(5):`,
    //         `    number = int(input("Enter a number: "))`,
    //         `    numbers.append(number)`,
    //         `largest = numbers[0]`,
    //         `smallest = numbers[0]`,
    //         `for num in range(numbers):`,
    //         `    if num < smallest:`,
    //         `        smallest = num`,
    //         `    if num > largest:`,
    //         `        largest = num`,
    //         `print("The largest number is: " + str(largest))`,
    //         `print("The smallest number is: " + str(smallest))`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "34a",
    //     `Repeatedly ask the user to enter a movie name and add it to a list called <i>movies</i> until the user enters <b>stop</b>. At the end just display how many movies the user has entered.<br/><b>Note:</b> The list should not contain the word <b>stop</b>.`,
    //     [
    //         [
    //             "output: <b>Enter a movie name:</b>",
    //             "input: <b>spiderman</b>",
    //             "output: <b>Enter a movie name:</b>",
    //             "input: <b>rango</b>",
    //             "output: <b>Enter a movie name:</b>",
    //             "input: <b>stop</b>",
    //             "output: <b>You entered 3 movies.</b>",
    //         ],
    //     ],
    //     [
    //         `movies = []`,
    //         `movie = input("Enter a movie name: ")`,
    //         `while movie != "stop":`,
    //         `    movies.append(movie)`,
    //         `    movie = input("Enter a movie name: ")`,
    //         `print("You entered " + str(len(movies)) + " movies.")`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new ModifyingTask(
    //     "34b",
    //     "Create another list called <i>ratings</i> and for each movie that is entered (that is not equal to <b>stop</b>), ask the user to enter a rating from 0 to 10 (as an integer) and add the number to the <i>ratings</i> list. At the end, display the number of movies and the number of ratings <br/>Note: they should have the same number of elements and stop should not be included in the movies.",
    //     [
    //         `movies = []`,
    //         `movie = input("Enter a movie name: ")`,
    //         `while movie != "stop":`,
    //         `    movies.append(movie)`,
    //         `    movie = input("Enter a movie name: ")`,
    //         `print("You entered " + str(len(movies)) + " movies.")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter a movie name:</b>",
    //             "input: <b>spiderman</b>",
    //             "output: <b>Enter the rating:</b>",
    //             "input: <b>5</b>",
    //             "output: <b>Enter a movie name:</b>",
    //             "input: <b>Lord of the Rings</b>",
    //             "output: <b>Enter the rating:</b>",
    //             "input: <b>10</b>",
    //             "output: <b>Enter a movie name:</b>",
    //             "input: <b>stop</b>",
    //             "output: <b>You entered 2 movies.</b>",
    //             "output: <b>You entered 2 ratings.</b>",
    //         ],
    //     ],
    //     [
    //         `movies = []`,
    //         `ratings = []`,
    //         `movie = input("Enter a movie name: ")`,
    //         `while movie != "stop":`,
    //         `    movies.append(movie)`,
    //         `    rating = int(input("Enter the rating: "))`,
    //         `    movie = input("Enter a movie name: ")`,
    //         `print("You entered " + str(len(movies)) + " movies.")`,
    //         `print("You entered " + str(len(ratings)) + " ratings.")`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new AuthoringTask(
    //     "35a",
    //     `Create an empty list called <i>numbers</i> and then use a for loop that repeats for a random number of times between 50 to 75 to update the list by adding a random number between 0 to 100. Then use another loop to find the largest number in the list. Finally, display the largest number after the second loop has finished.`,
    //     [[`output: <b>Largest number: 92</b>`]],
    //     [
    //         `numbers = []`,
    //         `for i in range(random.randint(50, 75)):`,
    //         `    numbers.append(random.randint(0, 100))`,
    //         `largest = numbers[0]`,
    //         `for num in range(numbers):`,
    //         `    if num > largest:`,
    //         `        largest = num`,
    //         `print("Largest number: " + str(largest))`,
    //     ].join("\n"),
    //     60 * 8,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new ModifyingTask(
    //     "35b",
    //     "Create another variable called <i>smallest</i> and use the second for loop to find the smallest number in the list in addition to the largest. At the end, display both the largest and the smallest numbers.",
    //     [
    //         `numbers = []`,
    //         `for i in range(random.randint(50, 75)):`,
    //         `    numbers.append(random.randint(0, 100))`,
    //         `largest = numbers[0]`,
    //         `for num in range(numbers):`,
    //         `    if num > largest:`,
    //         `        largest = num`,
    //         `print("Largest number: " + str(largest))`,
    //     ].join("\n"),
    //     [
    //         [
    //             `output: <b>Largest number: 92</b>`,
    //             `output: <b>Smallest number: 3</b>`,
    //         ],
    //     ],
    //     [
    //         `numbers = []`,
    //         `for i in range(random.randint(50, 75)):`,
    //         `    numbers.append(random.randint(0, 100))`,
    //         `largest = numbers[0]`,
    //         `smallest = numbers[0]`,
    //         `for num in range(numbers):`,
    //         `    if num > largest:`,
    //         `        largest = num`,
    //         `    if num < smallest:`,
    //         `        smallest = num`,
    //         `print("Largest number: " + str(largest))`,
    //         `print("Smallest number: " + str(smallest))`,
    //     ].join("\n"),
    //     60 * 5,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc31",
    //     `How can we get the first value of the following list?<br/> <div class="code-block">${[
    //         "items = [1, 5, 10, 15, 20]",
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${`items(1)`}</div>`,
    //         `<div class="code-block">${`items(0)`}</div>`,
    //         `<div class="code-block">${`items[1]`}</div>`,
    //         `<div class="code-block">${`items[0]`}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc32",
    //     `Assume we have the following list of numbers called <i>items</i>, which of the following loops correctly displays each element of the list?<br/> <div class="code-block">${[
    //         "items = [1, 5, 10, 15, 20]",
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[
    //             `for i in range(len(items)):`,
    //             `    print(items[i])`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in len(items):`,
    //             `    print(items[i])`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in items:`,
    //             `    print(items[i])`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in items:`,
    //             `    print(items)`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc33",
    //     `What does this code display at the end?<br/> <div class="code-block">${[
    //         `l = []`,
    //         `l.append("z")`,
    //         `l.append(l[0] + "t")`,
    //         `l.append(l[1] + "q")`,
    //         `print(l[2])`,
    //     ].join("\n")}</div>`,
    //     [`qt`, `qtz`, `tq`, `ztq`, `I don't know.`],
    //     3,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc34",
    //     `What does this code display at the end?<br/> <div class="code-block">${[
    //         `my_list = [3, 1, 7, 5, 9]`,
    //         ``,
    //         `for i in range(len(my_list)):`,
    //         `    my_list[i] = my_list[i] * 2`,
    //         ``,
    //         `print(my_list[2])`,
    //     ].join("\n")}</div>`,
    //     [`1`, `2`, `7`, `14`, `I don't know.`],
    //     3,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc35",
    //     `What does this code display at the end?<br/> <div class="code-block">${[
    //         `my_list = ["f", "o", "z", "q", "m"]`,
    //         `other_list = []`,
    //         ``,
    //         `i = len(my_list) - 1`,
    //         `j = 0`,
    //         ``,
    //         `while i >= 0 and j < len(my_list):`,
    //         `    other_list.append(my_list[i] + my_list[j])`,
    //         `    i = i - 1`,
    //         `    j = j + 1`,
    //         ``,
    //         `print(other_list[1])`,
    //     ].join("\n")}</div>`,
    //     [`mf`, `qo`, `zz`, `oq`, `I don't know.`],
    //     1,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc36",
    //     `Which of the following codes correctly calculates the average of the list <i>numbers = [10, 6, 2, 12, 17, 8]</i>?`,
    //     [
    //         `<div class="code-block">${[
    //             `count = 0`,
    //             `for n in range(numbers):`,
    //             `    total += n`,
    //             `    count += 1`,
    //             `print(total / count)`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `total = 0`,
    //             `for i in len(numbers):`,
    //             `    total += numbers[i]`,
    //             `print(total / len(numbers))`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `total = 0`,
    //             `for i in len(range(numbers)):`,
    //             `    total += numbers[i]`,
    //             `print(total / len(numbers))`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `total = 0`,
    //             `for n in numbers:`,
    //             `    total += n`,
    //             `print(total / len(numbers))`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc37",
    //     `What does the following code display at the end?<br/> <div class="code-block">${[
    //         `symbols = ["*"]`,
    //         `letters = ["L"]`,
    //         `symbols.append("@")`,
    //         `letters.append("Q")`,
    //         `symbols.append("+")`,
    //         `letters.append("M")`,
    //         ``,
    //         `print(letters[1] + symbols[2])`,
    //     ].join("\n")}</div>`,
    //     [`Q+`, `L+`, `M@`, `Q*`, `I don't know.`],
    //     0,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc38",
    //     `What does the following code display at the end?<br/> <div class="code-block">${[
    //         `nums = [1, 3]`,
    //         `nums.append(nums[0])`,
    //         `nums.append(nums[1] + nums[2])`,
    //         `nums.append(nums[1] + nums[2] + nums[3])`,
    //         `print(nums[4])`,
    //     ].join("\n")}</div>`,
    //     [`4`, `8`, `7`, `3`, `I don't know.`],
    //     1,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc39",
    //     `What does the following code display at the end?<br/> <div class="code-block">${[
    //         `nums = [1, 3, 5]`,
    //         `words = ["a", "c", "e", "f", "h"]`,
    //         `print(str(nums[1]) + words[len(nums)])`,
    //     ].join("\n")}</div>`,
    //     [`3f`, `3e`, `1f`, `1e`, `I don't know.`],
    //     0,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // new MultipleChoiceTask(
    //     "mc40",
    //     `What does the following code display at the end?<br/> <div class="code-block">${[
    //         `nums = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]`,
    //         `i = len(nums) - 1`,
    //         `while i >= 0:`,
    //         `    if nums[i] % 2 == 0:`,
    //         `        print(nums[i])`,
    //         `        break`,
    //         `    i = i - 1`,
    //     ].join("\n")}</div>`,
    //     [`34`, `2`, `89`, `55`, `I don't know.`],
    //     0,
    //     TaskTopic.arrays,
    //     TaskStage.train
    // ),

    // // they will first work on a few multiple choice questions
    // // and then they will work on the programming tasks

    // new AuthoringTask(
    //     "epa1",
    //     "Write a program that would ask the user for two numbers, and then displays the largest of the two.",
    //     [
    //         [
    //             "output: <b>Enter a number: </b>",
    //             "input: <b>53</b>",
    //             "output: <b>Enter another number: </b>",
    //             "input: <b>19</b>",
    //             "output: <b>53</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("Enter a number: "))`,
    //         `num2 = int(input("Enter another number: "))`,
    //         ``,
    //         `if num1 > num2:`,
    //         `    print(num1)`,
    //         `else:`,
    //         `    print(num2)`,
    //     ].join("\n"),
    //     3 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new AuthoringTask(
    //     "epa2",
    //     "Write a program that would use a loop to repeatedly ask the user to enter a number between 0 and 10, and stop when the user enters 0. The loop should then display the sum of all the numbers entered at the end.",
    //     [
    //         [
    //             "output: <b>Enter a number between 0 and 10: </b>",
    //             "input: <b>7</b>",
    //             "output: <b>Enter a number between 0 and 10: </b>",
    //             "input: <b>4</b>",
    //             "output: <b>Enter a number between 0 and 10: </b>",
    //             "input: <b>0</b>",
    //             "output: <b>Total is: 11</b>",
    //         ],
    //     ],
    //     [
    //         `total = 0`,
    //         ``,
    //         `num = int(input("Enter a number between 0 and 10: "))`,
    //         `while num != 0:`,
    //         `    total += num`,
    //         `    num = int(input("Enter a number between 0 and 10: "))`,
    //         `print("Total is: " + str(total))`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new AuthoringTask(
    //     "epa3",
    //     "Write a program that displays all the numbers between 50 and 100 (including 50 and 100) using a loop.",
    //     [
    //         [
    //             "output: <b>50</b>",
    //             "output: <b>51</b>",
    //             "...",
    //             "output: <b>99</b>",
    //             "output: <b>100</b>",
    //         ],
    //     ],
    //     [`for i in range(50, 101):`, `    print(i)`].join("\n"),
    //     5 * 60,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new AuthoringTask(
    //     "epa4",
    //     "Write a program that generates two random numbers between 1 and 6 called <i>rand1</i> and <i>rand2</i>. Then display them in each line like this: <b>first: <i>rand1</i>, and second: <i>rand2</i></b>. Finally, checks if they are <b>both</b> equal to six. If yes, display the message <b>Bingo!</b> otherwise display the message <b>Try again!</b>.",
    //     [
    //         [
    //             "output: <b>first: 4, and second: 6</b>",
    //             "output: <b>Try again!</b>",
    //         ],
    //         ["output: <b>first: 6, and second: 6</b>", "output: <b>Bingo!</b>"],
    //     ],
    //     [
    //         `rand1 = random.randint(1, 6)`,
    //         `rand2 = random.randint(1, 6)`,
    //         ``,
    //         `print("first: " + str(rand1) + ", and second: " + str(rand2))`,
    //         ``,
    //         `if rand1 == 6 and rand2 == 6:`,
    //         `    print("Bingo!")`,
    //         `else:`,
    //         `    print("Try again!")`,
    //     ].join("\n"),
    //     4 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new AuthoringTask(
    //     "epa5",
    //     "Write a program that uses a loop that repeats for 100 times to generate a random number between 1 and 100 every time it repeats. Every time it generates a random number, add the ones that are less than 25 to a list called <i>special_numbers</i>. Finally, display the length of <i>special_numbers</i> only once.",
    //     [["output: <b>21</b>"]],
    //     [
    //         `special_numbers = []`,
    //         ``,
    //         `for i in range(100):`,
    //         `    rand = random.randint(1, 100)`,
    //         `    if rand < 25:`,
    //         `        special_numbers.append(rand)`,
    //         `print(len(special_numbers))`,
    //     ].join("\n"),
    //     6 * 60,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // new ModifyingTask(
    //     "epm1",
    //     "Modify the given program so that it would ask the user for two numbers: <i>num1</i> and <i>num2</i> and then calculate the addition of them by displaying the following message instead: <b>The sum of <i>num1</i> and <i>num2</i> is: <i>the value of num1 + num2</i></b>.",
    //     [
    //         `num1 = int(input("Enter a number"))`,
    //         `message = "num1 plus 10 is " + str(num1 + 10)`,
    //         ``,
    //         `print(message)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter a number:</b>",
    //             "input: <b>5</b>",
    //             "output: <b>Enter another number:</b>",
    //             "input: <b>10</b>",
    //             "output: <b>The sum of 5 and 10 is 15</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("Enter a number"))`,
    //         `num2 = int(input("Enter another number"))`,
    //         ``,
    //         `message = "The sum of " + str(num1) + " and " + str(num2) + " is " + str(num1 + num2)`,
    //         ``,
    //         `print(message)`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.types,
    //     TaskStage.test
    // ),

    // new ModifyingTask(
    //     "epm2",
    //     "Modify the given program so that when the temperature is above 90, <i>feels_like</i> becomes <b>extremely hot</b> and when the temperature is below 30, <i>feels_like</i> becomes <b>extremely cold</b>.",
    //     [
    //         `temperature = int(input("enter a temperature between 0 and 100: "))`,
    //         `feels_like = ""`,
    //         ``,
    //         `if temperature > 75:`,
    //         `    feels_like = "hot"`,
    //         `elif temperature > 50:`,
    //         `    feels_like = "warm"`,
    //         `else:`,
    //         `    feels_like = "cold"`,
    //         ``,
    //         `print("It feels " + feels_like)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a temperature between 0 and 100:</b>",
    //             "input: <b>35</b>",
    //             "output: <b>It feels cold</b>",
    //         ],
    //         [
    //             "output: <b>enter a temperature between 0 and 100:</b>",
    //             "input: <b>80</b>",
    //             "output: <b>It feels extremely hot</b>",
    //         ],
    //         [
    //             "output: <b>enter a temperature between 0 and 100:</b>",
    //             "input: <b>95</b>",
    //             "output: <b>It feels extremely hot</b>",
    //         ],
    //     ],
    //     [
    //         `temperature = int(input("enter a temperature between 0 and 100: "))`,
    //         `feels_like = ""`,
    //         ``,
    //         `if temperature > 90:`,
    //         `    feels_like = "extremely hot"`,
    //         `elif temperature > 75:`,
    //         `    feels_like = "hot"`,
    //         `elif temperature > 50:`,
    //         `    feels_like = "warm"`,
    //         `elif temperature > 30:`,
    //         `    feels_like = "cold"`,
    //         `else:`,
    //         `    feels_like = "extremely cold"`,
    //         ``,
    //         `print("It feels " + feels_like)`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new ModifyingTask(
    //     "epm3",
    //     "Modify the given program so that it would count the number of incorrect guesses that the user makes and then display it at the end of the program, only once.",
    //     [
    //         `import random`,
    //         `num = int(input("Guess the number: "))`,
    //         `choose = random.randint(1, 10)`,
    //         `while num != choose:`,
    //         `    num = int(input("Wrong! Guess another time: "))`,
    //         `print("Correct!! :)")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Guess the number: </b>",
    //             "input: <b>5</b>",
    //             "output: <b>Wrong! Guess another time:</b>",
    //             "input: <b>7</b>",
    //             "output: <b>Wrong! Guess another time:</b>",
    //             "input: <b>4</b>",
    //             "output: <b>Correct!! :)</b>",
    //             "output: <b>Incorrect guesses: 2</b>",
    //         ],
    //     ],
    //     [
    //         `import random`,
    //         `num = int(input("Guess the number: "))`,
    //         `choose = random.randint(1, 10)`,
    //         `incorrect_guesses = 0`,
    //         ``,
    //         `while num != choose:`,
    //         `    num = int(input("Wrong! Guess another time: "))`,
    //         `    incorrect_guesses += 1`,
    //         ``,
    //         `print("Correct!! :)")`,
    //         `print("Incorrect guesses: " + str(incorrect_guesses))`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new ModifyingTask(
    //     "epm4",
    //     "Modify the given program so that instead of reducing the value of <i>num</i> to go to zero, it would ask the user to enter two numbers: <i>num1</i> and <i>num2</i> and then while <i>num1</i> is greater than or equal to <i>num2</i>, the loop should reduce the value of <i>num1</i> by 3 every time, and increase the value of <i>num2</i> by 3. Display their values as they change every time.",
    //     [
    //         `num = int(input("enter a number: "))`,
    //         `while num > -1:`,
    //         `    print(num)`,
    //         `    num -= 1`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number between 100 and 999:</b>",
    //             "input: <b>751</b>",
    //             "output: <b>enter a smaller number:</b>",
    //             "input: <b>500</b>",
    //             "output: <b>num1: 750</b>",
    //             "output: <b>num2: 501</b>",
    //             "output: <b>num1: 749</b>",
    //             "output: <b>num2: 502</b>",
    //             "...",
    //             "output: <b>num1: 628</b>",
    //             "output: <b>num2: 623</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("enter a number: "))`,
    //         `num2 = int(input("enter a smaller number: "))`,
    //         ``,
    //         `while num1 >= num2:`,
    //         `    print("num1: " + str(num1))`,
    //         `    print("num2: " + str(num2))`,
    //         `    num1 -= 3`,
    //         `    num2 += 3`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new ModifyingTask(
    //     "epm5",
    //     "Modify the given program by adding two new lists and then inside the <b>second loop</b>, if the number in the list is less than 4, add it to a list called <i>list_1</i>, if the number is between 4 and 7, add it to a list called <i>list_2</i>, and if the number is greater than 7, add it to a list called <i>list_3</i>. Finally, display the length of each list.",
    //     [
    //         `import random`,
    //         ``,
    //         `rand_nums = []`,
    //         ``,
    //         `for i in range(100):`,
    //         `    rand_nums.append(random.randint(1, 10))`,
    //         ``,
    //         `for item in rand_nums:`,
    //         `    if item > 5:`,
    //         `        print(item)`,
    //     ].join("\n"),
    //     [
    //         ["output: <b>list1: 39</b>"],
    //         ["output: <b>list2: 35</b>"],
    //         ["output: <b>list3: 26</b>"],
    //     ],
    //     [
    //         `import random`,
    //         ``,
    //         `rand_nums = []`,
    //         ``,
    //         `for i in range(100):`,
    //         `    rand_nums.append(random.randint(1, 10))`,
    //         ``,
    //         `list_1 = []`,
    //         `list_2 = []`,
    //         `list_3 = []`,
    //         ``,
    //         `for item in rand_nums:`,
    //         `    if item < 4:`,
    //         `        list_1.append(item)`,
    //         `    elif item > 7:`,
    //         `        list_3.append(item)`,
    //         `    else:`,
    //         `        list_2.append(item)`,
    //         ``,
    //         `print("list1: " + str(len(list_1)))`,
    //         `print("list2: " + str(len(list_2)))`,
    //         `print("list3: " + str(len(list_3)))`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // // then multiple choice randomly

    // new MultipleChoiceTask(
    //     "emc1",
    //     `What is the output of the following Python code? <br/><div class="code-block">${[
    //         `x = 9`,
    //         `y = 1`,
    //         `print("x" + "y")`,
    //     ].join("\n")}</div>`,
    //     [`10`, `x + y`, `xy`, `The code has an error.`, `I don't know.`],
    //     2,
    //     TaskTopic.basics,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc2",
    //     `Which of the following codes correctly calculates the sum of every other element in a given list? (the first, the third, the fifth, etc.)`,
    //     [
    //         `<div class="code-block">${[
    //             `total = 0`,
    //             `for i in range(numbers):`,
    //             `    if i % 2 == 0:`,
    //             `        total += i`,
    //             `print(total)`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `total = 0`,
    //             `for i in range(len(numbers)):`,
    //             `    if i % 2 == 0:`,
    //             `        total += numbers[i]`,
    //             `print(total)`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `total = 0`,
    //             `i = 0`,
    //             `while i < len(numbers):`,
    //             `    if i // 2 == 0:`,
    //             `        total += i`,
    //             `print(total)`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `total = 0`,
    //             `i = 0`,
    //             `while i < len(numbers):`,
    //             `    if i // 2 == 0:`,
    //             `        total += numbers[i]`,
    //             `print(total)`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.arrays, // TaskTopic.loops
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc3",
    //     `What does this code display at the end?<br/> <div class="code-block">${[
    //         `l = []`,
    //         `l.append(5)`,
    //         `l.append(l[0] + 10)`,
    //         `l.append(l[1] + 20)`,
    //         `l.append(l[2] + l[1])`,
    //         `print(l[3])`,
    //     ].join("\n")}</div>`,
    //     [`30`, `40`, `50`, `60`, `I don't know.`],
    //     2,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc4",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `var1 = "10"`,
    //         `var2 = 20`,
    //         `print(var1 + str(var2))`,
    //     ].join("\n")}</div>`,
    //     [`30`, `1020`, `"10"20`, `The code has an error.`, `I don't know.`],
    //     1,
    //     TaskTopic.types,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc5",
    //     `How can we change the print in the following code so that it displays a space between each of the programming languages? <br/> <div class="code-block">${[
    //         `x = "java"`,
    //         `y = "python"`,
    //         `z = "scratch"`,
    //         `print(x + y + z)`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${`print("x y z")`}</div>`,
    //         `<div class="code-block">${`print(x +  + y +  + z)`}</div>`,
    //         `<div class="code-block">${`print(x + " " + y + " " + z)`}</div>`,
    //         `<div class="code-block">${`print(x + y + z)`}</div>`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.basics,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc6",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `x = "x"`,
    //         `y = "y" + x`,
    //         `y = "x" + y + "y"`,
    //         `x += "x"`,
    //         `x = y + x`,
    //         `print(x)`,
    //     ].join("\n")}</div>`,
    //     [`xyxyxx`, `xxyx`, `xxyxyx`, `xyxyy`, `I don't know.`],
    //     0,
    //     TaskTopic.basics,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc7",
    //     `Which of the following python codes correctly asks the user about their name?
    //     `,
    //     [
    //         `<div class="code-block">${`name = print("Hello, ") + input("what's your name?")`}</div>`,
    //         `<div class="code-block">${`name = input(print("what's your name?"))`}</div>`,
    //         `<div class="code-block">${`greetings = "Hello, " + input("what's your name?")`}</div>`,
    //         `<div class="code-block">${`answer = ask("what's your name?")`}</div>`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.basics,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc8",
    //     `What does the following code display at the end?<br/> <div class="code-block">${[
    //         `nums = [1, 2, 3]`,
    //         `length = len(nums)`,
    //         `i = 0`,
    //         `while i + 1 < length:`,
    //         `    nums.append(nums[i] + nums[i + 1])`,
    //         `    i = i + 1`,

    //         `print(nums[len(nums) - 1])`,
    //     ].join("\n")}</div>`,
    //     [`4`, `5`, `3`, `2`, `I don't know.`],
    //     1,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc9",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `hats = 5`,
    //         `if hats > 3:`,
    //         `   hats += 3`,
    //         `elif hats == 5:`,
    //         `   hats += 5`,
    //         `if hats > 10:`,
    //         `   hats += 10`,
    //         `print(hats)`,
    //     ].join("\n")}</div>`,
    //     [`18`, `8`, `20`, `18`, `I don't know.`],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc10",
    //     `Assuming we have the following code, which of the following print statements is correct and does NOT throw an error? <br/> <div class="code-block">${[
    //         `ten = "10"`,
    //         `twenty = 20`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${`print(ten + int(twenty))`}</div>`,
    //         `<div class="code-block">${`print(str(ten) + twenty)`}</div>`,
    //         `<div class="code-block">${`print(twenty + int(ten))`}</div>`,
    //         `None of them! (They all throw an error)`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.types,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc11",
    //     `Assuming we have the following code and the user enters a number when it asks them to enter something: <br/> <div class="code-block">${[
    //         `import random`,
    //         `user = input("enter a number between 10 and 100: ")`,
    //         `print("user entered: " + user)`,
    //         `rand = random.randint(1, 100)`,
    //         ``,
    //         `if rand == user:`,
    //         `    print("nice guess!")`,
    //     ].join(
    //         "\n"
    //     )}</div> <br/> However, it will not run correctly. Which of the following will fix the code?`,
    //     [
    //         `<div class="code-block">${`print("user entered: " + str(user))`}</div>`,

    //         `<div class="code-block">${[
    //             `user = int(input("enter a number between 10 and 100: "))`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${`rand = str(random.randint(1, 100))`}</div>`,

    //         `<div class="code-block">${[`if int(rand) == user:`].join(
    //             "\n"
    //         )}</div>`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc12",
    //     `What will this program display in the output? <div class="code-block">${[
    //         `var1 = 2`,
    //         `var2 = 4`,
    //         ``,
    //         `if var1 < 4:`,
    //         `    var1 = var1 * 2`,
    //         ``,
    //         `    if var2 != var1:`,
    //         `        var2 = var1 - 3`,
    //         `    else:`,
    //         `        var2 = var1 + 3`,
    //         `else:`,
    //         `    var2 = var1 * 3`,
    //         `print(var2)`,
    //     ].join("\n")}</div>`,
    //     [`4`, `6`, `7`, `8`, `I don't know.`],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc13",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `var1 = "10"`,
    //         `var2 = 20`,
    //         `print(var1 + int(var2))`,
    //     ].join("\n")}</div>`,
    //     [`30`, `1020`, `"10"20`, `The code has an error.`, `I don't know.`],
    //     3,
    //     TaskTopic.types,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc14",
    //     `From the following options, which one is correct and does not throw an error?`,
    //     [
    //         `<div class="code-block">${[
    //             `x = input(int("enter a number: "))`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `x = int(input)("enter a number")`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `int(x) = input("enter a number: ")`,
    //         ].join("\n")}</div>`,

    //         `None of them! (They all throw an error)`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.basics,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc15",
    //     `Assuming we have the following code: <br/> <div class="code-block">${[
    //         `v1 = input("enter a number: ")`,
    //         `v2 = 10`,
    //         `v3 = "20"`,
    //     ].join(
    //         "\n"
    //     )}</div> <br/>How can we correctly compute the total of v1, v2, and v3?`,
    //     [
    //         `<div class="code-block">${`print(int(v1) + v2 + v3)`})}</div>`,
    //         `<div class="code-block">${`print(str(v1) + str(v2) + str(v3))`})}</div>`,
    //         `<div class="code-block">${`print(int(v1) + v2 + str(v3))`})}</div>`,
    //         `<div class="code-block">${`print(int(v1) + v2 + int(v3))`})}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.types,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc16",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `x = 1`,
    //         `x += 5`,
    //         `x -= 2`,
    //         `x += x`,
    //         `print(x)`,
    //     ].join("\n")}</div>`,
    //     [`4`, `8`, `4x`, `8x`, `I don't know.`],
    //     1,
    //     TaskTopic.basics,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc17",
    //     `What value for <i>x</i> will make the following code display the message <b>True</b>? <br/> <div class="code-block">${[
    //         `if 5 < x and x <= 6:`,
    //         `    print("True")`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[`x = 5`].join("\n")}</div>`,

    //         `<div class="code-block">${[`x = 6`].join("\n")}</div>`,

    //         `<div class="code-block">${[`x = 7`].join("\n")}</div>`,

    //         `None of the values above will make the code display the message <b>True</b>.`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc18",
    //     `What will the following program display in the output when it runs? <br/> <div class="code-block">${[
    //         `number = 10`,
    //         `if number < 10:`,
    //         `    number = number + 1`,
    //         `else:`,
    //         `    number += 1`,
    //         `if number > 10:`,
    //         `    number = number - 1`,
    //         `else:`,
    //         `    number += 1`,
    //         `print(number)`,
    //     ].join("\n")}</div>`,
    //     [`9`, `10`, `11`, `12`, `I don't know.`],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc19",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `x = 0`,
    //         `y = 0`,
    //         `while True:`,
    //         `    x = x + 2`,
    //         `    if x == 8:`,
    //         `        x = x - 1`,
    //         `        break`,
    //         `    elif x == 4:`,
    //         `        x = x - 1`,
    //         `        break`,
    //         `    elif x == 6:`,
    //         `        x = x - 1`,
    //         `        break`,
    //         `    y = y + 1`,
    //         `print(y)`,
    //     ].join("\n")}</div>`,
    //     [`4`, `3`, `2`, `1`, `I don't know.`],
    //     3,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc20",
    //     `What values for <i>mouse</i> and <i>click_count</i> will make the following expression become <b>True</b>? <br/> <div class="code-block">${[
    //         `(mouse == "clicked" and click_count <= 3) and (mouse != "dragged" and click_count == 1)`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[
    //             `mouse = "clicked"`,
    //             `click_count = 1`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `mouse = "clicked"`,
    //             `click_count = 2`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `mouse = "dragged"`,
    //             `click_count = 1`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `mouse = "dragged"`,
    //             `click_count = 2`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc21",
    //     `Assuming we have the following code: <br/> <div class="code-block">${[
    //         `import random`,
    //         `rand = random.randint(1, 10)`,
    //     ].join(
    //         "\n"
    //     )}</div> <br/> Which of the following codes correctly checks if the value of rand is equal to 5?`,
    //     [
    //         `<div class="code-block">${[
    //             `if rand = 5`,
    //             `    print("rand is equal to 5")`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `if rand is 5:`,
    //             `    print("rand is equal to 5")`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `if rand == 5`,
    //             `    print("rand is equal to 5")`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `if rand == 5:`,
    //             `    print("rand is equal to 5")`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc22",
    //     `We want the following while loop to STOP when <i>num</i> is equal to one of the following values: <b>0</b> or <b>10</b> or <b>100</b>. Which of the following conditions will do this?<br/> <div class="code-block">${[
    //         `num = int(input("Enter a number: "))`,
    //         `total = 0`,
    //         `while (CONDITION):`,
    //         `    total = total + num`,
    //         `    num = int(input("Enter a number: "))`,
    //         `print(total)`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${`num != 0 or num != 10 or num != 100`}</div>`,
    //         `<div class="code-block">${`num == 0 and num == 10 and num == 100`}</div>`,
    //         `<div class="code-block">${`num != 0 and num != 10 and num != 100`}</div>`,
    //         `<div class="code-block">${`not(num == 0 and num == 10 and num == 100)`}</div>`,
    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc23",
    //     `Assume that <i>r1</i>, <i>r2</i>, and <i>r3</i> are three random numbers <b>between 1 and 25</b>. Which of the following codes checks if they are all equal to <b>5</b>?`,
    //     [
    //         `<div class="code-block">${[`r1 == r2 == r3`].join("\n")}</div>`,

    //         `<div class="code-block">${[`r1 and r2 and r3 == 5`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[
    //             `r1 == r2 and r3 == 5 and r1 == r3`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[`r1 == r2 and r2 and r3 == 5`].join(
    //             "\n"
    //         )}</div>`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc24",
    //     `What will the following code display in the output? <br/> <div class="code-block">${[
    //         `msg = ""`,
    //         `num1 = 10`,
    //         `num2 = 20`,
    //         `num3 = 30`,
    //         `num4 = 40`,
    //         ``,
    //         `if num1 == 20:`,
    //         `    msg = "num1"`,
    //         `elif num2 != 10:`,
    //         `    msg = "num2"`,
    //         `elif num3 == 30:`,
    //         `    msg = "num3"`,
    //         `else:`,
    //         `    msg = "num4"`,
    //         ``,
    //         `print(msg)`,
    //     ].join("\n")}</div>`,
    //     [`num1`, `num2`, `num3`, `num4`, `I don't know.`],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc25",
    //     `Which of the following options will NEVER be displayed based on the random numbers x, y, and z? <br/> <div class="code-block">${[
    //         `import random`,
    //         `x = 10`,
    //         `y = random.randint(x, x + 10)`,
    //         `z = random.randint(y + 10, y + 20)`,
    //         ``,
    //         `if z < 20 or y > 20:`,
    //         `    print("A")`,
    //         `elif x == y:`,
    //         `    print("B")`,
    //         `else:`,
    //         `    print("C")`,
    //     ].join("\n")}</div>`,
    //     [`A`, `B`, `C`, `None of the values B or C.`, `I don't know.`],
    //     0,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc26",
    //     `Which of the following options will NEVER be displayed based on the random number? <br/> <div class="code-block">${[
    //         `import random`,
    //         `x = random.randint(1, 10)`,
    //         ``,
    //         `if x > 5:`,
    //         `    print("A")`,
    //         `else:`,
    //         `    print("B")`,
    //         `elif x < 5:`,
    //         `    print("C")`,
    //     ].join("\n")}</div>`,
    //     [`A`, `B`, `C`, `The code has an error!`, `I don't know.`],
    //     3,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc27",
    //     `What will the following code display in the output? <br/> <div class="code-block">${[
    //         `n1 = 10`,
    //         `n2 = n1`,
    //         ``,
    //         `while n1 != 15:`,
    //         `    n1 += 1`,
    //         `    n2 += 3`,
    //         `while n2 != 25:`,
    //         `    n2 += 1`,
    //         `    if n2 == 20:`,
    //         `        break`,
    //         `print(n2)`,
    //     ].join("\n")}</div>`,
    //     [`10`, `15`, `20`, `25`, `I don't know.`],
    //     3,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc28",
    //     `Which set of values for <i>num</i> will make the following code only display <b>DOWN</b> in the output? <br/> <div class="code-block">${[
    //         `import random`,
    //         `num = random.randint(1, 5)`,
    //         ``,
    //         `if num <= 2 or 4 <= num:`,
    //         `    print("UP")`,
    //         `else:`,
    //         `    print("DOWN")`,
    //     ].join("\n")}</div>`,
    //     [`[1, 5]`, `[1, 2, 4, 5]`, `[3]`, `[2, 3, 4]`, `I don't know.`],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc29",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `q = 20`,
    //         `while q > 11:`,
    //         `    q = q - 4`,
    //         `    q = q + 1`,
    //         `q = q + 2`,
    //         `print(q)`,
    //     ].join("\n")}</div>`,
    //     [`12`, `15`, `13`, `16`, `I don't know.`],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc30",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `num = 0`,
    //         ``,
    //         `for v1 in range(3):`,
    //         `    for v2 in range(5):`,
    //         `        num += 2`,
    //         `    num += 1`,
    //         ``,
    //         `print(num)`,
    //     ].join("\n")}</div>`,
    //     [`31`, `33`, `30`, `25`, `I don't know.`],
    //     1,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc31",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `import random`,
    //         `not_six = []`,
    //         `while len(not_six) != 10:`,
    //         `    num = random.randint(1, 6)`,
    //         `    if num != 6:`,
    //         `        not_six.append(num)`,
    //         `    if len(not_six) == 3:`,
    //         `        break`,
    //         `print(len(not_six))`,
    //     ].join("\n")}</div>`,
    //     [`4`, `3`, `9`, `10`, `I don't know.`],
    //     1,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc32",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `number = 0`,
    //         `for x in range(10):`,
    //         `    if x != 2:`,
    //         `        number += 2`,
    //         `    elif x > 5:`,
    //         `        number += 5`,
    //         `    else:`,
    //         `        number += 3`,
    //         `print(number)`,
    //     ].join("\n")}</div>`,
    //     [`21`, `22`, `24`, `26`, `I don't know.`],
    //     0,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc33",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `num = 0`,
    //         `while 25 < num:`,
    //         `    if num == 5:`,
    //         `        num = num + 1`,
    //         `        break`,
    //         `    elif num == 20:`,
    //         `        num = num - 3`,
    //         `        break`,
    //         `    num = num + 1`,
    //         `print(num)`,
    //     ].join("\n")}</div>`,
    //     [`6`, `17`, `0`, `1`, `I don't know.`],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc34",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `first = 100`,
    //         `second = 0`,
    //         `while first - second > 10 :`,
    //         `    first = first - 5`,
    //         `    second = second + 5`,
    //         `print("first: " + str(first) + ", second: " + str(second))`,
    //     ].join("\n")}</div>`,
    //     [
    //         `first: 50, second: 50`,
    //         `first: 0, second: 100`,
    //         `first: 45, second: 55`,
    //         `first: 55, second: 45`,
    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc35",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `print("2" + 5)`,
    //     ].join("\n")}</div>`,
    //     [`25`, `7`, `"2 + 5"`, `The code has an error.`, `I don't know.`],
    //     3,
    //     TaskTopic.basics,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc36",
    //     `Assume we have the following list of numbers called <i>items</i>, which of the following loops correctly displays the sum of the elements inside the list?<br/> <div class="code-block">${[
    //         `grades = [58, 24, 80, 100, 79, 48, 62, 91]`,
    //         `total = 0`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[
    //             `for i in range(len(grades)):`,
    //             `    total += i`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in len(grades):`,
    //             `    total += i`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in len(grades):`,
    //             `    total += grades[i]`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in range(len(grades)):`,
    //             `    total += grades[i]`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // // have to remove this task as it had the wrong answer
    // new MultipleChoiceTask(
    //     "emc37",
    //     `What does this code display at the end?<br/> <div class="code-block">${[
    //         `list_a = [3, 1, 7, 5, 9]`,
    //         `list_b = [8, 4, 3, 2, 4]`,
    //         ``,
    //         `i = 0`,
    //         `j = len(list_a) - 1`,
    //         `while i < len(list_a):`,
    //         `    list_a[i] = list_a[i] + list_a[j]`,
    //         `    i = i + 1`,
    //         `    j = j - 1`,
    //         ``,
    //         `print(list_a[2])`,
    //     ].join("\n")}</div>`,
    //     [`10`, `7`, `9`, `14`, `I don't know.`],
    //     3,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc38",
    //     `What does this code display at the end?<br/> <div class="code-block">${[
    //         `my_list = ["f", "o", "z", "q", "m"]`,
    //         `other_list = []`,
    //         ``,
    //         `i = len(my_list) - 1`,
    //         `j = 0`,
    //         ``,
    //         `while i >= 0 and j < len(my_list):`,
    //         `    other_list.append(my_list[i] + my_list[j])`,
    //         `    i = i - 1`,
    //         `    j = j + 1`,
    //         ``,
    //         `print(other_list[1])`,
    //     ].join("\n")}</div>`,
    //     [`mf`, `qo`, `zz`, `oq`, `I don't know.`],
    //     1,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc39",
    //     `Which of the following codes correctly divides each element in the given list by 2?<br/> <div class="code-block">${[
    //         `my_list = ["12", "31", "94", "50"]`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[
    //             `for i in range(len(my_list)):`,
    //             `    my_list[i] = my_list[i] / 2`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in range(len(my_list)):`,
    //             `    my_list[i] = str(int(my_list[i]) / 2)`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in len(range(my_list)):`,
    //             `    my_list[i] = int(str(my_list[i])) / 2`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for num in my_list:`,
    //             `    num = num / 2`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.arrays,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc40",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `x = 0`,
    //         `y = 0`,
    //         `for i in range(4):`,
    //         `    x += 2`,
    //         `    y += 3`,
    //         `print(x + y)`,
    //     ].join("\n")}</div>`,
    //     [`20`, `24`, `25`, `26`, `I don't know.`],
    //     0,
    //     TaskTopic.loops,
    //     TaskStage.test
    // ),

    // new MultipleChoiceTask(
    //     "emc41",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `v1 = 8`,
    //         `v2 = "+"`,
    //         `v3 = 7`,
    //         `ans = int(v1) + v2 + int(v3)`,
    //         `print(ans)`,
    //     ].join("\n")}</div>`,
    //     [`8+7`, `15`, `"8"+"7"`, `The code has an error.`, `I don't know.`],
    //     3,
    //     TaskTopic.types,
    //     TaskStage.test
    // ),

    // // conditionals
    // new AuthoringTask(
    //     "e2pa1",
    //     "Write a program that would generate two random numbers between 0 and 1000, and then only display the smaller of the two generated numbers. If they are equal, display the message “The numbers are equal”.",
    //     [["output: <b>194</b>"], ["output: <b>370</b>"]],
    //     [
    //         `import random`,
    //         `num1 = random.randint(0, 1000)`,
    //         `num2 = random.randint(0, 1000)`,
    //         ``,
    //         `if num1 < num2:`,
    //         `    print(num1)`,
    //         `elif num1 > num2:`,
    //         `    print(num2)`,
    //         `else:`,
    //         `    print("The numbers are equal")`,
    //     ].join("\n"),
    //     3 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // // conditional loops
    // new AuthoringTask(
    //     "e2pa2",
    //     "Write a program that uses a loop to repeatedly generate a random number between 0 to 10, display the generated number, and then stop when the random number becomes greater than 7. The loop should then display the count of numbers that were generated.",
    //     [
    //         [
    //             "input: <b>3</b>",
    //             "input: <b>5</b>",
    //             "input: <b>7</b>",
    //             "input: <b>1</b>",
    //             "input: <b>9</b>",
    //             "input: <b>Count: 4</b>",
    //         ],
    //     ],
    //     [
    //         `import random`,
    //         `count = 0`,
    //         ``,
    //         `num = random.randint(0, 10)`,
    //         `while num <= 7:`,
    //         `    count += 1`,
    //         `    num = random.randint(0, 10)`,
    //         `    print(num)`,
    //         `print("Count: " + str(count))`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // // for loop
    // new AuthoringTask(
    //     "e2pa3",
    //     "Write a program that displays all the numbers between 75 and 125 (including 75 and 125) using a loop.",
    //     [
    //         [
    //             "output: <b>75</b>",
    //             "output: <b>76</b>",
    //             "...",
    //             "output: <b>124</b>",
    //             "output: <b>125</b>",
    //         ],
    //     ],
    //     [`for i in range(75, 126):`, `    print(i)`].join("\n"),
    //     5 * 60,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // // conditionals
    // new AuthoringTask(
    //     "e2pa4",
    //     "Write a program that asks the user to enter two numbers between 1 and 100 called <i>num1</i> and <i>num2</i>. Then display them in each line like this: <b>first: <i>num1</i>, and second: <i>rand2</i></b>. Finally, checks if they are <b>both</b> greater than 50. If yes, display the message <b>Great Job!</b> otherwise display the message <b>Try again!</b>.",
    //     [
    //         [
    //             "output: <b>Enter a number between 1 and 100:</b>",
    //             "input: <b>37</b>",
    //             "output: <b>Enter another number between 1 and 100:</b>",
    //             "input: <b>85</b>",
    //             "output: <b>first: 37, and second: 85</b>",
    //             "output: <b>Try again!</b>",
    //         ],
    //         [
    //             "output: <b>Enter a number between 1 and 100:</b>",
    //             "input: <b>79</b>",
    //             "output: <b>Enter another number between 1 and 100:</b>",
    //             "input: <b>64</b>",
    //             "output: <b>first: 79, and second: 64</b>",
    //             "output: <b>Great Job!</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("Enter a number between 1 and 100: "))`,
    //         `num2 = int(input("Enter another number between 1 and 100: "))`,
    //         ``,
    //         `print("first: " + str(rand1) + ", and second: " + str(rand2))`,
    //         ``,
    //         `if num1 > 50 and rand2 > 50:`,
    //         `    print("Great Job!")`,
    //         `else:`,
    //         `    print("Try again!")`,
    //     ].join("\n"),
    //     4 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // // lists + loops + conditionals
    // new AuthoringTask(
    //     "e2pa5",
    //     "Write a program that uses a loop to ask the user to enter a number between 10 and 20 for 10 times. Add the numbers that are greater than 15 to a list called <i>large_numbers</i> and the ones that are less than 5 to a list called <i>small_numbers</i>. Finally, display the length of <i>large_numbers</i> and <i>small_numbers</i> only once.",
    //     [["output: <b>21</b>"]],
    //     [
    //         `large_numbers = []`,
    //         `small_numbers = []`,
    //         ``,
    //         `for i in range(10):`,
    //         `    num = int(input("Enter a number between 10 and 20: "))`,
    //         `    if num > 15:`,
    //         `        large_numbers.append(num)`,
    //         `    elif num < 5:`,
    //         `        small_numbers.append(num)`,
    //         `print(len(large_numbers))`,
    //         `print(len(small_numbers))`,
    //     ].join("\n"),
    //     6 * 60,
    //     TaskTopic.arrays,
    //     TaskStage.retention
    // ),

    // // basics + type conversion
    // new ModifyingTask(
    //     "e2pm1",
    //     "Without modifying the `print(message)` line, change the program so that it would ask the user to enter two numbers: <i>num1</i> and <i>num2</i> and then calculate the result of <i>num1</i> divided by <i>num2</i>. And change the message to display: <b><i>num1</i> divided by <i>num2</i> is: <i>division result</i></b>. <br/> <b>Note</b>: the message should include the numeric values of <b><i>num1</i> and <i>num2</i>.",
    //     [
    //         `num1 = int(input("Enter a number"))`,
    //         `message = "num1 minus ten is: " + str(num1 - 10)`,
    //         ``,
    //         `print(message)`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Enter the first number:</b>",
    //             "input: <b>2</b>",
    //             "output: <b>Enter the second number:</b>",
    //             "input: <b>3</b>",
    //             "output: <b>Enter the third number:</b>",
    //             "input: <b>7</b>",
    //             "output: <b>2 times 3 times 7 is: 42</b>",
    //         ],
    //     ],
    //     [
    //         `num1 = int(input("Enter the first number"))`,
    //         `num2 = int(input("Enter the second number"))`,
    //         ``,
    //         `message = str(num1) + " divided by " + str(num2) + " is: " + str(num1 / num2)`,
    //         ``,
    //         `print(message)`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.types,
    //     TaskStage.retention
    // ),

    // // conditionals
    // new ModifyingTask(
    //     "e2pm2",
    //     "Modify the given program so that when the rating is 10, <i>user_rating</i> becomes <b>loved</b>, when it is between 7 and 9 <i>user_rating</i> becomes <b>liked</b>, when it is between 4 and 6 <i>user_rating</i> becomes <b>was bored</b>, and when it is between 1 to 3 <i>user_rating</i> becomes <b>didn't like</b>, and finally if it is equal to 0 <i>user_rating</i> becomes <b>hated</b>.",
    //     [
    //         `rating = int(input("on a scale of 0 to 10, how much did you like Lord of the Rings?"))`,
    //         `user_rating = ""`,
    //         ``,
    //         `if rating > 6:`,
    //         `    user_rating = "enjoyed"`,
    //         `elif rating < 4:`,
    //         `    user_rating = "didn't enjoy"`,
    //         ``,
    //         `print("The user: " + user_rating + " watching Lord of the Rings!")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>on a scale of 0 to 10, how much did you like Lord of the Rings?</b>",
    //             "input: <b>8</b>",
    //             "output: <b>The user liked watching Lord of the Rings!</b>",
    //         ],
    //         [
    //             "output: <b>on a scale of 0 to 10, how much did you like Lord of the Rings?</b>",
    //             "input: <b>3</b>",
    //             "output: <b>The user hated watching Lord of the Rings!</b>",
    //         ],
    //     ],
    //     [
    //         `rating = int(input("on a scale of 0 to 10, how much did you like Lord of the Rings?"))`,
    //         `user_rating = ""`,
    //         ``,
    //         `if rating == 10:`,
    //         `    user_rating = "loved"`,
    //         `elif rating == 0:`,
    //         `    user_rating = "hated"`,
    //         `elif rating >= 7:`,
    //         `    user_rating = "liked"`,
    //         `elif rating >= 4:`,
    //         `    user_rating = "was bored"`,
    //         `else:`,
    //         `    user_rating = "didn't like"`,
    //         ``,
    //         `print("The user: " + user_rating + " watching Lord of the Rings!")`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // // while loop + conditionals
    // new ModifyingTask(
    //     "e2pm3",
    //     "Modify the given program so that it would count the number of attempts that were too high in a variable called <i>count_high</i>, and count the number of attempts that were too low in a variable called <i>count_low</i>. Then at the end, display them individually, only once.",
    //     [
    //         `import random`,
    //         `password = random.randint(1, 999)`,
    //         ``,
    //         `while True:`,
    //         `    num = int(input("Guess the number: "))`,
    //         `    if num == password:`,
    //         `        print("You guessed the number!")`,
    //         `        break`,
    //         `    elif num > password:`,
    //         `        print("Too high!")`,
    //         `    else:`,
    //         `        print("Too low!")`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>Guess the number: </b>",
    //             "input: <b>500</b>",
    //             "output: <b>Too high!</b>",
    //             "output: <b>Guess the number: </b>",
    //             "input: <b>250</b>",
    //             "output: <b>Too low!</b>",
    //             "output: <b>Guess the number: </b>",
    //             "input: <b>375</b>",
    //             "output: <b>Too low!</b>",
    //             "output: <b>Guess the number: </b>",
    //             "input: <b>400</b>",
    //             "output: <b>You guessed the number!</b>",
    //             "output: <b>Lower attempts: 2</b>",
    //             "output: <b>Higher attempts: 1</b>",
    //         ],
    //     ],
    //     [
    //         `import random`,
    //         `password = random.randint(1, 999)`,
    //         `count_low = 0`,
    //         `count_high = 0`,
    //         ``,
    //         `while True:`,
    //         `    num = int(input("Guess the number: "))`,
    //         `    if num == password:`,
    //         `        print("You guessed the number!")`,
    //         `        break`,
    //         `    elif num > password:`,
    //         `        print("Too high!")`,
    //         `        count_high += 1`,
    //         `    else:`,
    //         `        print("Too low!")`,
    //         `        count_low += 1`,
    //         ``,
    //         `print("Lower attempts: " + str(count_low))`,
    //         `print("Higher attempts: " + str(count_high))`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // // for loops + conditionals
    // new ModifyingTask(
    //     "e2pm4",
    //     "Modify the given program so that it would ask the user to enter another number (greater than the first one). Then, the loop should go over all the numbers from the first number to the second number (including the second number). Then, it should calculate the sum of all numbers AND the sum of all odd numbers in that range. Finally, display the sum of all numbers AND the sum of all odd numbers.",
    //     [
    //         `x = int(input("Enter a number: "))`,
    //         `t = 0`,
    //         `for v in range(x):`,
    //         `    if v % 2 == 0:`,
    //         `       t += v`,
    //         `print("t is: " + str(t))`,
    //     ].join("\n"),
    //     [
    //         [
    //             "output: <b>enter a number:</b>",
    //             "input: <b>20</b>",
    //             "output: <b>enter a bigger numbber:</b>",
    //             "input: <b>35</b>",
    //             `output: <b>Total is: 440</b>`,
    //             `output: <b>Total odd is: 224</b>`,
    //         ],
    //     ],
    //     [
    //         `x = int(input("Enter a number: "))`,
    //         `y = int(input("Enter a bigger number: "))`,
    //         `t = 0`,
    //         `t2 = 0`,
    //         `for v in range(x, y + 1):`,
    //         `    t += v`,
    //         `    if v % 2 == 1:`,
    //         `       t2 += v`,
    //         `print("Total is: " + str(t))`,
    //         `print("Total odd is: " + str(t2))`,
    //     ].join("\n"),
    //     5 * 60,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // // for loop + lists + conditionals
    // new ModifyingTask(
    //     "e2pm5",
    //     "The <i>daily_toronto_weather</i> and <i>daily_ottawa_weather</i> lists include all the temperatures of these two cities in the last 100 days. Modify the given program by adding two other lists called <i>extreme_temperatures</i>, and <i>normal_temperatures</i>. When in a single day, <i>daily_toronto_weather</i> and <i>daily_ottawa_weather</i> both have temperatures above 90, then add that temperature to the <i>extreme_temperatures</i> list. Otherwise, add that day's temperature to the <i>normal_temperatures</i> list. Finally, just display the length of both lists.<br/> <b>Note:</b> Do not touch the first for loop.",
    //     [
    //         `import random`,
    //         ``,
    //         `daily_toronto_weather = []`,
    //         `daily_ottawa_weather = []`,
    //         ``,
    //         `for i in range(100):`,
    //         `    t = random.randint(0, 80)`,
    //         `    daily_toronto_weather.append(t + random.randint(0, 20))`,
    //         `    daily_ottawa_weather.append(t + random.randint(0, 20))`,
    //         ``,
    //         `for i in range(100):`,
    //         `    print(daily_toronto_weather[i])`,
    //         `    print(daily_ottawa_weather[i])`,
    //     ].join("\n"),
    //     [
    //         ["output: <b>extreme days: 8, normal days: 92</b>"],
    //         ["output: <b>extreme days: 14, normal days: 86</b>"],
    //     ],
    //     [
    //         `import random`,
    //         ``,
    //         `daily_toronto_weather = []`,
    //         `daily_ottawa_weather = []`,
    //         ``,
    //         `for i in range(100):`,
    //         `    t = random.randint(0, 80)`,
    //         `    daily_toronto_weather.append(t + random.randint(0, 20))`,
    //         `    daily_ottawa_weather.append(t + random.randint(0, 20))`,
    //         ``,
    //         `extreme_temperatures = []`,
    //         `normal_temperatures = []`,
    //         ``,
    //         `for i in range(100):`,
    //         `    if daily_toronto_weather[i] > 90 and daily_ottawa_weather[i] > 90:`,
    //         `        extreme_temperatures.append(temp)`,
    //         `    else:`,
    //         `        normal_temperatures.append(temp)`,
    //         ``,
    //         `print("extreme days: " + str(len(extreme_temperatures)))`,
    //         `print("normal days: " + str(len(normal_temperatures)))`,
    //     ].join("\n"),
    //     6 * 60,
    //     TaskTopic.arrays,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc1",
    //     `What values for <i>season</i> and <i>hour</i> will make the following expression become <b>True</b>? <br/> <div class="code-block">${[
    //         `hour > 9 and ((season == "summer" and hour < 21) or (summer == "winter" and hour < 23))`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[`season = "winter"`, `hour = 7`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`season = "summer"`, `hour = 20`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`season = "winter"`, `hour = 23`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`season = "summer"`, `hour = 9`].join(
    //             "\n"
    //         )}</div>`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc2",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `number1 = "5"`,
    //         `number2 = 5`,
    //         `print(int(number1) + number2)`,
    //     ].join("\n")}</div>`,
    //     [`55`, `10`, `"5"5`, `The code has an error.`, `I don't know.`],
    //     1,
    //     TaskTopic.types,
    //     TaskStage.retention
    // ),

    // // new MultipleChoiceTask(
    // //     "e2mc3",
    // //     `Which of the following options will NEVER be displayed based on the random number? <br/> <div class="code-block">${[
    // //         `import random`,
    // //         `X = random.randint(1, 10)`,
    // //         ``,
    // //         `if X >= 5:`,
    // //         `    print("A")`,
    // //         `elif X != 5:`,
    // //         `    print("B")`,
    // //         `else:`,
    // //         `    print("C")`,
    // //     ].join("\n")}</div>`,
    // //     [`A`, `B`, `C`, `None of the values A or B.`, `I don't know.`]
    // //     // solution: 2
    // //     // removed question
    // // ),

    // new MultipleChoiceTask(
    //     "e2mc4",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `v1 = 23`,
    //         `v2 = "+"`,
    //         `v3 = 7`,
    //         `ans = (v1 + v2 + v3)`,
    //         `print(ans)`,
    //     ].join("\n")}</div>`,
    //     [`23+7`, `30`, `"23"+"7"`, `The code has an error.`, `I don't know.`],
    //     3,
    //     TaskTopic.types,
    //     TaskStage.retention
    //     // solution: 3
    // ),

    // new MultipleChoiceTask(
    //     "e2mc5",
    //     `Assuming we have the following code: <br/> <div class="code-block">${[
    //         `n1 = int(input("enter a number: "))`,
    //         `n2 = input("enter another number: ")`,
    //         `n3 = "20"`,
    //     ].join(
    //         "\n"
    //     )}</div> <br/>Which of the following options is INCORRECT and throws an error?`,
    //     [
    //         `<div class="code-block">${`print(int(n1) + n2 + n3)`})}</div>`,
    //         `<div class="code-block">${`print(n1 + int(n2) + int(n3))`})}</div>`,
    //         `<div class="code-block">${`print(str(n1) + n2 + str(n3))`})}</div>`,
    //         `None of them! (They are all correct)`,

    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.types,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc6",
    //     `What does this code display at the end?<br/> <div class="code-block">${[
    //         `var = []`,
    //         `var.append(2)`,
    //         `var.append(var[0] + 4)`,
    //         `var.append(var[1] + 6)`,
    //         `var.append(var[2] + 8)`,
    //         `var.append(var[3] + var[2])`,
    //         `print(var[4])`,
    //     ].join("\n")}</div>`,
    //     [`32`, `28`, `40`, `The code has an error`, `I don't know.`],
    //     0,
    //     TaskTopic.arrays,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc7",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `likes = 20`,
    //         `if likes > 25:`,
    //         `   likes += 10`,
    //         `elif likes >= 20:`,
    //         `   likes = likes - 10`,
    //         `elif likes == 20:`,
    //         `   likes += 5`,
    //         `if likes > 30:`,
    //         `   likes = likes - 5`,
    //         `print(likes)`,
    //     ].join("\n")}</div>`,
    //     [`25`, `10`, `15`, `30`, `I don't know.`],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc8",
    //     `Assuming we have the following code, which of the following print statements is correct and does NOT throw an error? <br/> <div class="code-block">${[
    //         `five = 5`,
    //         `three = "three"`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${`print(str(five) + three)`}</div>`,
    //         `<div class="code-block">${`print(three + int(five))`}</div>`,
    //         `<div class="code-block">${`print(five + int(three))`}</div>`,
    //         `None of them! (They all throw an error)`,

    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.types,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc9",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `print("2" + str(5) - "5")`,
    //     ].join("\n")}</div>`,
    //     [`2`, `25-5`, `"2"`, `The code has an error.`, `I don't know.`],
    //     3,
    //     TaskTopic.types,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc10",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `number1 = "10"`,
    //         `number2 = 20`,
    //         `number3 = str(number2) + number1`,
    //         `print(int(number1) + number2 + int(number3))`,
    //     ].join("\n")}</div>`,
    //     [`2040`, `3030`, `"10"40`, `The code has an error.`, `I don't know.`],
    //     0,
    //     TaskTopic.types,
    //     TaskStage.retention
    //     // solution: 0
    // ),

    // new MultipleChoiceTask(
    //     "e2mc11",
    //     `From the following options, which one is correct and does not throw an error?`,
    //     [
    //         `<div class="code-block">${[
    //             `lucky_number = input(int("what's your lucky number?"))`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `lucky_number = input("what's your lucky number?", 8)`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `lucky_number = int(print("what's your lucky number?"))`,
    //         ].join("\n")}</div>`,

    //         `None of them! (They all throw an error)`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.basics,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc12",
    //     `Assuming we have the following code: <br/> <div class="code-block">${[
    //         `import random`,
    //         `gen = random.randint(1, 10)`,
    //     ].join(
    //         "\n"
    //     )}</div> <br/> Which of the following codes displays the message when <i>gen</i> is greater than or equal to 5?`,
    //     [
    //         `<div class="code-block">${[
    //             `if gen > 5 or gen = 5:`,
    //             `    print("gen is greater than or equal to 5")`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `if gen is => 5:`,
    //             `    print("gen is greater than or equal to 5")`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `if gen >= 5 or gen == 5:`,
    //             `    print("gen is greater than or equal to 5")`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `if gen => 5:`,
    //             `    print("gen is greater than or equal to 5")`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc13",
    //     `What will this program display in the output? <div class="code-block">${[
    //         `A = 2`,
    //         `Q = 4`,
    //         ``,
    //         `if A <= 2:`,
    //         `    A = A + 2`,
    //         ``,
    //         `    if Q != A:`,
    //         `        Q = A - 3`,
    //         `    elif Q == A:`,
    //         `        Q = A * 2`,
    //         `    else:`,
    //         `        Q = A + 3`,
    //         `else:`,
    //         `    Q = A * 2`,
    //         `print(Q)`,
    //     ].join("\n")}</div>`,
    //     [`4`, `6`, `7`, `8`, `I don't know.`],
    //     3,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc14",
    //     `What value for <i>x</i> will make the following code display the message <b>True</b>? <br/> <div class="code-block">${[
    //         `if 5 < x or x <= 3:`,
    //         `    print("False")`,
    //         `else:`,
    //         `    print("True")`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[`x = 3`].join("\n")}</div>`,

    //         `<div class="code-block">${[`x = 5`].join("\n")}</div>`,

    //         `<div class="code-block">${[`x = 6`].join("\n")}</div>`,

    //         `None of the values above will make the code display the message <b>True</b>.`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc15",
    //     `Assuming we have the following code and the user enters two numbers when it asks them: <br/> <div class="code-block">${[
    //         `import random`,
    //         `user1 = input("enter a number between 1 and 10: ")`,
    //         `print("first entered: " + user1)`,
    //         `user2 = int(input("enter a number between 1 and 10: "))`,
    //         `print("second entered: " + user2)`,
    //         `computer = random.randint(1, 10)`,
    //         ``,
    //         `if computer > int(user1) and computer < user2:`,
    //         `    print("Between the two numbers")`,
    //     ].join(
    //         "\n"
    //     )}</div> <br/> However, it will not run correctly. Which of the following will fix the code?`,
    //     [
    //         `<div class="code-block">${`print("first entered: " + str(user1))`}</div>`,
    //         `<div class="code-block">${`computer > int(user1) and computer < int(user2)`}</div>`,
    //         `<div class="code-block">${`print("second entered: " + str(user2))`}</div>`,
    //         `<div class="code-block">${`computer = str(random.randint(1, 10))`}</div>`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc16",
    //     `What does the following code display at the end?<br/> <div class="code-block">${[
    //         `even_nums = [0, 2, 4, 6]`,
    //         `length = len(even_nums)`,
    //         `i = 1`,
    //         `while i < length - 1:`,
    //         `    even_nums.append(even_nums[i] + even_nums[i + 1])`,
    //         `    i = i + 1`,

    //         `print(even_nums[len(even_nums) - 1])`,
    //     ].join("\n")}</div>`,
    //     [`6`, `8`, `10`, `4`, `I don't know.`],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc17",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `i = 0`,
    //         `j = 0`,
    //         ``,
    //         `while i + j >= 0:`,
    //         `    i = i + 5`,
    //         `    if i == 30:`,
    //         `        i = i - 5`,
    //         `    elif i == 25:`,
    //         `        i = i - 5`,
    //         `    elif i == 20:`,
    //         `        i = i - 5`,
    //         `        break`,
    //         `    j = j + 2`,
    //         `print(j)`,
    //     ].join("\n")}</div>`,
    //     [`0`, `2`, `4`, `6`, `I don't know.`],
    //     3,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc18",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `T = "T"`,
    //         `W = "W" + T`,
    //         `T = T + W`,
    //         `W = "WT" + W + "W"`,
    //         `print(W + T)`,
    //     ].join("\n")}</div>`,
    //     [`WTWTWTWT`, `TWTWTWTW`, `TTWTWT`, `TWTWW`, `I don't know.`],
    //     0,
    //     TaskTopic.basics,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc19",
    //     `Assume that <i>r1</i>, <i>r2</i>, and <i>r3</i> are three random numbers <b>between 1 and 10</b>. Which of the following codes checks if none of them are equal to <b>5</b>?`,
    //     [
    //         `<div class="code-block">${[`r1 != r2 != r3`].join("\n")}</div>`,

    //         `<div class="code-block">${[`r1 != 5 and r2 != 5 and r3 != 5`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`r1 != 5 or r2 != 5 or r3 != 5`].join(
    //             "\n"
    //         )}</div>`,

    //         `<div class="code-block">${[`r1 and r2 and r3 != 5`].join(
    //             "\n"
    //         )}</div>`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc20",
    //     `Which of the following options will NEVER be displayed based on the random numbers x, y, and z? <br/> <div class="code-block">${[
    //         `import random`,
    //         `x = random.randint(50, 100)`, // 50 - 100
    //         `y = random.randint(x + 100, x + 150)`, // 150 - 250
    //         ``,
    //         `if y < x:`,
    //         `    print("A")`,
    //         `elif x == y:`,
    //         `    print("B")`,
    //         `else:`,
    //         `    print("C")`,
    //     ].join("\n")}</div>`,
    //     [`A`, `B`, `C`, `None of the values A or B.`, `I don't know.`],
    //     3,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc21",
    //     `What is the output of the following Python code? <br/><div class="code-block">${[
    //         `x = 25`,
    //         `y = 75`,
    //         `print("x" + "y")`,
    //     ].join("\n")}</div>`,
    //     [`x + y`, `100`, `xy`, `The code has an error.`, `I don't know.`],
    //     3,
    //     TaskTopic.basics,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc22",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `me = 100`,
    //         `you = 0`,
    //         `while me + 10 > you - 10 :`,
    //         `    me = me - 10`,
    //         `    you = you + 10`,
    //         `print("me: " + str(me) + ", you: " + str(you))`,
    //     ].join("\n")}</div>`,
    //     [
    //         `me: 40, you: 60`,
    //         `me: 50, you: 50`,
    //         `me: 60, you: 40`,
    //         `me: 0, you: 100`,
    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc23",
    //     `We want the following while loop to STOP when <i>x</i> is equal to one of the following values: <b>1</b> or <b>2</b> or <b>3</b>. Which of the following conditions will do this?<br/> <div class="code-block">${[
    //         `x = int(input("Enter a number: "))`,
    //         `s = 0`,
    //         `while (CONDITION):`,
    //         `    s = s + x`,
    //         `    x = int(input("Enter a number: "))`,
    //         `print(s)`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${`x == 1 and x == 2 and x == 3`}</div>`,
    //         `<div class="code-block">${`x != 1 or x != 2 or x != 3`}</div>`,
    //         `<div class="code-block">${`x != 1 and x != 2 and x != 3`}</div>`,
    //         `<div class="code-block">${`x == 1 or x == 2 or x == 3)`}</div>`,
    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc24",
    //     `What will the following program display in the output when it runs? <br/> <div class="code-block">${[
    //         `number = 50`,
    //         `if number < 50:`,
    //         `    number = number + 10`,
    //         `elif number > 50:`,
    //         `    number = number - 10`,
    //         `else:`,
    //         `    number += 0`,
    //         `if number > 50:`,
    //         `    number = number - 25`,
    //         `else:`,
    //         `    number = number + 25`,
    //         `print(number)`,
    //     ].join("\n")}</div>`,
    //     [`75`, `65`, `35`, `25`, `I don't know.`],
    //     0,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),
    // new MultipleChoiceTask(
    //     "e2mc25",
    //     `What will the following code display in the output? <br/> <div class="code-block">${[
    //         `msg = ""`,
    //         `number = 50`,
    //         ``,
    //         `if number != 50:`,
    //         `    msg = "one"`,
    //         `    number = 50`,
    //         `elif number == 100:`,
    //         `    msg = "two"`,
    //         `    number = 100`,
    //         `if number >= 100:`,
    //         `    msg = "three"`,
    //         `    number = 150`,
    //         `else:`,
    //         `    msg = "four"`,
    //         `    number = 200`,
    //         ``,
    //         `print(msg)`,
    //     ].join("\n")}</div>`,
    //     [`four`, `three`, `two`, `one`, `I don't know.`],
    //     0,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // // removed: wrong answer
    // // new MultipleChoiceTask(
    // //     "e2mc26",
    // //     `Which of the following codes correctly calculates the sum of every other element in a given list? (the first, the third, the fifth, etc.)`,
    // //     [
    // //         `<div class="code-block">${[
    // //             `total = 0`,
    // //             `for value in range(numbers):`,
    // //             `    if value % 2 == 1:`,
    // //             `        total += numbers[value]`,
    // //             `print(total)`,
    // //         ].join("\n")}</div>`,

    // //         `<div class="code-block">${[
    // //             `total = 0`,
    // //             `for var in range(len(numbers)):`,
    // //             `    if var % 2 == 1:`,
    // //             `        total += var`,
    // //             `print(total)`,
    // //         ].join("\n")}</div>`,

    // //         `<div class="code-block">${[
    // //             `total = 0`,
    // //             `counter = 0`,
    // //             `while counter < len(numbers):`,
    // //             `    if counter % 2 == 0:`,
    // //             `        total += counter`,
    // //             `print(total)`,
    // //         ].join("\n")}</div>`,

    // //         `<div class="code-block">${[
    // //             `total = 0`,
    // //             `counter = 0`,
    // //             `while counter < len(numbers):`,
    // //             `    if counter % 2 == 0:`,
    // //             `        total += numbers[counter]`,
    // //             `print(total)`,
    // //         ].join("\n")}</div>`,

    // //         `I don't know.`,
    // //     ],
    // //     3,
    // //     TaskTopic.arrays,
    // //     TaskStage.retention
    // // ),

    // new MultipleChoiceTask(
    //     "e2mc27",
    //     `What will the following code display in the output? <br/> <div class="code-block">${[
    //         `C = 5`,
    //         `Y = 0`,
    //         ``,
    //         `while C != 15:`,
    //         `    C += 1`,
    //         `    Y += 5`,
    //         ``,
    //         `while Y != 30:`,
    //         `    Y -= 1`,
    //         `    if Y == 25:`,
    //         `        break`,
    //         `    if Y == 40:`,
    //         `        Y = Y - 10`,
    //         ``,
    //         `print(Y)`,
    //     ].join("\n")}</div>`,
    //     [`25`, `30`, `40`, `50`, `I don't know.`],
    //     1,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc28",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `count = 0`,
    //         ``,
    //         `for num1 in range(3):`,
    //         `    for num2 in range(5):`,
    //         `        count += 10`,
    //         `    count += 5`,
    //         ``,
    //         `print(count)`,
    //     ].join("\n")}</div>`,
    //     [`155`, `55`, `65`, `165`, `I don't know.`],
    //     3,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc29",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `import random`,
    //         `even_numbers = []`,
    //         `while len(even_numbers) != 9:`,
    //         `    num = random.randint(1, 10)`,
    //         ``,
    //         `    if num % 2 != 1:`,
    //         `        even_numbers.append(num)`,
    //         `    elif len(even_numbers) == 6:`,
    //         `        break`,
    //         `    if len(even_numbers) == 3:`,
    //         `        break`,
    //         `print(len(even_numbers))`,
    //     ].join("\n")}</div>`,
    //     [`3`, `6`, `9`, `10`, `I don't know.`],
    //     0,
    //     TaskTopic.arrays,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc30",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `counter = 0`,
    //         `for X in range(10):`,
    //         `    if X != 4:`,
    //         `        counter += 10`,
    //         `    elif X > 5:`,
    //         `        counter += 5`,
    //         `    else:`,
    //         `        counter = 10`,
    //         `print(counter)`,
    //     ].join("\n")}</div>`,
    //     [`40`, `50`, `60`, `70`, `I don't know.`],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc31",
    //     `What is the output of the following Python code? <br/> <div class="code-block">${[
    //         `a = 10`,
    //         `a += 3`,
    //         `a -= 8`,
    //         `a += (a + 2)`,
    //         `a += a`,
    //         `print(a)`,
    //     ].join("\n")}</div>`,
    //     [`10a`, `10`, `24a`, `24`, `I don't know.`],
    //     3,
    //     TaskTopic.basics,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc32",
    //     `Which of the following python codes correctly asks the user what day is today?
    //     `,
    //     [
    //         `<div class="code-block">${`day = print("What day is today?") + input("Friday")`}</div>`,
    //         `<div class="code-block">${`day = print("Today is: " + input("Friday"))`}</div>`,
    //         `<div class="code-block">${`day = input(print("What day is today?"))`}</div>`,
    //         `<div class="code-block">${`day = ("Today is: ") + (input("What day is today?"))`}</div>`,

    //         `I don't know.`,
    //     ],
    //     3,
    //     TaskTopic.basics,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc33",
    //     `Which of the following codes correctly multiplies each element in the given list by 10?<br/> <div class="code-block">${[
    //         `values = ["182", "671", "944", "510", "851", "313"]`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[
    //             `for i in int(range(len(values))):`,
    //             `    values[i] = str(values[i] * 10)`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in range(len(values)):`,
    //             `    values[i] = str(int(values[i]) * 10)`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in len(range(values)):`,
    //             `    values[i] = int(str(values[i])) * 10`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for num in int(values):`,
    //             `    num = num * 10`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.arrays,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc34",
    //     `Assume we have the following list of numbers called <i>grades</i>, which of the following loops correctly displays the sum of the elements inside the list?<br/> <div class="code-block">${[
    //         `numbers_list = [58, 24, 80, 100, 79, 48, 62, 91]`,
    //         `total = 0`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${[
    //             `for loop_var in len(range(numbers_list)):`,
    //             `    total += numbers_list[loop_var]`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in numbers_list:`,
    //             `    total += i`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for i in numbers_list:`,
    //             `    total += numbers_list[i]`,
    //         ].join("\n")}</div>`,

    //         `<div class="code-block">${[
    //             `for loop_var in range(len(numbers_list)):`,
    //             `    total += loop_var`,
    //         ].join("\n")}</div>`,

    //         `I don't know.`,
    //     ],
    //     1,
    //     TaskTopic.arrays,
    //     TaskStage.retention
    // ),

    // // new MultipleChoiceTask(
    // //     "e2mc35",
    // //     `What does this code display at the end?<br/> <div class="code-block">${[
    // //         `first_list = [3, 1, 7, 5, 9]`,
    // //         `second_list = [8, 4, 3, 2, 4]`,
    // //         `third_list = [0, 0, 0, 0, 0]`,
    // //         ``,
    // //         `i = len(first_list) - 1`,
    // //         `j = 0`,
    // //         `while i < len(first_list):`,
    // //         `    third_list[i] = first_list[i] + second_list[j]`,
    // //         `    i = i - 1`,
    // //         `    j = j + 1`,
    // //         ``,
    // //         `print(third_list[1])`,
    // //     ].join("\n")}</div>`,
    // //     [`3`, `10`, `9`, `17`, `I don't know.`],
    // //     0,
    // //     TaskTopic.arrays,
    // //     TaskStage.retention
    // //     // removed task as it had a bug
    // // ),

    // new MultipleChoiceTask(
    //     "e2mc36",
    //     `Which set of values for <i>rand</i> will make the following code only display <b>False</b> in the output? <br/> <div class="code-block">${[
    //         `import random`,
    //         `rand = random.randint(50, 100)`,
    //         ``,
    //         `if rand % 2 == 0:`,
    //         `    print("True")`,
    //         `elif rand < 20 or rand > 80:`,
    //         `    print("False")`,
    //         `elif rand < 40 or rand > 60:`,
    //         `    print("True")`,
    //         `elif rand > 45 and rand < 55:`,
    //         `    print("False")`,
    //     ].join("\n")}</div>`,
    //     [
    //         `[7, 89, 53, 47]`,
    //         `[10, 90]`,
    //         `[15, 85, 50]`,
    //         `[1, 99, 46, 52]`,
    //         `I don't know.`,
    //     ],
    //     0,
    //     TaskTopic.conditionals,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc37",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `first = 10`,
    //         `second = 10`,
    //         `for i in range(6):`,
    //         `    first += 4`,
    //         `    second += 6`,
    //         `print(first + second)`,
    //     ].join("\n")}</div>`,
    //     [`60`, `70`, `80`, `90`, `I don't know.`],
    //     2,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc38",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `num = 5`,
    //         `while num >= 10:`,
    //         `    if num == 5:`,
    //         `        num = num + 1`,
    //         `        break`,
    //         `    elif num == 10:`,
    //         `        num = num - 2`,
    //         `        break`,
    //         `    num = num + 2`,
    //         `num += 5`,
    //         `print(num)`,
    //     ].join("\n")}</div>`,
    //     [`5`, `6`, `11`, `10`, `I don't know.`],
    //     3,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc39",
    //     `Which one of the following options displays the message: <b>january-february-march</b>? <br/> <div class="code-block">${[
    //         `m1 = "january"`,
    //         `m2 = "february"`,
    //         `m3 = "march"`,
    //     ].join("\n")}</div>`,
    //     [
    //         `<div class="code-block">${`print(m1-m2-m3)`}</div>`,
    //         `<div class="code-block">${`print("m1-m2-m3")`}</div>`,
    //         `<div class="code-block">${`print((m1) + "-" + (m2) + "-" + (m3))`}</div>`,
    //         `<div class="code-block">${`print(m1 "-" m2 "-" m3)`}</div>`,

    //         `I don't know.`,
    //     ],
    //     2,
    //     TaskTopic.basics,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc40",
    //     `What will the following program display at the end? <br/> <div class="code-block">${[
    //         `R = 45`,
    //         `while R > 23:`,
    //         `    R = R - 7`,
    //         `    R = R + 2`,
    //         `R = R + 4`,
    //         `print(R)`,
    //     ].join("\n")}</div>`,
    //     [`23`, `24`, `28`, `27`, `I don't know.`],
    //     1,
    //     TaskTopic.loops,
    //     TaskStage.retention
    // ),

    // new MultipleChoiceTask(
    //     "e2mc41",
    //     `What does this code display at the end?<br/> <div class="code-block">${[
    //         `letters = ["M", "A", "H", "T", "G"]`,
    //         `other_list = ["", "", "", "", ""]`,
    //         ``,
    //         `i = len(letters) - 1`,
    //         `j = 0`,
    //         ``,
    //         `while i >= 0 and j < len(letters):`,
    //         `    other_list[j] = letters[i] + letters[j]`,
    //         `    i = i - 1`,
    //         `    j = j + 1`,
    //         ``,
    //         `print(other_list[1])`,
    //     ].join("\n")}</div>`,
    //     [`MG`, `HH`, `TA`, `GM`, `I don't know.`],
    //     2,
    //     TaskTopic.arrays,
    //     TaskStage.retention
    // ),
];

export const getNextTask = (completedTasks: IUserTask[]): Task | null => {
    for (let i = 0; i < CodingTasks.length; i++) {
        if (!completedTasks.find((t) => t.taskId === CodingTasks[i].id)) {
            return CodingTasks[i];
        }
    }

    return null;

    // if the last task was an authoring task and they did it correctly, the starting code for it should be the final code that they submitted.
    // if (completedTasks === undefined || completedTasks.length === 0)
    //     return CodingTasksNew[0];

    // const lastCompletedTaskId =
    //     completedTasks[completedTasks.length - 1].taskId;
    // const lastCompletedTaskIndex = CodingTasksNew.findIndex(
    //     (task) => task.id === lastCompletedTaskId
    // );

    // const nextTask = CodingTasksNew[lastCompletedTaskIndex + 1];

    // const prevTask = completedTasks[completedTasks.length - 1];

    // if (
    //     nextTask instanceof ModifyingTask &&
    //     getTaskFromTaskId(prevTask.taskId)?.type === TaskType.Authoring &&
    //     prevTask.passed
    // ) {
    //     nextTask.starterCode =
    //         prevTask.submissions[prevTask.submissions.length - 1].code;
    // }

    // return nextTask;
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
