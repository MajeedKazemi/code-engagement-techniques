export const task1Code =
`def generate_parentheses(n: int, d: int) -> list[str]:
    result = []
    q = [['', 0, 0, 0, 0]]
    while q:
        s, opens, closes, max_d, cur_d = q.pop(0)
        if opens == n and closes == n:
            result.append(s)
        else:
            if opens < n:
                new_max_d = max(max_d, cur_d + 1)
                if new_max_d <= d:
                    q.append([s + '[', opens + 1, closes, new_max_d, cur_d + 1])
            if closes < opens and max_d <= d:
                q.append([s + ']', opens, closes + 1, max_d, cur_d - 1])
    return result
generate_parentheses(2, 2)
generate_parentheses(3, 1)`



export const task1Explanation =
`[OUTPUT]
def generate_parentheses(n: int, d: int) -> list[str]: ### Define a function named \`generate_parentheses\` that takes two integer parameters \`n\` and \`d\`, and returns a list of strings. This function will generate all valid combinations of \`n\` pairs of parentheses with a maximum depth of \`d\`.
    result = [] ### Initialize an empty list \`result\` to store the valid combinations of parentheses.
    q = [("", 0, 0, 0, 0)] ### Initialize a queue \`q\` with a list containing an empty string and four integers all set to 0. These integers represent the number of open parentheses, the number of closed parentheses, the maximum depth encountered so far, and the current depth, respectively.
    while q: ### Start a while loop that continues as long as the queue \`q\` is not empty.
        s, opens, closes, max_d, cur_d = q.pop(0) ### Dequeue the first element from \`q\` and unpack it into variables \`s\`, \`opens\`, \`closes\`, \`max_d\`, and \`cur_d\`.
        if opens == n and closes == n: ### Check if the number of open and closed parentheses both equal \`n\`.
            result.append(s) ### If true, append the current string \`s\` to the \`result\` list.
        else: ### If the condition is not met, continue to the next steps.
            if opens < n: ### Check if the number of open parentheses is less than \`n\`.
                new_max_d = max(max_d, cur_d + 1) ### Calculate the new maximum depth if another open parenthesis is added.
                if new_max_d <= d: ### Check if the new maximum depth is less than or equal to \`d\`.
                    q.append((s + "(", opens + 1, closes, new_max_d, cur_d + 1)) ### If true, enqueue a new list with an additional open parenthesis, incrementing the count of open parentheses and updating the depths.
            if closes < opens and max_d <= d: ### Check if the number of closed parentheses is less than the number of open parentheses and the maximum depth is within the limit.
                q.append((s + ")", opens, closes + 1, max_d, cur_d - 1)) ### If true, enqueue a new list with an additional closed parenthesis, incrementing the count of closed parentheses and updating the current depth.
    return result ### Return the \`result\` list containing all valid combinations of parentheses.
generate_parentheses(3, 2) ### Example use case: Call the function.
generate_parentheses(4, 1) ### Example use case: Call the function.
[END]

[OVERALL-EXPLANATION]
The function \`generate_parentheses\` is designed to generate all valid combinations of \`n\` pairs of parentheses such that the depth of any valid parentheses substring does not exceed \`d\`. The depth is defined as the maximum number of open parentheses at any point within the substring.

The function uses a breadth-first search (BFS) approach to explore all possible combinations of parentheses. It starts with an empty string and iteratively adds open and closed parentheses while maintaining the constraints on the number of open and closed parentheses and the depth.

1. The function initializes an empty list \`result\` to store the valid combinations.
2. It uses a queue \`q\` to manage the state of the current string, the number of open and closed parentheses, and the depth information.
3. The while loop processes each state in the queue:
   - If the number of open and closed parentheses both equal \`n\`, the current string is a valid combination and is added to the result list.
   - If the number of open parentheses is less than \`n\`, a new state with an additional open parenthesis is enqueued, provided the new depth does not exceed \`d\`.
   - If the number of closed parentheses is less than the number of open parentheses, a new state with an additional closed parenthesis is enqueued, provided the maximum depth is within the limit.
4. The function returns the list of valid combinations after processing all possible states.`

