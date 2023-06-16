
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    console.log('Welcom')
})

server.listen(5000, () => {
    console.log('server running...')
})
