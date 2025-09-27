const express = require('express');
const {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/personController');

const router = express.Router();

router.route('/').get(getAllPersons).post(createPerson);
router.route('/:id').get(getPersonById).patch(updatePerson).delete(deletePerson);

module.exports = router;