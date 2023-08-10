const CustomError = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { createTokenUser, attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const isExistEmail = await User.findOne({ email });
    if (isExistEmail) {
        throw new CustomError.BadRequestError('Email already exist');
    }
    // first user is admin
    const isFirstUser = (await User.countDocuments({})) === 0;
    const role = isFirstUser ? 'admin' : 'user';
    const user = await User.create({ name, email, password, role });
    const token = createTokenUser(user);
    attachCookiesToResponse({ res, user: token });
    res.status(StatusCodes.CREATED).json({ user: token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError.UnAuthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnAuthenticatedError('Invalid Credentials');
    }
    const token = createTokenUser(user);
    attachCookiesToResponse({ res, user: token });
    res.status(StatusCodes.OK).json({ user: token });
};

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
    register,
    login,
    logout,
};
