var express = require('express');
var router = express.Router();

router.use('/product', require('./product'));
router.use('/profile', require('./profile'));

module.exports = router;