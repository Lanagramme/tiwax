const { /* checkCollection, */ collections, models } = require('../models')

const edgeCases = (new Map)

  // models edge case
  .set('models', (new Map)
    .set('one', function(id){
        return (new Promise((resolve, reject)=>{
          const data = models[id]
          data ? resolve(data) : reject(new Error(`Collection ${id} introuvable`))
        }))
      })
    .set('many', function(){ return (Promise.resolve(models)) })
  )

  // menus edge case
  .set('menus', (new Map)
    .set('one', function(id){
      console.log("menus")
      return (collections['menus'].findById(id)
        .populate('Ingredients')
        .then(doc => {
          if (doc) return doc
          else throw new Error(`Aucune donnée dans menus pour ${id}`)
        })
      )
    })
    //.set('many', function(){ return (Promise.resolve(models)) })
  )

module.exports = (edgeCase) => (edgeCases.get(edgeCase) || (new Map))
