//reviewning the basics of files and the file system in node.js
const fs = require('fs');

//reading files the asynchronous way:::this is the best way of reading files in node.js to prevent blocking
fs.readFile('dummy-data.txt', 'utf-8', (err, data) => {
    if(err) return console.log("encountered an error while reading the file...")
    console.log(data);
})

//writing files the asynchronous way :::this is the best way of writing files in node.js to prevent blocking
fs.writeFile('response.txt', 'the advise has been taken and we will work on that...', 'utf-8', error => {
    if(error) console.log("encountered an error while writing to the file...")
})