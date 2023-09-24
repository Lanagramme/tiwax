const db = require('./fdb')
const collections = Object.keys(db)
const createOne = require('./controller/methods').get('createOne')
const fdb = {
  get navigation(){
    return [0,1,2,3].reduce((acc, i)=> {
      const newNavigation = { titre: db.produits[i].type, liste: '[]' }
      const navigation = acc.find(x=> x.titre.toLowerCase() === db.produits[i].type.toLowerCase()) || (acc.push(newNavigation), newNavigation)
      const menu = {produit: db.produits[i].id, stock: Math.trunc(Math.random()*100)}
      const list = JSON.parse(navigation.liste)
      list.push(menu)
      navigation.liste = JSON.stringify(list)
      return acc
    }, [])
  }
}

fdb.produits = [
  { titre: 'Dish A', detail: "The marvelously delicious dish A", prix: 10.99, image: false, type: "dishes" },
  { titre: 'Dish B', detail: "The marvelously delicious dish B", prix: 8.99,image: false, type: "dishes" },
  { titre: 'Drink A', detail: "The marvelously delicious drink A", prix: 5.99, image: false, type: "drinks" },
  { titre: 'Drink B', detail: "The marvelously delicious drink B", prix: 4.99,image: false, type: "drinks" },
]
// fdb.commandes = [],
fdb.options = [
  {
    titre: 'Sauces',
    qcm: JSON.stringify(["Ketchup", "Mayonaise", "Moutarde"]),
    typeProduit: "dishes",
    type: "check",
    max: 2,
  },
  {
    titre: 'Extras',
    qcm: JSON.stringify(["Fromage", "Champignon", "Crudités"]),
    typeProduit: "dishes",
    type: "check",
    max: 3,
  },
  {
    titre: 'Size',
    qcm: JSON.stringify(["33cl", "50cl"]),
    typeProduit: "drinks",
    type: "select",
    max: 1,
  },
]

collections.forEach((key)=>{
  fdb[key]?.forEach(element => {
    console.log(createOne({collection:key},element))
  });
  console.log(db)
})

console.log('end')