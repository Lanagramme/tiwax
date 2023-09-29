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
    menu_id : {
       type: String,
       required: [true, "aucun menu associé au produit"]
    },
  }
)

const Produits = mongoose.model('Produits', ProduitsSchema)

module.exports = Produits