
require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

// routes
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
const authenticateUser = require('./middleware/authentication')

app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

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
