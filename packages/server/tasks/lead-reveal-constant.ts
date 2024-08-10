export const warmupDecomposition = {
    "subgoals": [
      {
        "title": "Function Definition",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should be the input parameter type for our function?",
                "correct-choice": "List",
                "incorrect-choice-1": "Integer",
                "incorrect-choice-2": "String",
                "incorrect-choice-3": "Dictionary"
              },
              {
                "mcq-question": "What should be the return type of our function?",
                "correct-choice": "List",
                "incorrect-choice-1": "Integer",
                "incorrect-choice-2": "String",
                "incorrect-choice-3": "None"
              }
            ],
            "code-lines-to-be-revealed": [1]
          }
        ]
      },
      {
        "title": "Initialize Temporary Stack",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What data structure should we use to temporarily store the items?",
                "correct-choice": "List",
                "incorrect-choice-1": "Tuple",
                "incorrect-choice-2": "Dictionary",
                "incorrect-choice-3": "Set"
              }
            ],
            "code-lines-to-be-revealed": [2]
          }
        ]
      },
      {
        "title": "Reverse Items",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What operation should we use to remove the last item from the list?",
                "correct-choice": "pop",
                "incorrect-choice-1": "remove",
                "incorrect-choice-2": "del",
                "incorrect-choice-3": "clear"
              },
              {
                "mcq-question": "How should we add the popped item to the temporary list?",
                "correct-choice": "append",
                "incorrect-choice-1": "insert",
                "incorrect-choice-2": "extend",
                "incorrect-choice-3": "add"
              }
            ],
            "code-lines-to-be-revealed": [3]
          }
        ]
      },
      {
        "title": "Return Reversed List",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should we return at the end of the function?",
                "correct-choice": "The temporary list",
                "incorrect-choice-1": "The original list",
                "incorrect-choice-2": "The length of the temporary list",
                "incorrect-choice-3": "None"
              }
            ],
            "code-lines-to-be-revealed": [4]
          }
        ]
      }
    ]
  };

export const task1Decomposition = {
    "subgoals": [
      {
        "title": "Function Definition",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What is the appropriate data type for the input of the function?",
                "correct-choice": "List of integers",
                "incorrect-choice-1": "List of strings",
                "incorrect-choice-2": "Integer",
                "incorrect-choice-3": "String"
              }
            ],
            "code-lines-to-be-revealed": [1]
          }
        ]
      },
      {
        "title": "Initialize Stack",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What data structure is suitable for storing the indices of the days?",
                "correct-choice": "Stack (List)",
                "incorrect-choice-1": "Queue",
                "incorrect-choice-2": "Dictionary",
                "incorrect-choice-3": "Set"
              }
            ],
            "code-lines-to-be-revealed": [2]
          }
        ]
      },
      {
        "title": "Initialize Span List",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should be the initial value of the span for each day?",
                "correct-choice": "0",
                "incorrect-choice-1": "1",
                "incorrect-choice-2": "The price of the stock on that day",
                "incorrect-choice-3": "The index of the day"
              }
            ],
            "code-lines-to-be-revealed": [3]
          }
        ]
      },
      {
        "title": "Iterate Over Prices",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "How many times should we iterate over the prices?",
                "correct-choice": "The number of days (length of prices)",
                "incorrect-choice-1": "The number of days minus 1",
                "incorrect-choice-2": "The maximum price",
                "incorrect-choice-3": "The minimum price"
              }
            ],
            "code-lines-to-be-revealed": [4]
          }
        ]
      },
      {
        "title": "Remove Lower Prices",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "When should we remove a day from the stack?",
                "correct-choice": "When the price on that day is less than or equal to the current price",
                "incorrect-choice-1": "When the price on that day is greater than the current price",
                "incorrect-choice-2": "When the price on that day is equal to the current price",
                "incorrect-choice-3": "When the price on that day is less than the current price"
              }
            ],
            "code-lines-to-be-revealed": [5, 6]
          }
        ]
      },
      {
        "title": "Calculate Span When Stack is Empty",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should be the span on a day when the stack is empty?",
                "correct-choice": "The index of the day plus 1",
                "incorrect-choice-1": "The index of the day",
                "incorrect-choice-2": "0",
                "incorrect-choice-3": "The price of the stock on that day"
              }
            ],
            "code-lines-to-be-revealed": [7, 8]
          }
        ]
      },
      {
        "title": "Calculate Span When Stack is Not Empty",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should be the span on a day when the stack is not empty?",
                "correct-choice": "The difference between the index of the day and the index of the top day in the stack",
                "incorrect-choice-1": "The sum of the index of the day and the index of the top day in the stack",
                "incorrect-choice-2": "The index of the day",
                "incorrect-choice-3": "The index of the top day in the stack"
              }
            ],
            "code-lines-to-be-revealed": [9, 10]
          }
        ]
      },
      {
        "title": "Append Current Day to Stack",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should we append to the stack after calculating the span for a day?",
                "correct-choice": "The index of the day",
                "incorrect-choice-1": "The price of the stock on that day",
                "incorrect-choice-2": "The span of the day",
                "incorrect-choice-3": "The index of the day plus 1"
              }
            ],
            "code-lines-to-be-revealed": [11]
          }
        ]
      },
      {
        "title": "Return Span List",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should the function return?",
                "correct-choice": "The list of spans",
                "incorrect-choice-1": "The list of prices",
                "incorrect-choice-2": "The stack",
                "incorrect-choice-3": "The length of the list of spans"
              }
            ],
            "code-lines-to-be-revealed": [12]
          }
        ]
      }
    ]
  }

