
const http = require('http')
const { readFileSync } = require('fs')

const homePage = readFileSync('./navbar-app/index.html')

const port = 5000

const server = http.createServer((req, res) => {
    // console.log(req.body)
    // console.log(req.method)
    // console.log(req.url)
    const url = req.url
    res.writeHead(200, { 'content-type': 'text/html' })
    if (url === '/') {
        res.end(homePage)
    }
    else if (url === '/about') {
        res.write('<h1>About Page</h1>')
    }
    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>Page not found</h1>')
    }
    res.end()
})

server.listen(port, () => {
    console.log('server listening in port ' + port)
})
