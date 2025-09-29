const express = require('express');
const {
  getAllStores,
  getStoreById,
  getCarFromStore,
  getCarsFromStoreId,
  getEmployeesFromStoreId,
  createStore,
  updateStore,
  deleteStore,
} = require('../controllers/storeController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

router.route('/').get(getAllStores).post(protect, restrictTo('Manager'), createStore);
router.route('/:storeId').get(getStoreById).patch(protect, restrictTo('Manager'), updateStore).delete(protect, restrictTo('Manager'), deleteStore);
router.route('/:storeId/cars').get(getCarsFromStoreId) // TODO: Falta post para añadir coche a la tienda
router.route('/:storeId/employees').get(protect, restrictTo('Manager'),getEmployeesFromStoreId); // TODO: Falta post para añadir un empleado
router.route('/:storeId/cars/:carId').get(getCarFromStore) // TODO: Falta PATCH para modificar coche y DELETE para borrar
module.exports = router;