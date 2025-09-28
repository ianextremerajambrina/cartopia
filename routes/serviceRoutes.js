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
router.route('/:serviceId').get(getServiceById).patch(updateService).delete(deleteService);
// TODO: Crear funcion para /:storeId
//router.route('/:storeId)
// TODO: Crear funcion para /technician/:technicianId
//router.route('/technician/:technicianId')
// TODO: Crear funcion para /cars/:carId
//router.route('/cars/:carId)
module.exports = router;