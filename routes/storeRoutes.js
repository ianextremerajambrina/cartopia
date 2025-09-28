const express = require('express');
const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
} = require('../controllers/storeController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

router.route('/').get(getAllStores).post(protect, restrictTo('Manager'), createStore);
router.route('/:storeId').get(getStoreById).patch(protect, restrictTo('Manager'), updateStore).delete(protect, restrictTo('Manager'), deleteStore);
// TODO: Crear funcion para :storeId/:carId
//router.route('/:storeId/:carId')
//TODO: Crear funcion para :storeId/cars
//router.route('/:storeId/cars')
// TODO: Crear funcion para :storeId/employees
//router.route('/storeId/employees)
// TODO: Crear funcion para :storeId/cars/:carId
//router.route('/:storeId/cars/:carId)
module.exports = router;