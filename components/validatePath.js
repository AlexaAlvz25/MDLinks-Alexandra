const path = require('path');
const recursivity = require('./recursivity')
const readFile = require('./readFile');

module.exports = (pathProvide) => {
  const isMdFile = path.extname(pathProvide);
  if (isMdFile == '') {
    const filesMD = recursivity(pathProvide);
    switch (filesMD.length) {
      case 0:
        return 'The current directory is not contain a Markdown File';
      case 1:
        return readFile(filesMD[0]);
      default:
        let result = [];
        filesMD.forEach((file) => {
          readFile(file).forEach((element) => result.push(element))
        })
      return result;
    }
  } else {
    return readFile(pathProvide);
  }
}
