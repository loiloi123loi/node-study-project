
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
const authenticateUser = require('./middleware/authentication')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('jobs api')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleWare)

const PORT = process.env.PORT || 6000
const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server listen on port ${PORT}...`))
}

start()
