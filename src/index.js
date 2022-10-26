#!/usr/bin/env node
const process = require('process');
const validatePath = require('./controllers/validatePath');
const checkHttp = require('./controllers/verificateURL');
const { program } = require('commander');
const chalk = require('chalk');

program
  .name('API CLI Mdlinks')
  .description('An experimental API for CLI to read files with extension ".md"')
  .version('0.1.0', '-v, --vers', 'output the current version');


program
  .description('dentify the Markdown file, parse and print the links you have found')
  .argument('<path>', 'file or directory that includes files -md')
  .option('--validate', 'HTTP link validation using Axios')
  .option('--stats', 'bBasic link statistics')
  .option('--stats --validate', 'To get statistics that require the results of the validation')
  .action((path, options) => {

    if(options.validate&&options.stats) { //<--- Both options
      console.log('en construccion')
    } else if (options.stats) {  //<--- Statics
      console.log('en construccion')
    } else if (options.validate) {  //<--- Validation HTTP
      const axiosValidation = (pathProvide) => new Promise((resolve) => {
        const linksObj = validatePath(pathProvide);
        resolve(checkHttp(linksObj));
      })
      axiosValidation(path)
        .then((result) => {
          result.forEach( (objLink) => {
            process.stdout.write(chalk.blue(objLink.file + '  '));
            process.stdout.write(chalk.green.underline(objLink.href + '  '));
            process.stdout.write(chalk.yellow.bold(objLink.statusCode + '  '));
            if(objLink.statusText == 'Ok') {
              process.stdout.write(chalk.green.bold(objLink.statusText + '  '));
            } else {
              process.stdout.write(chalk.red.bold(objLink.statusText + '  '));
            }
            process.stdout.write(chalk.blackBright(objLink.text + '\n'));
          });
        })
        .catch((err) => console.log(err.message))
    }else { //<--- Read links in file
      const parseMdFile = (pathProvide) => new Promise((resolve) => {
        const linksObj = validatePath(pathProvide);
        resolve(linksObj);
      })
      parseMdFile(path)
        .then((result) => {
          result.forEach( (objLink) => {
            process.stdout.write(chalk.blue(objLink.file + '  '));
            process.stdout.write(chalk.green.underline(objLink.href + '  '));
            process.stdout.write(chalk.blackBright(objLink.text + '\n'));
          });
        })
        .catch((err) => console.log(err.message))
    }
  })

program.parse();
