const express = require('express');
const {
  getAllPersons,
  getPersonById,
  createPerson,
  getRentalsByPersonId,
  getCarsByPersonId,
  updatePerson,
  deletePerson,
  getPersonsByStoreId,
  createPersonByStoreId,
  createRentalByPersonId,
  createCarByPersonId,
} = require('../controllers/personController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

// TODO: Agregar rutas faltantes (PATCH, DELETE, etc)

router.route('/').get(protect,restrictTo(['Admin']),getAllPersons).post(/* protect, restrictTo(['Admin']), */createPerson);
router.route('/:personId').get(getPersonById).patch(protect, restrictTo(['Admin']),updatePerson).delete(protect, restrictTo(['Admin']),deletePerson);
router.route('/store/:storeId').get(getPersonsByStoreId).post(createPersonByStoreId)//
router.route('/:personId/rentals').get(getRentalsByPersonId).post(createRentalByPersonId)//
//router.route('/:personId/rentals/:rentalId')
router.route('/:personId/cars').get(getCarsByPersonId).post(createCarByPersonId)
//router.route('/:personId/cars/:carId')
module.exports = router;