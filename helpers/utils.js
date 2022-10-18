const fs = require('fs');
const util = require('util');

const uniqueId = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

const readFromFile = util.promisify(fs.readFile);
// const readFromFile = fs.readFile


// const readFile = async (path) => {
//   return await readFromFile(path);
// }

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
    }
});
};

const deleteItem = (delId, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const newData = parsedData.filter(note => note.id !== delId);
      writeToFile(file, newData);
  }
});
}

module.exports = { readFromFile, writeToFile, readAndAppend, uniqueId, deleteItem };