const authorize = (req, res, next) => {
    console.log("authorize");
    const { user } = req.query;
    if (user === "loi") {
        req.user = { name: "loi", id: 0 };
        next();
    } else {
        res.status(404).send("<h1> 404 not found </h1>");
    }
};

module.exports = authorize;
