require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();

// rest of the pakages
const cookieParser = require('cookie-parser');

// database
const connectDB = require('./db/connect');

// routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(
            port,
            console.log(`Server is listenning on port ${port}...`)
        );
    } catch (err) {
        console.log(err);
    }
};

start();
