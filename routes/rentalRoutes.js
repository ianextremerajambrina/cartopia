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
router.route('/:id').get(getRentalById).patch(updateRental).delete(deleteRental);

module.exports = router;