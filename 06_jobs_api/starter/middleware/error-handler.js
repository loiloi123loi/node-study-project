
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleWare = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ err })
    // .json({ msg: 'Something was wrong, please try later' })
}

module.exports = errorHandlerMiddleWare
