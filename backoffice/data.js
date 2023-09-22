const crypto = require('crypto')
const db = require('./fdb')
const collections = Object.keys(db)
const createOne = require('./controller/methods').get('createOne')
const fdb = {}
fdb.produits = [
  { id: crypto.randomUUID(),titre: 'Dish A', detail: "The marvelously delicious dish A", prix: 10.99, image: false, type: "dishes" },
  { id: crypto.randomUUID(), titre: 'Dish B', detail: "The marvelously delicious dish B", prix: 8.99,image: false, type: "dishes" },
  { id: crypto.randomUUID(), titre: 'Drink A', detail: "The marvelously delicious drink A", prix: 5.99, image: false, type: "drinks" },
  { id: crypto.randomUUID(), titre: 'Drink B', detail: "The marvelously delicious drink B", prix: 4.99,image: false, type: "drinks" },
],
// fdb.commandes = [],
fdb.options = [
  {
    id: crypto.randomUUID(),
    titre: 'Sauces',
    qcm: JSON.stringify(["Ketchup", "Mayonaise", "Moutarde"]),
    typeProduit: "dishes",
    type: "check",
    max: 2,
  },
  {
    id: crypto.randomUUID(),
    titre: 'Extras',
    qcm: JSON.stringify(["Fromage", "Champignon", "Crudités"]),
    typeProduit: "dishes",
    type: "check",
    max: 3,
  },
  {
    id: crypto.randomUUID(),
    titre: 'Size',
    qcm: JSON.stringify(["33cl", "50cl"]),
    typeProduit: "drinks",
    type: "select",
    max: 1,
  },
],
fdb.navigation = [0,1,2,3].reduce((acc, i)=> {
  const newNavigation = { titre: fdb.produits[i].type, liste: '[]' }
  const navigation = acc.find(x=> x.titre.toLowerCase() === fdb.produits[i].type.toLowerCase()) || (acc.push(newNavigation), newNavigation)
  const menu = {produit: fdb.produits[i].id, stock: Math.trunc(Math.random()*100)}
  const list = JSON.parse(navigation.liste)
  list.push(menu)
  navigation.liste = JSON.stringify(list)
  return acc
}, []),


collections.forEach((key)=>{
  fdb[key]?.forEach(element => {
    console.log(createOne({collection:key},element))
  });
  console.log(db)
})

console.log('end')