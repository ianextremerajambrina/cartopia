const express = require('express');
const {
  getAllCars,
  getCarById,
  createCar,
  getCarByOwnerId,
  getCarsByOwnerId,
  createCarByOwnerId,
  updateCarByOwnerId,
  deleteCarByOwnerId,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

// Rutas básicas
// TODO: Quitar /cars, pues es mucho mejor ver los coches que tiene X tienda (/stores/:storeId/cars)
// TODO: También podría limitar con limit y hacer paginación, y que en el frontend se pueda filtrar por el propietario
// TODO: Meter autenticacion a todos los metodos

router.route('/').get(getAllCars).post(createCar);
router.route('/:carId').get(/*protect,restrictTo(['Manager','Staff']),*/getCarById).patch(updateCar).delete(deleteCar);
router.route('/owner/:ownerId').get(getCarsByOwnerId).post(createCarByOwnerId);
router.route('/owner/:ownerId/:carId').get(getCarByOwnerId).patch(updateCarByOwnerId).delete(deleteCarByOwnerId)
module.exports = router;
