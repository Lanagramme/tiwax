import { Schema, model } from 'mongoose'

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

const CommandesSchema = Schema(modelCommandes)

const Commandes = model('Commandes', CommandesSchema)

export default {Commandes, modelCommandes}