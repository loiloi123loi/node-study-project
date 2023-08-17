const Review = require('../models/Review');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissons } = require('../utils');

const createReview = async (req, res) => {
    const product = await Product.findOne({ _id: req.body.product });
    if (!product) {
        throw new CustomError.NotFoundError(
            `No product id ${req.body.product}`
        );
    }
    const isAlreadySubmited = await Product.findOne({
        product: req.body.product,
        user: req.user.userId,
    });
    if (isAlreadySubmited) {
        throw new CustomError.BadRequestError(
            `Already submited for this product`
        );
    }
    req.body.user = req.user.userId;
    const review = await Review.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ review });
};

const getAllReview = async (req, res) => {
    const reviews = await Review.find({}).populate({
        path: 'product',
        select: 'name conpany price',
    });
    res.status(StatusCodes.OK).json({ reviews });
};

const getSingleReview = async (req, res) => {
    const review = await Review.findOne({ _id: req.params.id });
    if (!review) {
        throw new CustomError.NotFoundError(
            `No review with id ${req.params.id}`
        );
    }
    res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
    const review = await Review.findOne({ _id: req.params.id });
    if (!review) {
        throw new CustomError.NotFoundError(
            `No review with id ${req.params.id}`
        );
    }
    checkPermissons(req.user, review.user);
    review.rating = req.body.rating;
    review.title = req.body.title;
    review.comment = req.body.comment;
    await review.save();
    res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
    const review = await Review.findOne({ _id: req.params.id });
    if (!review) {
        throw new CustomError.NotFoundError(
            `No review with id ${req.params.id}`
        );
    }
    checkPermissons(req.user, review.user);
    await review.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success!!!' });
};

const getSingleProductReviews = async (req, res) => {
    const reviews = await Review.find({ product: req.params.id });
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
    createReview,
    getAllReview,
    getSingleReview,
    updateReview,
    deleteReview,
    getSingleProductReviews,
};
