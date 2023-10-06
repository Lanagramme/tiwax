const mongoose = require('mongoose')

const modelIngredients = {
  name : {
    type: String,
    required: [true, "Nom manquant pour l'ingrédient"],
    fieldDescription: {
      type: "Input",
      label: "Nom",
      placeholder: "Nom de l'ingrédient"
    }
   },
   stock : {
    type: Boolean,
    required: true,
    default: false,
    fieldDescription: {
      type: "Checkbox",
      label: "Stock",
    }
   }
 }

const IngredientsSchema = mongoose.Schema(modelIngredients)

const Ingredients = mongoose.model('Ingredient', IngredientsSchema)

module.exports = {Ingredients, modelIngredients}