// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function calculateAverage(scores) {
	let total = 0;

	for (let i = 0; i < scores.length; i++) {
		total += scores[i];
	}

	return total / scores.length;
}

function findStudentById(students, id) {
	for (let i = 0; i < students.length; i++) {
		if (students[i].id === id) {
			return students[i];
		}
	}

	return null;
}

function addStudent(students) {
	const name = readlineSync.question('Student name: ').trim();
	const id = readlineSync.questionInt('Student ID: ');

	if (name === '') {
		console.log('Error: Student name cannot be empty.');
		return;
	}

	if (id <= 0 || findStudentById(students, id) !== null) {
		console.log('Error: Student ID must be positive and unique.');
		return;
	}

	const scoreCount = readlineSync.questionInt('How many scores? ');

	if (scoreCount <= 0) {
		console.log('Error: Number of scores must be positive.');
		return;
	}

	const scores = [];

	for (let i = 0; i < scoreCount; i++) {
		let score;

		do {
			score = readlineSync.questionFloat(`Enter score ${i + 1}: `);

			if (score < 0 || score > 100) {
				console.log('Error: Score must be between 0 and 100.');
			}
		} while (score < 0 || score > 100);

		scores.push(score);
	}

	students.push({ name, id, scores });
	console.log(`Student "${name}" added successfully.`);
}

function displayStudents(students) {
	if (students.length === 0) {
		console.log('No students have been added yet.');
		return;
	}

	console.log('\nStudent Records:');
	console.log('Name                 ID          Scores              Average');
	console.log('------------------------------------------------------------');

	for (let i = 0; i < students.length; i++) {
		const student = students[i];
		const scores = student.scores.join(', ');
		const average = calculateAverage(student.scores).toFixed(2);
		console.log(
			`${student.name.padEnd(20)} ${String(student.id).padEnd(11)} ${scores.padEnd(20)} ${average}`
		);
	}
}

function calculateStudentAverage(students) {
	const id = readlineSync.questionInt('Enter student ID: ');
	const student = findStudentById(students, id);

	if (student === null) {
		console.log('Error: Student ID not found.');
		return;
	}

	console.log(
		`${student.name}'s average score: ${calculateAverage(student.scores).toFixed(2)}`
	);
}

function displayMenu() {
	console.log('\n================================');
	console.log('   STUDENT RECORD SYSTEM MENU');
	console.log('================================');
	console.log('1. Add student');
	console.log('2. Display all students');
	console.log('3. Calculate average score');
	console.log('4. Quit');
}

function main() {
	const students = [];
	let choice;

	do {
		displayMenu();
		choice = readlineSync.questionInt('Enter your choice (1-4): ');

		if (choice === 1) {
			addStudent(students);
		} else if (choice === 2) {
			displayStudents(students);
		} else if (choice === 3) {
			calculateStudentAverage(students);
		} else if (choice === 4) {
			console.log('Goodbye!');
		} else {
			console.log('Error: Please choose an option from 1 to 4.');
		}
	} while (choice !== 4);
}

if (require.main === module) {
	main();
}

module.exports = {
	calculateAverage,
	findStudentById,
	addStudent,
	displayStudents,
	calculateStudentAverage,
	displayMenu,
	main,
};


