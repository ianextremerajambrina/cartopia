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
router.route('/:id').get(getReviewById).patch(updateReview).delete(deleteReview);

module.exports = router;