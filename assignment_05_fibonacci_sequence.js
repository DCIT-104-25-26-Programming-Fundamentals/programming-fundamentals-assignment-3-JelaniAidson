// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function generateFibonacciSequence(termCount) {
	if (!Number.isInteger(termCount) || termCount <= 0) {
		return null;
	}

	const sequence = [];
	let firstTerm = 0;
	let secondTerm = 1;

	for (let i = 0; i < termCount; i++) {
		sequence.push(firstTerm);

		const nextTerm = firstTerm + secondTerm;
		firstTerm = secondTerm;
		secondTerm = nextTerm;
	}

	return sequence;
}

function isFibonacciNumber(number) {
	if (!Number.isInteger(number) || number < 0) {
		return false;
	}

	let firstTerm = 0;
	let secondTerm = 1;

	while (firstTerm < number) {
		const nextTerm = firstTerm + secondTerm;
		firstTerm = secondTerm;
		secondTerm = nextTerm;
	}

	return firstTerm === number;
}

function main() {
	const termCount = readlineSync.questionInt('How many terms? ');
	const sequence = generateFibonacciSequence(termCount);

	if (sequence === null) {
		console.log('Error: Number of terms must be a positive integer.');
		return;
	}

	console.log(`Fibonacci sequence: ${sequence.join(' ')}`);

	const number = readlineSync.questionInt('Enter a number to check: ');

	if (isFibonacciNumber(number)) {
		console.log(`${number} is a Fibonacci number.`);
	} else {
		console.log(`${number} is NOT a Fibonacci number.`);
	}
}

if (require.main === module) {
	main();
}

module.exports = { generateFibonacciSequence, isFibonacciNumber, main };


