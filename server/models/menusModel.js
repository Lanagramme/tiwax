import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const modelMenus = {
  options : [
    {
      type: {
        type: String,
        required: [true, "Erreur format, Type manquant"],
        fieldDescription: {
          type: "Input",
          label: "Type",
          placeholder: "Type de menu"
        }
      },
      title: {
        type: String,
        required: [true, "Erreur format, Description manquante"],
        fieldDescription: {
          type: "Input",
          label: "Titre",
          placeholder: "Titre du menu"
        }
      },
      qcm: {
        choix:{
          type: String,
          required: [true, "Erreur format, choix manquant"]
        },
        options:[{ type: Schema.Types.ObjectId, ref: 'Ingredients' }],
      }, 
      sub: {
        type: String,
        fieldDescription: {
          type: "Input",
          label: "Sous titre",
          placeholder: "Sous-titre du menu"
        }
      },
      max: {
        type: Number,
        fieldDescription: {
          type: "Number",
          label: "Max",
          placeholder: "Choisissez un nombre"
        }
      }
    }
  ]
}

const MenusSchema = Schema(modelMenus)

const Menus = model('Menus', MenusSchema)

export default {Menus, modelMenus}