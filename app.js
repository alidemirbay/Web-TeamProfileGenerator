const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeList = [];

const managerQuestion = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
    }, {
        type: "input",
        name: "id",
        message: "What is the manager's id number?"
    }, {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
    }, {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }
];

const engineerQuestion = [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
    }, {
        type: "input",
        name: "id",
        message: "What is the engineer's id number?"
    }, {
        type: "input",
        name: "email",
        message: "What is the engineer's email?"
    }, {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?"
    }
]

const internQuestion = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
    }, {
        type: "input",
        name: "id",
        message: "What is the intern's id number?"
    }, {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
    }, {
        type: "input",
        name: "school",
        message: "What  the intern's school?"
    }
]

const list = [{
    type: "list",
    name: "EmployeeType",
    choices: [
        "Manager",
        "Engineer",
        "Intern",
        "Exit"
    ],
    message: "Please select your employee."
}]

const promptSelection = () => {
    inquirer.prompt(list).then(answer => {
        switch (answer.EmployeeType) {
            case "Manager": promptManager();
                break;
            case "Engineer": promptEngineer();
                break;
            case "Intern": promptIntern();
                break;
            default: generateHtml();
        }
    })
}
const promptManager = () => {
    inquirer.prompt(managerQuestion).then(answer => {
        employeeList.push(new Manager(answer.name, answer.id, answer.email, answer.officeNumber));
        promptSelection();
    })
}

const promptEngineer = () => {
    inquirer.prompt(engineerQuestion).then(answer => {
        employeeList.push(new Engineer(answer.name, answer.id, answer.email, answer.github));
        promptSelection();
    })
}

const promptIntern = () => {
    inquirer.prompt(internQuestion).then(answer => {
        employeeList.push(new Intern(answer.name, answer.id, answer.email, answer.school));
        promptSelection();
    })
}

const generateHtml = () => {
    fs.writeFile(outputPath, render(employeeList), (err) => {
        if (err) throw err;
        console.log('File saved at ' + outputPath);
    })
}

promptSelection();