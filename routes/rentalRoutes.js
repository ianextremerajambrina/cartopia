const express = require('express');
const {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
} = require('../controllers/rentalController');

const router = express.Router();

router.route('/').get(getAllRentals).post(createRental);
router.route('/:rentalId').get(getRentalById).patch(updateRental).delete(deleteRental);
// TODO: Crear funcion para /store/:storeId
//router.route('/store/:storeId')
// TODO: Crear funcion para /client/:clientId
//router.route('/client/:clientId)
// TODO: Crear funcion para /cars/:carId
//router.route('/cars/:carId)
module.exports = router;