const fs = require('fs');
const express = require('express');
const { response, request } = require('express');
const app = express();

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
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const getAllTours = (request, response) => {
    response.status(200).json({
        status:'success',
        data:{
            tours
        }
    })
}

const getSingleTour =  (request, response) => {
    console.log(request.requestedTime)
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
        // requestDate: request.requestedTime,
        data:{
            tour
        }
    })
}

const createTour = (request, response) => {
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
}

const updateTour =  (request, response) => {
    if(request.params.id * 1 > tours.length){
        return response.status(404).json({
            status: 'fail',
            message: 'Invalid tour id...'
        })
    }
    response.status(200).json({
        status:'success',
        data: {
            tour: '<updated tour data will go here...>'
        }
    })
}

const deleteTour = (request, response) => {
    if(request.params.id * 1 > tours.length){
        return response.status(404).json({
            status: 'fail',
            message: 'Invalid tour id...'
        })
    }
    response.status(204).json({
        status: 'sucess',
        data: null
    })
}

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getSingleTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)
//refactoring the routes
app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getSingleTour).patch(updateTour).delete(deleteTour)

//listening to the server on a port
const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}...`)
})