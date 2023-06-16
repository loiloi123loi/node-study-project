
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response', (name, id) => {
    console.log('data recieve: ' + `${name} ${id}`)
})

customEmitter.on('response', () => {
    console.log('data recieve 2')
})

customEmitter.emit('response', 'loi', 22)
