const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        throw new CustomError.UnAuthenticatedError('Authentication Invalid');
    }
    try {
        const { name, userId, role } = isTokenValid({ token });
        req.user = {
            name,
            userId,
            role,
        };
        next();
    } catch (err) {
        console.log(err);
        throw new CustomError.UnAuthenticatedError('Authentication Invalid');
    }
};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnAuthorizedError(
                'Unauthorized to access this route'
            );
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizePermissions,
};
