
const express = require('express')
const router = express.Router()
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
} = require('../controllers/task')

router.get('/', getAllTasks).post('/', createTask)
router.get('/:id', getSingleTask).patch('/:id', updateTask).delete('/:id', deleteTask)

module.exports = router
