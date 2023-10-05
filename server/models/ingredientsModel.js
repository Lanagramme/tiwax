const mongoose = require('mongoose')

const modelIngredients = {
  name : {
     type: "String",
     required: [true, "Nom manquant pour l'ingrédient"]
   },
   stock : {
     type: "Boolean",
     required: true,
     default: false
   }
 }

const IngredientsSchema = mongoose.Schema(modelIngredients)

const Ingredients = mongoose.model('Ingredient', IngredientsSchema)

module.exports = {Ingredients, modelIngredients}