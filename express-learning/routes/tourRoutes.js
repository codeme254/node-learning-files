const express = require('express');
const tourController = require('./../controllers/tourController');
//or import through destructuring
// const {getAllTours, createTour, getSingleTour, updateTour, deleteTour} = require('./../controllers/tourController');

const router = express.Router();

//creating a param middleware
router.param('id', tourController.checkId)

router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour)
router.route('/:id').get(tourController.getSingleTour).patch(tourController.updateTour).delete(tourController.deleteTour)
module.exports = router;


// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getSingleTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

