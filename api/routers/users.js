const {Router} =require('express')
const router = Router()
const user = require('../controllers/users')

router.get('/user/:username',user.GetValidate)

router.post('/user/',user.PostUser)


module.exports = router