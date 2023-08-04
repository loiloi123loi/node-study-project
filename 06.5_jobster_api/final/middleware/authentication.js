
const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const {
    UnauthenticatedError
} = require('../errors')

const authenticated = async (req, res, next) => {
    const authenString = req.headers.authorization
    if (!authenString.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Unauthorized')
    }
    const token = authenString.split(' ')[1]
    try {
        const json = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById({ _id: json.id }).select('-password')
        req.user = { id: user._id }
        next()
    }
    catch (err) {
        throw new UnauthenticatedError('Unauthorized')
    }
}

module.exports = authenticated
