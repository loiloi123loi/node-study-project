const Order = require('../models/Order');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissons } = require('../utils');

const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue';
    return { client_secret, amount };
};

const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;
    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError(
            'Please provide tax and shipping fee'
        );
    }
    let orderItems = [];
    let subtotal = 0;
    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product });
        if (!dbProduct) {
            throw new CustomError.NotFoundError(
                `No product id ${item.product}`
            );
        }
        const { name, price, image, _id } = dbProduct;
        const SingleOrderItem = {
            name,
            image,
            price,
            amount: item.amount,
            product: _id,
        };
        orderItems = [...orderItems, SingleOrderItem];
        subtotal += item.amount * price;
    }
    const total = tax + shippingFee + subtotal;
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd',
    });
    const order = await Order.create({
        tax,
        shippingFee,
        total,
        subtotal,
        orderItems,
        clientSecrect: paymentIntent.client_secret,
        user: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json({
        order,
        clientSecret: order.clientSecret,
    });
};

const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
    const order = await Order.find({ _id: req.params.id });
    if (!order) {
        throw new CustomError.NotFoundError(`No order id ${req.params.id}`);
    }
    checkPermissons(req.user, order.user);
    res.status(StatusCodes.OK).json(order);
};

const showCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
        throw new CustomError.NotFoundError(`No order id ${req.params.id}`);
    }
    checkPermissons(req.user, order.user);
    order.paymentItentId = paymentItentId;
    order.status = 'paid';
    await order.save();
    res.status(StatusCodes.OK).json({ order });
};

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    showCurrentUserOrders,
    updateOrder,
};
