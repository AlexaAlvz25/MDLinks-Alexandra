const path = require('path');
const recursivity = require('./recursivity')
const readFile = require('./readFile');

module.exports = (pathProvide) => {
  const isMdFile = path.extname(pathProvide);
  if (isMdFile == '') {
    const filesMD = recursivity(pathProvide);
    if (filesMD.length == 0) {
      return console.log('The current directory is not contain a Markdown File');
    } else if (filesMD.length == 1) {
      return readFile(filesMD);
    } else {
      let result = [];
      filesMD.forEach((file) => {
        result.push(readFile(file));
      })
      return result;
    }
  } else {
    return readFile(pathProvide);
  }
}
