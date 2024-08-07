export const warmupCode = 
`def reverse_stack(items: list) -> list:
    temp = []
    while items:
        temp.append(items.pop())
    return temp`

export const warmupExplanation =
`This code defines a function called \`reverse_stack\` that takes a list of items as input and returns a new list with the items in reverse order.

First, it creates an empty list called \`temp\`.

Then, it enters a loop that continues as long as there are items in the input list. In each iteration of the loop, it removes the last item from the input list using the \`pop\` method and adds it to \`temp\` using the \`append\` method. The \`pop\` method removes the last item from a list and returns it. The \`append\` method adds an item to the end of a list.

Because the \`pop\` method removes items from the end of the list and the \`append\` method adds items to the end of a list, the effect of the loop is to reverse the order of the items.

Finally, it returns the \`temp\` list, which now contains the items in reverse order.`

export const task1Code =
`def calculate_span(prices: list[int]) -> list[int]:
    stack = []
    span = [0] * len(prices)
    for i in range(len(prices)):
        while stack and prices[stack[-1]] <= prices[i]:
            stack.pop()
        if not stack:
            span[i] = i + 1
        else:
            span[i] = i - stack[-1]
        stack.append(i)
    return span`

export const task1Explanation = 
`def calculate_span(prices: list[int]) -> list[int]: ### Define a function named \`calculate_span\` that takes a list of integers \`prices\` as input and returns a list of integers.
    n = len(prices) ### Calculate the length of the input list \`prices\` and store it in the variable \`n\`.
    span = [0] * n ### Initialize a list \`span\` of length \`n\` with all elements set to 0. This will store the span values for each day.
    stack = [] ### Initialize an empty list \`stack\` which will be used to keep track of indices of the stock prices.

    for i in range(n): ### Start a loop that iterates over each index \`i\` from 0 to n-1.
        while stack and prices[stack[-1]] <= prices[i]: ### While the stack is not empty and the price at the index on top of the stack is less than or equal to the current price.
            stack.pop() ### Remove the index from the top of the stack because it does not contribute to the span of the current price.

        if not stack: ### If the stack is empty after the above loop, it means there are no previous prices greater than the current price.
            span[i] = i + 1 ### Set the span for the current day to \`i + 1\` because all previous prices are less than the current price.
        else: ### If the stack is not empty, it means there is a previous price greater than the current price.
            span[i] = i - stack[-1] ### Set the span for the current day to the difference between the current index \`i\` and the index of the last higher price.

        stack.append(i) ### Add the current index \`i\` to the stack.

    return span ### Return the list \`span\` containing the span values for each day.
[END]

[OVERALL-EXPLANATION]
The provided code defines a function \`calculate_span\` that calculates the stock span for each day given a list of daily stock prices. The stock span for a day is the number of consecutive days leading up to and including that day for which the stock price is not less than the price on those days.

The function starts by determining the length of the input list \`prices\` and initializing a list \`span\` of the same length with all elements set to 0. It also initializes an empty list \`stack\` to keep track of indices of the stock prices.

The function then iterates over each index \`i\` in the list \`prices\`. For each index, it uses a while loop to remove indices from the stack as long as the price at the index on top of the stack is less than or equal to the current price. This ensures that only indices of prices greater than the current price remain in the stack.

If the stack is empty after the while loop, it means there are no previous prices greater than the current price, so the span for the current day is set to \`i + 1\`. If the stack is not empty, it means there is a previous price greater than the current price, so the span for the current day is set to the difference between the current index \`i\` and the index of the last higher price.

Finally, the current index \`i\` is added to the stack, and after the loop completes, the function returns the list \`span\` containing the span values for each day. This approach ensures that the span for each day is calculated efficiently using a stack to keep track of relevant indices.`

export const task2Code =
`def longest_valid_brackets(s: str) -> int:
    map = {'(': ')', '[': ']'}
    stack = [-1]
    max_length = 0
    for i, char in enumerate(s):
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
    return max_length`

export const task2Explanation =
`
This code defines a function called \`longest_valid_brackets\` that takes a string of parentheses as input and returns the length of the longest valid parentheses substring. 

First, it creates a dictionary called \`map\` that maps opening parentheses to their corresponding closing parentheses. 

Then, it initializes a list called \`stack\` with \`-1\` and a variable called \`max_length\` with \`0\`. The \`stack\` is used to keep track of the indices of the opening parentheses, and \`max_length\` is used to keep track of the maximum length of valid parentheses substring found so far.

Next, it iterates over the string. For each character, if it's an opening parenthesis, it adds its index to the \`stack\`. If it's a closing parenthesis, it checks if the \`stack\` is not empty and the last element in the \`stack\` is an opening parenthesis that matches the current closing parenthesis. If both conditions are true, it removes the last element from the \`stack\` and updates \`max_length\` to be the maximum of \`max_length\` and the difference between the current index and the last element in the \`stack\`. If either condition is false, it updates the last element in the \`stack\` to be the current index.

Finally, it returns \`max_length\`.

This function uses a stack to keep track of the indices of the opening parentheses, and for each closing parenthesis, it tries to match it with the last opening parenthesis in the stack. If they match, it removes the last opening parenthesis from the stack and updates the maximum length of valid parentheses substring. If they don't match, it updates the last element in the stack to be the current index. This way, it ensures that every opening parenthesis has a corresponding closing parenthesis in the correct order without any mismatches.`