export const task2Decomposition = {
    "subgoals": [
      {
        "title": "Function Definition",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What is the appropriate data type for the input of the function?",
                "correct-choice": "String",
                "incorrect-choice-1": "List of strings",
                "incorrect-choice-2": "Integer",
                "incorrect-choice-3": "List of integers"
              }
            ],
            "code-lines-to-be-revealed": [1]
          }
        ]
      },
      {
        "title": "Initialize Map",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What data structure is suitable for mapping open brackets to their corresponding close brackets?",
                "correct-choice": "Dictionary",
                "incorrect-choice-1": "List",
                "incorrect-choice-2": "Set",
                "incorrect-choice-3": "Tuple"
              }
            ],
            "code-lines-to-be-revealed": [2]
          }
        ]
      },
      {
        "title": "Initialize Stack",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should be the initial value of the stack?",
                "correct-choice": "[-1]",
                "incorrect-choice-1": "[0]",
                "incorrect-choice-2": "[]",
                "incorrect-choice-3": "[1]"
              }
            ],
            "code-lines-to-be-revealed": [3]
          }
        ]
      },
      {
        "title": "Initialize Max Length",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should be the initial value of the max length?",
                "correct-choice": "0",
                "incorrect-choice-1": "1",
                "incorrect-choice-2": "-1",
                "incorrect-choice-3": "The length of the string"
              }
            ],
            "code-lines-to-be-revealed": [4]
          }
        ]
      },
      {
        "title": "Iterate Over Characters",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "How many times should we iterate over the characters?",
                "correct-choice": "The length of the string",
                "incorrect-choice-1": "The length of the string minus 1",
                "incorrect-choice-2": "The length of the string plus 1",
                "incorrect-choice-3": "Twice the length of the string"
              }
            ],
            "code-lines-to-be-revealed": [5]
          }
        ]
      },
      {
        "title": "Check If Character Is Open Bracket",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "How can we check if a character is an open bracket?",
                "correct-choice": "If the character is in the map",
                "incorrect-choice-1": "If the character is not in the map",
                "incorrect-choice-2": "If the character is equal to '(' or '['",
                "incorrect-choice-3": "If the character is equal to ')' or ']'"
              }
            ],
            "code-lines-to-be-revealed": [6]
          }
        ]
      },
      {
        "title": "Append Index to Stack",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should we append to the stack if a character is an open bracket?",
                "correct-choice": "The index of the character",
                "incorrect-choice-1": "The character itself",
                "incorrect-choice-2": "The corresponding close bracket",
                "incorrect-choice-3": "The index of the character plus 1"
              }
            ],
            "code-lines-to-be-revealed": [7]
          }
        ]
      },
      {
        "title": "Check If Stack Is Not Empty",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "How can we check if the stack is not empty?",
                "correct-choice": "If the length of the stack is greater than 1",
                "incorrect-choice-1": "If the length of the stack is less than 1",
                "incorrect-choice-2": "If the length of the stack is equal to 1",
                "incorrect-choice-3": "If the length of the stack is equal to 0"
              }
            ],
            "code-lines-to-be-revealed": [8, 9]
          }
        ]
      },
      {
        "title": "Check If Last Character Is Open Bracket",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "How can we check if the last character in the stack is an open bracket?",
                "correct-choice": "If the last character in the stack is in the map",
                "incorrect-choice-1": "If the last character in the stack is not in the map",
                "incorrect-choice-2": "If the last character in the stack is equal to '(' or '['",
                "incorrect-choice-3": "If the last character in the stack is equal to ')' or ']'"
              }
            ],
            "code-lines-to-be-revealed": [10]
          }
        ]
      },
      {
        "title": "Check If Character Matches Last Open Bracket",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "How can we check if a character matches the last open bracket in the stack?",
                "correct-choice": "If the character is equal to the value of the last open bracket in the map",
                "incorrect-choice-1": "If the character is not equal to the value of the last open bracket in the map",
                "incorrect-choice-2": "If the character is equal to the last open bracket",
                "incorrect-choice-3": "If the character is not equal to the last open bracket"
              }
            ],
            "code-lines-to-be-revealed": [11, 12]
          }
        ]
      },
      {
        "title": "Remove Last Open Bracket",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should we do if a character matches the last open bracket in the stack?",
                "correct-choice": "Remove the last open bracket from the stack",
                "incorrect-choice-1": "Append the character to the stack",
                "incorrect-choice-2": "Remove the character from the string",
                "incorrect-choice-3": "Append the index of the character to the stack"
              }
            ],
            "code-lines-to-be-revealed": [13]
          }
        ]
      },
      {
        "title": "Update Max Length",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "How can we update the max length?",
                "correct-choice": "Set it to the maximum of the current max length and the difference between the current index and the last index in the stack",
                "incorrect-choice-1": "Set it to the minimum of the current max length and the difference between the current index and the last index in the stack",
                "incorrect-choice-2": "Set it to the current index minus the last index in the stack",
                "incorrect-choice-3": "Set it to the current index plus the last index in the stack"
              }
            ],
            "code-lines-to-be-revealed": [14]
          }
        ]
      },
      {
        "title": "Update Last Index",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should we do if a character does not match the last open bracket in the stack or the stack is empty?",
                "correct-choice": "Set the last index in the stack to the current index",
                "incorrect-choice-1": "Append the current index to the stack",
                "incorrect-choice-2": "Remove the last index from the stack",
                "incorrect-choice-3": "Set the last index in the stack to the current index plus 1"
              }
            ],
            "code-lines-to-be-revealed": [15, 16]
          }
        ]
      },
      {
        "title": "Return Max Length",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should the function return?",
                "correct-choice": "The max length",
                "incorrect-choice-1": "The string",
                "incorrect-choice-2": "The stack",
                "incorrect-choice-3": "The map"
              }
            ],
            "code-lines-to-be-revealed": [17]
          }
        ]
      }
    ]
}

