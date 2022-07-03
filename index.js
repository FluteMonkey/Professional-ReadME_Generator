//requires
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./src/generateMarkdown.js')

//array of questions
const questions = [
    //project name
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of the project? (Required)',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('You need to enter a title to continue!');
                return false;
            }
        }
    },
    //description of project
    {
        type: 'input',
        name: 'description',
        message: 'Please add a description of the project. (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('You need to enter a description to continue')
                return false;
            }
        }
    },
    //installation Instructions
    {
        type: 'input',
        name: 'installation',
        message: 'How is your project installed? (Required)',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('You must enter installation instructions')
                return false;
            }
        }
    },
    //usage information
    {
        type: 'input',
        name: 'information',
        message: 'How is this project supposed to be used? (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('You need to provide information on how to use project!');
                return false;
            }
        }
    },
    //contribution guidlines
    {
        type: 'input',
        name: 'contribution',
        message: 'How should people contribute to this project? (Required)',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('You need to provide information on how to contribute to the project!');
                return false;
            }
        }
    },
    //test instructions
    {
        type: 'input',
        name: 'testing',
        message: 'How do you test this project? (Required)',
        validate: testingInput => {
            if (testingInput) {
                return true;
            } else {
                console.log('You need to describe how to test this project!');
                return false;
            }
        }
    },
    //liscensing
    {
        type: 'checkbox',
        name: 'licensing',
        message: 'Choose a license for your project (Required)',
        choices: ['Apache', 'MIT', 'Mozilla-Public', 'GNU-General-Public', 'Common-Development-and Distribution', 'None'],
        validate: licensingInput => {
            if (licensingInput) {
                return true;
            } else {
                console.log('You must pick a license for the project!');
                return false;
            }
        }
    },
    //git username
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    //email
    {
        type: 'input',
        name: 'email',
        message: 'Would you like to include your email? enter here:',
    },
];

//function to write README
function writeREADME(filename, data){
    fs.writeFile(filename, data, (err) =>{
        if (err) 
            throw err;
        console.log('Success! Information transferred to the README!')
    
    });
    generateMarkdown(data)
}

//function to initialize application
function initialize(){
    inquirer.prompt(questions)
    .then(function(userInput){
        console.log(userInput);
        writeREADME('README.md', generateMarkdown(userInput))
    });
}

//call initialize function
initialize();