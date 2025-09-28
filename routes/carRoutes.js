const express = require('express');
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');

const router = express.Router();

/**
 * TODO: Rutas para los coches (CRUD)
 * 3: acceder a un coche concreto (del usuario, debe estar autenticado)
 */

// Rutas básicas
// TODO: Quitar /cars, pues es mucho mejor ver los coches que tiene X tienda (/stores/:storeId/cars)
// TODO: También podría limitar con limit y hacer paginación, y que en el frontend se pueda filtrar por el propietario
router.route('/').get(getAllCars).post(createCar); 
router.route('/:carId').get(getCarById).patch(updateCar).delete(deleteCar);
// TODO: Analizar viabilidad y de ser el caso, crear funcion
//router.route('/owner/:ownerId').get(getCarsByOwnerId);
module.exports = router;
