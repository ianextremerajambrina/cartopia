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

// TODO: Actualizar updateRental y deleteRental para que soporten los 3 campos de ID

router.route('/').get(getAllRentals).post(createRental);
router.route('/:rentalId').get(getRentalById)
router.route('/store/:storeId').get(getRentalsByStoreId).patch(updateRental).delete(deleteRental); 
router.route('/client/:clientId').get(getRentalsByClientId).patch(updateRental).delete(deleteRental); 
router.route('/cars/:carId').get(getRentalsByCarId).patch(updateRental).delete(deleteRental); 
module.exports = router;