export const task2Code =
`def longest_valid_brackets(s: str) -> int:
    map = {"[": "]", "<": ">", "{": "}"}
    stack = [-1]
    max_length = 0
    for i in range(len(s)):
        char = s[i]
        if char in map:
            stack.append(i)
        else:
            not_empty = len(stack) > 1
            last_is_open = stack[-1] != -1 and s[stack[-1]] in map
            is_match = last_is_open and map[s[stack[-1]]] == char
            if not_empty and is_match:
                stack.pop()
                max_length = max(max_length, i - stack[-1])
            else:
                stack[-1] = i
    return max_length

print(longest_valid_brackets("[]<[>]"))
print(longest_valid_brackets("{}]<[{}]>"))`


export const task2Explanation =
`def longest_valid_brackets(s: str) -> int: ### Defines a function named \`longest_valid_brackets\` that takes a string \`s\` as input and returns an integer. The function aims to find the length of the longest valid substring of brackets.
    map = {'(': ')', '[': ']', '{': '}'} ### Creates a dictionary \`map\` that maps opening brackets to their corresponding closing brackets. This helps in checking if a closing bracket matches the last opened bracket.
    stack = [-1] ### Initializes a stack with a single element \`-1\`. This helps in calculating the length of valid substrings by providing a base index.
    max_length = 0 ### Initializes \`max_length\` to 0. This variable will store the length of the longest valid substring found.
    for i in range(len(s)): ### Starts a loop that iterates over each character in the string \`s\` using its index \`i\`.
        char = s[i] ### Retrieves the character at index \`i\` from the string \`s\`.
        if char in map: ### Checks if the character is an opening bracket by looking it up in the \`map\` dictionary.
            stack.append(i) ### If it is an opening bracket, appends its index to the \`stack\`.
        else: ### If the character is not an opening bracket, it must be a closing bracket.
            not_empty = len(stack) > 1 ### Checks if the stack has more than one element, indicating there is an opening bracket to match.
            last_is_open = stack[-1] != -1 and s[stack[-1]] in map ### Checks if the last element in the stack is an opening bracket.
            is_match = last_is_open and map[s[stack[-1]]] == char ### Checks if the last opening bracket in the stack matches the current closing bracket.
            if not_empty and is_match: ### If the stack is not empty and the brackets match:
                stack.pop() ### Removes the last opening bracket from the stack.
                max_length = max(max_length, i - stack[-1]) ### Updates \`max_length\` with the maximum value between the current \`max_length\` and the length of the valid substring.
            else: ### If the stack is empty or the brackets do not match:
                stack[-1] = i ### Updates the last element in the stack to the current index \`i\`.
    return max_length ### Returns the length of the longest valid substring found.
print(longest_valid_brackets("[]<[>]")) ### Calls the function \`longest_valid_brackets\` with the input string.
print(longest_valid_brackets("{}]<[{}]>")) ### Calls the function \`longest_valid_brackets\` with the input string.
[END]

[OVERALL-EXPLANATION]
The provided code defines a function \`longest_valid_brackets\` that calculates the length of the longest valid substring of brackets in a given string. The function uses a stack-based approach to keep track of the indices of opening brackets and to validate closing brackets.

The function starts by defining a dictionary \`map\` to match opening brackets with their corresponding closing brackets. It also initializes a stack with a single element \`-1\` to help in calculating the lengths of valid substrings and sets \`max_length\` to 0 to store the maximum length found.

The function iterates over each character in the input string using a for loop. For each character, it checks if it is an opening bracket by looking it up in the \`map\` dictionary. If it is, the index of the character is pushed onto the stack.

If the character is a closing bracket, the function checks if the stack has more than one element and if the last element in the stack is an opening bracket that matches the current closing bracket. If both conditions are met, the last opening bracket is popped from the stack, and the length of the valid substring is calculated and compared with \`max_length\` to update it if necessary.

If the stack is empty or the brackets do not match, the current index is pushed onto the stack to serve as a new base for future calculations.

Finally, the function returns the length of the longest valid substring found.`


export const task3Code = 
`def sliding_window_maximum(nums: list[int], k: int) -> list[int]:
    dq = []
    result = []
    for i, n in enumerate(nums):
        if dq and dq[0] < i - k + 1:
            dq.pop(0)
        while dq and nums[dq[-1]] < n:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result
sliding_window_maximum([4, 2, 12, 3, 7], 4)
sliding_window_maximum([9, 11, 8, 5, 7, 10], 2)`

