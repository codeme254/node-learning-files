const EventEmitter = require('events');
const http = require('http');
const myEmmiter = new EventEmitter();

myEmmiter.on('newOrder', (name, order) => {
    console.log(`${name} has ordered for ${order}`);
});
myEmmiter.emit('newOrder', 'Zaphenath', 'pancakes');

//in real life of events and event emiters working, it is usually advisable to create a class that will
//inherit from the EventEmitter class of node as shown below
class Orders extends EventEmitter{
    constructor(){
        super()
    }
}
const anotherEmmiter = new Orders();
anotherEmmiter.on('orderPlaced', (name, item) => {
    console.log(`There is another order of ${item} that has been placed by ${name} `);
})
anotherEmmiter.emit('orderPlaced', 'Paneah', 'Chapatis');

//events and event emitters can also be applied on other things like the server as shown below

const server = http.createServer();

server.on('request', (request, response) => {
    response.writeHead(200, {'Content-type':'text/html'})
    response.end("<h1>The event emmiter request has been received </h1>")
})

//listening to the close event of the server
server.on('close', () => console.log('the server has been closed...'))
server.listen(8000, '127.0.0.1', () => {
    console.log("events server is running...")
})