
const express = require('express')
const router = express.Router()

const {
    getAllJob,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
    getAllStats
} = require('../controllers/jobs')

router.route('/').post(createJob).get(getAllJob)
router.route('/stats').get(getAllStats)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router
