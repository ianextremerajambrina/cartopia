const express = require('express');
const {
  getAllReviews,
  createReview,
  getReviewsByCarId,
  getReviewsByClientId,
  getReviewsByStoreId,
  getReviewByStoreId,
  getReviewById,
  updateReview,
  deleteReview,
  createReviewByClientId,
  createReviewByCarId,
  updateReviewByStoreId,
  deleteReviewByStoreId,
} = require('../controllers/reviewController');

const router = express.Router();

// TODO: Implementar POST,PATCH,DELETE correspondientes en controlador

router.route('/').get(getAllReviews).post(createReview);
router.route('/:reviewId').get(getReviewById) // Falta patch y delete, pero se puede hacer por tienda
router.route('/store/:storeId').get(getReviewsByStoreId);
router.route('/client/:clientId').get(getReviewsByClientId).post(createReviewByClientId).patch(updateReview).delete(deleteReview);
router.route('/cars/:carId').get(getReviewsByCarId).post(createReviewByCarId).patch(updateReview).delete(deleteReview); 
router.route('/:storeId/:reviewId').get(getReviewByStoreId).patch(updateReviewByStoreId).delete(deleteReviewByStoreId);
module.exports = router;