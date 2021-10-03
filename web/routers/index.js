const express = require('express');
const router = express.Router();
const indexControlle = require('../controllers/index');

router.get('/',indexControlle.GetIndex);


module.exports = router;