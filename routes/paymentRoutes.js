const express = require('express');
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');

const router = express.Router();

router.route('/').get(getAllPayments).post(createPayment);
router.route('/:paymentId').get(getPaymentById).patch(updatePayment).delete(deletePayment);
// TODO: Crear funcion para /client/:clientId
//router.route('/client/:clientId')
// TODO: Crear funcion para (/client/rentals/:rentalId). Verificar viabilidad/utilidad antes
//router.route('/client/rentals/:rentalId')
module.exports = router;