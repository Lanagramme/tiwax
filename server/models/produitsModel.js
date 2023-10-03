const mongoose = require('mongoose')

const ProduitsSchema = mongoose.Schema(
  {
    titre : {
      type: String,
      required: [true, "Nom manquant pour le produit"]
    },
    detail : String,
    prix : Number,
    image : {
      type: String,
      required: true,
      default: "0"
    },
    type: String,
    inStock: Boolean,
    onSale: Boolean,
    menu : [],
  }
)

const Produits = mongoose.model('Produits', ProduitsSchema)

module.exports = Produits