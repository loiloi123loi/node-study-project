const CustomAPIError = require('./custom-api');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnAuthenticatedError = require('./unauthenticated');

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
};
