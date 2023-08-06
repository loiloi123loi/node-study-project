const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnAuthenticatedError } = require("../errors");

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token,
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnAuthenticatedError("Invalid value");
    }
    const isPassTrue = await user.comparePassword(password);
    if (!isPassTrue) {
        throw new UnAuthenticatedError("Invalid value");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token,
        },
    });
};

const updateUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new BadRequestError("Please provide name and email");
    }
    if (req.user.isTestUser) {
        throw new UnAuthenticatedError("Test user is read only");
    }
    const user = await User.findOneAndUpdate({ _id: req.user.id }, req.body, {
        new: true,
        runValidators: true,
    });
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token,
        },
    });
};

module.exports = {
    register,
    login,
    updateUser,
};
