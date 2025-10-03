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
router.route('/cars/:carId').get(getServicesByCarId).post(createServiceByCarId);
router.route('/technician/:technicianId').get(getServicesByTechnicianId);
// Falta get en esta ruta de abajo, pero técnicamente no haría falta
router.route('/technician/:technicianId/:serviceId').patch(updateServiceByTechnicianId).delete(deleteServiceByTechnicianId);
module.exports = router;