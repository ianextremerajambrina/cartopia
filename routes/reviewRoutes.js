const express = require('express');
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(getAllReviews).post(createReview);
router.route('/:reviewId').get(getReviewById).patch(updateReview).delete(deleteReview);
//TODO: Crear funcion para /client/:clientId
//router.route('/client/:clientId')
// TODO: Crear funcion para /cars/:carId
//router.route('/cars/:carId)
// TODO: Crear funcion para /:storeId/:reviewId
//router.route('/:storeId/:reviewId)
module.exports = router;