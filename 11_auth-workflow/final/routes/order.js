const express = require('express');
const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    showCurrentUserOrders,
    updateOrder,
} = require('../controllers/order');

const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/authentication');

router
    .route('/')
    .post(authenticateUser, createOrder)
    .get([authenticateUser, authorizePermissions('admin')], getAllOrders);

router.route('/showAllMyOrders').get(authenticateUser, showCurrentUserOrders);

router
    .route('/:id')
    .get(authenticateUser, getSingleOrder)
    .patch(authenticateUser, updateOrder);

module.exports = router;
