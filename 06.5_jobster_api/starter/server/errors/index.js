
const CustomErrorAPI = require('./custom-api')
const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')
const UnAuthenticatedError = require('./unauthentication')

module.exports = {
    CustomErrorAPI,
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError
}