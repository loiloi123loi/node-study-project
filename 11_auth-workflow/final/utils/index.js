const createTokenUser = require('./createTokenUser');
const checkPermissons = require('./checkPermissions');
const { attachCookiesToResponse, createJWT, isTokenValid } = require('./jwt');
const sendVerificationEmail = require('./sendVerificationEmail');
const sendResetPasswordEmail = require('./sendResetPasswordEmail');
const createHash = require('./createHash');

module.exports = {
    createTokenUser,
    attachCookiesToResponse,
    createJWT,
    isTokenValid,
    checkPermissons,
    sendVerificationEmail,
    sendResetPasswordEmail,
    createHash,
};
