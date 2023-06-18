
const Task = require('../models/Task')

const getAllTasks = (req, res) => {
    res.send('all items')
}

const createTask = (req, res) => {
    res.send('creat')
}

const getTask = (req, res) => {
    res.send('get')
}

const updateTask = (req, res) => {
    res.send('update')
}

const deleteTask = (req, res) => {
    res.send('delete')
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