export const task3Code =
`def binary_numbers(n1: int, n2: int) -> list[str]:
    result = []
    q = ['1']
    for i in range(n2):
        current = q.pop(0)
        current_int = int(current, 2)
        if n1 <= current_int <= n2:
            result.append(current)
        q.append(current + '0')
        q.append(current + '1')
    return result
print(binary_numbers(2, 5))`

export const task3Explanation =
`def binary_numbers(n1: int, n2: int) -> list[str]: ### Define a function named \`binary_numbers\` that takes two integers \`n1\` and \`n2\` as input and returns a list of strings.
    result = [] ### Initialize an empty list \`result\` to store the binary numbers as strings.
    queue = ["1"] ### Initialize a queue with the first binary number "1".

    while queue: ### Start a loop that continues as long as the queue is not empty.
        current = queue.pop(0) ### Remove and get the first element from the queue.
        num = int(current, 2) ### Convert the binary string \`current\` to an integer \`num\`.

        if num > n2: ### If the integer \`num\` is greater than \`n2\`, break the loop as we have generated all required binary numbers.
            break

        if num >= n1: ### If the integer \`num\` is between \`n1\` and \`n2\` (inclusive), add the binary string \`current\` to the result list.
            result.append(current)

        queue.append(current + "0") ### Append the next binary number by adding "0" to the current binary string.
        queue.append(current + "1") ### Append the next binary number by adding "1" to the current binary string.

    return result ### Return the list \`result\` containing the binary numbers as strings.
print(binary_numbers(2, 5)) ### This will print the binary numbers between 2 and 5, which are ['10', '11', '100', '101'].
[END]

[OVERALL-EXPLANATION]
The provided code defines a function \`binary_numbers\` that generates all binary numbers between two given integers \`n1\` and \`n2\` and returns them as a list of strings. The function uses a queue to generate these binary numbers efficiently.

The function starts by initializing an empty list \`result\` to store the binary numbers as strings. It also initializes a queue with the first binary number "1".

The function then enters a loop that continues as long as the queue is not empty. In each iteration of the loop, it removes and gets the first element from the queue, which is a binary string. This binary string is then converted to an integer.

If the integer is greater than \`n2\`, the loop breaks because all required binary numbers have been generated. If the integer is between \`n1\` and \`n2\` (inclusive), the binary string is added to the result list.

The function then appends the next binary numbers by adding "0" and "1" to the current binary string and adding these new binary strings to the queue. This ensures that all binary numbers are generated in increasing order.

Finally, the function returns the list \`result\` containing the binary numbers as strings. This approach ensures that the binary numbers are generated efficiently using a queue.`

export const task4Code =
`def dna_sequences(pattern: str) -> list[str]:
    dna_chars = ["A", "C", "G", "T"]
    q = [""]
    result = []
    while len(q) > 0:
        seq = q.pop(0)
        if len(seq) == len(pattern):
            result.append(seq)
        else:
            if pattern[len(seq)] == "N":
                for ch in dna_chars:
                    q.append(seq + ch)
            else:
                q.append(seq + pattern[len(seq)])
    return result`

export const task4Explanation =
`This code defines a function called \`dna_sequences\` that takes a DNA pattern as input and returns a list of all possible DNA sequences that can be generated by replacing the 'N' in the pattern with each of the four DNA bases ('A', 'C', 'G', 'T').

First, it initializes a list \`dna_chars\` with the four DNA bases, an empty queue \`q\` with an empty string, and an empty list \`result\` to store the generated DNA sequences.

Then, it enters a loop that continues until the queue is empty. In each iteration, it removes the first sequence from the queue. If the length of this sequence is equal to the length of the pattern, it means that the sequence is complete, so it adds it to the \`result\` list.

Otherwise, it checks the character in the pattern at the position corresponding to the length of the current sequence. If this character is 'N', it means that it can be replaced by any DNA base, so it adds four new sequences to the queue, each obtained by appending one of the DNA bases to the current sequence. If the character is not 'N', it means that it is a specific DNA base, so it adds a new sequence to the queue obtained by appending this base to the current sequence.

Finally, it returns the \`result\` list.

The queue is used to generate the DNA sequences efficiently. Instead of generating all possible sequences and then filtering out those that match the pattern, it generates and checks each sequence one by one. This way, it doesn't generate more sequences than necessary.`
