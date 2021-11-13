const EventEmitter = require('events');
const myEmmiter = new EventEmitter();
const http = require('http');

myEmmiter.on('newSale', () => {
    console.log("a new sale was made...");
})
myEmmiter.on('newSale', () => {
    console.log("Sale made by: Otwoma Dennis")
})
//we can also pass arguements to the event listeners by passing them as additional arguements in the emmiter
myEmmiter.on("newSale",  (amountOfItems) => {
    console.log(`${amountOfItems} items were successfully bought.`)
})
myEmmiter.emit('newSale', 2)
myEmmiter.emit('newSale', 34)

const booksOrder = new EventEmitter();
booksOrder.on('buyBook', (numberOfBooks, buyer, price) => {
    console.log(`${numberOfBooks} books have been ordered by ${buyer} and the total price payable is ${price}`)
});
booksOrder.emit('buyBook',12, "Jack Too", 400);
booksOrder.emit('buyBook',20, "Elizabeth Mwangangi", 900);

// in real life projects though, it is usually advisable to create a class that will inherit from the 
//event emitter class of node as shown below
class RegistrationMessage extends EventEmitter{
    constructor(){
        super();
    }
}
const regMsg = new RegistrationMessage();
regMsg.on("registration", (name, emailAddress) => {
    console.log(`Thankyou ${name} for joining us, please check your the inbox of ${emailAddress} for confirmation.`)
})
regMsg.emit("registration", "zaphenath paneah", "zp@gmail.com")

const server = http.createServer()
server.on("request", (request, response) => {
    console.log("request grabed successfully");
    response.end("we have received the request and we are loading the page, hang on tight...");
});
server.on('close', () => {
    console.log('server closed successfully...')
})
server.listen(8000, '127.0.0.1')