
const express = require('express')
const app = express()

let { people } = require('./data')

// static assets
app.use(express.static('./methods_public'))

// parse form data
app.use(express.urlencoded({ extended: false }))

// parse json
app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({ sucess: true, data: people })
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({ sucess: false, msg: 'please provide name value' })
    }
    res.status(201).send({ sucess: true, person: name })
})

app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({ sucess: false, msg: 'please provide name value' })
    }
    res.status(201).send({ sucess: true, data: [...people, name] })
})

app.post('/login', (req, res) => {
    let { name } = req.body
    if (name) {
        return res.status(200).send(`<h1> Welcome ${name}</h1>`)
    }
    res.status(401).send('<h1> Please Provide Credentials</h1>')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
