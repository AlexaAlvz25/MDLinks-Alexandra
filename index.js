const process = require('process');
const validatePath = require('./components/validatePath')

const mdLinks = (pathProvide) => new Promise((resolve) => {
  resolve(validatePath(pathProvide))
})

mdLinks(process.argv[2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
