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
            "context": "We need to define a function that generates binary numbers between two given integers.",
            "short-answer-question": "What should the function signature look like?",
            "mcq-question": "What should the function signature be?",
            "correct-choice": "def binary_numbers(n1: int, n2: int) -> list[str]:",
            "incorrect-choice-1": "def binary_numbers(n1, n2):",
            "incorrect-choice-2": "def binary_numbers(n1: int, n2: int):",
            "incorrect-choice-3": "def binary_numbers(n1: int, n2: int) -> list[int]:",
            "code-line-to-be-revealed": 1,
            "hint-if-incorrect": "Think about the function name, parameters, and return type.",
            "explanation-after-correct-answer": "The function is named 'binary_numbers' and takes two integer parameters 'n1' and 'n2', returning a list of strings."
          },
          {
            "context": "We need a list to store the resulting binary numbers.",
            "short-answer-question": "What should we initialize to store the resulting binary numbers?",
            "mcq-question": "What should we initialize to store the resulting binary numbers?",
            "correct-choice": "An empty list",
            "incorrect-choice-1": "A list with a single element",
            "incorrect-choice-2": "A variable with None",
            "incorrect-choice-3": "A dictionary",
            "code-line-to-be-revealed": 2,
            "hint-if-incorrect": "Think about the data structure that can hold multiple binary numbers.",
            "explanation-after-correct-answer": "We initialize an empty list called 'result' to store the resulting binary numbers."
          }
        ]
      },
      {
        "title": "Initialize the queue with the first binary number",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need a queue to generate binary numbers efficiently.",
            "short-answer-question": "What should we initialize the queue with?",
            "mcq-question": "What should we initialize the queue with?",
            "correct-choice": "A list containing '1'",
            "incorrect-choice-1": "An empty list",
            "incorrect-choice-2": "A list containing '0'",
            "incorrect-choice-3": "A list containing '1' and '0'",
            "code-line-to-be-revealed": 3,
            "hint-if-incorrect": "Consider the simplest non-zero binary number.",
            "explanation-after-correct-answer": "We initialize the queue with a list containing the string '1' to start generating binary numbers."
          }
        ]
      },
      {
        "title": "Iterate to generate binary numbers up to n2",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need to generate binary numbers up to the value of n2.",
            "short-answer-question": "How should we iterate to generate binary numbers up to n2?",
            "mcq-question": "How should we iterate to generate binary numbers up to n2?",
            "correct-choice": "Using a for loop",
            "incorrect-choice-1": "Using a while loop",
            "incorrect-choice-2": "Using a list comprehension",
            "incorrect-choice-3": "Using recursion",
            "code-line-to-be-revealed": 4,
            "hint-if-incorrect": "Consider the most straightforward way to iterate a fixed number of times.",
            "explanation-after-correct-answer": "We use a for loop to iterate up to n2, generating binary numbers."
          }
        ]
      },
      {
        "title": "Pop the first element from the queue",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need to process the first element in the queue.",
            "short-answer-question": "How should we get the first element from the queue?",
            "mcq-question": "How should we get the first element from the queue?",
            "correct-choice": "Using pop(0)",
            "incorrect-choice-1": "Using pop()",
            "incorrect-choice-2": "Using remove()",
            "incorrect-choice-3": "Using del",
            "code-line-to-be-revealed": 5,
            "hint-if-incorrect": "Consider the method that removes and returns the first element.",
            "explanation-after-correct-answer": "We use pop(0) to remove and return the first element from the queue."
          }
        ]
      },
      {
        "title": "Convert the binary string to an integer",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need to convert the binary string to an integer to check its value.",
            "short-answer-question": "How should we convert the binary string to an integer?",
            "mcq-question": "How should we convert the binary string to an integer?",
            "correct-choice": "Using int(current, 2)",
            "incorrect-choice-1": "Using int(current)",
            "incorrect-choice-2": "Using bin(current)",
            "incorrect-choice-3": "Using str(current)",
            "code-line-to-be-revealed": 6,
            "hint-if-incorrect": "Consider the function that converts a binary string to an integer.",
            "explanation-after-correct-answer": "We use int(current, 2) to convert the binary string to an integer."
          }
        ]
      },
      {
        "title": "Check if the integer is within the range",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need to check if the integer value is within the range [n1, n2].",
            "short-answer-question": "What condition should we check to see if the integer is within the range?",
            "mcq-question": "What condition should we check to see if the integer is within the range?",
            "correct-choice": "If n1 <= current_int <= n2",
            "incorrect-choice-1": "If current_int < n1",
            "incorrect-choice-2": "If current_int > n2",
            "incorrect-choice-3": "If n1 < current_int < n2",
            "code-line-to-be-revealed": 7,
            "hint-if-incorrect": "Consider the range [n1, n2] inclusive.",
            "explanation-after-correct-answer": "We check if the integer value is within the range [n1, n2] inclusive."
          }
        ]
      },
      {
        "title": "Append the binary string to the result list",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need to add the binary string to the result list if it is within the range.",
            "short-answer-question": "What should we do if the integer is within the range?",
            "mcq-question": "What should we do if the integer is within the range?",
            "correct-choice": "Append the binary string to the result list",
            "incorrect-choice-1": "Ignore the binary string",
            "incorrect-choice-2": "Replace the result list with the binary string",
            "incorrect-choice-3": "Raise an error",
            "code-line-to-be-revealed": 8,
            "hint-if-incorrect": "Consider how to store valid binary strings.",
            "explanation-after-correct-answer": "If the integer is within the range, we append the binary string to the result list."
          }
        ]
      },
      {
        "title": "Generate the next binary numbers and add to the queue",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need to generate the next binary numbers by appending '0' and '1' to the current binary string.",
            "short-answer-question": "How should we generate the next binary numbers?",
            "mcq-question": "How should we generate the next binary numbers?",
            "correct-choice": "Append current + '0' and current + '1' to the queue",
            "incorrect-choice-1": "Append current + '0' to the queue",
            "incorrect-choice-2": "Append current + '1' to the queue",
            "incorrect-choice-3": "Replace the queue with current + '0' and current + '1'",
            "code-line-to-be-revealed": 9,
            "hint-if-incorrect": "Consider how to generate the next binary numbers from the current binary string.",
            "explanation-after-correct-answer": "We generate the next binary numbers by appending '0' and '1' to the current binary string and add them to the queue."
          },
          {
            "context": "We need to add the next binary number ending with '1' to the queue.",
            "short-answer-question": "What should we do to generate the next binary number ending with '1'?",
            "mcq-question": "What should we do to generate the next binary number ending with '1'?",
            "correct-choice": "Append current + '1' to the queue",
            "incorrect-choice-1": "Append current + '0' to the queue",
            "incorrect-choice-2": "Replace the queue with current + '1'",
            "incorrect-choice-3": "Ignore the current binary string",
            "code-line-to-be-revealed": 10,
            "hint-if-incorrect": "Consider how to generate the next binary number ending with '1'.",
            "explanation-after-correct-answer": "We generate the next binary number ending with '1' by appending '1' to the current binary string and add it to the queue."
          }
        ]
      },
      {
        "title": "Return the result list",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need to return the list of binary numbers after processing all intervals.",
            "short-answer-question": "What should the function return after processing all intervals?",
            "mcq-question": "What should the function return after processing all intervals?",
            "correct-choice": "The result list",
            "incorrect-choice-1": "The original list",
            "incorrect-choice-2": "None",
            "incorrect-choice-3": "A boolean value",
            "code-line-to-be-revealed": 11,
            "hint-if-incorrect": "Think about what the final output of the function should be.",
            "explanation-after-correct-answer": "The function returns the result list, which contains all the binary numbers within the specified range."
          }
        ]
      },
      {
        "title": "Test the function with an example",
        "indent-level": 0,
        "leading-questions": [
          {
            "context": "We need to test the function to ensure it works correctly.",
            "short-answer-question": "How should we test the function?",
            "mcq-question": "How should we test the function?",
            "correct-choice": "By calling it with example inputs and printing the result",
            "incorrect-choice-1": "By calling it without any inputs",
            "incorrect-choice-2": "By printing the function definition",
            "incorrect-choice-3": "By calling it with incorrect inputs",
            "code-line-to-be-revealed": 12,
            "hint-if-incorrect": "Consider how to verify the function's correctness.",
            "explanation-after-correct-answer": "We test the function by calling it with example inputs and printing the result to verify its correctness."
          }
        ]
      }
    ]
  }

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