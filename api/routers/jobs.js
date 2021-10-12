const express = require('express')
const router = express()
const jobs = require('../controllers/jobs')


router.get('/job/all', jobs.GetAllJobs)
router.get('/job/:id', jobs.GetOneJob)
router.get('/job/delete/:id', jobs.GetDeleteJob)


router.post('/poster', jobs.PostPosterJob)
router.post('/poster/:id', jobs.PostUpdateJob)



module.exports = router