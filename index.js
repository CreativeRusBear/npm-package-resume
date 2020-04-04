#!/usr/bin/env node

/**
 * @version v1.0.2
 * @file My small resume on the NPM-package form
 * @author Artem Gusev <gusev2014russia@mail.ru> (CreativeRusBear)
 * @copyright 2019-present Artem Gusev
 * @licence
 * MIT License
 *
 * Copyright (c) 2019 Artem Gusev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const response = chalk.dim.cyan;
const resume = require('./resume.json');

const resumePrompts = {
	type    : 'list',
	name    : 'resumeOptions',
	message : 'What do you want to know about me?\n',
	choices : [ ...Object.keys(resume), 'Exit' ],
};

/**
 * @function
 * @description Starter function, that welcome you and run `resumeHandler` function
 */
function main () {
	console.log('\nHello, my name is Artem Gusev (CreativeRusBear). Welcome to my resume :)\n');
	resumeHandler();
}

/**
 * @function
 * @description Render information about specific section or render sublist
 */
function resumeHandler () {
	inquirer.prompt(resumePrompts).then(answer => {
		if (answer.resumeOptions === 'Exit') {
			return;
		}
		const option = answer.resumeOptions;
		console.log(response('--------------------------------------'));
		resume[`${option}`].forEach(info => {
			console.log(response(`•  ${info}`));
		});
		console.log(response('--------------------------------------'));
		inquirer
			.prompt({
				type    : 'list',
				name    : 'exitBack',
				message : 'Go back or Exit?',
				choices : [ 'Back', 'Exit' ],
			})
			.then(choice => {
				if (choice.exitBack === 'Back') {
					resumeHandler();
				}
			});
	});
}

main();
