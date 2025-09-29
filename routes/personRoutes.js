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
} = require('../controllers/personController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

router.route('/').get(protect, restrictTo(['Manager']), getAllPersons);//.post(createPerson);
router.route('/:personId').get(protect, restrictTo(['Manager', 'Staff']), getPersonById).patch(protect, updatePerson).delete(protect, restrictTo('Manager'), deletePerson);
router.route('/store/:storeId').get(protect, restrictTo(['Manager','Staff']), getPersonsByStoreId) // TODO: Faltaría POST (??)
router.route('/:personId/rentals').get(protect, restrictTo(['Manager','Staff']),getRentalsByPersonId) // TODO: Faltaría POST (??)
// TODO: Funciones para esta ruta
router.route('/:personId/cars').get(protect, restrictTo(['Manager','Staff']), getCarsByPersonId) // TODO: POST (??)
module.exports = router;