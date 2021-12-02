
const fs = require('fs');
const path = require('path');

module.exports = (probNum) => {
  const filePath = path.join(__dirname, 'inputs', `${probNum}.txt`);
  return fs.readFileSync(filePath).toString();
};
