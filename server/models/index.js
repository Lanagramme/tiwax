// import collection models
const { Ingredients: ingredients, modelIngredients} = require('./ingredientsModel')
const { Categories: categories, modelCategories} = require('./categoriesModel')
const { Produits: produits, modelProduits} = require('./produitsModel')
const { Menus: menus, modelMenus} = require('./menussModel')
const { Story, Person } = require('./test')
const store = require('./storeModel')

const collections ={ingredients, categories, produits, menus, navigation : true, store, Person, Story} // set the collection models banks
const check = collections.hasOwnProperty.bind(collections) // shorthand to check if collections has own property
const models = { ingredients: modelIngredients, categories: modelCategories, produits: modelProduits, menus: modelMenus }

module.exports = {
  collections,
  checkCollection(collection){ return check(collection) },
  models
}