export const task3Explanation = 
`def sliding_window_maximum(nums: list[int], k: int) -> list[int]: ### Define a function named \`sliding_window_maximum\` that takes a list of integers \`nums\` and an integer \`k\` as input. The function aims to find the maximum value in each sliding window of size \`k\` in the list \`nums\`.
    dq = [] ### Initialize an empty list \`dq\` which will be used as a deque (double-ended queue) to store indices of elements in \`nums\`. This helps in efficiently finding the maximum in the current window.
    result = [] ### Initialize an empty list \`result\` to store the maximum values of each sliding window.
    for i, n in enumerate(nums): ### Start a for loop to iterate over the list \`nums\` with both index \`i\` and value \`n\`.
        if dq and dq[0] < i - k + 1: ### Check if the deque is not empty and the index at the front of the deque is out of the current window's range. If so, remove it from the deque.
            dq.pop(0) ### Remove the index at the front of the deque because it is out of the current window's range.
        while dq and nums[dq[-1]] < n: ### Check if the deque is not empty and the value at the index at the back of the deque is less than the current value \`n\`. If so, remove it from the deque.
            dq.pop() ### Remove the index at the back of the deque because its corresponding value is less than the current value \`n\`.
        dq.append(i) ### Append the current index \`i\` to the deque.
        if i >= k - 1: ### Check if the current index \`i\` is greater than or equal to \`k - 1\`, which means the first window of size \`k\` is complete.
            result.append(nums[dq[0]]) ### Append the value at the index at the front of the deque to the result list, as it is the maximum value in the current window.
    return result ### Return the result list containing the maximum values of each sliding window.
sliding_window_maximum([4, 2, 12, 3, 7], 4) ### Call the function \`sliding_window_maximum\`.
sliding_window_maximum([9, 11, 8, 5, 7, 10], 2) ### Call the function \`sliding_window_maximum\`.

[END]

[OVERALL-EXPLANATION]
The provided code defines a function \`sliding_window_maximum\` that calculates the maximum value in each sliding window of size \`k\` in a given list of integers \`nums\`. The function uses a deque (double-ended queue) to efficiently keep track of the indices of elements in the current window. 

The function initializes two empty lists: \`dq\` for the deque and \`result\` for storing the maximum values. It then iterates over the list \`nums\` using a for loop. During each iteration, the function performs the following steps:
Removes indices from the front of the deque if they are out of the current window's range.
Removes indices from the back of the deque if their corresponding values are less than the current value \`n\`.
Appends the current index \`i\` to the deque.
Once the first window of size \`k\` is complete (i.e., \`i >= k - 1\`), appends the value at the index at the front of the deque to the result list.`


export const tech2WarmupExplanation = 
`def reverse_list_with_stack(input_list: list) -> list: ### Define a function named \`reverse_list_with_stack\` that takes a list \`input_lis\` as input. The function aims to reverse the list using a stack-based approach.
    reversed_list = [] ### Initialize an empty list \`reversed_list\` to store the elements in reversed order.
    stack = input_list[:] ### Create a copy of \`input_list\` and assign it to \`stack\`. This copy will be used as a stack to reverse the elements.
    while stack: ### Start a while loop that continues as long as \`stack\` is not empty.
        reversed_list.append(stack.pop()) ### Remove the last element from \`stack\` using the \`pop\` method and append it to \`reversed_list\`. This effectively reverses the order of elements.
    return reversed_list ### Return the \`reversed_list\` which now contains the elements of \`input_list\` in reversed order.
reverse_list_with_stack([1, 2, 3, 4, 5]) ### Call the function \`reverse_list_with_stack\` with the list \`[1, 2, 3, 4, 5]\`. The expected output is \`[5, 4, 3, 2, 1]\`.
[END]

[OVERALL-EXPLANATION]
The provided code defines a function \`reverse_list_with_stack\` that reverses a given list \`input_list\` using a stack-based approach. The function initializes two lists: \`reversed_list\` to store the reversed elements and \`stack\` as a copy of \`input_list\` to be used as a stack.

The function then enters a while loop that continues as long as \`stack\` is not empty. During each iteration of the loop, the function removes the last element from \`stack\` using the \`pop\` method and appends it to \`reversed_list\`. This process effectively reverses the order of elements.

Finally, the function returns the \`reversed_list\`, which contains the elements of \`input_list\` in reversed order. The function is called with the list \`[1, 2, 3, 4, 5]\`, and it returns the expected output \`[5, 4, 3, 2, 1]\`.`


