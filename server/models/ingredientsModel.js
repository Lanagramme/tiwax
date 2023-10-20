import { Schema, model } from 'mongoose'

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

const IngredientsSchema = Schema(modelIngredients)

const Ingredients = model('Ingredient', IngredientsSchema)

export default {Ingredients, modelIngredients}