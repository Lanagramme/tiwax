var express = require('express');
var router = express.Router();

const controller = require('../../controller')
const menus = require('../../models/menussModel')
const products = require('../../models/produitsModel')
const { produits } = require('../../data')

/* GET home page. */
router.all('/api/v1/:collection/:id?', controller)

module.exports = router;
 