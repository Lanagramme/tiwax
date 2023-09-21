var express = require('express');
var router = express.Router();

const menus = {
  "a91839ca-0078-5852-b68c-dd7bf9599cd9": {
    options: [
      {
        type: "radio",
        title: "1 viande au choix",
        qcm: {
          choix: 'viande',
          options: [
            {name:'Poulet', stock: false}, 
            {name:'Boeuf', stock: true}, 
            {name:'Poisson', stock: true}, 
          ]
        },
        sub: false
      },
      {
        type: "check",
        title: "2 accompagnements au choix",
        qcm: {
          choix: "accompagnements",
          options: [
            {name:'Riz', stock: false}, 
            {name:'Pâtes', stock: true}, 
            {name:'Lentilles consommés', stock: true}, 
            {name:"Gratin de pomme de terre", stock: true}, 
            {name:"Haricots rouge", stock: true}, 
          ]
        },
        sub: "2max",
        max: 2
      },
      {
        type: "grad",
        title: "Sauces",
        qcm: {
          choix: "sauces",
          options: [
            {name:'Créole', stock: false}, 
            {name:'Mayonnaise', stock: true}, 
            {name:'Piment', stock: true}, 
          ]
        },
        sub: "2 max.",
        max: 2
      },
      {type: "input"}
    ]
  }
}
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  if (menus.hasOwnProperty(id)) res.json(menus[id]);
  else res.json({fail: "true"})
});

router.post('/', function(req, res, next) {
  var data = JSON.parse(req.body.data)
  console.log(data)
  if (Array.isArray(data)) res.json({success: 'true'})
  else res.json({fail: "true"})

})

module.exports = router;