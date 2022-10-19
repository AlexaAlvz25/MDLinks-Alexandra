const fs = require('fs');
const process = require('process');
const path = require('path');

//function return lines with URL
function getURLData(data) {
  const lines = data.split('\n');
  const urlLines = []
  lines.forEach(line => {
    if(line.includes('http')){
      line = line.slice(0, line.length - 1);
      urlLines.push(line)
    }
  });
  return createArrayObj(urlLines);
}

//function that creates an array of objects with the received links
function createArrayObj(array) {
  const arrayObj = [];
  array.forEach(element => {
    const obj = {}
    if (element.includes(']')) {
      const arrayElement = element.split(']');
      console.log(arrayElement)
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
    arrayObj.push(obj) 
  })
  return arrayObj
}

//function that makes request HTTP

module.exports = () => {
  fs.readFile(process.argv[2], 'utf-8', (err, data) => {
    if(err){
      throw err;
    } else{
      const lineUrl = getURLData(data);
      console.log(lineUrl)
    }
  })
};
