const express = require('express');
const {
  getAllServices,
  getServiceById,
  getServicesByStoreId,
  getServicesByCarId,
  getServicesByTechnicianId,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

const router = express.Router();

router.route('/').get(getAllServices).post(createService);
router.route('/:serviceId').get(getServiceById).patch(updateService).delete(deleteService);
router.route('/:storeId').get(getServicesByStoreId) // TODO: Falta POST
router.route('/technician/:technicianId').get(getServicesByTechnicianId) // TODO: Falta PATCH, DELETE
router.route('/cars/:carId').get(getServicesByCarId) // TODO: Falta POST (?)
module.exports = router;