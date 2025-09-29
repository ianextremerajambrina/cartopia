const express = require('express');
const {
  getAllCars,
  getCarById,
  createCar,
  getCarsByOwnerId,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

// Rutas básicas
// TODO: Quitar /cars, pues es mucho mejor ver los coches que tiene X tienda (/stores/:storeId/cars)
// TODO: También podría limitar con limit y hacer paginación, y que en el frontend se pueda filtrar por el propietario
// TODO: El coche se creará en la tienda, porque por sí solo está asociado a algo, ya sea al concesionario o bien al cliente que lo alquila / compra

//router.route('/').get(getAllCars).post(createCar); 
router.route('/:carId').get(protect,restrictTo(['Manager','Staff']),getCarById).patch(updateCar).delete(deleteCar); // TODO: Meter autenticacion a todos los metodos
// TODO: Analizar viabilidad
router.route('/owner/:ownerId').get(getCarsByOwnerId); // TODO: Crear POST (??)
module.exports = router;
