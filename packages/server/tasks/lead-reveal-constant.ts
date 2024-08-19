export const task1Decomposition = {
  "subgoals": [
    {
      "title": "Define the function and initialize variables",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to define a function that generates valid parentheses combinations.",
          "short-answer-question": "What parameters should the function take to generate parentheses combinations?",
          "mcq-question": "What parameters should the function take to generate parentheses combinations?",
          "correct-choice": "Two integers: n and d",
          "incorrect-choice-1": "A list and an integer",
          "incorrect-choice-2": "Two strings",
          "incorrect-choice-3": "A string and an integer",
          "short-answer-solution": "The function should take two integers: n (number of pairs of parentheses) and d (maximum depth).",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 1,
          "hint-if-incorrect": "Think about what inputs are needed to generate parentheses combinations.",
          "explanation-after-correct-answer": "The function is defined with two parameters: n (number of pairs of parentheses) and d (maximum depth)."
        },
        {
          "context": "The function is defined, now we need to initialize variables.",
          "short-answer-question": "What type of data structure should be used to store the result?",
          "mcq-question": "What type of data structure should be used to store the result?",
          "correct-choice": "A list",
          "incorrect-choice-1": "A dictionary",
          "incorrect-choice-2": "A set",
          "incorrect-choice-3": "A tuple",
          "short-answer-solution": "A list should be used to store the result because it allows for easy appending of valid parentheses combinations.",
          "selected-question": "short",
          "code-line-to-be-revealed": 2,
          "hint-if-incorrect": "Consider a data structure that allows for easy appending of elements.",
          "explanation-after-correct-answer": "A list named 'result' is initialized to store the valid parentheses combinations."
        },
        {
          "context": "The result list is initialized, now we need to initialize the queue.",
          "short-answer-question": "What should the initial state of the queue contain?",
          "mcq-question": "What should the initial state of the queue contain?",
          "correct-choice": "An empty string and four zeros",
          "incorrect-choice-1": "A string with one parenthesis and three zeros",
          "incorrect-choice-2": "Two empty strings and two zeros",
          "incorrect-choice-3": "A string with two parentheses and two zeros",
          "short-answer-solution": "The initial state of the queue should contain an empty string and four zeros representing the counts of opens, closes, max depth, and current depth.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 3,
          "hint-if-incorrect": "Think about the initial state of the parentheses and the counts.",
          "explanation-after-correct-answer": "The queue is initialized with an empty string and four zeros representing the counts of opens, closes, max depth, and current depth."
        }
      ]
    },
    {
      "title": "Process the queue until it's empty",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "The queue is initialized, now we need to process it until it's empty.",
          "short-answer-question": "What loop structure should be used to process the queue?",
          "mcq-question": "What loop structure should be used to process the queue?",
          "correct-choice": "A while loop",
          "incorrect-choice-1": "A for loop",
          "incorrect-choice-2": "A do-while loop",
          "incorrect-choice-3": "A foreach loop",
          "short-answer-solution": "A while loop should be used to process the queue until it's empty.",
          "selected-question": "short",
          "code-line-to-be-revealed": 4,
          "hint-if-incorrect": "Consider a loop that continues until a condition is met.",
          "explanation-after-correct-answer": "A while loop is used to process the queue until it's empty."
        }
      ]
    },
    {
      "title": "Pop elements from the queue and check conditions",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "The while loop is set up, now we need to pop elements from the queue.",
          "short-answer-question": "What method should be used to pop elements from the queue?",
          "mcq-question": "What method should be used to pop elements from the queue?",
          "correct-choice": "pop(0)",
          "incorrect-choice-1": "pop()",
          "incorrect-choice-2": "remove()",
          "incorrect-choice-3": "del()",
          "short-answer-solution": "The pop(0) method should be used to pop elements from the front of the queue.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 5,
          "hint-if-incorrect": "Consider a method that removes the first element of the list.",
          "explanation-after-correct-answer": "The pop(0) method is used to pop elements from the front of the queue."
        },
        {
          "context": "Elements are being popped from the queue, now we need to check if we have a valid combination.",
          "short-answer-question": "What condition should be checked to determine if we have a valid combination?",
          "mcq-question": "What condition should be checked to determine if we have a valid combination?",
          "correct-choice": "opens == n and closes == n",
          "incorrect-choice-1": "opens == n or closes == n",
          "incorrect-choice-2": "opens == closes",
          "incorrect-choice-3": "opens + closes == n",
          "short-answer-solution": "The condition opens == n and closes == n should be checked to determine if we have a valid combination.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 6,
          "hint-if-incorrect": "Consider the condition that indicates all pairs of parentheses are used.",
          "explanation-after-correct-answer": "The condition opens == n and closes == n is checked to determine if we have a valid combination."
        },
        {
          "context": "We have a valid combination, now we need to add it to the result list.",
          "short-answer-question": "What method should be used to add the valid combination to the result list?",
          "mcq-question": "What method should be used to add the valid combination to the result list?",
          "correct-choice": "append()",
          "incorrect-choice-1": "insert()",
          "incorrect-choice-2": "extend()",
          "incorrect-choice-3": "add()",
          "short-answer-solution": "The append() method should be used to add the valid combination to the result list.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 7,
          "hint-if-incorrect": "Consider a method that adds an element to the end of the list.",
          "explanation-after-correct-answer": "The append() method is used to add the valid combination to the result list."
        }
      ]
    },
    {
      "title": "Generate new states and add to the queue",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "We need to handle cases where the current state is not a valid combination.",
          "short-answer-question": "What should be done if the current state is not a valid combination?",
          "mcq-question": "What should be done if the current state is not a valid combination?",
          "correct-choice": "Generate new states",
          "incorrect-choice-1": "Terminate the function",
          "incorrect-choice-2": "Remove the state from the queue",
          "incorrect-choice-3": "Return an error",
          "short-answer-solution": "If the current state is not a valid combination, we should generate new states by adding either an open or close parenthesis.",
          "selected-question": "short",
          "code-line-to-be-revealed": 8,
          "hint-if-incorrect": "Consider what needs to be done to explore other possible combinations.",
          "explanation-after-correct-answer": "If the current state is not a valid combination, new states are generated by adding either an open or close parenthesis."
        },
        {
          "context": "We need to generate new states and add them to the queue if the current state is not valid.",
          "short-answer-question": "What condition should be checked before adding a new open parenthesis?",
          "mcq-question": "What condition should be checked before adding a new open parenthesis?",
          "correct-choice": "opens < n",
          "incorrect-choice-1": "opens > n",
          "incorrect-choice-2": "opens == n",
          "incorrect-choice-3": "opens <= n",
          "short-answer-solution": "The condition opens < n should be checked before adding a new open parenthesis.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 9,
          "hint-if-incorrect": "Consider the maximum number of open parentheses allowed.",
          "explanation-after-correct-answer": "The condition opens < n is checked before adding a new open parenthesis."
        },
        {
          "context": "We need to calculate the new maximum depth before adding a new open parenthesis.",
          "short-answer-question": "What function should be used to calculate the new maximum depth?",
          "mcq-question": "What function should be used to calculate the new maximum depth?",
          "correct-choice": "max()",
          "incorrect-choice-1": "min()",
          "incorrect-choice-2": "sum()",
          "incorrect-choice-3": "len()",
          "short-answer-solution": "The max() function should be used to calculate the new maximum depth.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 10,
          "hint-if-incorrect": "Consider a function that returns the larger of two values.",
          "explanation-after-correct-answer": "The max() function is used to calculate the new maximum depth."
        },
        {
          "context": "We need to check if the new maximum depth is within the allowed depth before adding a new open parenthesis.",
          "short-answer-question": "What condition should be checked before adding a new open parenthesis?",
          "mcq-question": "What condition should be checked before adding a new open parenthesis?",
          "correct-choice": "new_max_d <= d",
          "incorrect-choice-1": "new_max_d >= d",
          "incorrect-choice-2": "new_max_d == d",
          "incorrect-choice-3": "new_max_d < d",
          "short-answer-solution": "The condition new_max_d <= d should be checked before adding a new open parenthesis.",
          "selected-question": "short",
          "code-line-to-be-revealed": 11,
          "hint-if-incorrect": "Consider the maximum depth allowed.",
          "explanation-after-correct-answer": "The condition new_max_d <= d is checked before adding a new open parenthesis."
        },
        {
          "context": "We need to add the new state with an open parenthesis to the queue.",
          "short-answer-question": "What should be appended to the queue for a new open parenthesis?",
          "mcq-question": "What should be appended to the queue for a new open parenthesis?",
          "correct-choice": "(s + '(', opens + 1, closes, new_max_d, cur_d + 1)",
          "incorrect-choice-1": "(s + ')', opens + 1, closes, new_max_d, cur_d + 1)",
          "incorrect-choice-2": "(s + '(', opens, closes + 1, new_max_d, cur_d + 1)",
          "incorrect-choice-3": "(s + '(', opens + 1, closes, new_max_d, cur_d - 1)",
          "short-answer-solution": "The list [s + '(', opens + 1, closes, new_max_d, cur_d + 1] should be appended to the queue for a new open parenthesis.",
          "selected-question": "short",
          "code-line-to-be-revealed": 12,
          "hint-if-incorrect": "Consider the changes needed for an open parenthesis.",
          "explanation-after-correct-answer": "The list [s + '(', opens + 1, closes, new_max_d, cur_d + 1] is appended to the queue for a new open parenthesis."
        },
        {
          "context": "We need to check if we can add a new close parenthesis.",
          "short-answer-question": "What conditions should be checked before adding a new close parenthesis?",
          "mcq-question": "What conditions should be checked before adding a new close parenthesis?",
          "correct-choice": "closes < opens and max_d <= d",
          "incorrect-choice-1": "closes > opens and max_d <= d",
          "incorrect-choice-2": "closes < opens and max_d >= d",
          "incorrect-choice-3": "closes == opens and max_d <= d",
          "short-answer-solution": "The conditions closes < opens and max_d <= d should be checked before adding a new close parenthesis.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 13,
          "hint-if-incorrect": "Consider the conditions for adding a close parenthesis.",
          "explanation-after-correct-answer": "The conditions closes < opens and max_d <= d are checked before adding a new close parenthesis."
        },
        {
          "context": "We need to add the new state with a close parenthesis to the queue.",
          "short-answer-question": "What should be appended to the queue for a new close parenthesis?",
          "mcq-question": "What should be appended to the queue for a new close parenthesis?",
          "correct-choice": "[s + ')', opens, closes + 1, max_d, cur_d - 1]",
          "incorrect-choice-1": "[s + '(', opens, closes + 1, max_d, cur_d - 1]",
          "incorrect-choice-2": "[s + ')', opens + 1, closes, max_d, cur_d - 1]",
          "incorrect-choice-3": "[s + ')', opens, closes + 1, max_d, cur_d + 1]",
          "short-answer-solution": "The list [s + ')', opens, closes + 1, max_d, cur_d - 1] should be appended to the queue for a new close parenthesis.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 14,
          "hint-if-incorrect": "Consider the changes needed for a close parenthesis.",
          "explanation-after-correct-answer": "The list [s + ')', opens, closes + 1, max_d, cur_d - 1] is appended to the queue for a new close parenthesis."
        }
      ]
    },
    {
      "title": "Return the result list",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We have processed all possible states, now we need to return the result list.",
          "short-answer-question": "What should the function return?",
          "mcq-question": "What should the function return?",
          "correct-choice": "The result list",
          "incorrect-choice-1": "The queue",
          "incorrect-choice-2": "The initial state",
          "incorrect-choice-3": "The maximum depth",
          "short-answer-solution": "The function should return the result list containing all valid parentheses combinations.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 15,
          "hint-if-incorrect": "Consider what contains the valid parentheses combinations.",
          "explanation-after-correct-answer": "The function returns the result list containing all valid parentheses combinations."
        }
      ]
    },
    {
      "title": "Test the function with an example",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to test the function to ensure it works correctly.",
          "short-answer-question": "What would be the output of the function given the test input 2 and 2?",
          "mcq-question": "What parameters should be used to test the function?",
          "correct-choice": "2 and 2",
          "incorrect-choice-1": "3 and 3",
          "incorrect-choice-2": "1 and 1",
          "incorrect-choice-3": "4 and 4",
          "short-answer-solution": "['(())', '()()']",
          "selected-question": "short",
          "code-line-to-be-revealed": 16,
          "hint-if-incorrect": "Consider the number of pairs of parentheses and the maximum depth.",
          "explanation-after-correct-answer": "The output of the function with input 2 and 2 is ['(())', '()()']."
        }
      ]
    }
  ]
}

