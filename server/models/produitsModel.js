const mongoose = require('mongoose')

const modelProduits = {
  titre : {
    type: "String",
    required: [true, "Nom manquant pour le produit"]
  },
  detail : "String",
  prix : "Number",
  image : {
    type: "String",
    required: true,
    default: "0"
  },
  type: "String",
  stock: "Boolean",
  onSale: "Boolean",
  menu : [],
}

const ProduitsSchema = mongoose.Schema(modelProduits)

const Produits = mongoose.model('Produits', ProduitsSchema)

module.exports = {Produits, modelProduits}