export const task3Decomposition = {
  "subgoals": [
    {
      "title": "Define the function and initialize result list",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to define a function that takes two integers as input.",
          "short-answer-question": "What should be the name of the function and its parameters?",
          "mcq-question": "What should be the name of the function and its parameters?",
          "correct-choice": "binary_numbers(n1, n2)",
          "incorrect-choice-1": "binary_range(start, end)",
          "incorrect-choice-2": "generate_binary_numbers(a, b)",
          "incorrect-choice-3": "binary_list(x, y)",
          "short-answer-solution": "The function should be named binary_numbers and it should take two parameters: n1 and n2, both of which are integers.",
          "selected-question": "short",
          "code-line-to-be-revealed": 1,
          "hint-if-incorrect": "Think about the task description and the required inputs.",
          "explanation-after-correct-answer": "The function is named binary_numbers and it takes two integer parameters, n1 and n2."
        },
        {
          "context": "We have defined the function. Now, we need to initialize an empty list to store the result.",
          "short-answer-question": "What should be the initial value of the result list?",
          "mcq-question": "What should be the initial value of the result list?",
          "correct-choice": "An empty list",
          "incorrect-choice-1": "A list with one element",
          "incorrect-choice-2": "A list with two elements",
          "incorrect-choice-3": "A list with n1 and n2",
          "short-answer-solution": "The result list should be initialized as an empty list because we will be appending binary numbers to it later.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 2,
          "hint-if-incorrect": "Consider what the result list is supposed to store initially.",
          "explanation-after-correct-answer": "The result list is initialized as an empty list to store the binary numbers that will be generated."
        }
      ]
    },
    {
      "title": "Initialize the queue with the first binary number",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We have initialized the result list. Now, we need to initialize a queue to generate binary numbers.",
          "short-answer-question": "What should be the initial value of the queue?",
          "mcq-question": "What should be the initial value of the queue?",
          "correct-choice": "A list with the string '1'",
          "incorrect-choice-1": "An empty list",
          "incorrect-choice-2": "A list with the string '0'",
          "incorrect-choice-3": "A list with the integers 0 and 1",
          "short-answer-solution": "The queue should be initialized with the string '1' because we start generating binary numbers from '1'.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 3,
          "hint-if-incorrect": "Think about the first binary number that should be generated.",
          "explanation-after-correct-answer": "The queue is initialized with the string '1' to start generating binary numbers from '1'."
        }
      ]
    },
    {
      "title": "Iterate to generate binary numbers up to n2",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We have initialized the queue. Now, we need to iterate to generate binary numbers.",
          "short-answer-question": "How many times should we iterate to generate binary numbers?",
          "mcq-question": "How many times should we iterate to generate binary numbers?",
          "correct-choice": "n2 times",
          "incorrect-choice-1": "n1 times",
          "incorrect-choice-2": "n2 - n1 times",
          "incorrect-choice-3": "n1 + n2 times",
          "short-answer-solution": "We should iterate n2 times because we need to generate binary numbers up to n2.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 4,
          "hint-if-incorrect": "Consider the range of binary numbers we need to generate.",
          "explanation-after-correct-answer": "We iterate n2 times to generate binary numbers up to n2."
        }
      ]
    },
    {
      "title": "Pop the first element from the queue",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "We are iterating to generate binary numbers. Now, we need to process the first element in the queue.",
          "short-answer-question": "What operation should we perform on the queue to get the first element?",
          "mcq-question": "What operation should we perform on the queue to get the first element?",
          "correct-choice": "Pop the first element",
          "incorrect-choice-1": "Append a new element",
          "incorrect-choice-2": "Remove the last element",
          "incorrect-choice-3": "Insert a new element at the beginning",
          "short-answer-solution": "We should pop the first element from the queue to process it and generate new binary numbers.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 5,
          "hint-if-incorrect": "Think about how to access the first element in a queue.",
          "explanation-after-correct-answer": "We pop the first element from the queue to process it and generate new binary numbers."
        }
      ]
    },
    {
      "title": "Convert the binary string to an integer",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "We have popped the first element from the queue. Now, we need to convert it to an integer.",
          "short-answer-question": "How do we convert a binary string to an integer in Python?",
          "mcq-question": "How do we convert a binary string to an integer in Python?",
          "correct-choice": "Using int() with base 2",
          "incorrect-choice-1": "Using float()",
          "incorrect-choice-2": "Using str()",
          "incorrect-choice-3": "Using bin()",
          "short-answer-solution": "We use the int() function with base 2 to convert a binary string to an integer in Python.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 6,
          "hint-if-incorrect": "Consider the function that converts strings to integers with a specified base.",
          "explanation-after-correct-answer": "We use the int() function with base 2 to convert the binary string to an integer."
        }
      ]
    },
    {
      "title": "Check if the integer is within the range",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "We have converted the binary string to an integer. Now, we need to check if it is within the range [n1, n2].",
          "short-answer-question": "What condition should we check to see if the integer is within the range?",
          "mcq-question": "What condition should we check to see if the integer is within the range?",
          "correct-choice": "n1 <= current_int <= n2",
          "incorrect-choice-1": "n1 < current_int < n2",
          "incorrect-choice-2": "n1 >= current_int >= n2",
          "incorrect-choice-3": "n1 == current_int == n2",
          "short-answer-solution": "We should check if n1 <= current_int <= n2 to see if the integer is within the range.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 7,
          "hint-if-incorrect": "Consider the range [n1, n2] and how to check if a number is within it.",
          "explanation-after-correct-answer": "We check if n1 <= current_int <= n2 to see if the integer is within the specified range."
        }
      ]
    },
    {
      "title": "Append the binary string to the result list",
      "indent-level": 3,
      "leading-questions": [
        {
          "context": "We have checked if the integer is within the range. Now, we need to append the binary string to the result list if it is within the range.",
          "short-answer-question": "What should we do if the integer is within the range?",
          "mcq-question": "What should we do if the integer is within the range?",
          "correct-choice": "Append the binary string to the result list",
          "incorrect-choice-1": "Remove the binary string from the queue",
          "incorrect-choice-2": "Convert the binary string to a float",
          "incorrect-choice-3": "Ignore the binary string",
          "short-answer-solution": "If the integer is within the range, we should append the binary string to the result list.",
          "selected-question": "short",
          "code-line-to-be-revealed": 8,
          "hint-if-incorrect": "Consider what we need to do with valid binary numbers.",
          "explanation-after-correct-answer": "We append the binary string to the result list if the integer is within the specified range."
        }
      ]
    },
    {
      "title": "Generate new binary numbers and add to the queue",
      "indent-level": 3,
      "leading-questions": [
        {
          "context": "We have appended the binary string to the result list if it is within the range. Now, we need to generate new binary numbers.",
          "short-answer-question": "How do we generate new binary numbers from the current binary string?",
          "mcq-question": "How do we generate new binary numbers from the current binary string?",
          "correct-choice": "Append '0' and '1' to the current string",
          "incorrect-choice-1": "Prepend '0' and '1' to the current string",
          "incorrect-choice-2": "Replace '0' with '1' in the current string",
          "incorrect-choice-3": "Remove the last character from the current string",
          "short-answer-solution": "We generate new binary numbers by appending '0' and '1' to the current binary string.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 9,
          "hint-if-incorrect": "Consider how binary numbers are generated from a given binary string.",
          "explanation-after-correct-answer": "We generate new binary numbers by appending '0' and '1' to the current binary string."
        },
        {
          "context": "We have generated a new binary number by appending '0' to the current string. Now, we need to generate another binary number.",
          "short-answer-question": "What should we append to the current string to generate another binary number?",
          "mcq-question": "What should we append to the current string to generate another binary number?",
          "correct-choice": "Append '1' to the current string",
          "incorrect-choice-1": "Append '2' to the current string",
          "incorrect-choice-2": "Append '0' to the current string",
          "incorrect-choice-3": "Append '11' to the current string",
          "short-answer-solution": "We should append '1' to the current string to generate another binary number.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 10,
          "hint-if-incorrect": "Consider the next binary number after appending '0'.",
          "explanation-after-correct-answer": "We append '1' to the current string to generate another binary number."
        }
      ]
    },
    {
      "title": "Return the result list",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We have generated all the required binary numbers and stored them in the result list. Now, we need to return the result list.",
          "short-answer-question": "What should the function return?",
          "mcq-question": "What should the function return?",
          "correct-choice": "The result list",
          "incorrect-choice-1": "The queue",
          "incorrect-choice-2": "The last binary number",
          "incorrect-choice-3": "The input parameters",
          "short-answer-solution": "The function should return the result list containing all the binary numbers within the specified range.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 11,
          "hint-if-incorrect": "Consider what we have been storing the binary numbers in.",
          "explanation-after-correct-answer": "The function returns the result list containing all the binary numbers within the specified range."
        }
      ]
    },
    {
      "title": "Test the function with sample input",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We have defined the function. Now, we need to test it with sample input.",
          "short-answer-question": "What sample input should we use to test the function?",
          "mcq-question": "What sample input should we use to test the function?",
          "correct-choice": "binary_numbers(2, 5)",
          "incorrect-choice-1": "binary_numbers(1, 3)",
          "incorrect-choice-2": "binary_numbers(0, 4)",
          "incorrect-choice-3": "binary_numbers(3, 6)",
          "short-answer-solution": "An example input we could use to test the function is by passing any two integers that fall within the valid range expected by the function.",
          "selected-question": "short",
          "code-line-to-be-revealed": 12,
          "hint-if-incorrect": "Consider a simple way to see the output of the function.",
          "explanation-after-correct-answer": "We call the function with example inputs and print the result to verify its correctness."
        }
      ]
    }
  ]
};