export const task2Decomposition = {
  "subgoals": [
    {
      "title": "Define the function and initialize variables",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to define a function that takes a string as input.",
          "short-answer-question": "What should be the input type and return type of the function?",
          "mcq-question": "What should be the input type and return type of the function?",
          "correct-choice": "Input: str, Return: int",
          "incorrect-choice-1": "Input: list, Return: int",
          "incorrect-choice-2": "Input: str, Return: str",
          "incorrect-choice-3": "Input: int, Return: str",
          "short-answer-solution": "The function should take a string as input and return an integer representing the length of the longest valid parenthesis substring.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 1,
          "hint-if-incorrect": "Think about the type of data the function will process and what it needs to return.",
          "explanation-after-correct-answer": "The function definition specifies that it takes a string and returns an integer.",
        },
        {
          "context": "We need to map opening brackets to their corresponding closing brackets.",
          "short-answer-question": "Why do we need a map of opening to closing brackets?",
          "mcq-question": "Why do we need a map of opening to closing brackets?",
          "correct-choice": "To check for matching pairs",
          "incorrect-choice-1": "To count the brackets",
          "incorrect-choice-2": "To store indices of brackets",
          "incorrect-choice-3": "To sort the brackets",
          "short-answer-solution": "A map helps in checking if an opening bracket has a corresponding closing bracket, ensuring valid pairs.",
          "selected-question": "short",
          "code-line-to-be-revealed": 2,
          "hint-if-incorrect": "Consider how you would verify if a closing bracket matches an opening bracket.",
          "explanation-after-correct-answer": "The map helps in checking if an opening bracket has a corresponding closing bracket, ensuring valid pairs.",
        },
        {
          "context": "We need to initialize a stack to keep track of indices.",
          "short-answer-question": "Why do we initialize the stack with -1?",
          "mcq-question": "Why do we initialize the stack with -1?",
          "correct-choice": "To handle the base case for valid substrings",
          "incorrect-choice-1": "To mark the end of the string",
          "incorrect-choice-2": "To store the length of the string",
          "incorrect-choice-3": "To indicate an invalid index",
          "short-answer-solution": "Initializing the stack with -1 helps in calculating the length of valid substrings from the beginning of the string.",
          "selected-question": "short",
          "code-line-to-be-revealed": 3,
          "hint-if-incorrect": "Think about how you would calculate the length of a valid substring starting from the beginning.",
          "explanation-after-correct-answer": "Initializing the stack with -1 helps in calculating the length of valid substrings from the beginning of the string.",
        },
        {
          "context": "We need to keep track of the maximum length of valid substrings.",
          "short-answer-question": "What initial value should max_length have?",
          "mcq-question": "What initial value should max_length have?",
          "correct-choice": "0",
          "incorrect-choice-1": "1",
          "incorrect-choice-2": "len(s)",
          "incorrect-choice-3": "-1",
          "short-answer-solution": "The initial value of max_length should be 0 because we haven't found any valid substrings yet.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 4,
          "hint-if-incorrect": "Consider the initial state before any valid substrings are found.",
          "explanation-after-correct-answer": "The initial value of max_length should be 0 because we haven't found any valid substrings yet.",
        }
      ]
    },
    {
      "title": "Iterate through the string and process each character",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to iterate through each character in the string.",
          "short-answer-question": "What loop structure should we use to iterate through the string?",
          "mcq-question": "What loop structure should be more efficient to use to iterate through the string?",
          "correct-choice": "for loop",
          "incorrect-choice-1": "while loop",
          "incorrect-choice-2": "do-while loop",
          "incorrect-choice-3": "foreach loop",
          "short-answer-solution": "A for loop is suitable for iterating through each character in the string by index.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 5,
          "hint-if-incorrect": "Consider the most common loop structure for iterating through a sequence by index.",
          "explanation-after-correct-answer": "A for loop is suitable for iterating through each character in the string by index.",
        },
        {
          "context": "We need to get the current character in the string.",
          "short-answer-question": "How do we access the current character in the string?",
          "mcq-question": "How do we access the current character in the string?",
          "correct-choice": "s[i]",
          "incorrect-choice-1": "s.charAt(i)",
          "incorrect-choice-2": "s[i:i+1]",
          "incorrect-choice-3": "s.get(i)",
          "short-answer-solution": "We access the current character in the string using s[i], where i is the index.",
          "selected-question": "short",
          "code-line-to-be-revealed": 6,
          "hint-if-incorrect": "Think about how you would access an element in a list by index.",
          "explanation-after-correct-answer": "We access the current character in the string using s[i], where i is the index.",
        }
      ]
    },
    {
      "title": "Process opening and closing brackets",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to check if the current character is an opening bracket.",
          "short-answer-question": "How do we check if the current character is an opening bracket?",
          "mcq-question": "How do we check if the current character is an opening bracket?",
          "correct-choice": "char in map",
          "incorrect-choice-1": "char == '('",
          "incorrect-choice-2": "char.is_opening()",
          "incorrect-choice-3": "char in '({['",
          "short-answer-solution": "We check if the current character is an opening bracket by checking if it is in the map.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 7,
          "hint-if-incorrect": "Consider how you would check if a character is in a dictionary.",
          "explanation-after-correct-answer": "We check if the current character is an opening bracket by checking if it is in the map.",
        },
        {
          "context": "We need to handle the case where the current character is an opening bracket.",
          "short-answer-question": "What should we do if the current character is an opening bracket?",
          "mcq-question": "What should we do if the current character is an opening bracket?",
          "correct-choice": "Push its index onto the stack",
          "incorrect-choice-1": "Push the character onto the stack",
          "incorrect-choice-2": "Increment max_length",
          "incorrect-choice-3": "Pop the stack",
          "short-answer-solution": "If the current character is an opening bracket, we push its index onto the stack to keep track of it.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 8,
          "hint-if-incorrect": "Think about how you would keep track of the position of opening brackets.",
          "explanation-after-correct-answer": "If the current character is an opening bracket, we push its index onto the stack to keep track of it.",
        },
      ]
    },
    {
      "title": "Process closing brackets and update max_length",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "else",
          "short-answer-question": "What is the other possibility of the current character?",
          "mcq-question": "What is the other possibility of the current character?",
          "correct-choice": "Closing bracket",
          "incorrect-choice-1": "Opening bracket",
          "incorrect-choice-2": "Alphanumeric character",
          "incorrect-choice-3": "Special character",
          "short-answer-solution": "The other possibility of the current character is a closing bracket.",
          "code-line-to-be-revealed": 9,
          "selected-question": "short",
          "hint-if-incorrect": "Consider what the character could be if it's not an opening bracket.",
          "explanation-after-correct-answer": "The other possibility of the current character is a closing bracket.",
        },
        {
          "context": "We need to handle the case where the current character is a closing bracket.",
          "short-answer-question": "What should we check before processing a closing bracket?",
          "mcq-question": "What should we check before processing a closing bracket?",
          "correct-choice": "If the stack is not empty",
          "incorrect-choice-1": "If the stack is empty",
          "incorrect-choice-2": "If max_length is zero",
          "incorrect-choice-3": "If the character is in the map",
          "short-answer-solution": "Before processing a closing bracket, we should check if the stack is not empty to ensure there is an opening bracket to match.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 10,
          "hint-if-incorrect": "Consider what needs to be true for a closing bracket to have a matching opening bracket.",
          "explanation-after-correct-answer": "Before processing a closing bracket, we should check if the stack is not empty to ensure there is an opening bracket to match.",
        },
        {
          "context": "We need to check if the last item in the stack is an opening bracket.",
          "short-answer-question": "How do we check if the last item in the stack is an opening bracket?",
          "mcq-question": "How do we check if the last item in the stack is an opening bracket?",
          "correct-choice": "s[stack[-1]] in map",
          "incorrect-choice-1": "stack[-1] in map",
          "incorrect-choice-2": "s[stack[-1]] == '('",
          "incorrect-choice-3": "stack[-1] == '('",
          "short-answer-solution": "We check if the last item in the stack is an opening bracket by checking if s[stack[-1]] is in the map.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 11,
          "hint-if-incorrect": "Consider how you would access the last item in the stack and check if it is an opening bracket.",
          "explanation-after-correct-answer": "We check if the last item in the stack is an opening bracket by checking if s[stack[-1]] is in the map.",
        },
        {
          "context": "We need to check if the current closing bracket matches the last opening bracket.",
          "short-answer-question": "How do we check if the current closing bracket matches the last opening bracket?",
          "mcq-question": "How do we check if the current closing bracket matches the last opening bracket?",
          "correct-choice": "map[s[stack[-1]]] == char",
          "incorrect-choice-1": "map[stack[-1]] == char",
          "incorrect-choice-2": "s[stack[-1]] == char",
          "incorrect-choice-3": "map[char] == s[stack[-1]]",
          "short-answer-solution": "We check if the current closing bracket matches the last opening bracket by comparing map[s[stack[-1]]] with char.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 12,
          "hint-if-incorrect": "Consider how you would use the map to check if the brackets match.",
          "explanation-after-correct-answer": "We check if the current closing bracket matches the last opening bracket by comparing map[s[stack[-1]]] with char.",
        },
      ]
    },
    {
      "title": "Consider the value of not_empty and is_match",
      "indent-level": 3,
      "leading-questions": [
        {
          "context": "We need to consider the value of not empty and is_match",
          "short-answer-question": "What would happen if not empty and is_match are both true?",
          "mcq-question": "What would happen if not empty and is_match are both true?",
          "correct-choice": "Pop the stack and update max_length",
          "incorrect-choice-1": "Push the closing bracket onto the stack",
          "incorrect-choice-2": "Increment max_length",
          "incorrect-choice-3": "Reset the stack",
          "short-answer-solution": "If not empty and is_match are both true, we pop the stack and update max_length.",
          "selected-question": "short",
          "code-line-to-be-revealed": 13,
          "hint-if-incorrect": "Think about how you would handle a matching pair of brackets.",
          "explanation-after-correct-answer": "If not empty and is_match are both true, we pop the stack and update max_length.",
        },
        {
          "context": "We need to handle the case where the current closing bracket matches the last opening bracket.",
          "short-answer-question": "What should we do if the current closing bracket matches the last opening bracket?",
          "mcq-question": "What should we do if the current closing bracket matches the last opening bracket?",
          "correct-choice": "Pop the stack and update max_length",
          "incorrect-choice-1": "Push the closing bracket onto the stack",
          "incorrect-choice-2": "Increment max_length",
          "incorrect-choice-3": "Reset the stack",
          "short-answer-solution": "If the current closing bracket matches the last opening bracket, we pop the stack and update max_length.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 14,
          "hint-if-incorrect": "Think about how you would handle a matching pair of brackets.",
          "explanation-after-correct-answer": "If the current closing bracket matches the last opening bracket, we pop the stack and update max_length.",
        },
        {
          "context": "We need to update the maximum length of valid substrings.",
          "short-answer-question": "How do we update the maximum length of valid substrings?",
          "mcq-question": "How do we update the maximum length of valid substrings?",
          "correct-choice": "max_length = max(max_length, i - stack[-1])",
          "incorrect-choice-1": "max_length += 1",
          "incorrect-choice-2": "max_length = i - stack[-1]",
          "incorrect-choice-3": "max_length = max(max_length, i)",
          "short-answer-solution": "We update the maximum length of valid substrings by calculating the difference between the current index and the last unmatched index.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 15,
          "hint-if-incorrect": "Consider how you would calculate the length of the current valid substring.",
          "explanation-after-correct-answer": "We update the maximum length of valid substrings by calculating the difference between the current index and the last unmatched index.",
        },
        {
          "context": "Consider other values of not_empty and is_match",
          "short-answer-question": "What are the other values of not_empty and is_match?",
          "mcq-question": "What are the other values of not_empty and is_match?",
          "correct-choice": "at least one not_empty and is_match is false",
          "incorrect-choice-1": "both not_empty and is_match are false",
          "incorrect-choice-2": "not_empty is true and is_match is false",
          "incorrect-choice-3": "not_empty is false and is_match is true",
          "short-answer-solution": "If at least one of not_empty and is_match is false, we do not update max_length.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 16,
          "hint-if-incorrect": "Consider the nagation of the if statement on line 13",
          "explanation-after-correct-answer": "If at least one of not_empty and is_match is false, we do not update max_length.",
        },
        {
          "context": "We need to handle the case where the current closing bracket does not match the last opening bracket.",
          "short-answer-question": "What should we do if the current closing bracket does not match the last opening bracket?",
          "short-answer-solution": "If the current closing bracket does not match the last opening bracket, we update the last unmatched index to the current index.",
          "mcq-question": "What should we do if the current closing bracket does not match the last opening bracket?",
          "correct-choice": "Update the last unmatched index",
          "incorrect-choice-1": "Pop the stack",
          "incorrect-choice-2": "Increment max_length",
          "incorrect-choice-3": "Push the closing bracket onto the stack",
          "selected-question": "short",
          "code-line-to-be-revealed": 17,
          "hint-if-incorrect": "Think about how you would handle an unmatched closing bracket.",
          "explanation-after-correct-answer": "If the current closing bracket does not match the last opening bracket, we update the last unmatched index to the current index.",
        }
      ]
    },
    {
      "title": "Return the maximum length of valid substrings",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to return the maximum length of valid substrings.",
          "short-answer-question": "What should the function return?",
          "mcq-question": "What should the function return?",
          "correct-choice": "max_length",
          "incorrect-choice-1": "len(stack)",
          "incorrect-choice-2": "i",
          "incorrect-choice-3": "s",
          "short-answer-solution": "The function should return max_length, which stores the length of the longest valid parenthesis substring.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 18,
          "hint-if-incorrect": "Consider what variable stores the length of the longest valid substring.",
          "explanation-after-correct-answer": "The function should return max_length, which stores the length of the longest valid parenthesis substring.",
        }
      ]
    },
    {
      "title": "Test the function with an example",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to test the function with an example input.",
          "short-answer-question": "What is the expected output for the input '(()'?",
          "mcq-question": "What is the expected output for the input '(()'?",
          "correct-choice": "2",
          "incorrect-choice-1": "3",
          "incorrect-choice-2": "1",
          "incorrect-choice-3": "0",
          "short-answer-solution": "The expected output for the input '(()' is 2, as the longest valid parenthesis substring is '()'.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 19,
          "hint-if-incorrect": "Consider the length of the longest valid parenthesis substring in the input '(()'.",
          "explanation-after-correct-answer": "The expected output for the input '(()' is 2, as the longest valid parenthesis substring is '()'.",
        }
      ]
    }
  ]
}

