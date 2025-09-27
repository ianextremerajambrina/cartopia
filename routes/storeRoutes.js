const express = require('express');
const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
} = require('../controllers/storeController');
const { protect, restrictTo } = require('../utils/auth');

const router = express.Router();

router.route('/').get(getAllStores).post(protect, restrictTo('Manager'), createStore);
router.route('/:id').get(getStoreById).patch(protect, restrictTo('Manager'), updateStore).delete(protect, restrictTo('Manager'), deleteStore);

module.exports = router;