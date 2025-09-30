const express = require("express");
const {
  getAllPayments,
  getPaymentById,
  getPaymentsByClientId,
  getPaymentsByRentalId,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const router = express.Router();

// TODO: Crear GET para /store/:rentalId. Este metodo debe obtener los pagos del alquiler a partir del transactionRef, que equivale al rentalId presente en rentals
// TODO: Crear campo 'pagado' o similar en el que se registre el dinero que ha pagado un cliente -- RENTALS (???)
// TODO P1: Verificar si PAYMENTS, si se compra un coche, se crea un RENTAL o no. 
// TODO P1.2: No debe crearse registro en rental si el coche se paga al completo de una vez (?), considerándose la posibilidad de incluirlo en rentals si el pago es recurrente

router.route("/").get(getAllPayments).post(createPayment);
router
  .route("/:paymentId")
  .get(getPaymentById)
  .patch(updatePayment)
  .delete(deletePayment);
router.route("/store/:rentalId").get(getPaymentsByRentalId);
router.route("/client/:clientId").get(getPaymentsByClientId); // TODO: Faltan DELETE y PATCH

module.exports = router;
