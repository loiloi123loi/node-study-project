const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');
const {
    createReview,
    getAllReview,
    getSingleReview,
    updateReview,
    deleteReview,
} = require('../controllers/review');

router.route('/').post(authenticateUser, createReview).get(getAllReview);

router
    .route('/:id')
    .get(getSingleReview)
    .delete(authenticateUser, deleteReview)
    .patch(authenticateUser, updateReview);

module.exports = router;
