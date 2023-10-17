// import collection models
// const { Ingredients: ingredients, modelIngredients} = require('./ingredientsModel')
// const { Categories: categories, modelCategories} = require('./categoriesModel')
// const { Commandes: commandes, modelCommandes} = require('./commandesModel')
// const { Produits: produits, modelProduits} = require('./produitsModel')
// const { Menus: menus, modelMenus} = require('./menussModel')
const { Story, Person } = require('./test')
// const store = require('./storeModel')

// const collections ={ingredients, categories, commandes, produits, menus, navigation : true, store, Person, Story} // set the collection models banks
const collections = { Story, Person } // set the collection models banks

// const models = { ingredients: modelIngredients, categories: modelCategories, commandes: modelCommandes, produits: modelProduits, menus: modelMenus }

const check = ({}).hasOwnProperty.bind(collections) // shorthand to check if collections has own property

const fs = require('fs')

function browseDir(path, fn){
  return fs.readdirSync(path,{ withFileTypes: true }).reduce((o, dirent) => {
    const { name } = dirent,
    [key, isModel] = name.split('Model.')
    if(!dirent.isDirectory() && isModel) {
      const 
        { models } = o,
        {collection, model} = format( readFile('./'+name, fn), (key[0].toUpperCase()+key.slice(1)) );

      models[key] = model
      collections[key] = collection
    }
    return o;
  }, {
    collections,
    checkCollection(collection){ return check(collection) },
    models: {}
  })
}

function readFile(path){ return require(path) }

function format(o, key) {
  console.log(o, key)
  return {
    model: o[`model${key}`],
    collection: o[key]
  }
}

module.exports = browseDir('models')