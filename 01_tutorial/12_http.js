
const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('this home page')
    }
    if (req.url === '/about') {
        res.end('this about page')
    }
    res.end(`<h1>hello</h1>
            <p>We can't see this link</p>
            <a href="/">back home</a>`)
})

server.listen(8080)
