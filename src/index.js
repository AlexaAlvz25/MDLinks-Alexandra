#!/usr/bin/env node
const process = require('process');
const { pathsToStats, readPath} = require('./controllers/validatePath');
const checkHttp = require('./controllers/verificateURL');
const checkStatsHttp = require('./controllers/validateURL-statics')
const { program } = require('commander');
const chalk = require('chalk');

program
  .name(chalk.white.bold.bgMagenta('API CLI Mdlinks'))
  .description('An experimental API for CLI to read files with extension ".md"')
  .version('0.1.0', '-v, --vers', 'output the current version');

//------->> Construction of CLI and actions
program
  .description(chalk.black.bold.bgYellow('dentify the Markdown file, parse and print the links you have found'))
  .argument('<path>', chalk.bold('file or directory that includes files -md'))
  .option('--validate', chalk.bold.bgBlueBright('HTTP link validation using Axios'))
  .option('--stats', chalk.bold.bgBlueBright('bBasic link statistics'))
  .option('--stats --validate', chalk.bold.bgBlueBright('To get statistics that require the results of the validation'))
  .action((path, options) => {

    if(options.validate&&options.stats) { //<--- Both options
      const validateStats = (pathProvide) => new Promise((resolve) => {
        const linksArray = pathsToStats(pathProvide);
      resolve(checkStatsHttp(linksArray));
      })
      validateStats(path)
        .then((result) => {
          let okLinks = 0;
          let brokenLinks = 0;
          result.forEach((link) => {
            if(link.status == 'ok') {
              okLinks += 1;
            }else{
              brokenLinks +=1;
            }
          })
          process.stdout.write(chalk.green.bold('TOTAL: '+ (okLinks+brokenLinks)+'\n'));
          process.stdout.write(chalk.yellow.bold('OK: '+okLinks+'\n'));
          result.forEach((link) => {
            if(link.status == 'ok') {
              process.stdout.write(chalk.cyan.underline('  '+link.url+'\n'));
            }
          })
          process.stdout.write(chalk.red.bold('BROKEN: '+brokenLinks+'\n'));
          result.forEach((link) => {
            if(link.status == 'broken') {
              process.stdout.write(chalk.magenta.underline('  '+link.url+'\n'));
            }
          })
        })
        .catch((err) => console.log(err.message))
      
    } else if (options.stats) {  //<--- Statics
      const statsLinks = (pathProvide) => new Promise((resolve) => {
        resolve(pathsToStats(pathProvide));
      })
      statsLinks(path)
        .then((result) => {
          process.stdout.write(chalk.green.bold('TOTAL: '+(result[0].length+result[1].length)+'\n'));
          process.stdout.write(chalk.yellow.bold('UNIQUE: '+(result[0].length)+'\n'));
            result[0].forEach((link) => {
              process.stdout.write(chalk.cyan.underline('  '+link+'\n'));
            })
          process.stdout.write(chalk.red.bold('REPEAT: '+(result[1].length)+'\n'));
            result[1].forEach((link) => {
              process.stdout.write(chalk.magenta.underline('  '+link+'\n'));
            })
        })
        .catch((err) => console.log(err.message))

    } else if (options.validate) {  //<--- Validation HTTP
      const axiosValidation = (pathProvide) => new Promise((resolve) => {
        const linksObj = readPath(pathProvide);
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
        const linksObj = readPath(pathProvide);
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
