const path = require('path')

//function return lines with URL
function getURLData(data, pathProvide) {
  const lines = data.split('\n');
  const urlLines = []
  lines.forEach(line => {
    if(line.includes('](http')){
      line = line.slice(0, line.length - 1);
      urlLines.push(line)
    }
  });
  return createArrayObj(urlLines, pathProvide);
}

//function that creates an array of objects with the received links
function createArrayObj(array, pathProvide) {
  const arrayObj = [];
  array.forEach(element => {
    const obj = {}
    if (element.includes('http')) {
      const arrayElement = element.split(']');
      arrayElement.forEach(miniElement => {
        if (miniElement.includes('http')) {
          const indexInitUrl = miniElement.indexOf('http');
          if(miniElement.includes(')')) {
            const indexFinUrl = miniElement.indexOf(')');
            obj.href = miniElement.slice(indexInitUrl, indexFinUrl);
          }else {
            obj.href = miniElement.slice(indexInitUrl);
          }
        }
        if (miniElement.includes('[')) {
          const indexInitText = miniElement.indexOf('[')+1;
          obj.text = miniElement.slice(indexInitText);
        }
      })
    }
    obj.file = path.normalize(pathProvide);
    arrayObj.push(obj) 
  })
  return arrayObj
};

module.exports = getURLData;