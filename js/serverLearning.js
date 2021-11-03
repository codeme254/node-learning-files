// creating a simple web server
//we include the http module which is responsible for giving us networking capabilities
const http = require('http')

// to build a server, we do two things, 1. creat the server, 2. start the server so that we can listen to incoming requests
//to creat a server, we use the creat server method which accepts a callback that will be fired each time a new 
//request is made, the callback takes in two parameters, the request and the response

const primeServer = http.createServer((request, response) => {
    response.end('This is the reponse: Hello from prime tech servers, please start making your requests!')
})

// now we listen to incoming requests from the client, here, we use the listen() methos on the server we
// created which in our case is primeServer, listen method takes as a parameter, the port, the localhost
// and an optional callback

primeServer.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests coming to the servers of prime tech company')
})