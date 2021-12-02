const { response } = require('express');
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

//a middleware to validate the ids
exports.checkId = (request, response, next, val) => {
    console.log(`The tour id is ${val}`)
    if(request.params.id * 1 > tours.length){
        return response.status(404).json({
            status: 'fail',
            message: 'Invalid tour id...'
        })
    }
    next();
}
// a middleware to validatae a new tour body being created
exports.checkBody = (request, response, next) => {
    if(!request.body.name || !request.body.price){
        return response.status(400).json({
            status: 'fail',
            message: 'missing tour name or price'
        })
    }
}
exports.getAllTours = (request, response) => {
    response.status(200).json({
        status:'success',
        data:{
            tours
        }
    })
}
exports.getSingleTour =  (request, response) => {
    console.log(request.requestedTime)
    const id = request.params.id * 1;
    const tour = tours.find(el => el.id === id);
    response.status(200).json({
        status:'success',
        data:{
            tour:tour
        }
    })
}

exports.createTour = (request, response) => {
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

exports.updateTour =  (request, response) => {
    response.status(200).json({
        status:'success',
        data: {
            tour: '<updated tour data will go here...>'
        }
    })
}

exports.deleteTour = (request, response) => {
    response.status(204).json({
        status: 'sucess',
        data: null
    })
}