export const task3Decomposition = {
  "subgoals": [
    {
      "title": "Define the sliding_window_maximum function",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to define a function that takes a list of integers and an integer k.",
          "short-answer-question": "What should the function signature look like for this task?",
          "mcq-question": "What should the function signature look like?",
          "correct-choice": "def sliding_window_maximum(nums: list[int], k: int) -> list[int]:",
          "incorrect-choice-1": "def sliding_window_maximum(nums: list[int], k: int) -> int:",
          "incorrect-choice-2": "def sliding_window_maximum(nums: list[int], k: int) -> None:",
          "incorrect-choice-3": "def sliding_window_maximum(nums: list[int], k: int) -> list[str]:",
          "short-answer-solution": "The function should be defined as def sliding_window_maximum(nums: list[int], k: int) -> list[int]: because it takes a list of integers and an integer k, and returns a list of integers.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 1,
          "hint-if-incorrect": "Think about the input and output types.",
          "explanation-after-correct-answer": "The function signature specifies that the function takes a list of integers and an integer k, and returns a list of integers."
        }
      ]
    },
    {
      "title": "Initialize deque and result list",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to initialize a deque and a result list to store indices and results respectively.",
          "short-answer-question": "Why do we need to initialize a deque and a result list?",
          "mcq-question": "Why do we need to initialize a deque and a result list?",
          "correct-choice": "To store indices and results respectively",
          "incorrect-choice-1": "To store the maximum values directly",
          "incorrect-choice-2": "To store the input list and k",
          "incorrect-choice-3": "To store temporary values and intermediate results",
          "short-answer-solution": "We need a deque to store indices of elements in the current window and a result list to store the maximum values of each window.",
          "selected-question": "short",
          "code-line-to-be-revealed": 2,
          "hint-if-incorrect": "Think about what data structures are needed for the sliding window approach.",
          "explanation-after-correct-answer": "The deque will store indices of elements in the current window, and the result list will store the maximum values of each window."
        },
        {
          "context": "We need to initialize a deque and a result list to store indices and results respectively.",
          "short-answer-question": "What should the initial values of the deque and result list be?",
          "mcq-question": "What should the initial values of the deque and result list be?",
          "correct-choice": "Both should be empty",
          "incorrect-choice-1": "Deque should be empty, result list should have one element",
          "incorrect-choice-2": "Deque should have one element, result list should be empty",
          "incorrect-choice-3": "Both should have one element",
          "short-answer-solution": "Both the deque and the result list should be initialized as empty because we will populate them as we iterate through the input list.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 3,
          "hint-if-incorrect": "Think about the initial state before any processing is done.",
          "explanation-after-correct-answer": "Both the deque and the result list are initialized as empty because they will be populated during the iteration through the input list."
        }
      ]
    },
    {
      "title": "Iterate through the input list",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to iterate through the input list to process each element.",
          "short-answer-question": "How should we iterate through the input list?",
          "mcq-question": "How should we iterate through the input list?",
          "correct-choice": "Using a for loop with enumerate",
          "incorrect-choice-1": "Using a while loop",
          "incorrect-choice-2": "Using a for loop with range",
          "incorrect-choice-3": "Using a list comprehension",
          "short-answer-solution": "We should use a for loop with enumerate to get both the index and the value of each element in the input list.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 4,
          "hint-if-incorrect": "Think about how to get both the index and the value of each element.",
          "explanation-after-correct-answer": "Using a for loop with enumerate allows us to get both the index and the value of each element in the input list."
        }
      ]
    },
    {
      "title": "Remove indices outside the current window",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "We need to remove indices from the deque that are outside the current window.",
          "short-answer-question": "What condition should we check to remove indices outside the current window?",
          "mcq-question": "What condition should we check to remove indices outside the current window?",
          "correct-choice": "dq and dq[0] < i - k + 1",
          "incorrect-choice-1": "dq and dq[0] > i - k + 1",
          "incorrect-choice-2": "dq and dq[-1] < i - k + 1",
          "incorrect-choice-3": "dq and dq[-1] > i - k + 1",
          "short-answer-solution": "We should check if the deque is not empty and if the first element in the deque is less than the current index minus k plus 1.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 5,
          "hint-if-incorrect": "Think about the condition that determines if an index is outside the current window.",
          "explanation-after-correct-answer": "We check if the deque is not empty and if the first element in the deque is less than the current index minus k plus 1 to remove indices outside the current window."
        },
        {
          "context": "We need to remove indices from the deque that are outside the current window.",
          "short-answer-question": "What should we do if the condition is met?",
          "mcq-question": "What should we do if the condition is met?",
          "correct-choice": "Remove the first element from the deque",
          "incorrect-choice-1": "Remove the last element from the deque",
          "incorrect-choice-2": "Add the current index to the deque",
          "incorrect-choice-3": "Add the current value to the deque",
          "short-answer-solution": "If the condition is met, we should remove the first element from the deque because it is outside the current window.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 6,
          "hint-if-incorrect": "Think about what needs to be removed from the deque.",
          "explanation-after-correct-answer": "We remove the first element from the deque if it is outside the current window to maintain the correct window size."
        }
      ]
    },
    {
      "title": "Remove smaller elements from the deque",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "We need to remove elements from the deque that are smaller than the current element.",
          "short-answer-question": "What condition should we check to remove smaller elements from the deque?",
          "mcq-question": "What condition should we check to remove smaller elements from the deque?",
          "correct-choice": "dq and nums[dq[-1]] < n",
          "incorrect-choice-1": "dq and nums[dq[-1]] > n",
          "incorrect-choice-2": "dq and nums[dq[0]] < n",
          "incorrect-choice-3": "dq and nums[dq[0]] > n",
          "short-answer-solution": "We should check if the deque is not empty and if the last element in the deque is smaller than the current element.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 7,
          "hint-if-incorrect": "Think about the condition that determines if an element is smaller than the current element.",
          "explanation-after-correct-answer": "We check if the deque is not empty and if the last element in the deque is smaller than the current element to remove smaller elements."
        },
        {
          "context": "We need to remove elements from the deque that are smaller than the current element.",
          "short-answer-question": "What should we do if the condition is met?",
          "mcq-question": "What should we do if the condition is met?",
          "correct-choice": "Remove the last element from the deque",
          "incorrect-choice-1": "Remove the first element from the deque",
          "incorrect-choice-2": "Add the current index to the deque",
          "incorrect-choice-3": "Add the current value to the deque",
          "short-answer-solution": "If the condition is met, we should remove the last element from the deque because it is smaller than the current element.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 8,
          "hint-if-incorrect": "Think about what needs to be removed from the deque.",
          "explanation-after-correct-answer": "We remove the last element from the deque if it is smaller than the current element to maintain the correct order."
        },
        {
          "context": "We need to add the current index to the deque.",
          "short-answer-question": "Where should we do with the current index in the deque?",
          "mcq-question": "Where should we add the current index in the deque?",
          "correct-choice": "At the end of the deque",
          "incorrect-choice-1": "At the beginning of the deque",
          "incorrect-choice-2": "In the middle of the deque",
          "incorrect-choice-3": "At a random position in the deque",
          "short-answer-solution": "We should add the current index at the end of the deque to maintain the order of indices.",
          "selected-question": "short",
          "code-line-to-be-revealed": 9,
          "hint-if-incorrect": "Think about the order of indices in the deque.",
          "explanation-after-correct-answer": "We add the current index at the end of the deque to maintain the order of indices."
        }
      ]
    },
    {
      "title": "Add maximum value to the result list",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "We need to add the maximum value of the current window to the result list.",
          "short-answer-question": "What condition should we check before adding the maximum value to the result list?",
          "mcq-question": "What condition should we check before adding the maximum value to the result list?",
          "correct-choice": "i >= k - 1",
          "incorrect-choice-1": "i > k - 1",
          "incorrect-choice-2": "i <= k - 1",
          "incorrect-choice-3": "i < k - 1",
          "short-answer-solution": "We should check if the current index is greater than or equal to k - 1 to ensure that we have a complete window.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 10,
          "hint-if-incorrect": "Think about when we have a complete window.",
          "explanation-after-correct-answer": "We check if the current index is greater than or equal to k - 1 to ensure that we have a complete window before adding the maximum value to the result list."
        },
        {
          "context": "We need to add the maximum value of the current window to the result list.",
          "short-answer-question": "How do we get the maximum value of the current window?",
          "mcq-question": "How do we get the maximum value of the current window?",
          "correct-choice": "nums[dq[0]]",
          "incorrect-choice-1": "nums[dq[-1]]",
          "incorrect-choice-2": "nums[dq[1]]",
          "incorrect-choice-3": "nums[dq[-2]]",
          "short-answer-solution": "We get the maximum value of the current window by accessing the element at the index stored at the front of the deque.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 11,
          "hint-if-incorrect": "Think about the position of the maximum value in the deque.",
          "explanation-after-correct-answer": "We get the maximum value of the current window by accessing the element at the index stored at the front of the deque and add it to the result list."
        }
      ]
    },
    {
      "title": "Return the result list",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to return the result list after processing all elements.",
          "short-answer-question": "What should we return at the end of the function?",
          "mcq-question": "What should we return at the end of the function?",
          "correct-choice": "The result list",
          "incorrect-choice-1": "The deque",
          "incorrect-choice-2": "The input list",
          "incorrect-choice-3": "The last element of the result list",
          "short-answer-solution": "We should return the result list which contains the maximum values of each sliding window.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 12,
          "hint-if-incorrect": "Think about what we have been storing the results in.",
          "explanation-after-correct-answer": "We return the result list which contains the maximum values of each sliding window."
        }
      ]
    },
    {
      "title": "Test the function with an example",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to test the function with an example input.",
          "short-answer-question": "What should the output be with the input [1, 3, -1, -3, 5, 3, 6, 7] and k = 3?",
          "mcq-question": "What should the test input be?",
          "correct-choice": "[1, 3, -1, -3, 5, 3, 6, 7], 3",
          "incorrect-choice-1": "[1, 3, -1, -3, 5, 3, 6, 7], 2",
          "incorrect-choice-2": "[1, 3, -1, -3, 5, 3, 6, 7], 4",
          "incorrect-choice-3": "[1, 3, -1, -3, 5, 3, 6, 7], 1",
          "short-answer-solution": "[3, 3, 5, 5, 6, 7]",
          "selected-question": "short",
          "code-line-to-be-revealed": 13,
          "hint-if-incorrect": "Think about the example given in the task description.",
          "explanation-after-correct-answer": "[1, 3, -1] -> max is 3, [3, -1, -3] -> max is 3, [-1, -3, 5] -> max is 5, [-3, 5, 3] -> max is 5, [5, 3, 6] -> max is 6, [3, 6, 7] -> max is 7"
        }
      ]
    }
  ]
}


