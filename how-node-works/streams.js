//streams or reading data chunk by chunk
//assuming we had a large text file and we want to send it as a response to the user, there are various ways of 
//doing this

const fs = require('fs');
const server = require('http').createServer()

server.on('request', (request, response) => {
    //method 1 of sending back the data to the user
    // fs.readFile('big-file.txt', (err, data) => {
    //     if(err){
    //         response.end("an error occured and we cannot display the requested data...")
    //     }else{
    //         response.end(data)
    //     }
    // })


    //method 2 using streams
    // const readable = fs.createReadStream('big-file.txt');
    // readable.on('data', loadedPiece => {
    //     response.write(loadedPiece);
    // })
    // readable.on('end', () => {
    //     response.end("finished reading the data to the client")
    // })
    // readable.on('error', err => {
    //     response.statusCode = 500;
    //     console.log(err)
    //     response.end("we were unable to fetch the requested file")
    // })

    //with the above method however, our readable stream (the one we are using to fetch the file from the disk)
    //is much faster than sending the result with the response writable stream over the network and this might
    //overwhelm the response stream which cannot handle all the incoming data so fast,
    //this problem is called BACKPRESSURE
    //BACKPRESSURE HAPPENS WHEN THE RESPONSE CANNOT SEND THE DATA NEARLY AS FAST AS IT IS RECEIVING IT FROM THE FILE

    //method 3, using the pipe() operator which solves the BACKPRESSURE problem
    const readable = fs.createReadStream('big-file.txt');
    readable.pipe(response)
})
server.listen(8000, '127.0.0.1', () => {
    console.log("Listening...")
})