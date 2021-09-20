const express = require('express');
const router = express.Router();
const page404 = require('../controllers/404')

router.use('/',page404.Get404)

module.exports = router;