
require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handle')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello this jobter api')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

const PORT = process.env.SERVER_PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URI)
        app.listen(PORT, console.log(`Server listenning on port ${PORT}...`))
    }
    catch (err) {
        console.log('Start server error: ' + err)
    }
}

start()
