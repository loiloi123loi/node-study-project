
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const mainRouter = require('./routes/main')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleWare = require('./middleware/error-handler')

const connectDB = require('./db/connectDB')

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/', mainRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleWare)

const PORT = process.env.PORT || 6000
const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URI)
        app.listen(PORT, console.log(`Server listen on port ${PORT}...`))
    } catch (err) {
        console.log(err)
    }
}

start()
