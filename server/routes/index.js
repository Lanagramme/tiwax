var express = require('express');
var router = express.Router();

const controller = require('../controller')

/* GET home page. */
router.all('/api/v1/:collection/:id?', controller)

module.exports = router;
 