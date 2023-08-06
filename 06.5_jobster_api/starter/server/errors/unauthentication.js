
const { StatusCodes } = require("http-status-codes")
const CustomErrorAPI = require("./custom-api")

class UnAuthenticatedError extends CustomErrorAPI {
    constructor(message) {
        super(message)
        this.code = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthenticatedError
