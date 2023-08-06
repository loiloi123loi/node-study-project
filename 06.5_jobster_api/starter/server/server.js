require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const path = require("path");

const { connectDB } = require("./db/connect");

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const authMiddleware = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log("URL: ", req.url);
    console.log("METHOD: ", req.method);
    next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORTSERVER || 5555;
const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URI);
        app.listen(port, console.log(`Server listenning on port ${port}...`));
    } catch (err) {
        console.log(`Run server fail: ${err}`);
    }
};

start();
