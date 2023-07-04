
require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/products')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('OK??????')
    } catch (err) {
        console.log(err)
    }
}

start()
