
const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    const customError = {
        status: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Somethings were wrong, try later'
    }
    console.log(customError)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: customError.message })
}

module.exports = errorHandler
