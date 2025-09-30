const express = require('express');
const {
  getAllCars,
  getCarById,
  createCar,
  getCarsByOwnerId,
  createCarByOwnerId,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

// Rutas básicas
// TODO: Quitar /cars, pues es mucho mejor ver los coches que tiene X tienda (/stores/:storeId/cars)
// TODO: También podría limitar con limit y hacer paginación, y que en el frontend se pueda filtrar por el propietario
// TODO: Adaptar updateCar y deleteCar para parámetros múltiples y distintas rutas

//router.route('/').get(getAllCars).post(createCar); 
router.route('/:carId').get(protect,restrictTo(['Manager','Staff']),getCarById).patch(updateCar).delete(deleteCar); // TODO: Meter autenticacion a todos los metodos
router.route('/owner/:ownerId/cars').get(getCarsByOwnerId);
router.route('/owner/:ownerId/cars/:carId').patch(updateCar).delete(deleteCar)
module.exports = router;
