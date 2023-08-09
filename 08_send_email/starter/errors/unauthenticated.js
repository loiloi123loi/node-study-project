const CustomAPIError = require('./custom-api');
const { StatusCodes } = require('http-status-codes');

class UnAuthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.code = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthenticatedError;
