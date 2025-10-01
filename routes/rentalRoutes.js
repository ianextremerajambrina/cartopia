const express = require("express");
const {
  getAllRentals,
  getRentalById,
  getRentalsByStoreId,
  getRentalsByCarId,
  getRentalsByClientId,
  createRental,
  updateRental,
  deleteRental,
  createRentalByStoreId,
  updateRentalByStoreId,
  deleteRentalByStoreId,
  createRentalByClientId,
  updateRentalByClientId,
  deleteRentalByClientId,
  createRentalByCarId,
  updateRentalByCarId,
  deleteRentalByCarId,
  returnCarByRentalId,
} = require("../controllers/rentalController");

const router = express.Router();

// TODO: Actualizar updateRental y deleteRental para que soporten los 3 campos de ID

router.route("/").get(getAllRentals).post(createRental);
router.route("/:rentalId").get(getRentalById);
router
  .route("/store/:storeId")
  .get(getRentalsByStoreId)
  .post(createRentalByStoreId);
router
  .route("/store/:storeId/:rentalId")
  .patch(updateRentalByStoreId)
  .delete(deleteRentalByStoreId);
router
  .route("/client/:clientId")
  .get(getRentalsByClientId)
  .post(createRentalByClientId);
router
  .route("/client/:clientId/:rentalId")
  .patch(updateRentalByClientId)
  .delete(deleteRentalByClientId);
router.route("/cars/:carId").get(getRentalsByCarId).post(createRentalByCarId);
router
  .route("/cars/:carId/:rentalId")
  .patch(updateRentalByCarId)
  .delete(deleteRentalByCarId);
router.route("/:rentalId/return").patch(returnCarByRentalId);
module.exports = router;
