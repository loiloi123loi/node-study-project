
const { StatusCodes } = require('http-status-codes')

const notFound = (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Not exist this route' })
}

module.exports = notFound
