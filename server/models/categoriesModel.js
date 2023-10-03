const mongoose = require('mongoose')

const CategoriesSchema = mongoose.Schema(
  {
   name : {
      type: String,
      required: [true, "Nom manquant pour la catégorie"]
    }
  }
)

const Categories = mongoose.model('Categories', CategoriesSchema)

module.exports = Categories