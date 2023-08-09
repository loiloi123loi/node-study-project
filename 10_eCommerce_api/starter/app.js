require('dotenv').config();
const express = require('express');
const app = express();

// routes

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await app.listen(port, `Server is listenning on port ${port}...`);
    } catch (err) {
        console.log(err);
    }
};

start();
