
require('dotenv').config()
const connectDB = require('../db/connect')
const data = require('./mock-data')
const Job = require('../models/Job')

const importdata = async () => {
    try {
        await connectDB(process.env.DATABASE_URI)
        await Job.deleteMany()
        await Job.create(data)
        process.exit()
    }
    catch (err) {

    }
}

importdata()
