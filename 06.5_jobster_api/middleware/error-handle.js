
const { StatusCodes } = require('http-status-codes')

const errorHandle = (err, req, res, next) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
}

module.exports = errorHandle
