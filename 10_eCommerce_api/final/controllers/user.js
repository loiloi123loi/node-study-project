const CustomError = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const {
    checkPermissons,
    attachCookiesToResponse,
    createTokenUser,
} = require('../utils');

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id ${req.params.id}`);
    }
    checkPermissons(req.user, user._id);
    res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId });
    user.name = name;
    user.email = email;
    await user.save();
    const token = createTokenUser(user);
    attachCookiesToResponse({ res, user: token });
    res.status(StatusCodes.OK).json({ user: token });
};

const updateUserPassword = async (req, res) => {
    const { newPassword, oldPassword } = req.body;
    if (!newPassword || !oldPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({ _id: req.user.userId });
    const isTruePassword = user.comparePassword(oldPassword);
    if (!isTruePassword) {
        throw new CustomError.UnAuthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success update OK' });
};

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
};

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
//     throw new CustomError.BadRequestError('Please provide all values');
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
