const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output"); // creates the output folder path. emample(user/james/desktop....).
const outputPath = path.join(OUTPUT_DIR, "team.html"); // joins team.html to the output path.

const render = require("./lib/htmlRenderer");
const { type } = require("os");
const { off } = require("process");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeePrompt = {
  type: "rawlist",
  name: "newEmployee",
  message: "which employee would you be adding today?",
  choices: ["Manager", "Engineer", "Intern"],
};

const namePrompt = {
  type: "input",
  name: "name",
  message: "what is your name ?",
};

const idPrompt = {
  type: "input",
  name: "id",
  message: "what is employees new id ?",
};

const emailPrompt = {
  type: "input",
  name: "email",
  message: "what is employees new email address ?",
};

const officeNumberPrompt = {
  type: "input",
  name: "officeNumber",
  message: "what is the new employees new office number ?",
};

const gitHubPrompt = {
  type: "input",
  name: "github",
  message: "what is you github account ?",
};

const schoolPrompt = {
  type: "input",
  name: "school",
  message: "what school do you attend",
};

const questionPrompt = {
  type: "confirm",
  name: "question",
  message: "Would you like to add another employee ?",
};

function chooseEmployee() {
  return inquirer
    .prompt(employeePrompt)
    .then(function (answers) {
      if (answers.newEmployee === "Manager") {
        console.log("A Manger has been created !");
        return inquirer
          .prompt([namePrompt, idPrompt, emailPrompt, officeNumberPrompt])
          .then(function (answers) {
            // console.log(nameAnswers);
            // inquirer.prompt(idPrompt).then(function (idAnswers) {
            //   console.log(idAnswers);
            //   inquirer.prompt(emailPrompt).then(function (emailAnswers) {
            //     console.log(emailAnswers);
            //     return inquirer
            //       .prompt(officeNumberPrompt)
            //       .then(function (officeNumberAnswers) {
            //         console.log(officeNumberAnswers);
            var boss = new Manager(
              answers.name,
              answers.id,
              answers.email,
              answers.officeNumber
            );
            console.log(boss);
            return boss;
          });
      } else if (answers.newEmployee === "Engineer") {
        return inquirer
          .prompt([namePrompt, idPrompt, emailPrompt, gitHubPrompt])
          .then(function (answers) {
            var tech = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            );
            console.log(tech);
            console.log("A Engineer has been created !");
            return tech;
          });
      } else if (answers.newEmployee === "Intern") {
        return inquirer
          .prompt([namePrompt, idPrompt, emailPrompt, schoolPrompt])
          .then(function (answers) {
            const { name, id, email, school } = answers;
            var student = new Intern(name, id, email, school);
            console.log(student);
            console.log("A Intern has been created !");
            return student;
          });
      }
    })
    .catch((err) => console.log(err));
}

function loopEmployees() {
  // for (var i = 0; i < chooseEmployee.length; i++
  return chooseEmployee().then(function (employee) {
    employees.push(employee);
    return inquirer.prompt(questionPrompt).then(function (answers) {
      console.log(answers);
      if (answers.question === true) {
        return loopEmployees(employees);
      }
      return employees;
    });
  });
}
loopEmployees().then((employees) => {
  var html = render(employees);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
  });
});

// how students is moving through logic, so i can push to array.
// get employees into template.( create team.html).

// look at what render takes.
// do you need an adapter to see if render works.  hint: loops (foreach, for loop, mapping).
// check output folder.

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// render();
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
