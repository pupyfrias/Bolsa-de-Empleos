const express = require('express')
const router = express()
const jobs = require('../controllers/admin')

router.get('/job/all',jobs.GetAllJobs)
router.get('/job/:id',jobs.GetEditJob)
router.get('/job/delete/:id',jobs.GetDeleteJob)
router.get('/job/limit/:id',jobs.GetLimit)


router.post('/poster/:id',jobs.PostUpdateJob)

module.exports = router