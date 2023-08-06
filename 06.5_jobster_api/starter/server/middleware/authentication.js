const { UnAuthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authen = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new UnAuthenticatedError("UnAuthorized");
    }
    const token = authorization.split(" ")[1];
    try {
        const json = jwt.verify(token, process.env.JWT_SECRET);
        const isTestUser = json.id === "64cf89fb623d5b24b2665e7c";
        req.user = { id: json.id, isTestUser };
        next();
    } catch (err) {
        throw new UnAuthenticatedError("UnAuthorized");
    }
};

module.exports = authen;
