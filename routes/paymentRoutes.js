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
router.route('/:id').get(getPaymentById).patch(updatePayment).delete(deletePayment);

module.exports = router;