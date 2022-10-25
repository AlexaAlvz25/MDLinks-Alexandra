const process = require('process');
const validatePath = require('./components/validatePath')
const checkHttp = require('./components/verificateURL');

const mdLinks = (pathProvide) => new Promise((resolve) => {
  const paths = validatePath(pathProvide);
  //resolve(paths)
  resolve(checkHttp(paths))
})

mdLinks(process.argv[2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
