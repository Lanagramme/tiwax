const mongoose = require('mongoose')

const modelProduits = {
  titre : {
    type: "String",
    required: [true, "Nom manquant pour le produit"],
    fieldDescription: {
      type: "Input",
      label: "Nom",
      placeholder: "Nom du produit"
    }
  },
  detail : {
    type: String,
    fieldDescription: {
      type: "TextArea",
      label: "Description",
      placeholder: "Description du produit"
    }
  },
  prix : {
    type: Number,
    fieldDescription: {
      type: "Number",
      label: "Prix",
      placeholder: "Prix du produit"
    }
  },
  onSale: {
    type: Boolean,
    fieldDescription: {
      type: "Checkbox",
      label: "Ajouter à la carte",
    }
  },
  type: {
    type: String,
    fieldDescription: {
      type: "Select",
      label: "Type",
      placeholder: "Catégorie"
    }
  },
  image : {
    type: "String",
    required: true,
    default: "0",
    fieldDescription: {
      type: "Input",
      label: "Illustration",
    }
  },
  // stock: {
  //   type: Boolean,
  //   fieldDescription: {
  //     type: "Checkbox",
  //     label: "Stock",
  //   }
  // },
  menu : [],
}

const ProduitsSchema = mongoose.Schema(modelProduits)

const Produits = mongoose.model('Produits', ProduitsSchema)

module.exports = {Produits, modelProduits}