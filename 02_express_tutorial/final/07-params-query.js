

const express = require('express')
const { products } = require('./data')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1><a href="/api/products"> Products </a>')
})

app.get('/api/products', (req, res) => {
    const productsNew = products.map((product) => {
        const { id, name, image } = product
        return { id, name, image }
    })
    res.json(productsNew)
})

app.get('/api/products/:id', (req, res) => {
    const id = req.params['id']
    const productSingle = products.find((product) => product.id === Number(id))
    if (!productSingle) {
        res.status(404).send('Product does not exist')
    }
    res.json(productSingle)
})

app.get('/api/products/:id/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('hello')
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query
    let sortedProducts = [...products]
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
        // res.status(200).send('not have product match you search')
        res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json({ success: true, data: sortedProducts })
    res.status(200).json(sortedProducts)
})

app.listen(5000, () => {
    console.log('Server is listen on port 5000')
})

