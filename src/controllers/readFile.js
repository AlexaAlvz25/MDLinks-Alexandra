const fs = require('fs');
const getURLData = require('./createObj')

module.exports = (pathProvide) => {
  const file = fs.readFileSync(pathProvide, 'utf-8');
  return getURLData(file, pathProvide)
}
