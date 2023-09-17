const crypto = require('crypto')
exports.produits = [
  { id: crypto.randomUUID(),titre: 'Dish A', detail: "The marvelously delicious dish A", prix: 10.99, image: false, type: "dishes" },
  { id: crypto.randomUUID(), titre: 'Dish B', detail: "The marvelously delicious dish B", prix: 8.99,image: false, type: "dishes" },
  { id: crypto.randomUUID(), titre: 'Drink A', detail: "The marvelously delicious drink A", prix: 5.99, image: false, type: "drinks" },
  { id: crypto.randomUUID(), titre: 'Drink B', detail: "The marvelously delicious drink B", prix: 4.99,image: false, type: "drinks" },
]
exports.commandes = []
exports.options = [
  { id: crypto.randomUUID(), titre: 'Dish A', detail: "The marvelously delicious dish A", prix: 10.99, image: false, type: "dishes" },
  { id: crypto.randomUUID(), titre: 'Dish B', detail: "The marvelously delicious dish B", prix: 8.99,image: false, type: "dishes" },
  { id: crypto.randomUUID(), titre: 'Drink A', detail: "The marvelously delicious drink A", prix: 5.99, image: false, type: "drinks" },
  { id: crypto.randomUUID(), titre: 'Drink B', detail: "The marvelously delicious drink B", prix: 4.99,image: false, type: "drinks" },
]
exports.menu = [
  ...[0,1,2,3].map(i=>({ target: exports.produits[i].id, stock: Math.trunc(Math.random()*100) }))
]