export const tech3WarmupCode = 
`def is_palindrome(s: str) -> bool:
    dq = list(s)
    while len(dq) > 1:
        if dq.pop(0) != dq.pop():
            return False 
    return True
is_palindrome("racecar")`

export const tech3WarmupExplanation = 
`def is_palindrome(s: str) -> bool: ### Define a function named \`is_palindrome\` that takes a string \`s\` as input and returns a boolean value indicating whether the string is a palindrome. A palindrome is a string that reads the same forward and backward.
    dq = list(s) ### Convert the input string \`s\` into a list of characters and store it in the variable \`dq\`. This list will be used as a deque (double-ended queue) to facilitate efficient removal of characters from both ends.
    while len(dq) > 1: ### Start a while loop that continues as long as the length of the deque \`dq\` is greater than 1. This ensures that there are at least two characters to compare.
        if dq.pop(0) != dq.pop(): ### Remove and return the first character from the deque using \`pop(0)\` and the last character using \`pop()\`. Compare these two characters. If they are not equal, the string is not a palindrome.
            return False ### If the characters are not equal, return \`False\` immediately, indicating that the string is not a palindrome.
    return True ### If the loop completes without finding any unequal characters, return \`True\`, indicating that the string is a palindrome.
is_palindrome("racecar") ### Call the function \`is_palindrome\` with the string \`"racecar"\`. The expected output is \`True\` because "racecar" is a palindrome.
[END]

[OVERALL-EXPLANATION]
The provided code defines a function \`is_palindrome\` that checks whether a given string \`s\` is a palindrome. A palindrome is a string that reads the same forward and backward. The function uses a deque (double-ended queue) to efficiently compare characters from both ends of the string.

The function starts by converting the input string \`s\` into a list of characters and storing it in the variable \`dq\`. This list acts as a deque, allowing efficient removal of characters from both the front and the back.

The function then enters a while loop that continues as long as the length of the deque \`dq\` is greater than 1. During each iteration of the loop, the function removes and compares the first and last characters of the deque. If these characters are not equal, the function immediately returns \`False\`, indicating that the string is not a palindrome.

If the loop completes without finding any unequal characters, the function returns \`True\`, indicating that the string is a palindrome.

The function is called with the string \`"racecar"\`, and it returns \`True\` because "racecar" is a palindrome.`

export const tech2WarmupCode = 
`def reverse_list_with_stack(input_list: list) -> list:
    reversed_list = []
    stack = input_list[:]
    while stack:
        reversed_list.append(stack.pop())
    return reversed_list
reverse_list_with_stack([1, 2, 3, 4, 5])`


export const tech1WarmupCode = 
`def reverse_list_with_queue(input_list):
    reversed_list = []
    queue = input_list[:]
    while queue:
        reversed_list.insert(0, queue.pop(0))
    return reversed_list
reverse_list_with_queue([1, 2, 3, 4, 5])`


export const tech1WarmupExplanation = 
`def reverse_list_with_queue(input_list): ### Define a function named \`reverse_list_with_queue\` that takes a list \`input_list\` as input. The function aims to reverse the list using a queue-like approach.
    reversed_list = [] ### Initialize an empty list \`reversed_list\` to store the elements in reversed order.
    queue = input_list[:] ### Create a copy of \`input_list\` and assign it to \`queue\`. This ensures that the original list is not modified.
    while queue: ### Start a while loop that continues as long as \`queue\` is not empty.
        reversed_list.insert(0, queue.pop(0)) ### Remove the first element from \`queue\` using \`pop(0)\` and insert it at the beginning of \`reversed_list\` using \`insert(0, element)\`.
    return reversed_list ### Return the \`reversed_list\` which now contains the elements of \`input_list\` in reversed order.
reverse_list_with_queue([1, 2, 3, 4, 5]) ### Call the function \`reverse_list_with_queue\` with the list \`[1, 2, 3, 4, 5]\`. The expected output is \`[5, 4, 3, 2, 1]\`.
[END]

[OVERALL-EXPLANATION]
The provided code defines a function \`reverse_list_with_queue\` that reverses a given list \`input_list\` using a queue-like approach. The function initializes an empty list \`reversed_list\` to store the elements in reversed order and creates a copy of \`input_list\` named \`queue\` to avoid modifying the original list.

The function then enters a while loop that continues as long as \`queue\` is not empty. During each iteration of the loop, the function removes the first element from \`queue\` using \`pop(0)\` and inserts it at the beginning of \`reversed_list\` using \`insert(0, element)\`. This effectively reverses the order of the elements.

Finally, the function returns the \`reversed_lis\` which contains the elements of \`input_list\` in reversed order. The function is called with the list \`[1, 2, 3, 4, 5]\`, and it returns the expected output \`[5, 4, 3, 2, 1]\`.`

