const crypto = require('crypto')
const [...collections] = require('./controller/classes').keys()
module.exports = collections.reduce((mod,key)=>{
  return (mod[key] = []), mod;
}, {})
// exports.produits = [
//   { id: crypto.randomUUID(),titre: 'Dish A', detail: "The marvelously delicious dish A", prix: 10.99, image: false, type: "dishes" },
//   { id: crypto.randomUUID(), titre: 'Dish B', detail: "The marvelously delicious dish B", prix: 8.99,image: false, type: "dishes" },
//   { id: crypto.randomUUID(), titre: 'Drink A', detail: "The marvelously delicious drink A", prix: 5.99, image: false, type: "drinks" },
//   { id: crypto.randomUUID(), titre: 'Drink B', detail: "The marvelously delicious drink B", prix: 4.99,image: false, type: "drinks" },
// ]
// exports.commandes = []
// exports.options = [
//   {
//     id: crypto.randomUUID(),
//     titre: 'Sauces',
//     qcm: JSON.stringify(["Ketchup", "Mayonaise", "Moutarde"]),
//     typeProduit: "dishes",
//     type: "check",
//     max: 2,
//   },
//   {
//     id: crypto.randomUUID(),
//     titre: 'Extras',
//     qcm: JSON.stringify(["Fromage", "Champignon", "Crudités"]),
//     typeProduit: "dishes",
//     type: "check",
//     max: 3,
//   },
//   {
//     id: crypto.randomUUID(),
//     titre: 'Size',
//     qcm: JSON.stringify(["33cl", "50cl"]),
//     typeProduit: "drinks",
//     type: "select",
//     max: 1,
//   },
// ]
// exports.menus = [
//   ...[0,1,2,3].map(i=>({ produit: exports.produits[i].id, stock: Math.trunc(Math.random()*100) }))
// ]
