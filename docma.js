const Docma = require('docma');
const chalk=require('chalk');

Docma.create()
	.build('./docma.json')
	.then(() => console.log(chalk.bold.cyan('Documentation is built successfully.')))
	.catch(error => console.log(chalk.bold.red(error)));