export const tech2WarmupDecomposition = {
  "subgoals": [
    {
      "title": "Define the function and its parameters",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to define a function that will reverse a list using a stack.",
          "short-answer-question": "What should be the input and output types for this function?",
          "mcq-question": "What type should the input parameter be?",
          "correct-choice": "A list",
          "incorrect-choice-1": "A string",
          "incorrect-choice-2": "An integer",
          "incorrect-choice-3": "A dictionary",
          "short-answer-solution": "The input should be a list, and the output should also be a list. This is because we are reversing the elements of a list.",
          "selected-question": "short",
          "code-line-to-be-revealed": 1,
          "hint-if-incorrect": "Think about the data structure that holds multiple elements.",
          "explanation-after-correct-answer": "The function is defined to take a list as input and return a list. This is appropriate for reversing a list."
        }
      ]
    },
    {
      "title": "Initialize an empty list for the result and create copy use stack",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need a place to store the reversed elements.",
          "short-answer-question": "What data structure should we use to store the reversed elements?",
          "mcq-question": "What data structure is suitable for storing the reversed elements?",
          "correct-choice": "A list",
          "incorrect-choice-1": "A set",
          "incorrect-choice-2": "A dictionary",
          "incorrect-choice-3": "A tuple",
          "short-answer-solution": "We should use a list to store the reversed elements because lists are ordered and allow for appending elements.",
          "selected-question": "short",
          "code-line-to-be-revealed": 2,
          "hint-if-incorrect": "Consider a data structure that maintains order and allows appending.",
          "explanation-after-correct-answer": "An empty list named 'reversed_list' is initialized to store the elements in reverse order."
        },
        {
          "context": "We need to use a stack to reverse the list.",
          "short-answer-question": "How can we create a copy of the input list to use as a stack?",
          "mcq-question": "What method can be used to create a copy of the input list?",
          "correct-choice": "Using slicing (input_list[:])",
          "incorrect-choice-1": "Using the copy() method",
          "incorrect-choice-2": "Using the deepcopy() method",
          "incorrect-choice-3": "Using the list() constructor",
          "short-answer-solution": "We can create a copy of the input list using slicing (input_list[:]). This allows us to manipulate the copy without affecting the original list.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 3,
          "hint-if-incorrect": "Think about a method that creates a shallow copy of the list.",
          "explanation-after-correct-answer": "A copy of the input list is created using slicing and assigned to the variable 'stack'. This allows us to manipulate the stack without affecting the original list."
        }
      ]
    },
    {
      "title": "Iterate while the stack is not empty",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to process each element in the stack until it is empty.",
          "short-answer-question": "What condition should we check to continue processing elements from the stack?",
          "mcq-question": "What condition should be used to keep iterating?",
          "correct-choice": "while stack:",
          "incorrect-choice-1": "while input_list:",
          "incorrect-choice-2": "while reversed_list:",
          "incorrect-choice-3": "while True:",
          "short-answer-solution": "We should use 'while stack:' to keep iterating as long as there are elements in the stack.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 4,
          "hint-if-incorrect": "Consider the condition that checks if the stack is not empty.",
          "explanation-after-correct-answer": "The while loop continues to iterate as long as there are elements in the stack."
        },
        {
          "context": "We need to move elements from the stack to the reversed list.",
          "short-answer-question": "What operation should we perform to remove the top element from the stack?",
          "mcq-question": "Which method removes the last element from a list?",
          "correct-choice": "pop()",
          "incorrect-choice-1": "remove()",
          "incorrect-choice-2": "delete()",
          "incorrect-choice-3": "discard()",
          "short-answer-solution": "We should use the pop() method to remove the last element from the stack and append it to the reversed list.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 5,
          "hint-if-incorrect": "Think about the method that removes and returns the last element of a list.",
          "explanation-after-correct-answer": "The pop() method removes the last element from the stack and appends it to the reversed list."
        }
      ]
    },
    {
      "title": "Return the reversed list",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to return the final reversed list.",
          "short-answer-question": "What should the function return after processing all elements?",
          "mcq-question": "What should be returned by the function?",
          "correct-choice": "The reversed list",
          "incorrect-choice-1": "The original list",
          "incorrect-choice-2": "The stack",
          "incorrect-choice-3": "None",
          "short-answer-solution": "The function should return the reversed list after all elements have been processed.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 6,
          "hint-if-incorrect": "Consider what the final output of the function should be.",
          "explanation-after-correct-answer": "The function returns the reversed list, which contains the elements in reverse order."
        }
      ]
    },
    {
      "title": "Call the function with a sample list",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to test the function with a sample input list.",
          "short-answer-question": "What should be the output list to test the function given the input [1, 2, 3, 4, 5]?",
          "mcq-question": "What is a suitable sample input list to test the function?",
          "correct-choice": "[1, 2, 3, 4, 5]",
          "incorrect-choice-1": "[5, 4, 3, 2, 1]",
          "incorrect-choice-2": "[1, 3, 5, 7, 9]",
          "incorrect-choice-3": "[2, 4, 6, 8, 10]",
          "short-answer-solution": "The output list would be [5, 4, 3, 2, 1] to test if the function correctly reverses the input list.",
          "selected-question": "short",
          "code-line-to-be-revealed": 7,
          "hint-if-incorrect": "Consider a simple, ordered list to test the function.",
          "explanation-after-correct-answer": "The output list would be [5, 4, 3, 2, 1] to test if the function correctly reverses the input list."
        }
      ]
    }
  ]
}

