#!/usr/bin/env node
"use strict";

var inquirer = require("inquirer"),
    chalk = require("chalk"),
    response = chalk.dim.cyan,
    resume = require("./resume.json");

var resumePrompts = {
    type: "list",
    name: "resumeOptions",
    message: "What do you want to know about me?\n",
    choices: [...Object.keys(resume), "Exit"]
};

function main() {
    console.log("\nHello, my name is Artem Gusev (CreativeRusBear). Welcome to my resume:)\n");
    resumeHandler();
}

function resumeHandler() {
    inquirer.prompt(resumePrompts).then(answer => {
        if (answer.resumeOptions == "Exit") {
            return;
        }
        var option = answer.resumeOptions;
        console.log(response("--------------------------------------"));
        resume[`${option}`].forEach(info => {
            console.log(response("|   => " + info));
        });
        console.log(response("--------------------------------------"));
        inquirer
            .prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            })
            .then(choice => {
                if (choice.exitBack == "Back") {
                    resumeHandler();
                } else {
                    return;
                }
            });
    });
}

main();
