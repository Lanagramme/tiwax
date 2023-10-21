// import collection models
// const { Ingredients: ingredients, modelIngredients} = require('./ingredientsModel')
// const { Categories: categories, modelCategories} = require('./categoriesModel')
// const { Commandes: commandes, modelCommandes} = require('./commandesModel')
// const { Produits: produits, modelProduits} = require('./produitsModel')
// const { Menus: menus, modelMenus} = require('./menussModel')
import { Story, Person } from './test.js'
import Tools from '../../tools/index.mjs';

// const store = require('./storeModel')
// const collections ={ingredients, categories, commandes, produits, menus, navigation : true, store, Person, Story} // set the collection models banks
// const models = { ingredients: modelIngredients, categories: modelCategories, commandes: modelCommandes, produits: modelProduits, menus: modelMenus }

const { reduceDir, capitalize } = Tools
export const collections = { Story, Person } // set the collection models banks
export const models = {} // set the model objects banks
export const checkCollection = ({}).hasOwnProperty.bind(collections) // shorthand to check if collections has own property


function format(o, key) { return { model: o[`model${key}`], collection: o[key] } }

async function reducer(o, dirent) {
  const { name } = dirent,
  [key, isModel] = name.split('Model.')
  if(!dirent.isDirectory() && isModel) {
    const 
      { models } = await o,
      {collection, model} = format( (await import('./'+name)).default, capitalize(key) );

    models[key] = model
    collections[key] = collection
  }
  return o;
}

export default await reduceDir('models/*', reducer, { collections, checkCollection, models })