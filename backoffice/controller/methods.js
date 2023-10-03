// const fdb = require('../fdb'), collectionsMap = require('./classes')
// const db = require('../data')

// const ingredients = require('../models/ingredientsModel')
// const categories = require('../models/categoriesModel')
// const produits = require('../models/produitsModel')
// const menus = require('../models/menussModel')

// const collections ={ingredients, categories, produits, menus, navigation : true}

const { checkCollection, collections } = require('../models')

const filters = {
  t(filters, val) { filters.type = val },
  s(filters, val) { filters.onSale = val }
}

function handlerFilters(acc, [key,val]) {
  filters[key] && filters[key](acc, encodeURI(val))
  return acc
}
module.exports = (new Map)
  .set('createOne', function({collection}, data = {}){
    console.log(`createOne for ${collection} collection`)
    // if(!collectionsMap.has(collection)) return false
    // const aclass = collectionsMap.get(collection)
    // const res = new aclass(data)
    // if(res.error) {
    //   return res.error
    // } else {
    //   fdb[collection]?.push(res)
    //   return 'created'
    // }
    if (!checkCollection(collection)) return false
    return new Promise((resolve, reject) => {
      console.log(data)
      collections[collection].create(data)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })
  })

  .set('readOne', function({collection, id}){
    console.log(`read item id:${id} from ${collection}`)
    // return db.hasOwnProperty(collection) && db[collection].find(o => o.id===id)
    if (!checkCollection(collection)) return false

    // if (collection == "navigation2") {
    //   return new Promise((resolve, reject) => {
    //     collections["produits"].find({type : id})
    //     .then(
    //       res => { resolve({success: 1, message: res})},
    //       err => { reject({success: 0, message: err.message})}
    //     )
    //   })

    // }
    
    
    return new Promise((resolve, reject) => {
      console.log(id)
      collections[collection].findById(id)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })
  })

  .set('readMany', function({collection}, data = {}){
    console.log(`readMany from ${collection} collection`)
    // return db.hasOwnProperty(collection) &&  db[collection]
    if (!checkCollection(collection)) return false
    console.log('data',data)

    let filter = Object.entries(data).reduce(handlerFilters, {})
    
    
    return new Promise((resolve, reject) => {
      collections[collection].find(filter)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })
  })

  .set('updateOne', function({collection, id}, data = {}){
    console.log(`update item id:${id} from ${collection}`)
    if (!checkCollection(collection)) return false
    // if(!collectionsMap.has(collection)) return false
    
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

  // .set('updateMany', function(){
  //   console.log(`updateMany from ${collection} collection`)
  //   if (!checkCollection(collection)) return false
  //   // return collectionsMap.has(collection) &&  'updateMany'
  // })

  .set('deleteOne', function({collection, id}){
    console.log(`delete item id:${id} from ${collection}`)
    // if(!collectionsMap.has(collection)) return false
    // return fdb[collection].splice(i,fdb[collection].findIndex(o => o.id===id))
    if (!checkCollection(collection)) return false
    return new Promise((resolve, reject) => {
      collections[collection].findByIdAndDelete(id)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })

  })

  // .set('deleteMany', function(){
  //   console.log(`deleteMany from ${collection} collection`)
  //   if (!checkCollection(collection)) return false
  //   // return  collectionsMap.has(collection) && 'deleteMany'
  // })