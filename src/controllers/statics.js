const fs = require('fs');

const uniqueLinks = [];
const repeatLinks = [];

//function dentify lines with URL
function getLinks(pathProvide) {
  const file = fs.readFileSync(pathProvide, 'utf-8');
  const lines = file.split('\n');
  const urlLines = [];
  lines.forEach(line => {
    if(line.includes('](http')){
      line = line.slice(0, line.length - 1);
      urlLines.push(line)
    }
  });
  return checkLink(urlLines);
}

//function that includes into arrays the links
function isRepeat(link) {
  if(uniqueLinks.includes(link)){
    repeatLinks.push(link)
  } else {
    uniqueLinks.push(link)
  }
}

//function that obtain the links
function checkLink(array) {
  array.forEach(line => {
    const arrayElement = line.split(']');
      arrayElement.forEach(miniElement => {
        if (miniElement.includes('(http')) {
          const indexInitUrl = miniElement.indexOf('http');
          if (miniElement.includes(')')) {
            const indexFinUrl = miniElement.indexOf(')');
            const linkToCheck = miniElement.slice(indexInitUrl, indexFinUrl);
            isRepeat(linkToCheck);
          } else {
            const linkToCheck = miniElement.slice(indexInitUrl);
            isRepeat(linkToCheck);
          }
        }
      })
    })
}


//function return the links aviable and broken
module.exports = (pathProvide) => {
  getLinks(pathProvide);
  return [uniqueLinks, repeatLinks]
}
