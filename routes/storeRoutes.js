const express = require('express');
const {
  getAllStores,
  getStoreById,
  getCarFromStore,
  getCarsFromStoreId,
  getEmployeesFromStoreId,
  createCarInStore,
  updateCarFromStore,
  deleteCarFromStore,
  createEmployeeInStore,
  createStore,
  updateStore,
  deleteStore,
} = require('../controllers/storeController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

// TODO: Implementar POST,PATCH,DELETE en controlador

//router.route('/').get(getAllStores).post(protect, restrictTo('Manager'), createStore);
router.route('/').get(getAllStores).post(/*protect, restrictTo('Manager'),*/ createStore);
//router.route('/:storeId').get(getStoreById).patch(protect, restrictTo('Manager'), updateStore).delete(protect, restrictTo('Manager'), deleteStore);
router.route('/:storeId').get(getStoreById).patch(/*protect, restrictTo('Manager'),*/ updateStore).delete(/*protect, restrictTo('Manager'),*/ deleteStore);
router.route('/:storeId/cars').get(getCarsFromStoreId).post(createCarInStore);
//router.route('/:storeId/employees').get(protect, restrictTo('Manager'),getEmployeesFromStoreId).post(createEmployeeInStore);
router.route('/:storeId/employees').get(/*protect, restrictTo('Manager'),*/getEmployeesFromStoreId).post(createEmployeeInStore);
router.route('/:storeId/cars/:carId').get(getCarFromStore).patch(updateCarFromStore).delete(deleteCarFromStore);
module.exports = router;