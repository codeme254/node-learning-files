const fs = require('fs');
const express = require('express');
const { response, request } = require('express');
const app = express();

//including the middlware----function that can modify incoming request data
app.use(express.json())
// //express is a function which upon calling will add a bunch of methods to our app variable above
// app.get('/', (request, response) => {
//     // response.status(200).send("Hello from the server side in express and postman...");
//     //we can also send json data to the client as shown below
//     response.status(200).json({message:'feel at home here in the server', app:'zpestiara'})
// });

// //above was the get method and this is the post method now
// app.post('/', (request, response) => {
//     response.status(200).send("You can post to this server...")
// })


//starting our natours API by handling GET requests
//implementing this on the tours route and the api
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours', (request, response) => {
    response.status(200).json({
        status:'success',
        data:{
            tours
        }
    })
});

//implementing route handler for post requests so that we can add new tours to our data set
app.post('/api/v1/tours', (request, response) => {
    // console.log(request.body)
    //creating a new ID, in REST apis, we don't create ids for the data, as this is automatically handled
    //by the database, however, in this situation, we don't have a database and so we do that manually
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, request.body);
    tours.push(newTour);
    //writing the new tour added to the file
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        response.status(201).json({
            status: 'success',
            data:{
                tour:newTour
            }
        })
    })
})


//responding to the url parameters to get the exact single tour based on the id
app.get('/api/v1/tours/:id', (request, response) => {
    const id = request.params.id * 1;
    //error checking to deny invalid ids
    if(id > tours.length){
        return response.status(404).json({
            status:'fail',
            message:'Invalid Id/unknown tour'
        })
    }
    const tour = tours.find(el => el.id === id);
    response.status(200).json({
        status:'success',
        data:{
            tour
        }
    })
})

//listening to the server on a port
const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}...`)
})