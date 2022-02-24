const readlineSync = require("readline-sync");
const fs = require("fs");

let newData;
let flag = true;

class Student {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}

function getAllData() {
	const data = JSON.parse(
		fs.readFileSync("./data.json", { encoding: "utf-8" })
	);
	return data;
}

function addData(callback) {
	const data = callback();
	const askName = readlineSync.question("What is your name ? ");
	const askAge = readlineSync.question("What is your age ? ");
	const student = new Student(askName, askAge);
	newData = [...data, student];
	console.log(student);
}

function saveData() {
	const sendData = JSON.stringify(newData);
	fs.writeFileSync("./data.json", sendData);
}

while (flag) {
	const options = ["Show all students", "Create new student", "Save & Exit"];
	const index = readlineSync.keyInSelect(options, "Choose an an option");
	choose(index);
}
function choose(index) {
	switch (index) {
		case 0:
			console.log(getAllData());
			break;
		case 1:
			addData(getAllData);
			break;
		case 2:
			saveData();
			break;
		default:
			flag = false;
			break;
	}
}
