
const CustomErrorAPI = require("./custom-api")
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends CustomErrorAPI {
    constructor(message) {
        super(message)
        this.code = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError
