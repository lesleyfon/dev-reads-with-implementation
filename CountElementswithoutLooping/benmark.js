function countElemInStrWithRegexMatch(str, elem) {
	const regex = new RegExp(elem, "g");
	return str.match(regex)?.length || 0;
}
function countElemInStrWithForLoop(str, elem) {
	let count = 0;
	for (let index = 0; index < str.length; index++) {
		const char = str[index];
		if (elem === char) {
			count += 1;
		}
	}

	return count;
}
function countElemInStrWithForOf(str, elem) {
	let count = 0;
	for (const char of str) {
		if (elem === char) {
			count += 1;
		}
	}

	return count;
}

const generateRandomStr = () => Math.round(Math.random());
const TEST_STR = Array.from(Array(1_000_000), generateRandomStr).join("");
const TEST_STR_TEN_M = Array.from(Array(10_000_000), generateRandomStr).join("");

Deno.bench({
	name: `Benchmark counting element using Regex`,
	fn: () => {
		countElemInStrWithRegexMatch(TEST_STR, `1`);
	},
});
Deno.bench({
	name: `Benchmark counting elements occurrence with a For Loop`,
	fn: () => {
		countElemInStrWithForLoop(TEST_STR, `1`);
	},
});
Deno.bench({
	name: `Benchmark counting element occurrence with a For-Of Loop`,
	fn: () => {
		countElemInStrWithForOf(TEST_STR, "1");
	},
});

// TEST_STR_TEN_M
Deno.bench({
	name: `Benchmark counting element using Regex`,
	fn: () => {
		countElemInStrWithRegexMatch(TEST_STR, `1`);
	},
});
Deno.bench({
	name: `Benchmark counting elements occurrence with a For Loop`,
	fn: () => {
		countElemInStrWithForLoop(TEST_STR, `1`);
	},
});
Deno.bench({
	name: `Benchmark counting element occurrence with a For-Of Loop`,
	fn: () => {
		countElemInStrWithForOf(TEST_STR, "1");
	},
});
