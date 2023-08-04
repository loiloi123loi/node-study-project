
const express = require('express')
const router = express.Router()
const {
    getAllStats,
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
} = require('../controllers/jobs')

router.route('/').get(getAllJobs).post(createJob)
router.route('/stats').get(getAllStats)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router
