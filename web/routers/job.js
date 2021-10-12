const express = require('express')
const router = express()
const job = require('../controllers/job')

router.get('/job/:id', job.GetJob)
router.get('/job/all/:category', job.GetAllJobs)


module.exports = router