const { Router } = require('express')
const router = Router()
const category = require('../controllers/categories')

router.get('/category/all', category.GetCategory)
router.get('/category/:id', category.GetSetCategory)




module.exports = router