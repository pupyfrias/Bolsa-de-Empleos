const {Router} =require('express')
const router = Router()
const categoria = require('../controllers/categorias')

router.get('/categoria/all',categoria.GetCategoria)


router.post('/categoria/:id',categoria.PostCategoria )

module.exports = router