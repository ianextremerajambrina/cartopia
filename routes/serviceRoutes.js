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
  createServiceByStoreId,
  createServiceByCarId,
  updateServiceByTechnicianId,
  deleteServiceByTechnicianId,
  deleteServicesByStoreId
} = require('../controllers/serviceController');

const router = express.Router();

//TODO: Crear funciones en el controlador (POST, PATCH, DELETE) correspondientes

router.route('/').get(getAllServices).post(createService);
router.route('/:serviceId').get(getServiceById).patch(updateService).delete(deleteService);
router.route('/:storeId').get(getServicesByStoreId).post(createServiceByStoreId).delete(deleteServicesByStoreId);
router.route('/technician/:technicianId').get(getServicesByTechnicianId);
router.route('/technician/:technicianId/:serviceId').patch(updateServiceByTechnicianId).delete(deleteServiceByTechnicianId);
router.route('/cars/:carId').get(getServicesByCarId).post(createServiceByCarId)
module.exports = router;