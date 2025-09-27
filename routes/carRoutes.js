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
 * 1: Ver todos los coches (de una tienda concreta)
 * 2: acceder a un coche concreto (de una tienda concreta)
 * 3: acceder a un coche concreto (del usuario, debe estar autenticado)
 * 4: Crear un nuevo coche (asociado a tienda)
 * 5: Modificar un coche existente (asociado a tienda)
 * 6: Borrar un coche existente (asociado a tienda)
 */

// Rutas básicas
router.route('/').get(getAllCars).post(createCar);
router.route('/:id').get(getCarById).patch(updateCar).delete(deleteCar);

module.exports = router;
