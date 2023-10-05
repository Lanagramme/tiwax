const mongoose = require('mongoose')

const modelCategories = {
  name : {
     type: "String",
     required: [true, "Nom manquant pour la catégorie"]
   }
 }

const CategoriesSchema = mongoose.Schema(modelCategories)

const Categories = mongoose.model('Categories', CategoriesSchema)

module.exports = {Categories, modelCategories}