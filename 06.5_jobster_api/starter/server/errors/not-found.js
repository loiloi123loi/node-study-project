
const CustomErrorAPI = require('./custom-api')
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends CustomErrorAPI {
    constructor(message) {
        super(message)
        this.code = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError
