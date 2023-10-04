const { checkCollection, collections } = require('../models')


/** List of methods to process filters
 * @constant filters
 */
const filters = {
  t(filters, val) { filters.type = val },
  s(filters, val) { filters.onSale = val }
}


/** Check if a filter exist and pass its value to the coresponding methods
 * 
 * @param {Object} acc Processed value storage
 * @param {Array} entry Pair of key and value
 * @returns {Object} acc parameter
 */
function handlerFilters(acc, [key,val]) {
  filters[key] && filters[key](acc, encodeURI(val))
  return acc
}

/** Set response standart format
 * 
 * @param {Promise} promise database promise
 * @returns { Promise } database promise
 */
function formatResponse(promise){
  
  return new Promise((resolve, reject) => {
    promise.then(
      res => { resolve({success: 1, message: res})},
      err => { reject({success: 0, message: err.message})}
    )
  })

  // suggestion to simplify the above promise
  // s'il y a quelque chose que je n'ai pas compris (du genre ce n'est pas une promesse) dis le moi.
  return  promise.then(
      res => ({success: 1, message: res}),
      err => {throw {success: 0, message: err.message} }
    )
}

// list of api's possible actions 
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
    if (!checkCollection(collection)) return false

    console.log(data)

    // execute the request to the database
    return formatResponse(collections[collection].create(data))

    return new Promise((resolve, reject) => {
      collections[collection].create(data)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
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
    
    
    // execute the request to the database
    return formatResponse(collections[collection].findById(id))

    return new Promise((resolve, reject) => {
      console.log(id)
      collections[collection].findById(id)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })
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
    if (!checkCollection(collection)) return false

    console.log('data',data)
    
    let filter = Object.entries(data).reduce(handlerFilters, {})
    
    
    // execute the request to the database
    return formatResponse(collections[collection].find(filter))
    return new Promise((resolve, reject) => {
      collections[collection].find(filter)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })
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
    if (!checkCollection(collection)) return false

    // execute the request to the database
    return formatResponse(collections[collection].findByIdAndUpdate(id, data))
    return new Promise((resolve, reject) => {
      console.log(data)
      collections[collection].findByIdAndUpdate(id, data)
      .then(
        res => { resolve({success: 1, message: res})},
        err => { reject({success: 0, message: err.message})}
      )
    })

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
    if (!checkCollection(collection)) return false

    // execute the request to the database
    return formatResponse(collections[collection].findByIdAndDelete(id))
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