const fs = require('fs');
const express = require('express');
const { response, request } = require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// the environment variable
// console.log(app.get('env')) //logs development as this is the default
console.log(process.env)

//including the middlware----function that can modify incoming request data
app.use(express.json())

// creating our own middleware
app.use((request, response, next) => {
    console.log("Hello from the middleware...");
    next();
})

// we can create a middleware to show the time that a request to the server was made
app.use((request, response, next) => {
    request.requestedTime = new Date().toLocaleDateString();
    next();
})

// serving static files--these are files that are just sitting in our machine, such as image files
app.use(express.static(`${__dirname}/../images`));
//the tours rout middleware
app.use('/api/v1/tours', tourRouter)

//the users middleware
app.use('/api/v1/users', userRouter)
module.exports = app;