const express = require('express');
const {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/personController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

/**
 * TODO: Falta una ruta para las personas de una tienda en concreto (clientes, etc)
 */

router.route('/').get(protect, restrictTo('Manager'), getAllPersons).post(createPerson);
router.route('/:id').get(protect, getPersonById).patch(protect, updatePerson).delete(protect, restrictTo('Manager'), deletePerson);
//router.route('/store/:id')
module.exports = router;