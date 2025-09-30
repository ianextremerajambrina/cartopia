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
} = require('../controllers/reviewController');

const router = express.Router();

// TODO: Implementar POST,PATCH,DELETE correspondientes en controlador
// TODO: Verificacion de los 3 IDs en updateReview y deleteReview

router.route('/').get(getAllReviews).post(createReview);
router.route('/:reviewId').get(getReviewById)
router.route('/client/:clientId').get(getReviewsByClientId).patch(updateReview).delete(deleteReview); 
router.route('/cars/:carId').get(getReviewsByCarId).patch(updateReview).delete(deleteReview); 
router.route('/:storeId/:reviewId').get(getReviewByStoreId).patch(updateReview).delete(deleteReview);
router.route('/store/:storeId').get(getReviewsByStoreId);
module.exports = router;