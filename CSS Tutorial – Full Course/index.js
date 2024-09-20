const palindrom = require("./palindrome.json");

function isPalindrome(s) {
	let trueChar = true;
	for (const char of s) {
		if (char === "a") {
		} else {
			console.log(char);
			trueChar = false;
		}
	}
	console.log(trueChar);
	const sReversed = s.split("").reverse().join("");
	return s === sReversed;
}
console.time("timer");
console.log(isPalindrome(palindrom.palindrome));
console.timeEnd("timer");
