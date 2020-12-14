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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


