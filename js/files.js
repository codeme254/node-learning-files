// Reading and writing files in nodeJS

// Reading files
// we use the readFileSync function which takes in two parameters,
// the path to the file and the character encoding, then we save the result into a variable

const fs = require('fs')
const input = fs.readFileSync('../txt/input.txt', 'utf-8')
console.log(input)

// Writing to files
// we use the writeFileSync method which takes in two parameters, the path to the file and the text

fs.writeFileSync('../txt/lorem.txt', 'lorem ipsum dolor sit amet, what a nice dummy words loved loved by us programmers.')

// we can use template literals and grab from some input file to as shown

const funnyProgrammingText = `This is a funny programming text we know: ${input}\n This text was created on ${new Date().toLocaleString()}`;
fs.writeFileSync('../txt/progFunnyText.txt', funnyProgrammingText);
console.log('file written successfully...')

// Reading and writing files in asynchronous way in nodeJS
fs.readFile('../txt/input.txt','utf-8', (err, data) => {
    if(err){
        return console.log('we encountered an error while reading this file')
    }else{
        console.log(data)
    }
    console.log('undefined success')
})
console.log('we will read your file shortly')

// Writing files in an asynchronous way in nodeJS
const textDiff = `synchronouos JS means statements are processed one after another line by line
while in asynchronous JS, the process taking long time is runned in the background and meanwhile, we
continue executing the other statements and come back to the process once it is done.`

fs.writeFile('../txt/difference_sync_and_async.txt',`${textDiff}`, 'utf-8', err => {
    console.log('file was written successfully')
})

