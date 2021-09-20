const express = require('express')
const router = express()

const poster =require('../controllers/poster')

router.get('/',poster.GetPosterJob)


router.post('/',poster.PostPosterJob)


module.exports = router;