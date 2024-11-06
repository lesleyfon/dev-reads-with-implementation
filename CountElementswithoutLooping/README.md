Snippets on how to count elements in a string without looping
---

### Example 1: Counting Occurrences of a Character

```js
const str1 = 'hello world';
const countH = str1.match(/h/g)?.length || 0; // Counts occurrences of 'h'
console.log(countH); // Output: 1
```


### Example 2: Counting Occurrences of a Specific Digit
```js
const str2 = '123123456789';
const count2 = str2.match(/2/g)?.length || 0; // Counts occurrences of '2'
console.log(count2); // Output: 2
```
Explanation: This example counts the number of times the digit '2' appears in the string '123123456789'.

### Example 3: Counting Occurrences of a Character (Case Sensitive)
```js
const str3 = 'JavaScript is fun!';
const countA = str3.match(/a/g)?.length || 0; // Counts occurrences of 'a'
console.log(countA); // Output: 2
```
Explanation: This example counts the occurrences of the letter 'a' in the string 'JavaScript is fun!'. Note that it is case-sensitive, so it does not count 'A'.

### Example 4: Counting All Vowel Occurrences
```js
const str4 = 'The quick brown fox jumps over the lazy dog';
const countVowels = str4.match(/[aeiou]/gi)?.length || 0; // Counts occurrences of any vowel
console.log(countVowels); // Output: 11
```
Explanation: This example counts all occurrences of vowels (both uppercase and lowercase) in the string. The i flag makes the match case-insensitive.

### Example 5: Counting Occurrences of Multiple Characters
```js
const str5 = 'banana';
const countAorN = str5.match(/[an]/g)?.length || 0; // Counts occurrences of 'a' or 'n'
console.log(countAorN); // Output: 4
```
Explanation: This example counts how many times either the letter 'a' or 'n' appears in the string 'banana'.

### Example 6: Counting Specific Word Occurrences
```js
const str6 = 'The quick brown fox jumps over the lazy dog. The dog barked.';
const countThe = str6.match(/\bthe\b/gi)?.length || 0; // Counts occurrences of the word 'the'
console.log(countThe); // Output: 2
```
Explanation: This example counts how many times the exact word 'the' appears in the string, case insensitive. The \b indicates word boundaries to ensure only whole words are matched.

### Example 7: Counting Special Characters
```js
const str7 = 'Hello @world! How are you? @user';
const countAtSymbol = str7.match(/@/g)?.length || 0; // Counts occurrences of '@'
console.log(countAtSymbol); // Output: 2
```
Explanation: This example counts how many times the '@' symbol appears in the string.

### Example 8: Counting Digits in a String
```js
const str8 = 'My phone number is 123-456-7890.';
const countDigits = str8.match(/\d/g)?.length || 0; // Counts occurrences of digits
console.log(countDigits); // Output: 10
```
Explanation: This example counts all the digits in the string using the regex \d, which matches any digit.

### Example 9: Counting Occurrences of a Substring
```js
const str9 = 'ababababab';
const countAB = str9.match(/ab/g)?.length || 0; // Counts occurrences of the substring 'ab'
console.log(countAB); // Output: 5
```

### Bench marking results
![img](./Screenshot%202024-11-06%20at%2011.39.36 AM.png)
- Based on the benchmark results, using a For Loop is the most efficient method for counting occurrences in this context, providing the best balance of performance and stability.
- While Regex offers flexibility for more complex string manipulations, it is not the best choice for simple counting tasks due to its slower execution time.
- The For-Of Loop, while readable, is not recommended for performance-sensitive scenarios where counting is necessary, given its slower average execution time.