
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const tasks = require('./routes/task')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handle')

app.use(express.static('./public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('test')
})

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000

const start = async () => {
    await connectDB(process.env.DATABASE_URI)
    app.listen(port, () => {
        console.log(`Server listen on port ${port}`)
    })
}

start()
