
require('dotenv').config()
require('express-async-errors')
// async errors

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const errorMiddleWare = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">product route</a>')
})

// products route
app.use('/api/v1/products', productsRouter)


app.use(notFoundMiddleware)
app.use(errorMiddleWare)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        // connect DB
        await connectDB(process.env.DATABASE_URI)
        app.listen(port, console.log(`Server listen on port ${port}...`))
    } catch (err) {
        console.log(err)
    }
}

start()
