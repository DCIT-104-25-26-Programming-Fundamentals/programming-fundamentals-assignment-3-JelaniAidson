// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function transposeMatrix(matrix) {
	const transposed = [];

	for (let column = 0; column < matrix[0].length; column++) {
		const row = [];

		for (let sourceRow = 0; sourceRow < matrix.length; sourceRow++) {
			row.push(matrix[sourceRow][column]);
		}

		transposed.push(row);
	}

	return transposed;
}

function addMatrices(firstMatrix, secondMatrix) {
	if (
		firstMatrix.length !== secondMatrix.length ||
		firstMatrix[0].length !== secondMatrix[0].length
	) {
		return null;
	}

	const sum = [];

	for (let row = 0; row < firstMatrix.length; row++) {
		const sumRow = [];

		for (let column = 0; column < firstMatrix[row].length; column++) {
			sumRow.push(firstMatrix[row][column] + secondMatrix[row][column]);
		}

		sum.push(sumRow);
	}

	return sum;
}

function multiplyMatrices(firstMatrix, secondMatrix) {
	if (firstMatrix[0].length !== secondMatrix.length) {
		return null;
	}

	const product = [];

	for (let row = 0; row < firstMatrix.length; row++) {
		const productRow = [];

		for (let column = 0; column < secondMatrix[0].length; column++) {
			let value = 0;

			for (let index = 0; index < secondMatrix.length; index++) {
				value += firstMatrix[row][index] * secondMatrix[index][column];
			}

			productRow.push(value);
		}

		product.push(productRow);
	}

	return product;
}

function readMatrix(rows, columns, name) {
	const matrix = [];

	for (let row = 0; row < rows; row++) {
		let values;
		let hasInvalidValue;

		do {
			const input = readlineSync.question(
				`Enter row ${row + 1} of ${name}: `
			).trim();
			values = input === '' ? [] : input.split(/\s+/).map(Number);
			hasInvalidValue = false;

			for (let column = 0; column < values.length; column++) {
				if (Number.isNaN(values[column])) {
					hasInvalidValue = true;
				}
			}

			if (values.length !== columns || hasInvalidValue) {
				console.log(`Error: Please enter exactly ${columns} numbers.`);
			}
		} while (values.length !== columns || hasInvalidValue);

		matrix.push(values);
	}

	return matrix;
}

function printMatrix(matrix) {
	let largestValueLength = 0;

	for (let row = 0; row < matrix.length; row++) {
		for (let column = 0; column < matrix[row].length; column++) {
			const valueLength = String(matrix[row][column]).length;

			if (valueLength > largestValueLength) {
				largestValueLength = valueLength;
			}
		}
	}

	for (let row = 0; row < matrix.length; row++) {
		let output = '';

		for (let column = 0; column < matrix[row].length; column++) {
			output += String(matrix[row][column]).padStart(largestValueLength + 1);
		}

		console.log(output.trimStart());
	}
}

function readDimensions(label) {
	const rows = readlineSync.questionInt(`Enter number of rows for ${label}: `);
	const columns = readlineSync.questionInt(
		`Enter number of columns for ${label}: `
	);

	if (rows <= 0 || columns <= 0) {
		console.log('Error: Matrix dimensions must be positive.');
		return null;
	}

	return { rows, columns };
}

function main() {
	console.log('Part A - Transpose a Matrix');
	const transposeDimensions = readDimensions('the matrix');

	if (transposeDimensions === null) {
		return;
	}

	const matrix = readMatrix(
		transposeDimensions.rows,
		transposeDimensions.columns,
		'the matrix'
	);
	const transposed = transposeMatrix(matrix);

	console.log('\nOriginal Matrix:');
	printMatrix(matrix);
	console.log('\nTransposed Matrix:');
	printMatrix(transposed);

	console.log('\nPart B - Add Two Matrices');
	const additionDimensions = readDimensions('both matrices');

	if (additionDimensions === null) {
		return;
	}

	const firstAdditionMatrix = readMatrix(
		additionDimensions.rows,
		additionDimensions.columns,
		'matrix A'
	);
	const secondAdditionMatrix = readMatrix(
		additionDimensions.rows,
		additionDimensions.columns,
		'matrix B'
	);

	console.log('\nSum Matrix:');
	printMatrix(addMatrices(firstAdditionMatrix, secondAdditionMatrix));

	console.log('\nPart C - Multiply Two Matrices');
	const firstMultiplicationDimensions = readDimensions('matrix A');

	if (firstMultiplicationDimensions === null) {
		return;
	}

	const secondMultiplicationDimensions = readDimensions('matrix B');

	if (secondMultiplicationDimensions === null) {
		return;
	}

	if (
		firstMultiplicationDimensions.columns !== secondMultiplicationDimensions.rows
	) {
		console.log(
			'Error: Matrix A columns must equal matrix B rows for multiplication.'
		);
		return;
	}

	const firstMultiplicationMatrix = readMatrix(
		firstMultiplicationDimensions.rows,
		firstMultiplicationDimensions.columns,
		'matrix A'
	);
	const secondMultiplicationMatrix = readMatrix(
		secondMultiplicationDimensions.rows,
		secondMultiplicationDimensions.columns,
		'matrix B'
	);

	console.log('\nProduct Matrix:');
	printMatrix(
		multiplyMatrices(firstMultiplicationMatrix, secondMultiplicationMatrix)
	);
}

if (require.main === module) {
	main();
}

module.exports = {
	transposeMatrix,
	addMatrices,
	multiplyMatrices,
	readMatrix,
	printMatrix,
	main,
};

