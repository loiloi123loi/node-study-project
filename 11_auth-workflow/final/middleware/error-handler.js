const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something was wrong, please try later',
    };
    console.log(customError);
    res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
