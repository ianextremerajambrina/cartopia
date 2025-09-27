const express = require('express');
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

const router = express.Router();

router.route('/').get(getAllServices).post(createService);
router.route('/:id').get(getServiceById).patch(updateService).delete(deleteService);

module.exports = router;