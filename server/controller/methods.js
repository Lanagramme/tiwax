const { checkCollection, collections } = require('../models')

// const filters = {
//   t(filters, val) { filters.type = val },
//   s(filters, val) { filters.onSale = val }
// }

// function handlerFilters(acc, [key,val]) {
//   filters[key] && filters[key](acc, encodeURI(val))
//   return acc
// }

function handlerFilters(data) {
  const filters = {
    t(filters, val) { filters.type = val },
    s(filters, val) { filters.onSale = val }
  }

  return Object.entries(data).reduce((acc, [key,val]) => {
    filters[key] && filters[key](acc, encodeURI(val))
    return acc
  }, {})
}

module.exports = (new Map)
  .set('createOne', function({collection}, data = {}){
    console.log(`createOne for ${collection} collection`)
    if (!checkCollection(collection)){ 
      return new Promise((resolve, reject) => {
        resolve({success: 0, message: `Collection ${collection} introuvable`}) })  }

    console.log(data)
    return collections[collection].create(data)
    .then( doc => {
      if (doc) return {success: 1, message: doc}
      else return {success: 0, message: `erreur à la création`}
    })

  })

  .set('readOne', function({collection, id}){
    console.log(`read item id:${id} from ${collection}`)
    if (!checkCollection(collection)){ 
      return new Promise((resolve, reject) => {
        resolve({success: 0, message: `Collection ${collection} introuvable`}) })   }
    if (!id || id == 'undefined' || id == undefined){ 
      return new Promise((resolve, reject) => {
        resolve({success: 0, message: `id ${id} invalide`}) })  }

    console.log(id)
    return collections[collection].findById(id)
    .then( doc => {
      if (doc) return {success: 1, message: doc}
      else return {success: 0, message: `Aucune donnée dans ${collection} pour ${id}`}
    })
  })

  .set('readMany', function({collection}, data = {}){
    console.log(`readMany from ${collection} collection`)
    if (!checkCollection(collection)){ 
      return new Promise((resolve, reject) => {
        resolve({success: 0, message: `Collection ${collection} introuvable`}) })   }
        
    console.log('data',data)
    // let filter = Object.entries(data).reduce(handlerFilters, {})
    const filter = handlerFilters(data)
    
    return collections[collection].find(filter)
      .then(
        res => { 
        if (res) return {success: 1, message: res}
        else return {success: 0, message: `Aucune donnée dans ${collection} pour ${filter}`}
        }
      )
  })

  .set('updateOne', function({collection, id}, data = {}){
    console.log(`update item id:${id} from ${collection}`)
    if (!checkCollection(collection)){ 
      return new Promise((resolve, reject) => {
        resolve({success: 0, message: `Collection ${collection} introuvable`})  }) }
    
    return new Promise((resolve, reject) => {
      console.log(data)
      collections[collection].findByIdAndUpdate(id, data)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })

    // const item = fdb[collection].find(o => o.id===id)
    // const res = new collectionsMap.get(collection)({...item, ...data})
    // return res.error || (Object.assign(item,data), "successfully updated")
  })

  .set('deleteOne', function({collection, id}){
    console.log(`delete item id:${id} from ${collection}`)
    if (!checkCollection(collection)){ 
      return new Promise((resolve, reject) => {
        resolve({success: 0, message: `Collection ${collection} introuvable`})
      }) 
    }
    return new Promise((resolve, reject) => {
      collections[collection].findByIdAndDelete(id)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })

  })