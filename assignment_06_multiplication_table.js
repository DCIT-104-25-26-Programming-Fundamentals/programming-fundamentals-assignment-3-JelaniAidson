// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 6
// =============================================================================
//
// TASK: Multiplication Table Generator
//
// Write a JavaScript program that generates multiplication tables using loops
// and functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_06_multiplication_table.js
//
// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Print the multiplication table for that number from 1 to 12.
//
// Expected output (if user enters 5):
//
//   Multiplication Table for 5:
//   5  x  1  =  5
//   5  x  2  =  10
//   5  x  3  =  15
//   ...
//   5  x  12 =  60
//
// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
// - Ask the user to enter a number N.
// - Print the full multiplication table for every number from 1 to N.
// - Add a separator line (e.g. "---") between each table.
//
// Expected output (if user enters 3):
//
//   Multiplication Table for 1:
//   1  x  1  =  1
//   ...
//   1  x  12 =  12
//   ---------------------------
//   Multiplication Table for 2:
//   2  x  1  =  2
//   ...
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - N must be a positive integer. If the user enters an invalid value,
//   print an error message and stop.
// - Each part must be in its own function (see scaffold below).
// - Complete Part A before attempting Part B.

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function isPositiveInteger(number) {
	return Number.isInteger(number) && number > 0;
}

function printMultiplicationTable(number) {
	console.log(`Multiplication Table for ${number}:`);

	for (let multiplier = 1; multiplier <= 12; multiplier++) {
		const product = number * multiplier;
		console.log(`${number}  x  ${String(multiplier).padStart(2)}  =  ${product}`);
	}
}

function printTablesUpTo(number) {
	for (let tableNumber = 1; tableNumber <= number; tableNumber++) {
		printMultiplicationTable(tableNumber);

		if (tableNumber < number) {
			console.log('---------------------------');
		}
	}
}

function main() {
	const singleTableNumber = readlineSync.questionInt(
		'Enter a number for the single table: '
	);

	if (!isPositiveInteger(singleTableNumber)) {
		console.log('Error: Number must be a positive integer.');
		return;
	}

	printMultiplicationTable(singleTableNumber);

	const tableLimit = readlineSync.questionInt(
		'Enter N for tables from 1 to N: '
	);

	if (!isPositiveInteger(tableLimit)) {
		console.log('Error: N must be a positive integer.');
		return;
	}

	console.log('\nTables from 1 to N:');
	printTablesUpTo(tableLimit);
}

if (require.main === module) {
	main();
}

module.exports = {
	isPositiveInteger,
	printMultiplicationTable,
	printTablesUpTo,
	main,
};


