const express = require('express')
const router = express()
const job = require('../controllers/job')

router.get('/job/:id',job.GetJob)
router.get('/job/all/:categoria',job.GetAllJobs)


module.exports = router