export const tech3WarmupDecomposition = {
  "subgoals": [
    {
      "title": "Define the function and its input",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to define a function that checks if a string is a palindrome.",
          "short-answer-question": "What type of input should the function accept?",
          "mcq-question": "What type of input should the function accept?",
          "correct-choice": "A string",
          "incorrect-choice-1": "An integer",
          "incorrect-choice-2": "A list",
          "incorrect-choice-3": "A boolean",
          "short-answer-solution": "The function should accept a string as input because we need to check if the sequence of characters reads the same backward as forward.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 1,
          "hint-if-incorrect": "Think about the type of data that can be read forward and backward.",
          "explanation-after-correct-answer": "The function is defined to accept a string input, which is necessary for checking if the sequence of characters is a palindrome."
        }
      ]
    },
    {
      "title": "Convert the string to a list",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "The function has been defined to accept a string input.",
          "short-answer-question": "Why do we need to convert the string to a list?",
          "mcq-question": "Why do we need to convert the string to a list?",
          "correct-choice": "To easily access and remove characters",
          "incorrect-choice-1": "To sort the characters",
          "incorrect-choice-2": "To count the characters",
          "incorrect-choice-3": "To reverse the string",
          "short-answer-solution": "Converting the string to a list allows us to easily access and remove characters from both ends, which is necessary for checking if the string is a palindrome.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 2,
          "hint-if-incorrect": "Think about operations that are easier to perform on lists than on strings.",
          "explanation-after-correct-answer": "The string is converted to a list to facilitate easy access and removal of characters from both ends."
        }
      ]
    },
    {
      "title": "Set up a loop to check characters",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "The string has been converted to a list for easier manipulation.",
          "short-answer-question": "What condition should the loop check for?",
          "mcq-question": "What condition should the loop check for?",
          "correct-choice": "Length of the list is greater than 1",
          "incorrect-choice-1": "List is not empty",
          "incorrect-choice-2": "Length of the list is greater than 0",
          "incorrect-choice-3": "List contains only letters",
          "short-answer-solution": "The loop should continue as long as the length of the list is greater than 1, because we need to compare characters from both ends until we reach the middle.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 3,
          "hint-if-incorrect": "Consider when we should stop comparing characters from both ends.",
          "explanation-after-correct-answer": "The loop continues as long as the length of the list is greater than 1, allowing us to compare characters from both ends."
        }
      ]
    },
    {
      "title": "Compare characters from both ends",
      "indent-level": 2,
      "leading-questions": [
        {
          "context": "The loop is set up to run while the length of the list is greater than 1.",
          "short-answer-question": "What should we do if the characters from both ends do not match?",
          "mcq-question": "What should we do if the characters from both ends do not match?",
          "correct-choice": "Return False",
          "incorrect-choice-1": "Continue the loop",
          "incorrect-choice-2": "Remove the characters and continue",
          "incorrect-choice-3": "Return True",
          "short-answer-solution": "If the characters from both ends do not match, we should return False because the string is not a palindrome.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 4,
          "hint-if-incorrect": "Think about the definition of a palindrome.",
          "explanation-after-correct-answer": "If the characters from both ends do not match, the function returns False, indicating the string is not a palindrome."
        },
        {
          "context": "The function returns False if any characters from both ends do not match.",
          "short-answer-question": "What should the function return if all characters match?",
          "mcq-question": "What should the function return if all characters match?",
          "correct-choice": "Return True",
          "incorrect-choice-1": "Return False",
          "incorrect-choice-2": "Return the original string",
          "incorrect-choice-3": "Return the reversed string",
          "short-answer-solution": "If all characters match, the function should return True, indicating the string is a palindrome.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 5,
          "hint-if-incorrect": "Consider the definition of a palindrome.",
          "explanation-after-correct-answer": "If all characters match, the function returns True, indicating the string is a palindrome."
        }
      ]
    },
    {
      "title": "Return True if loop completes",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "The function has checked all character pairs and found no mismatches.",
          "short-answer-question": "What should the function return if the loop completes without finding mismatches?",
          "mcq-question": "What should the function return if the loop completes without finding mismatches?",
          "correct-choice": "Return True",
          "incorrect-choice-1": "Return False",
          "incorrect-choice-2": "Return the original string",
          "incorrect-choice-3": "Return the reversed string",
          "short-answer-solution": "If the loop completes without finding mismatches, the function should return True, indicating the string is a palindrome.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 6,
          "hint-if-incorrect": "Consider what it means if no mismatches were found.",
          "explanation-after-correct-answer": "If the loop completes without finding mismatches, the function returns True, indicating the string is a palindrome."
        }
      ]
    },
    {
      "title": "Test the function with an example",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "The function has been fully defined to check if a string is a palindrome.",
          "short-answer-question": "How can we test the function with an example?",
          "mcq-question": "How can we test the function with an example?",
          "correct-choice": "Call the function with a string argument",
          "incorrect-choice-1": "Print the function definition",
          "incorrect-choice-2": "Return the function",
          "incorrect-choice-3": "Convert the string to a list",
          "short-answer-solution": "We can test the function by calling it with a string argument, such as 'racecar', to see if it correctly identifies it as a palindrome.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 7,
          "hint-if-incorrect": "Think about how functions are typically tested.",
          "explanation-after-correct-answer": "The function is tested by calling it with the string 'racecar' to check if it correctly identifies it as a palindrome."
        }
      ]
    }
  ]
}

