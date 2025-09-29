const express = require('express');
const {
  getAllReviews,
  getReviewById,
  createReview,
  getReviewsByCarId,
  getReviewsByClientId,
  getReviewsByStoreId,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(getAllReviews).post(createReview);
router.route('/:reviewId').get(getReviewById).patch(updateReview).delete(deleteReview);
router.route('/client/:clientId').get(getReviewsByClientId) // TODO: Verificar si se requieren metodos adicionales
router.route('/cars/:carId').get(getReviewsByCarId) // TODO: Verificar si se requieren metodos adicionales
router.route('/:storeId/:reviewId').get(getReviewsByStoreId) // TODO: Verificar si se requieren metodos adicionales (PATCH,DELETE)
module.exports = router;