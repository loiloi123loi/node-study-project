const { StatusCodes } = require('http-status-codes');
const CustomError = require('./custom-api');

class UnAuthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = UnAuthorizedError;