// export const task3Decomposition = {
//   "subgoals": [
//     {
//       "title": "Define the function and its parameters",
//       "indent-level": 0,
//       "leading-questions": [
//         {
//           "context": "We need to define a function that takes two integers as input.",
//           "short-answer-question": "Why is it important to specify the parameter types in the function definition?",
//           "mcq-question": "What should the function return?",
//           "correct-choice": "A list of binary strings",
//           "incorrect-choice-1": "A single binary string",
//           "incorrect-choice-2": "A list of integers",
//           "incorrect-choice-3": "A single integer",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 1,
//           "hint-if-incorrect": "Think about the task description and what the function is supposed to generate.",
//           "explanation-after-correct-answer": "The function definition specifies that it takes two integers and returns a list of binary strings, which aligns with the task requirements."
//         }
//       ]
//     },
//     {
//       "title": "Initialize the result list",
//       "indent-level": 1,
//       "leading-questions": [
//         {
//           "context": "After defining the function, we need to initialize an empty list to store the results.",
//           "short-answer-question": "Why do we need an empty list at the beginning of the function?",
//           "mcq-question": "What is the purpose of the result list?",
//           "correct-choice": "To store the binary numbers",
//           "incorrect-choice-1": "To store the input numbers",
//           "incorrect-choice-2": "To store intermediate calculations",
//           "incorrect-choice-3": "To store error messages",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 2,
//           "hint-if-incorrect": "Think about where we will store the binary numbers that fall within the given range.",
//           "explanation-after-correct-answer": "The result list is initialized to store the binary numbers that fall within the range specified by n1 and n2."
//         }
//       ]
//     },
//     {
//       "title": "Initialize the queue with the first binary number",
//       "indent-level": 1,
//       "leading-questions": [
//         {
//           "context": "We need to use a queue to generate binary numbers efficiently.",
//           "short-answer-question": "Why do we start the queue with the string '1'?",
//           "mcq-question": "What is the initial value of the queue?",
//           "correct-choice": "['1']",
//           "incorrect-choice-1": "['0']",
//           "incorrect-choice-2": "['10']",
//           "incorrect-choice-3": "['11']",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 3,
//           "hint-if-incorrect": "Consider the smallest binary number greater than zero.",
//           "explanation-after-correct-answer": "The queue is initialized with the string '1' because it is the smallest binary number greater than zero."
//         }
//       ]
//     },
//     {
//       "title": "Iterate to generate binary numbers",
//       "indent-level": 1,
//       "leading-questions": [
//         {
//           "context": "We need to iterate to generate binary numbers up to n2.",
//           "short-answer-question": "Why do we use a loop to generate binary numbers?",
//           "mcq-question": "How many times should the loop run?",
//           "correct-choice": "n2 times",
//           "incorrect-choice-1": "n1 times",
//           "incorrect-choice-2": "n2 - n1 times",
//           "incorrect-choice-3": "n2 + n1 times",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 4,
//           "hint-if-incorrect": "Think about the range of binary numbers we need to generate.",
//           "explanation-after-correct-answer": "The loop runs n2 times to ensure we generate enough binary numbers to cover the range from n1 to n2."
//         }
//       ]
//     },
//     {
//       "title": "Pop the first element from the queue",
//       "indent-level": 2,
//       "leading-questions": [
//         {
//           "context": "Within the loop, we need to process the first element in the queue.",
//           "short-answer-question": "Why do we pop the first element from the queue?",
//           "mcq-question": "What operation is used to remove the first element from the queue?",
//           "correct-choice": "pop(0)",
//           "incorrect-choice-1": "pop()",
//           "incorrect-choice-2": "remove(0)",
//           "incorrect-choice-3": "del q[0]",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 5,
//           "hint-if-incorrect": "Consider how queues typically operate (FIFO).",
//           "explanation-after-correct-answer": "We use pop(0) to remove the first element from the queue, following the FIFO (First In, First Out) principle."
//         }
//       ]
//     },
//     {
//       "title": "Convert the binary string to an integer",
//       "indent-level": 2,
//       "leading-questions": [
//         {
//           "context": "After popping the first element, we need to convert it from a binary string to an integer.",
//           "short-answer-question": "Why do we need to convert the binary string to an integer?",
//           "mcq-question": "Which function converts a binary string to an integer?",
//           "correct-choice": "int(current, 2)",
//           "incorrect-choice-1": "int(current)",
//           "incorrect-choice-2": "bin(current)",
//           "incorrect-choice-3": "str(current, 2)",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 6,
//           "hint-if-incorrect": "Consider how to specify the base of the number system.",
//           "explanation-after-correct-answer": "We use int(current, 2) to convert the binary string to an integer, specifying base 2."
//         }
//       ]
//     },
//     {
//       "title": "Check if the integer is within the range",
//       "indent-level": 2,
//       "leading-questions": [
//         {
//           "context": "We need to check if the converted integer falls within the specified range.",
//           "short-answer-question": "Why is it important to check if the integer is within the range?",
//           "mcq-question": "What condition checks if the integer is within the range?",
//           "correct-choice": "n1 <= current_int <= n2",
//           "incorrect-choice-1": "n1 < current_int < n2",
//           "incorrect-choice-2": "n1 <= current_int < n2",
//           "incorrect-choice-3": "n1 < current_int <= n2",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 7,
//           "hint-if-incorrect": "Consider the inclusive nature of the range.",
//           "explanation-after-correct-answer": "The condition n1 <= current_int <= n2 checks if the integer falls within the inclusive range specified by n1 and n2."
//         }
//       ]
//     },
//     {
//       "title": "Append the binary string to the result list",
//       "indent-level": 3,
//       "leading-questions": [
//         {
//           "context": "If the integer is within the range, we need to add the binary string to the result list.",
//           "short-answer-question": "Why do we append the binary string to the result list?",
//           "mcq-question": "Which method is used to add an element to a list?",
//           "correct-choice": "append()",
//           "incorrect-choice-1": "add()",
//           "incorrect-choice-2": "insert()",
//           "incorrect-choice-3": "extend()",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 8,
//           "hint-if-incorrect": "Think about the method used to add a single element to a list.",
//           "explanation-after-correct-answer": "We use the append() method to add the binary string to the result list if the integer is within the specified range."
//         }
//       ]
//     },
//     {
//       "title": "Generate the next binary numbers",
//       "indent-level": 3,
//       "leading-questions": [
//         {
//           "context": "We need to generate the next binary numbers by appending '0' and '1' to the current binary string.",
//           "short-answer-question": "Why do we append '0' and '1' to the current binary string?",
//           "mcq-question": "What are the next binary numbers generated from the current binary string?",
//           "correct-choice": "current + '0' and current + '1'",
//           "incorrect-choice-1": "current + '1' and current + '0'",
//           "incorrect-choice-2": "current + '1' and current + '2'",
//           "incorrect-choice-3": "current + '0' and current + '2'",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 9,
//           "hint-if-incorrect": "Consider how binary numbers are generated.",
//           "explanation-after-correct-answer": "We append '0' and '1' to the current binary string to generate the next binary numbers."
//         },
//         {
//           "context": "We need to add the newly generated binary numbers to the queue.",
//           "short-answer-question": "Why do we add the newly generated binary numbers to the queue?",
//           "mcq-question": "Which method is used to add elements to the queue?",
//           "correct-choice": "append()",
//           "incorrect-choice-1": "add()",
//           "incorrect-choice-2": "insert()",
//           "incorrect-choice-3": "extend()",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 10,
//           "hint-if-incorrect": "Think about the method used to add elements to a list.",
//           "explanation-after-correct-answer": "We use the append() method to add the newly generated binary numbers to the queue for further processing."
//         }
//       ]
//     },
//     {
//       "title": "Return the result list",
//       "indent-level": 1,
//       "leading-questions": [
//         {
//           "context": "After generating all the binary numbers within the range, we need to return the result list.",
//           "short-answer-question": "Why do we return the result list at the end of the function?",
//           "mcq-question": "What should the function return?",
//           "correct-choice": "The result list",
//           "incorrect-choice-1": "The queue",
//           "incorrect-choice-2": "The last binary number",
//           "incorrect-choice-3": "The range of numbers",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 11,
//           "hint-if-incorrect": "Think about what the function is supposed to output.",
//           "explanation-after-correct-answer": "The function returns the result list, which contains all the binary numbers within the specified range."
//         }
//       ]
//     },
//     {
//       "title": "Test the function with sample inputs",
//       "indent-level": 0,
//       "leading-questions": [
//         {
//           "context": "We need to test the function to ensure it works correctly.",
//           "short-answer-question": "Why is it important to test the function with sample inputs?",
//           "mcq-question": "What are the sample inputs used to test the function?",
//           "correct-choice": "2 and 5",
//           "incorrect-choice-1": "1 and 5",
//           "incorrect-choice-2": "2 and 6",
//           "incorrect-choice-3": "1 and 6",
//           "selected-question": "both",
//           "code-line-to-be-revealed": 12,
//           "hint-if-incorrect": "Consider the sample inputs provided in the task description.",
//           "explanation-after-correct-answer": "We test the function with sample inputs 2 and 5 to ensure it generates the correct binary numbers within the specified range."
//         }
//       ]
//     }
//   ]
// }

