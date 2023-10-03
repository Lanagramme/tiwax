const db = require('./fdb')
const collections = Object.keys(db)
// const createOne = require('./controller/methods').get('createOne')
const fdb = {
//   get navigation(){
//     return [0,1,2,3].reduce((acc, i)=> {
//       const newNavigation = { titre: db.produits[i].type, liste: '[]' }
//       const navigation = acc.find(x=> x.titre.toLowerCase() === db.produits[i].type.toLowerCase()) || (acc.push(newNavigation), newNavigation)
//       const menu = {produit: db.produits[i].id, stock: Math.trunc(Math.random()*100)}
//       const list = JSON.parse(navigation.liste)
//       list.push(menu)
//       navigation.liste = JSON.stringify(list)
//       return acc
//     }, [])
//   }
}
fdb.categories = [
  "Plats",
  "Desserts",
  "Boissons"
]

fdb.produits = [
  { 
    id: "a91839ca-0078-5852-b68c-dd7bf9599cd9",
    titre: 'Menu', 
    detail: "Repas", 
    prix: 10.99, 
    image: 0,
    type: "Plats",
    inStock: 1,
    onSale: true
  },
  { 
    id: "76ea2a19-cba7-598a-8dba-0b9789611837",
    titre: 'Sandwich', 
    detail: "", 
    prix: 5, 
    image: 0,
    type: "Plats",
    inStock: 1,
    onSale: true
  },
  { 
    id: "8704b21d-f6c1-599f-ba66-6a0538c4dbba",
    titre: 'Gateau', 
    detail: "Vendus à la part", 
    prix: 3.50, 
    image: 0,
    type: "Desserts",
    inStock: 1,
    onSale: true
  },
  { 
    id: "7b130706-be1b-502b-ac68-b23a560c1d3f",
    titre: 'Boissons froides', 
    detail: "", 
    prix: "", 
    image: 0,
    type: "Boissons",
    inStock: 1,
    onSale: true
  },
]

fdb.ingredients = [
  {name:'Poulet', stock: false}, 
  {name:'Boeuf', stock: true}, 
  {name:'thon', stock: true}, 
  {name:'Pain blanc', stock: true}, 
  {name:'Pain panini', stock: true}, 
  {name:'Omelette', stock: true}, 
  {name:'Saucisse', stock: true}, 
  {name:'Laitue', stock: true}, 
  {name:'Tomate', stock: true}, 
  {name:'Poisson', stock: true}, 
  {name:'Riz', stock: false}, 
  {name:'Pâtes', stock: true}, 
  {name:'Lentilles consommés', stock: true}, 
  {name:"Gratin de pomme de terre", stock: true}, 
  {name:"Haricots rouge", stock: true}, 
  {name:'Créole', stock: false}, 
  {name:'Mayonnaise', stock: true}, 
  {name:'Piment', stock: true}, 
]

fdb.commandes = [],
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

// collections.forEach((key)=>{
//   fdb[key]?.forEach(element => {
//     console.log(createOne({collection:key},element))
//   });
//   console.log(db)
// })

fdb.menus = [
  {
    id: "a91839ca-0078-5852-b68c-dd7bf9599cd9",
    options: [
      {
        type: "radio",
        title: "1 viande au choix",
        qcm: {
          choix: 'viande',
          options: fdb.ingredients.filter(x => ['Poulet','Boeuf','Poisson'].includes(x.name))
        },
        sub: false
      },
      {
        type: "check",
        title: "2 accompagnements au choix",
        qcm: {
          choix: "accompagnements",
          options: fdb.ingredients.filter(x => [
            'Riz', 
            'Pâtes', 
            'Lentilles consommés', 
            "Gratin de pomme de terre", 
            "Haricots rouge", 
          ].includes(x.name))
        },
        sub: "2max",
        max: 2
      },
      {
        type: "grad",
        title: "Sauces",
        qcm: {
          choix: "sauces",
          options: fdb.ingredients.filter(x => ['Créole', 'Mayonnaise', 'Piment'].includes(x.name))
        },
        sub: "2 max.",
        max: 2
      },
      {type: "input"}
    ]
  },
  {
    id: "76ea2a19-cba7-598a-8dba-0b9789611837",
    options: [
      {
        type: "radio",
        title: "1 pain au choix",
        qcm: {
          choix: 'Pain',
          options: fdb.ingredients.filter(x => ['Pain blanc','Pain panini'].includes(x.name))
        },
        sub: false
      },
      {
        type: "radio",
        title: "Garniture",
        qcm: {
          choix: "Garniture",
          options: fdb.ingredients.filter(x => [
            'Thon', 
            'Poulet', 
            'Omelette', 
            "Saucisse",
          ].includes(x.name))
        }
      },
      {
        type: "check",
        title: "Crudités",
        qcm: {
          choix: "crudités",
          options: fdb.ingredients.filter(x => [
            'Laitue', 
            'Tomate', 
            'Oinion', 
          ].includes(x.name))
        },
        max: 3
      },
      {
        type: "grad",
        title: "Sauces",
        qcm: {
          choix: "sauces",
          options: fdb.ingredients.filter(x => ['Créole', 'Mayonnaise', 'Piment'].includes(x.name))
        },
        sub: "2 max.",
        max: 2
      },
      {type: "input"}
    ]
  },
]

fdb.commandes = [
  {
    id:"RVEEwlktZy",
    name:"Menu",
    prix:8,
    options: {
      viande:"Boeuf",
      accompagnements:[
        "Pâtes"
      ],
      sauces:[]
    }
  },
  {
    id:"JMLJvgcQUy",
    name:"Menu",
    prix:8,
    options:{
      viande:"Poisson",
      accompagnements:[
        "Pâtes",
        "Gratin de pomme de terre"
      ],
      sauce:[
        {
            name:"Mayonnaise",
            nb: 2
        }
      ],
      instrustions:"test"
    }
  }
]

console.log('end')
module.exports = {...fdb}