export const tech1WarmupDecomposition = {
  "subgoals": [
    {
      "title": "Define the function and its input parameter",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to define a function that will reverse a list using a queue-like approach.",
          "short-answer-question": "What type of data should the function's input parameter be?",
          "mcq-question": "What type of data should the function's input parameter be?",
          "correct-choice": "A list",
          "incorrect-choice-1": "A string",
          "incorrect-choice-2": "An integer",
          "incorrect-choice-3": "A dictionary",
          "short-answer-solution": "The function's input parameter should be a list because we are required to reverse a list using a queue-like approach.",
          "selected-question": "short",
          "code-line-to-be-revealed": 1,
          "hint-if-incorrect": "Think about the data structure that can be reversed.",
          "explanation-after-correct-answer": "The function is defined to take a list as its input parameter, which will be reversed using a queue-like approach."
        }
      ]
    },
    {
      "title": "Initialize an empty list to store the result and create a copy as queue",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need a place to store the reversed elements of the input list.",
          "short-answer-question": "What data structure should we use to store the reversed elements?",
          "mcq-question": "What data structure should we use to store the reversed elements?",
          "correct-choice": "A list",
          "incorrect-choice-1": "A set",
          "incorrect-choice-2": "A dictionary",
          "incorrect-choice-3": "A tuple",
          "short-answer-solution": "We should use a list to store the reversed elements because lists are ordered and allow for easy insertion of elements.",
          "selected-question": "short",
          "code-line-to-be-revealed": 2,
          "hint-if-incorrect": "Consider a data structure that maintains order and allows for easy insertion.",
          "explanation-after-correct-answer": "An empty list named 'reversed_list' is initialized to store the elements in reverse order."
        },
        {
          "context": "We need to create a queue-like structure from the input list.",
          "short-answer-question": "How can we create a copy of the input list?",
          "mcq-question": "How can we create a copy of the input list?",
          "correct-choice": "Using slicing (input_list[:])",
          "incorrect-choice-1": "Using the copy() method",
          "incorrect-choice-2": "Using the deepcopy() function",
          "incorrect-choice-3": "Using a for loop",
          "short-answer-solution": "We can create a copy of the input list using slicing (input_list[:]), which creates a shallow copy of the list.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 3,
          "hint-if-incorrect": "Think about a method that creates a shallow copy of a list.",
          "explanation-after-correct-answer": "A copy of the input list is created using slicing and assigned to the variable 'queue'."
        }
      ]
    },
    {
      "title": "Loop through the queue until it is empty",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to process each element in the queue until it is empty.",
          "short-answer-question": "What kind of loop should we use to process each element in the queue?",
          "mcq-question": "What kind of loop should we use to process each element in the queue?",
          "correct-choice": "A while loop",
          "incorrect-choice-1": "A for loop",
          "incorrect-choice-2": "A do-while loop",
          "incorrect-choice-3": "A foreach loop",
          "short-answer-solution": "We should use a while loop because it allows us to continue processing elements until the queue is empty.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 4,
          "hint-if-incorrect": "Consider a loop that continues until a condition is no longer true.",
          "explanation-after-correct-answer": "A while loop is used to process each element in the queue until it is empty."
        },
        {
          "context": "We need to insert elements from the queue into the reversed list in reverse order.",
          "short-answer-question": "How can we insert elements at the beginning of a list?",
          "mcq-question": "How can we insert elements at the beginning of a list?",
          "correct-choice": "Using the insert() method with index 0",
          "incorrect-choice-1": "Using the append() method",
          "incorrect-choice-2": "Using the extend() method",
          "incorrect-choice-3": "Using the add() method",
          "short-answer-solution": "We can insert elements at the beginning of a list using the insert() method with index 0.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 5,
          "hint-if-incorrect": "Think about a method that allows inserting elements at a specific position in a list.",
          "explanation-after-correct-answer": "The insert() method with index 0 is used to insert elements from the queue into the reversed list in reverse order."
        }
      ]
    },
    {
      "title": "Return the reversed list",
      "indent-level": 1,
      "leading-questions": [
        {
          "context": "We need to return the final reversed list after processing all elements.",
          "short-answer-question": "What should the function return after processing all elements?",
          "mcq-question": "What should the function return after processing all elements?",
          "correct-choice": "The reversed list",
          "incorrect-choice-1": "The original list",
          "incorrect-choice-2": "The queue",
          "incorrect-choice-3": "None",
          "short-answer-solution": "The function should return the reversed list after processing all elements.",
          "selected-question": "mcq",
          "code-line-to-be-revealed": 6,
          "hint-if-incorrect": "Consider what the final output of the function should be.",
          "explanation-after-correct-answer": "The function returns the reversed list after processing all elements from the queue."
        }
      ]
    },
    {
      "title": "Call the function with a sample list",
      "indent-level": 0,
      "leading-questions": [
        {
          "context": "We need to test the function with a sample input list.",
          "short-answer-question": "What should be the output list to test the function given the input [1, 2, 3, 4, 5]?",
          "mcq-question": "What is a suitable sample input list to test the function?",
          "correct-choice": "[1, 2, 3, 4, 5]",
          "incorrect-choice-1": "[5, 4, 3, 2, 1]",
          "incorrect-choice-2": "[1, 3, 5, 7, 9]",
          "incorrect-choice-3": "[2, 4, 6, 8, 10]",
          "short-answer-solution": "The output list would be [5, 4, 3, 2, 1] to test if the function correctly reverses the input list.",
          "selected-question": "short",
          "code-line-to-be-revealed": 7,
          "hint-if-incorrect": "Consider a simple, ordered list to test the function.",
          "explanation-after-correct-answer": "The output list would be [5, 4, 3, 2, 1] to test if the function correctly reverses the input list."
        }
      ]
    }
  ]
}