// export const tech1WarmupCode =
// `def is_balanced_parentheses(txt: str) -> bool:
//     stack = []
//     for char in txt:
//         if char == '(':
//             stack.append(char)
//         elif char == ')':
//             if not stack or stack[-1] != '(':
//                 return False
//             stack.pop()      
//     return len(stack) == 0
// is_balanced_parentheses("()()")`

// export const tech1WarmupExplanation =
// `def is_balanced_parentheses(txt: str) -> bool: ### Defines a function named \`is_balanced_parentheses\` that takes a single argument \`txt\` of type string and returns a boolean value.
//     stack = [] ### Initializes an empty list named \`stack\` which will be used to keep track of opening parentheses.
//     for char in txt: ### Starts a for loop to iterate over each character in the input string \`txt\`.
//         if char == '(': ### Checks if the current character is an opening parenthesis '('.
//             stack.append(char) ### If it is an opening parenthesis, it is added to the \`stack\`.
//         elif char == ')': ### Checks if the current character is a closing parenthesis ')'.
//             if not stack or stack[-1] != '(': ### Checks if the \`stack\` is empty or if the top element of the \`stack\` is not an opening parenthesis '('.
//                 return False ### If either condition is true, it means the parentheses are not balanced, so the function returns \`False\`.
//             stack.pop() ### If the top element of the \`stack\` is an opening parenthesis '(', it is removed from the \`stack\`.
//     return len(stack) == 0 ### After the loop, checks if the \`stack\` is empty. If it is empty, it means all opening parentheses have been matched with closing ones, so the function returns \`True\`. Otherwise, it returns \`False\`.
// is_balanced_parentheses("()()") ### Calls the function \`is_balanced_parentheses\` with the input string "()()" and prints the result.
// [END]

// [OVERALL-EXPLANATION]
// The function \`is_balanced_parentheses\` is designed to determine if a string of parentheses is balanced. It uses a stack data structure to keep track of opening parentheses. As it iterates through each character in the input string, it performs the following steps:

// 1. If the character is an opening parenthesis '(', it pushes it onto the stack.
// 2. If the character is a closing parenthesis ')', it checks if the stack is empty or if the top element of the stack is not an opening parenthesis '('. If either condition is true, it returns \`False\` because it means the parentheses are not balanced.
// 3. If the top element of the stack is an opening parenthesis '(', it pops it from the stack.

// After iterating through all characters, the function checks if the stack is empty. If it is, it means all opening parentheses have been matched with closing ones in the correct order, so it returns \`True\`. Otherwise, it returns \`False\`.

// The function call \`is_balanced_parentheses("()()")\` is an example use case that checks if the string "()()" is balanced, which it is, so the function would return \`True\`.`


// export const task4Code =
// `def decode_string(s: str) -> str:
//     stack = []
//     current_string = ""
//     current_num = 0
//     for char in s:
//         if char.isdigit():
//             current_num = current_num * 10 + int(char)
//         elif char == '[':
//             stack.append((current_string, current_num))
//             current_string = ""
//             current_num = 0
//         elif char == ']':
//             last_string, num = stack.pop()
//             current_string = last_string + num * current_string
//         else:
//             current_string += char
//     return current_string
// decode_string('3[a]2[bc]') # Output: 'aaabcbc'`

