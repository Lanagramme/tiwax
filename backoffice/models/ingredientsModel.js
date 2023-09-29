const mongoose = require('mongoose')

const IngredientSchema = mongoose.Schema(
  {
   name : {
      type: String,
      required: [true, "Nom manquant pour l'ingrédient"]
    },
    stock : {
      type: Boolean,
      required: true,
      default: false
    }
  }
)

const Ingredient = mongoose.model('Ingredient', IngredientSchema)

module.exports = Ingredient