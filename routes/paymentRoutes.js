const express = require('express');
const {
  getAllPayments,
  getPaymentById,
  getPaymentsByClientId,
  createPayment,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');

const router = express.Router();

router.route('/').get(getAllPayments).post(createPayment);
router.route('/:paymentId').get(getPaymentById).patch(updatePayment).delete(deletePayment);
router.route('/client/:clientId').get(getPaymentsByClientId); // TODO: Faltan DELETE y PATCH

module.exports = router;