
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPassTrue = await user.comparePassword(password)
    if (!isPassTrue) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token
        }
    })
}

const updateUser = async (req, res) => {
    const { name, email, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { name, email, lastName, location },
        { new: true, runValidators: true }
    )
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token,
        },
    });
}

module.exports = {
    register,
    login,
    updateUser,
}
