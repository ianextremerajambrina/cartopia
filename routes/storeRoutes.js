const express = require("express");
const {
  getAllStores,
  getStoreById,
  getCarFromStore,
  getCarsFromStoreId,
  getEmployeesFromStoreId,
  createCarInStore,
  updateCarFromStore,
  deleteCarFromStore,
  createEmployeeInStore,
  updateEmployeeFromStore,
  deleteEmployeeFromStore,
  createStore,
  updateStore,
  deleteStore,
} = require("../controllers/storeController");
const { protect, restrictTo } = require("../utils/auth");

const router = express.Router();

router
  .route("/")
  .get(getAllStores)
  .post(/*protect, restrictTo('Manager'),*/ createStore);
router
  .route("/:storeId")
  .get(getStoreById)
  .patch(/*protect, restrictTo('Manager'),*/ updateStore)
  .delete(/*protect, restrictTo('Manager'),*/ deleteStore);
router.route("/:storeId/cars").get(getCarsFromStoreId).post(createCarInStore);
router
  .route("/:storeId/employees")
  .get(/*protect, restrictTo('Manager'),*/ getEmployeesFromStoreId)
  .post(createEmployeeInStore);
router
  .route("/:storeId/employees/:employeeId")
  .patch(updateEmployeeFromStore) // TODO: Restringir rol a manager
  .delete(deleteEmployeeFromStore);
router
  .route("/:storeId/cars/:carId")
  .get(getCarFromStore)
  .patch(updateCarFromStore)
  .delete(deleteCarFromStore);
module.exports = router;
