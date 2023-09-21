var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var navigations = [
    {
      titre: "Plats",
      liste: [
        {
          titre: 'Menu',
          detail: 'repas',
          prix: 8,
          image: 1,
          stock: 1,
          id: "a91839ca-0078-5852-b68c-dd7bf9599cd9"
        },
        {
          titre: 'Sandwich',
          detail: '',
          prix: 5,
          image: 1,
          stock: 0,
          id: "415e1b10-a205-5248-946d-17feee48c1bd"
        }
      ]
    },
    {
      titre: "Desserts",
      liste: [
        {
          titre: 'Gateaux',
          detail: '',
          prix: 4,
          image: 1,
          stock: 1,
          id: "93da102f-a5e5-51fc-9b14-488e9274c1d0"
        },
        {
          titre: 'Sandwich',
          detail: '',
          prix: 1.50,
          image: 1,
          stock: 1,
          id: "2d7006c3-35c7-51bb-a7b3-a754a5d718f4"
        }
      ]
    },
  ]
  res.json(navigations)
});

router.post('/', function(req, res, next) {
  var data = JSON.parse(req.body.data)
  console.log(data)
  if (Array.isArray(data)) res.json({success: 'true'})
  else res.json({fail: "true"})

})

module.exports = router;