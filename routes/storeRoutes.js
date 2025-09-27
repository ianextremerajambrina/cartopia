const express = require('express');
const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
} = require('../controllers/storeController');

const router = express.Router();

router.route('/').get(getAllStores).post(createStore);
router.route('/:id').get(getStoreById).patch(updateStore).delete(deleteStore);

module.exports = router;