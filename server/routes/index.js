const 
  express = require('express'),
  router = express.Router(),
  controller = require('../controller')

/* GET home page. */
router.get(
  /^(?!\/api\/v1\/)/gm,
  (req, res, next) => {
    try { res.sendFile(`${process.cwd()}/public/index.html`) }
    catch { next() }
  }
)
router.all('/api/v1/:collection/:id?', controller)

module.exports = router;
 