const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json("Not found this route");
};

module.exports = notFound;
