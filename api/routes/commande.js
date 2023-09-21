var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  if (id == "12345") res.json({id: "12345", numero: "016", statut: "En préparation"});
  else res.json({fail: "true"})
});

router.post('/', function(req, res, next) {
  var data = JSON.parse(req.body.data)
  console.log(data)
  if (Array.isArray(data)) res.json({success: 'true'})
  else res.json({fail: "true"})

})

module.exports = router;