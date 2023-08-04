
const { StatusCodes } = require('http-status-codes')

const errorHandle = (err, req, res, next) => {
    const customError = {
        status: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something was wrong, please wait'
    }
    console.log(customError)
    return res.status(customError.status).json({ msg: customError.message })
}

module.exports = errorHandle
