const { Router } = require('express')
const router = Router()
const user = require('../controllers/users')

router.get('/user/:username', user.GetValidate)
router.get('/exist', user.GetExist)
router.get('/user/confirm/:code', user.GetConfirm)
router.get('/user/update/:code', user.GetUpdate)

router.post('/user/', user.PostUser)
router.post('/create-account', user.PostCreate)
router.post('/new-code', user.PostNewCode)


module.exports = router