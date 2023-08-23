var express = require('express');
var router = express.Router();
const api = require('./api');
const path = require('path');
router.use('/api', api);


module.exports = router;
