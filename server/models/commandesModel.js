const mongoose = require('mongoose')

const modelCommandes = {
  clientID : {
    type: String,
    required: [true, "Identifiant client manquant"],
    fieldDescription: {
      type: "Input",
      label: "Toto",
    }
   },
   fullfilled : Boolean,
   toto : {
     type: String,
     required: [true, "Toto manquant"],
     fieldDescription: {
       type: "Input",
       label: "Toto",
     }
    },
   tata : {
     type: String,
     required: [true, "Tata manquant"],
     fieldDescription: {
       type: "Input",
       label: "Tata",
       placeholder: "Nom de la catégorie"
     }
    }
 }

const CommandesSchema = mongoose.Schema(modelCommandes)

const Commandes = mongoose.model('Commandes', CommandesSchema)

module.exports = {Commandes, modelCommandes}