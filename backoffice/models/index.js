// import collection models
const ingredients = require('./ingredientsModel')
const categories = require('./categoriesModel')
const produits = require('./produitsModel')
const menus = require('./menussModel')


const collections ={ingredients, categories, produits, menus, navigation : true, navigation2 : true} // set the collection models banks
const check = collections.hasOwnProperty.bind(collections) // shorthand to check if collections has own property

module.exports = {
  collections,
  checkCollection(collection){ return check(collection) }
}