// import collection models
const ingredients = require('./ingredientsModel')
const categories = require('./categoriesModel')
const produits = require('./produitsModel')
const menus = require('./menussModel')
const store = require('./storeModel')


const collections ={ingredients, categories, produits, menus, navigation : true, store} // set the collection models banks
const check = collections.hasOwnProperty.bind(collections) // shorthand to check if collections has own property

module.exports = {
  collections,
  checkCollection(collection){ return check(collection) }
}