export const task4Decomposition = {
    "subgoals": [
      {
        "title": "Function Definition",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What is the appropriate data type for the input of the function?",
                "correct-choice": "String",
                "incorrect-choice-1": "List of strings",
                "incorrect-choice-2": "Integer",
                "incorrect-choice-3": "List of integers"
              }
            ],
            "code-lines-to-be-revealed": [1]
          }
        ]
      },
      {
        "title": "Initialize DNA Characters",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What are the possible characters in a DNA sequence?",
                "correct-choice": "A, C, G, T",
                "incorrect-choice-1": "A, B, C, D",
                "incorrect-choice-2": "1, 2, 3, 4",
                "incorrect-choice-3": "N, S, E, W"
              }
            ],
            "code-lines-to-be-revealed": [2]
          }
        ]
      },
      {
        "title": "Initialize Queue and Result List",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should be the initial value of the queue and the result list?",
                "correct-choice": "Empty list",
                "incorrect-choice-1": "List containing the input pattern",
                "incorrect-choice-2": "List containing the DNA characters",
                "incorrect-choice-3": "None"
              }
            ],
            "code-lines-to-be-revealed": [3, 4]
          }
        ]
      },
      {
        "title": "Iterate Over Queue",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "When should we stop iterating over the queue?",
                "correct-choice": "When the queue is empty",
                "incorrect-choice-1": "When the queue is full",
                "incorrect-choice-2": "When the queue contains the input pattern",
                "incorrect-choice-3": "When the queue contains all DNA sequences"
              }
            ],
            "code-lines-to-be-revealed": [5]
          }
        ]
      },
      {
        "title": "Remove Sequence from Queue",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "Which sequence should we remove from the queue?",
                "correct-choice": "The first sequence",
                "incorrect-choice-1": "The last sequence",
                "incorrect-choice-2": "The sequence that matches the input pattern",
                "incorrect-choice-3": "The sequence that contains all DNA characters"
              }
            ],
            "code-lines-to-be-revealed": [6]
          }
        ]
      },
      {
        "title": "Check Length of Sequence",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should be the length of a sequence before we add it to the result list?",
                "correct-choice": "The length of the input pattern",
                "incorrect-choice-1": "The length of the input pattern plus 1",
                "incorrect-choice-2": "The length of the input pattern minus 1",
                "incorrect-choice-3": "The length of the DNA characters"
              }
            ],
            "code-lines-to-be-revealed": [7]
          }
        ]
      },
      {
        "title": "Add Sequence to Result List",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "When should we add a sequence to the result list?",
                "correct-choice": "When the length of the sequence is equal to the length of the input pattern",
                "incorrect-choice-1": "When the length of the sequence is less than the length of the input pattern",
                "incorrect-choice-2": "When the length of the sequence is greater than the length of the input pattern",
                "incorrect-choice-3": "When the sequence contains all DNA characters"
              }
            ],
            "code-lines-to-be-revealed": [8]
          }
        ]
      },
      {
        "title": "Check Character in Pattern",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "Which character in the input pattern should we check?",
                "correct-choice": "The character at the position equal to the length of the sequence",
                "incorrect-choice-1": "The first character",
                "incorrect-choice-2": "The last character",
                "incorrect-choice-3": "The character at the position equal to the length of the sequence plus 1"
              }
            ],
            "code-lines-to-be-revealed": [9, 10]
          }
        ]
      },
      {
        "title": "Append All DNA Characters to Sequence",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "When should we append all DNA characters to the sequence?",
                "correct-choice": "When the character in the input pattern is 'N'",
                "incorrect-choice-1": "When the character in the input pattern is a DNA character",
                "incorrect-choice-2": "When the sequence is empty",
                "incorrect-choice-3": "When the sequence contains all DNA characters"
              }
            ],
            "code-lines-to-be-revealed": [11, 12]
          }
        ]
      },
      {
        "title": "Append Character in Pattern to Sequence",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "When should we append the character in the input pattern to the sequence?",
                "correct-choice": "When the character in the input pattern is a DNA character",
                "incorrect-choice-1": "When the character in the input pattern is 'N'",
                "incorrect-choice-2": "When the sequence is empty",
                "incorrect-choice-3": "When the sequence contains all DNA characters"
              }
            ],
            "code-lines-to-be-revealed": [13, 14]
          }
        ]
      },
      {
        "title": "Return Result List",
        "sub-subgoal-items": [
          {
            "leading-questions": [
              {
                "mcq-question": "What should the function return?",
                "correct-choice": "The list of DNA sequences",
                "incorrect-choice-1": "The input pattern",
                "incorrect-choice-2": "The queue",
                "incorrect-choice-3": "The length of the result list"
              }
            ],
            "code-lines-to-be-revealed": [15]
          }
        ]
      }
    ]
}