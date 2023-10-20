
import { Schema, model } from 'mongoose'

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
      label: "Catégorie",
      collection: [
        { value: "dish", label: "Plats" },
        { value: "drink", label: "Boissons" },
      ]
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
  stock: {
    type: Boolean,
    fieldDescription: {
      type: "Checkbox",
      label: "Stock",
    }
  },
  jour: {
    type: Boolean,
    fieldDescription: {
      type: "Checkbox",
      label: "Stock",
    }
  },
  ingredients: {
    type: Array,
    fieldDescription: {
      type: "TagSelect",
      label: "Ingrédients",
      collection: "ingredients",
      placeholder: "Ajoutez des ingrédients"
    }
  },
  // options: {
  //   type: Array,
  //   fieldDescription: {
  //     type: "TagSelect",
  //     label: "Options",
  //     collection: "options",
  //   }
  // },
  menu : [],
}

const ProduitsSchema = Schema(modelProduits)

const Produits = model('Produits', ProduitsSchema)

export default {Produits, modelProduits}