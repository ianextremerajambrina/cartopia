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
// TODO: Verificacion de los 3 IDs en updateReview y deleteReview

router.route('/').get(getAllReviews).post(createReview);
router.route('/:reviewId').get(getReviewById)
// TODO: Revisar si estas rutas (las comentadas) son necesarias
/* router.route('/client/:clientId').get(getReviewsByClientId).post(createReviewByClientId).patch(updateReview).delete(deleteReview);
router.route('/cars/:carId').get(getReviewsByCarId).post(createReviewByCarId).patch(updateReview).delete(deleteReview);  */
router.route('/:storeId/:reviewId').get(getReviewByStoreId).patch(updateReviewByStoreId).delete(deleteReviewByStoreId);
router.route('/store/:storeId').get(getReviewsByStoreId);
module.exports = router;