const process = require('process');
const validatePath = require('./components/validatePath')
const checkHttp = require('./components/verificateURL');

const mdLinks = (pathProvide) => new Promise((resolve) => {
  const paths = validatePath(pathProvide);
  //resolve(paths)
  resolve(checkHttp(paths))
})

mdLinks(process.argv[2])
  .then((result) => {
    result.forEach((obj) => {
      process.stdout.write(obj.file + ' ');
      process.stdout.write(obj.href + ' ');
      process.stdout.write(obj.statusText + ' ');
      process.stdout.write(obj.statusCode + ' ');
      process.stdout.write(obj.text + '\n');
    });
  })
  .catch((err) => console.log(err))
