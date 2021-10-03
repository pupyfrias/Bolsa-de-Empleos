const express = require('express')
const router = express()
const jobs = require('../controllers/jobs')


router.get('/jobs/all',jobs.GetAllJobs)




module.exports = router
