import { Schema, model } from 'mongoose'

const modelCategories = {
  name : {
    type: String,
    required: [true, "Nom manquant pour la catégorie"],
    fieldDescription: {
      type: "Input",
      label: "Nom",
      placeholder: "Nom de la catégorie"
    }
   }
 }

const CategoriesSchema = Schema(modelCategories)

const Categories = model('Categories', CategoriesSchema)

export default {Categories, modelCategories}