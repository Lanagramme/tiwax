const mongoose = require('mongoose')

const MenusSchema = mongoose.Schema(
  {
    options : [
      {
        type: {
          type: String,
          required: [true, "Erreur format, Type manquant"]
        },
        title:  {
          type: String,
          required: [true, "Erreur format, Description manquante"]
        },
        qcm: {
          choix:{
            type: String,
            required: [true, "Erreur format, choix manquant"]
          },
          options:{
            type: Array,
            required: [true, "Erreur format, options de qcm manquant"]
          },
        }, 
        sub: String,
        max: Number
      }
    ]
  }
)

const Menus = mongoose.model('Menus', MenusSchema)

module.exports = Menus