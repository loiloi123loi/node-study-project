const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentication");
const rateLimiter = require("express-rate-limit");
const { register, login, updateUser } = require("../controllers/auth");

const limitter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: "Too many request from this IP, please try after 15 minutes",
    },
});

router.route("/register").post(limitter, register);
router.route("/login").post(limitter, login);
router.route("/updateUser").patch(authMiddleware, updateUser);

module.exports = router;
