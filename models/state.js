const fs = require('fs');
const path = require('path');

const statesFilePath = path.join(__dirname, 'data', 'statesData.json');
const statesData = JSON.parse(fs.readFileSync(statesFilePath, 'utf8'));

console.log(statesData.states[0].name);
