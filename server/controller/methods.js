const { checkCollection, collections } = require('../models')


/** List of methods to process filters
 * @constant filters
 */
const filters = {
  t(filters, val) { filters.type = val },
  s(filters, val) { filters.onSale = val }
}


/** Proccess a filter if it exist and ignore it otherwise
 * 
 * @param {Object} data Passed filters
 * @returns {Object} Processed filters 
 */
function handlerFilters(data) {

  return Object.entries(data).reduce((acc, [key,val]) => {
    filters[key] && filters[key](acc, encodeURI(val))
    return acc
  }, {})
}

/** Set response standart format
 * 
 * @param {Promise} promise database promise
 * @returns { Promise } database promise
 */
function formatResponse(promise){
  
  // return new Promise((resolve, reject) => {
  //   promise
  //     .then(res => { resolve({success: 1, message: res})})
  //     .catch(err => { resolve({success: 0, message: err.message})}
  //   )
  // })

  // suggestion to simplify the above promise
  // s'il y a quelque chose que je n'ai pas compris (du genre ce n'est pas une promesse) dis le moi.
  return  promise
    .then( res => ({success: 1, message: res}) )
    .catch( err => ({success: 0, message: err.message}) )
}

module.exports = (new Map)

  /** Create one entry in the specified collection
   * 
   * @param {Object} routeParameter Request path parameters
   * @param {Object} bodyParameter Request body parameters
   * @returns { Promise } database promise
   */
  .set('createOne', function({collection}, data = {}){
    console.log(`createOne for ${collection} collection`)

    // Check if collection exist
    if (!checkCollection(collection)){
      return formatResponse(Promise.reject(new Error(`Collection ${collection} introuvable`)))
      // return new Promise((resolve, reject) => {
      //   resolve({success: 0, message: `Collection ${collection} introuvable`})
      // })
    }
    
    console.log(data)
    // execute the request to the database
    return formatResponse(
      collections[collection].create(data).then(doc => {
        if (doc) return doc
        else throw new Error(`erreur à la création`)
      })
    )
    return collections[collection].create(data)
      .then( doc => {
        if (doc) return {success: 1, message: doc}
        else return {success: 0, message: `erreur à la création`}
      })

  })

  /** Read a specified entry of the specified collection
    * 
    * @param {Object} routeParameter Request path parameters
    * param {Object} queryParameter Request query parameters
    * @returns { Promise } database promise
    */
  .set('readOne', function({collection, id}){
    console.log(`read item id:${id} from ${collection}`)
    
    // Check if collection exist
    if (!checkCollection(collection)){
      return formatResponse(Promise.reject(new Error(`Collection ${collection} introuvable`)))
      // return new Promise((resolve, reject) => {
      //   resolve({success: 0, message: `Collection ${collection} introuvable`})
      // })
    }

    if (!id || id == 'undefined' || id == undefined){
      // return formatResponse(Promise.reject(new Error(`id ${id} invalide`)))
      return new Promise((resolve, reject) => {
        resolve({success: 0, message: `id ${id} invalide`})
      })
    }
    
    console.log(id)
    
    // execute the request to the database
    return formatResponse(collections[collection].findById(id).then(doc => {
      if (doc) return doc
      else throw new Error(`Aucune donnée dans ${collection} pour ${id}`)
    }))

    // return collections[collection].findById(id)
    // .then( doc => {
    //   if (doc) return {success: 1, message: doc}
    //   else return {success: 0, message: `Aucune donnée dans ${collection} pour ${id}`}
    // })
  })

  /** Read all or filtered entries of the specified collection
   * 
   * @param {Object} routeParameter Request path parameters
   * @param {Object} queryParameter Request query parameters
   * @returns { Promise } database promise
   */
  .set('readMany', function({collection}, data = {}){
    console.log(`readMany from ${collection} collection`)
    
    // Check if collection exist
    if (!checkCollection(collection)){ 
      return formatResponse(Promise.reject(new Error(`Collection ${collection} introuvable`)))
      // return new Promise((resolve, reject) => {
      //   resolve({success: 0, message: `Collection ${collection} introuvable`})
      // })
    }

    console.log('data => ',data)
    const filter = handlerFilters(data)
        
    // execute the request to the database
    return formatResponse(collections[collection].find(filter).then(doc => {
      if (doc) return doc
      else throw new Error(`Aucune donnée dans ${collection} pour ${JSON.stringify(filter)}`)
    }))

    // return collections[collection].find(filter)
    //   .then(
    //     res => { 
    //     if (res) return {success: 1, message: res}
    //     else return {success: 0, message: `Aucune donnée dans ${collection} pour ${filter}`}
    //     }
    //   )
  })

  /** Update a specified entry of the specified collection
   * 
   * @param {Object} routeParameter Request path parameters
   * @param {Object} bodyParameter Request body parameters
   * @returns { Promise } database promise
   */
  .set('updateOne', function({collection, id}, data = {}){
    console.log(`update item id:${id} from ${collection}`)
    // Check if collection exist
    if (!checkCollection(collection)){ 
      return formatResponse(Promise.reject(new Error(`Collection ${collection} introuvable`)))
      // return new Promise((resolve, reject) => {
      //   resolve({success: 0, message: `Collection ${collection} introuvable`})
      // })
    }

    // execute the request to the database
    return formatResponse(collections[collection].findByIdAndUpdate(id, data).then(doc => {
      if (doc) return doc
      else throw new Error(`Error message: action: deleteOne / collection: ${collection} / id: ${id}`)
    }))

    // return new Promise((resolve, reject) => {
    //   console.log(data)
    //   collections[collection].findByIdAndUpdate(id, data)
    //   .then(
    //     res => { resolve({success: 1, message: res})},
    //     err => { reject({success: 0, message: err.message})}
    //   )
    // })

  })

  // .set('updateMany', function(){
  //   console.log(`updateMany from ${collection} collection`)
  //   if (!checkCollection(collection)) return false
  //   // return collectionsMap.has(collection) &&  'updateMany'
  // })

  /** Delete a specified entry of the specified collection
   * 
   * @param {Object} routeParameter Request path parameters
   * @param {Object} bodyParameter Request body parameters
   * @returns { Promise } database promise
   */
  .set('deleteOne', function({collection, id}){
    console.log(`delete item id:${id} from ${collection}`)
    
    // Check if collection exist
    if (!checkCollection(collection)){ 
      return formatResponse(Promise.reject(new Error(`Collection ${collection} introuvable`)))
      // return new Promise((resolve, reject) => {
      //   resolve({success: 0, message: `Collection ${collection} introuvable`})
      // })
    }
    
    // execute the request to the database
    return formatResponse(collections[collection].findByIdAndDelete(id).then(doc => {
      if (doc) return doc
      else throw new Error(`Error message: action: deleteOne / collection: ${collection} / id: ${id}`)
    }))

    // return new Promise((resolve, reject) => {
    //   collections[collection].findByIdAndDelete(id)
    //   .then(
    //     res => { resolve({success: 1, message: res})},
    //     err => { reject({success: 0, message: err.message})}
    //   )
    // })

  })