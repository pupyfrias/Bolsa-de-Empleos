const express =require('express')
const router =express()
const login = require('../controllers/login')

router.get('/login',login.GetLogin)

router.post('/login',login.PostLogin)
router.post('/logout',login.PostLogout)

module.exports = router