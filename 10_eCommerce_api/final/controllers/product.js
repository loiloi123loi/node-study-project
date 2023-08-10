const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

const createProduct = async (req, res) => {
    req.body.user = res.user;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
    res.json({ msg: 'OK' });
};

const updateProduct = async (req, res) => {
    res.json({ msg: 'OK' });
};

const deleteProduct = async (req, res) => {
    res.json({ msg: 'OK' });
};

const uploadImage = async (req, res) => {
    res.json({ msg: 'OK' });
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
};
