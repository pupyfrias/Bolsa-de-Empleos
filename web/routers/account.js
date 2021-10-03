const express = require('express')
const router = express.Router()
const accout = require('../controllers/create account')
router.get('/create-account',accout.GetCreateAccout)

router.post('/create-account',accout.PostCreateAccout)
router.post('/confirmation',accout.PostConfirmation)
router.post('/new-code',accout.PostNewCode)

module.exports = router
