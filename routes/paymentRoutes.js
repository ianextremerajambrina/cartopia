const express = require("express");
const {
  getAllPayments,
  getPaymentById,
  getPaymentsByClientId,
  getPaymentByClientId,
  getPaymentsByTransactionId,
  createPayment,
  updatePayment,
  deletePayment,
  updatePaymentByClientId,
  deletePaymentByClientId,
} = require("../controllers/paymentController");

const router = express.Router();

// GET para /transaction/:transactionId. Este metodo debe obtener los pagos de la transacción a partir del transactionRef
// TODO: Crear campo 'pagado' o similar en el que se registre el dinero que ha pagado un cliente -- RENTALS (???)
// TODO P1: Verificar si PAYMENTS, si se compra un coche, se crea un RENTAL o no.
// TODO P1.2: No debe crearse registro en rental si el coche se paga al completo de una vez (?), considerándose la posibilidad de incluirlo en rentals si el pago es recurrente

router.route("/").get(getAllPayments).post(createPayment);
router
  .route("/:paymentId")
  .get(getPaymentById)
  .patch(updatePayment)
  .delete(deletePayment);
router.route("/transaction/:transactionId").get(getPaymentsByTransactionId);
router.route("/client/:clientId").get(getPaymentsByClientId);
router
  .route("/client/:clientId/:paymentId")
  .get(getPaymentByClientId)
  .patch(updatePaymentByClientId)
  .delete(deletePaymentByClientId);

module.exports = router;
