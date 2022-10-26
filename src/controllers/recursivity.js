const fs = require('fs');
const path = require('path');


//Function that read the content of directory and files inside
function readDirectories(pathProvide, arrayFiles = []) {
  const currentPath = fs.readdirSync(pathProvide);
  currentPath.forEach( (file) => {
    const pathUnion = path.join(pathProvide,file);
    const checkPath = fs.statSync(pathUnion);
    if(checkPath.isDirectory()) {
      readDirectories(pathUnion, arrayFiles)
    } else {
      arrayFiles.push(pathUnion)
    }
  })
  return arrayFiles
}

//Function that read the extension of the path
function extensionFile(arrayFiles) {
  const fileMd = []
  arrayFiles.forEach( (file) => {
    if(path.extname(file) == '.md') {
      fileMd.push(file)
    }
  })
  return fileMd
}

module.exports = (pathProvide) => {
  const arrayFiles = readDirectories(pathProvide);
  return extensionFile(arrayFiles)
}
