
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorMiddleWare = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Something was wrong, please try later' })
}

module.exports = errorMiddleWare
