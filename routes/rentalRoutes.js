const express = require('express');
const {
  getAllRentals,
  getRentalById,
  getRentalsByStoreId,
  getRentalsByCarId,
  getRentalsByClientId,
  createRental,
  updateRental,
  deleteRental,
} = require('../controllers/rentalController');

const router = express.Router();

router.route('/').get(getAllRentals).post(createRental);
router.route('/:rentalId').get(getRentalById).patch(updateRental).delete(deleteRental);
// TODO: Crear funcion para /store/:storeId
router.route('/store/:storeId').get(getRentalsByStoreId) // TODO: Más funciones?
// TODO: Crear funcion para /client/:clientId
router.route('/client/:clientId').get(getRentalsByClientId) // TODO: Más funciones?
// TODO: Crear funcion para /cars/:carId
router.route('/cars/:carId').get(getRentalsByCarId) // TODO: Más funciones?
module.exports = router;