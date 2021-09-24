const express = require('express')
const router = express()
const job = require('../controllers/job')

router.get('/job/:id',job.GetJob)
router.get('/job/all/desing',job.GetAllDesing)
router.get('/job/all/programacion',job.GetAllProgramacion)

module.exports = router