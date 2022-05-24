const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

function initApp() {
startHtml();
addMember();
}

const addEmployee = (role = "manager") => {
//set boolean to indicate if the employee is a manager
let isManager = role === "manager" ? true : false;
return inquirer
.prompt([
    {
    type: "input",
    name: "name",
    message: `What is the name of the ${role}?`,
    },
    {
    type: "input",
    name: "id",
    message: `What is the ${role}'s ID #?`,
    },
    {
    type: "input",
    name: "email",
    message: `What is the ${role}'s email?`,
    },
    {
    type: "input",
    name: "additional",
    message: `What is the ${role}'s ${
        isManager ? "office number" : "github"
    }?`,
    },
])
.then((userInput) => {
    const { name, id, email, additional } = userInput;
    let employee = {};
    if (role === "engineer") {
    employee = new Engineer(name, id, email, additional);
    } else if (role === "intern") {
    employee = new Intern(name, id, email, additional);
    } else {
    employee = new Manager(name, id, email, additional);
    }

    teamArray.push(employee);
})
.then(() => {
    return inquirer
    .prompt([
        {
        type: "list",
        name: "choice",
        message: "Would you like to add another employee?",
        choices: ["Engineer", "Intern", "Finished"],
        },
    ])
    .then((addAnother) => {
        switch (addAnother.choice) {
        case "Engineer":
            addEmployee("engineer");
            break;
        case "Intern":
            addEmployee("intern");
            break;
        default:
            fs.writeFileSync("./dist/index.html", generateHtml(teamArray));
            break;
        }
        });
    });
};

addEmployee();