// export const task4Explanation =
// `def decode_string(s: str) -> str: ### Defines a function named \`decode_string\` that takes a single argument \`s\` of type string and returns a string.
//     stack = [] ### Initializes an empty list \`stack\` to keep track of previous strings and numbers.
//     current_string = "" ### Initializes an empty string \`current_string\` to build the current decoded string.
//     current_num = 0 ### Initializes \`current_num\` to 0 to build the current number.
//     for char in s: ### Starts a for loop to iterate over each character \`char\` in the input string \`s\`.
//         if char.isdigit(): ### Checks if the current character \`char\` is a digit.
//             current_num = current_num * 10 + int(char) ### Updates \`current_num\` by multiplying it by 10 and adding the integer value of \`char\`.
//         elif char == '[': ### Checks if the current character \`char\` is an opening bracket '['.
//             stack.append((current_string, current_num)) ### Pushes a tuple of \`current_string\` and \`current_num\` onto the stack.
//             current_string = "" ### Resets \`current_string\` to an empty string.
//             current_num = 0 ### Resets \`current_num\` to 0.
//         elif char == ']': ### Checks if the current character \`char\` is a closing bracket ']'.
//             last_string, num = stack.pop() ### Pops the last tuple from the stack into \`last_string\` and \`num\`.
//             current_string = last_string + num * current_string ### Updates \`current_string\` by concatenating \`last_string\` and \`num\` repetitions of \`current_string\`.
//         else: ### If the current character \`char\` is neither a digit nor a bracket.
//             current_string += char ### Appends \`char\` to \`current_string\`.
//     return current_string ### Returns the fully decoded string \`current_string\`.
// decode_string('3[a]2[bc]') ### Calls the \`decode_string\` function with the input '3[a]2[bc]' and expects the output 'aaabcbc'.
// [END]

// [OVERALL-EXPLANATION]
// The provided code defines a function \`decode_string\` that decodes a specially encoded string. The encoding format is such that a number followed by square brackets indicates that the string inside the brackets should be repeated that many times. For example, '3[a]' means 'aaa'.

// The function uses a stack to keep track of the current string and the number of repetitions when it encounters an opening bracket '['. When it encounters a closing bracket ']', it pops the last string and number from the stack and constructs the new string by repeating the current string the specified number of times and appending it to the last string.

// The function iterates over each character in the input string. If the character is a digit, it updates the current number. If it is an opening bracket, it pushes the current string and number onto the stack and resets them. If it is a closing bracket, it pops from the stack and constructs the new string. If it is a regular character, it appends it to the current string.

// Finally, the function returns the fully decoded string. The example call \`decode_string('3[a]2[bc]')\` demonstrates the function's usage, which outputs 'aaabcbc'.`

// export const task5Code = `def first_char_k_times(s: str, k: int) -> str:
//     dq = []
//     char_count = {}
//     for char in s:
//         dq.append(char)
//         char_count[char] = char_count.get(char, 0) + 1
//         while dq and char_count[dq[0]] != k:
//             dq.pop(0)
//         if dq and char_count[dq[0]] == k:
//             return dq[0]
//     return ''
// first_char_k_times("aabbccddeeff", 2) # Output: a`

// export const task5Explanation = 
// `def first_char_k_times(s: str, k: int) -> str: ### Defines a function named \`first_char_k_times\` that takes a string \`s\` and an integer \`k\` as input and returns a string.
//     dq = [] ### Initializes an empty list \`dq\` which will be used as a queue to keep track of characters in the order they appear.
//     char_count = {} ### Initializes an empty dictionary \`char_count\` to keep track of the count of each character in the string.
//     for char in s: ### Starts a for loop to iterate over each character in the string \`s\`.
//         dq.append(char) ### Appends the current character to the end of the queue \`dq\`.
//         char_count[char] = char_count.get(char, 0) + 1 ### Updates the count of the current character in the \`char_count\` dictionary. If the character is not already in the dictionary, it initializes its count to 0 before adding 1.
//         while dq and char_count[dq[0]] != k: ### Starts a while loop that continues as long as \`dq\` is not empty and the count of the character at the front of the queue is not equal to \`k\`.
//             dq.pop(0) ### Removes the character at the front of the queue \`dq\`.
//         if dq and char_count[dq[0]] == k: ### Checks if \`dq\` is not empty and the count of the character at the front of the queue is equal to \`k\`.
//             return dq[0] ### Returns the character at the front of the queue, which is the first character to appear \`k\` times in the string.
//     return '' ### Returns an empty string if no character appears \`k\` times in the string.
// first_char_k_times("aabbccddeeff", 2) ### Calls the function \`first_char_k_times\` with the string "aabbccddeeff" and the integer 2, and prints the result, which is 'a'.
// [END]

