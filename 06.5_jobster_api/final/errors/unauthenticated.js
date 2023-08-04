
const CustomAPIError = require("./custom-api");
const { StatusCodes } = require('http-status-codes')

class UnauthenticatedError extends CustomAPIError {
    constructor() {
        super()
        this.code = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError
