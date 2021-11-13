//serving data to the user bits by bits especially when the data is huge
const fs = require('fs');
const http = require('http');

const server = http.createServer();
server.on('request', (request, response) => {
    const readable = fs.createReadStream('big-file.txt');
    readable.on('data', incomingPiece => {
        response.write(incomingPiece)
    })
    readable.on('error', () => {
        response.writeHead(404, {'Content-type':'text/html'});
        response.end("<h1>Could not do the streaming...we are sorry for that</h1>");
    })
    readable.on('end', () => {
        response.end("we have successfully finished writing the big file...")
    })
    
});
server.listen(8000, '127.0.0.1', () => {
    console.log("Serving big file through streaming...")
})

//A problem with the above approach of streaming is that our readable stream(the one we are using to read data)
//is much faster than the one sending the result, this can overwhelm the response stream which cannot handle
//all this incoming data so fast, this problem is called BACKPRESSURE...
//BACKPRESSURE:- happens when the response cannot send the data nearly as fast as it is receiving it
// from the file...

//we solve this using the pipe operator
server.on('request', (request, response) => {
    const readable = fs.createReadStream('big-file.txt');
    readable.pipe(response)
    
});
server.listen(8000, '127.0.0.1', () => {
    console.log("Serving big file through streaming...")
})