// export const tech1WarmupDecomposition = {
//   "subgoals": [
//     {
//       "title": "Define the function and initialize the stack",
//       "indent-level": 0,
//       "leading-questions": [
//         {
//           "context": "We need to define a function that checks if parentheses are balanced.",
//           "short-answer-question": "What should be the input type and return type of the function?",
//           "mcq-question": "What should be the input type and return type of the function?",
//           "correct-choice": "Input: str, Return: bool",
//           "incorrect-choice-1": "Input: list, Return: bool",
//           "incorrect-choice-2": "Input: str, Return: int",
//           "incorrect-choice-3": "Input: list, Return: str",
//           "short-answer-solution": "The function should take a string as input and return a boolean indicating whether the parentheses are balanced.",
//           "selected-question": "mcq",
//           "code-line-to-be-revealed": 1,
//           "hint-if-incorrect": "Think about the type of data the function will process and what it should return.",
//           "explanation-after-correct-answer": "The function is defined to take a string and return a boolean, which is appropriate for checking balanced parentheses."
//         },
//         {
//           "context": "The function is defined, now we need to initialize a stack to keep track of parentheses.",
//           "short-answer-question": "Why do we need a stack to check for balanced parentheses?",
//           "mcq-question": "Why do we need a stack to check for balanced parentheses?",
//           "correct-choice": "To keep track of opening parentheses",
//           "incorrect-choice-1": "To keep track of closing parentheses",
//           "incorrect-choice-2": "To store the entire string",
//           "incorrect-choice-3": "To count the number of parentheses",
//           "short-answer-solution": "A stack helps in keeping track of opening parentheses and ensures they are closed in the correct order.",
//           "selected-question": "mcq",
//           "code-line-to-be-revealed": 2,
//           "hint-if-incorrect": "Think about how a stack operates (LIFO) and why it is useful for this problem.",
//           "explanation-after-correct-answer": "A stack is initialized to keep track of opening parentheses, which helps in ensuring they are closed correctly."
//         }
//       ]
//     },
//     {
//       "title": "Iterate through each character in the string",
//       "indent-level": 1,
//       "leading-questions": [
//         {
//           "context": "We have initialized the stack. Now, we need to iterate through each character in the string.",
//           "short-answer-question": "What kind of loop is suitable for iterating through each character in a string?",
//           "mcq-question": "What kind of loop is suitable for iterating through each character in a string?",
//           "correct-choice": "for loop",
//           "incorrect-choice-1": "while loop",
//           "incorrect-choice-2": "do-while loop",
//           "incorrect-choice-3": "foreach loop",
//           "short-answer-solution": "A for loop is suitable for iterating through each character in a string as it allows us to process each character one by one.",
//           "selected-question": "short",
//           "code-line-to-be-revealed": 3,
//           "hint-if-incorrect": "Think about the loops available in Python and which one is commonly used for iterating over sequences.",
//           "explanation-after-correct-answer": "A for loop is used to iterate through each character in the string, allowing us to process each character."
//         }
//       ]
//     },
//     {
//       "title": "Check if the character is an opening parenthesis",
//       "indent-level": 2,
//       "leading-questions": [
//         {
//           "context": "We are iterating through each character in the string. Now, we need to check if the character is an opening parenthesis.",
//           "short-answer-question": "What should we do if the character is an opening parenthesis?",
//           "mcq-question": "What should we do if the character is an opening parenthesis?",
//           "correct-choice": "Push it onto the stack",
//           "incorrect-choice-1": "Pop it from the stack",
//           "incorrect-choice-2": "Ignore it",
//           "incorrect-choice-3": "Return False",
//           "short-answer-solution": "If the character is an opening parenthesis, we should push it onto the stack to keep track of it.",
//           "selected-question": "mcq",
//           "code-line-to-be-revealed": 4,
//           "hint-if-incorrect": "Think about how we keep track of opening parentheses using a stack.",
//           "explanation-after-correct-answer": "We check if the character is an opening parenthesis to decide whether to push it onto the stack."
//         },
//         {
//           "context": "We check if the character is an opening parenthesis. If it is, we need to push it onto the stack.",
//           "short-answer-question": "How do we push an element onto a stack in Python?",
//           "mcq-question": "How do we push an element onto a stack in Python?",
//           "correct-choice": "stack.append(char)",
//           "incorrect-choice-1": "stack.push(char)",
//           "incorrect-choice-2": "stack.insert(char)",
//           "incorrect-choice-3": "stack.add(char)",
//           "short-answer-solution": "In Python, we use the append() method to push an element onto a stack.",
//           "selected-question": "mcq",
//           "code-line-to-be-revealed": 5,
//           "hint-if-incorrect": "Think about the list methods available in Python for adding elements.",
//           "explanation-after-correct-answer": "We use the append() method to push the opening parenthesis onto the stack."
//         }
//       ]
//     },
//     {
//       "title": "Check if the character is a closing parenthesis",
//       "indent-level": 1,
//       "leading-questions": [
//         {
//           "context": "We have handled the opening parenthesis. Now, we need to check if the character is a closing parenthesis.",
//           "short-answer-question": "What should we do if the character is a closing parenthesis?",
//           "mcq-question": "What should we do if the character is a closing parenthesis?",
//           "correct-choice": "Check if the stack is empty or top is not '('",
//           "incorrect-choice-1": "Push it onto the stack",
//           "incorrect-choice-2": "Ignore it",
//           "incorrect-choice-3": "Return True",
//           "short-answer-solution": "If the character is a closing parenthesis, we need to check if the stack is empty or the top of the stack is not an opening parenthesis.",
//           "selected-question": "short",
//           "code-line-to-be-revealed": 6,
//           "hint-if-incorrect": "Think about how we validate the closing parenthesis with the stack.",
//           "explanation-after-correct-answer": "We check if the character is a closing parenthesis to decide the next steps for validation."
//         },
//         {
//           "context": "We check if the character is a closing parenthesis. If it is, we need to validate it with the stack.",
//           "short-answer-question": "What should we do if the stack is empty or the top of the stack is not an opening parenthesis?",
//           "mcq-question": "What should we do if the stack is empty or the top of the stack is not an opening parenthesis?",
//           "correct-choice": "Return False",
//           "incorrect-choice-1": "Push it onto the stack",
//           "incorrect-choice-2": "Ignore it",
//           "incorrect-choice-3": "Return True",
//           "short-answer-solution": "If the stack is empty or the top of the stack is not an opening parenthesis, we should return False as the parentheses are not balanced.",
//           "selected-question": "mcq",
//           "code-line-to-be-revealed": 7,
//           "hint-if-incorrect": "Think about what it means if the stack is empty or the top is not an opening parenthesis.",
//           "explanation-after-correct-answer": "We return False if the stack is empty or the top of the stack is not an opening parenthesis, indicating unbalanced parentheses."
//         },
//         {
//           "context": "We have validated the closing parenthesis. If the stack is not empty and the top is an opening parenthesis, we need to pop the stack.",
//           "short-answer-question": "What should we do after validating a closing parenthesis with the stack?",
//           "mcq-question": "What should we do after validating a closing parenthesis with the stack?",
//           "correct-choice": "Pop the stack",
//           "incorrect-choice-1": "Push it onto the stack",
//           "incorrect-choice-2": "Ignore it",
//           "incorrect-choice-3": "Return True",
//           "short-answer-solution": "After validating a closing parenthesis, we should pop the stack to remove the corresponding opening parenthesis.",
//           "selected-question": "mcq",
//           "code-line-to-be-revealed": 8,
//           "hint-if-incorrect": "Think about how we remove the corresponding opening parenthesis from the stack.",
//           "explanation-after-correct-answer": "We pop the stack to remove the corresponding opening parenthesis after validating a closing parenthesis."
//         },
//         {
//           "context": "We have validated the closing parenthesis. If the stack is not empty and the top is an opening parenthesis, we need to pop the stack.",
//           "short-answer-question": "What should we do after validating a closing parenthesis with the stack?",
//           "mcq-question": "What should we do after validating a closing parenthesis with the stack?",
//           "correct-choice": "Pop the stack",
//           "incorrect-choice-1": "Push it onto the stack",
//           "incorrect-choice-2": "Ignore it",
//           "incorrect-choice-3": "Return True",
//           "short-answer-solution": "After validating a closing parenthesis, we should pop the stack to remove the corresponding opening parenthesis.",
//           "selected-question": "mcq",
//           "code-line-to-be-revealed": 9,
//           "hint-if-incorrect": "Think about how we remove the corresponding opening parenthesis from the stack.",
//           "explanation-after-correct-answer": "We pop the stack to remove the corresponding opening parenthesis after validating a closing parenthesis."
//         }
//       ]
//     },
//     {
//       "title": "Check if the stack is empty at the end",
//       "indent-level": 0,
//       "leading-questions": [
//         {
//           "context": "We have processed all characters in the string. Now, we need to check if the stack is empty.",
//           "short-answer-question": "Why is it important to check if the stack is empty at the end?",
//           "mcq-question": "Why is it important to check if the stack is empty at the end?",
//           "correct-choice": "To ensure all parentheses are closed",
//           "incorrect-choice-1": "To count the number of parentheses",
//           "incorrect-choice-2": "To find unmatched closing parentheses",
//           "incorrect-choice-3": "To validate the string length",
//           "short-answer-solution": "Checking if the stack is empty ensures that all opening parentheses have been matched with closing parentheses, indicating balanced parentheses.",
//           "selected-question": "mcq",
//           "code-line-to-be-revealed": 10,
//           "hint-if-incorrect": "Think about what an empty stack signifies in the context of balanced parentheses.",
//           "explanation-after-correct-answer": "We check if the stack is empty to ensure all opening parentheses have been matched with closing parentheses, indicating balanced parentheses."
//         }
//       ]
//     },
//     {
//       "title": "Test the function with an example",
//       "indent-level": 0,
//       "leading-questions": [
//         {
//           "context": "We have implemented the function. Now, we need to test it with an example.",
//           "short-answer-question": "What is the output for simple input \"()()\" to test the function?",
//           "mcq-question": "What is a simple example to test the function?",
//           "correct-choice": "\"()()\"",
//           "incorrect-choice-1": "\"((\"",
//           "incorrect-choice-2": "\")(\"",
//           "incorrect-choice-3": "\"(()\"",
//           "short-answer-solution": "The output for the input \"()()\" should be True to indicate that the parentheses are balanced.",
//           "selected-question": "short",
//           "code-line-to-be-revealed": 11,
//           "hint-if-incorrect": "Think about a string with balanced parentheses.",
//           "explanation-after-correct-answer": "The output for the input \"()()\" should be True to indicate that the parentheses are balanced."
//         }
//       ]
//     }
//   ]
// }