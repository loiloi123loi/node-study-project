
const notFoundMiddleware = (req, res) => {
    return res.status(404).json({ msg: 'Not found route' })
}

module.exports = notFoundMiddleware