// [OVERALL-EXPLANATION]
// The function \`first_char_k_times\` is designed to find the first character in a given string \`s\` that appears exactly \`k\` times. It uses a queue (\`dq\`) to keep track of the order in which characters appear and a dictionary (\`char_count\`) to count the occurrences of each character.

// The function iterates over each character in the string. For each character, it appends it to the queue and updates its count in the dictionary. It then checks the front of the queue to see if the character there has appeared \`k\` times. If not, it removes characters from the front of the queue until it finds one that has appeared \`k\` times or the queue becomes empty. If it finds such a character, it returns it immediately. If no character appears \`k\` times by the end of the string, the function returns an empty string.

// In the provided use case, the function is called with the string "aabbccddeeff" and the integer 2. The function will return 'a' because 'a' is the first character in the string to appear exactly 2 times.`

// export const task1Code =
// `def dna_sequences(pattern: str) -> list[str]:
//     dna_chars = ['A', 'C', 'G', 'T']
//     q = ['']
//     result = []
//     while len(q) > 0:
//         seq = q.pop(0)
//         if len(seq) == len(pattern):
//             result.append(seq)
//         else:
//             if pattern[len(seq)] == '*':
//                 for ch in dna_chars:
//                     q.append(seq + ch)
//             else:
//                 q.append(seq + pattern[len(seq)])
//     return result
// dna_sequences('A*T') # Output: ['AAT', 'ACT', 'AGT', 'ATT']`

// export const task1Explanation = 
// `def dna_sequences(pattern: str) -> list[str]: ### Define a function named \`dna_sequences\` that takes a string \`pattern\` as input and returns a list of strings.
//     dna_chars = ['A', 'C', 'G', 'T'] ### Initialize a list \`dna_chars\` containing the characters 'A', 'C', 'G', and 'T', which represent the possible DNA bases.
//     q = [''] ### Initialize a list \`q\` with an empty string. This list will be used as a queue to generate sequences.
//     result = [] ### Initialize an empty list \`result\` to store the final DNA sequences that match the pattern.
//     while len(q) > 0: ### Start a while loop that continues as long as there are elements in the queue \`q\`.
//         seq = q.pop(0) ### Remove and return the first element from the queue \`q\`, and assign it to the variable \`seq\`.
//         if len(seq) == len(pattern): ### Check if the length of the current sequence \`seq\` is equal to the length of the pattern.
//             result.append(seq) ### If the lengths are equal, append the current sequence \`seq\` to the \`result\` list.
//         else: ### If the lengths are not equal, continue to the next steps.
//             if pattern[len(seq)] == '*': ### Check if the current character in the pattern (at the position equal to the length of \`seq\`) is a wildcard '*'.
//                 for ch in dna_chars: ### If it is a wildcard, iterate over each character in \`dna_chars\`.
//                     q.append(seq + ch) ### Append the current sequence \`seq\` concatenated with the character \`ch\` to the queue \`q\`.
//             else: ### If the current character in the pattern is not a wildcard.
//                 q.append(seq + pattern[len(seq)]) ### Append the current sequence \`seq\` concatenated with the current character in the pattern to the queue \`q\`.
//     return result ### After the while loop ends, return the \`result\` list containing all the generated DNA sequences.
// [END]

// [OVERALL-EXPLANATION]
// The provided code defines a function \`dna_sequences\` that generates all possible DNA sequences matching a given pattern. The pattern may contain specific DNA bases ('A', 'C', 'G', 'T') and wildcards ('*') that can be replaced by any of the four DNA bases.

// The function uses a breadth-first search (BFS) approach to generate the sequences. It initializes a queue with an empty string and iteratively builds sequences by appending characters according to the pattern. If the current character in the pattern is a wildcard, the function appends all possible DNA bases to the current sequence and adds them to the queue. If the character is a specific base, it appends that base to the current sequence and adds it to the queue.

// The process continues until the queue is empty, and all sequences of the same length as the pattern are collected in the \`result\` list, which is then returned.`

