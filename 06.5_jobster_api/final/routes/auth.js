
const express = require('express')
const router = express.Router()

const autheMiddleware = require('../middleware/authentication')
const rateLimiter = require('express-rate-limit')
const {
    register,
    login,
    updateUser
} = require('../controllers/auth')

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: 'Too many requests from this IP, please try again after 15 minutes',
    },
})

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/updateUser').patch(autheMiddleware, updateUser)

module.exports = router
