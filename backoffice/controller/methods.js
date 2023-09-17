const data = require('../fdb'), collectionsMap = require('./classes')
console.log(data)
module.exports = (new Map)
  .set('createOne', function({collection}){
    console.log(`create item for ${collection}`)
    
    return collectionsMap.has(collection) && 'create'
  })

  .set('readOne', function({collection, id}){
    console.log(`read item id:${id} from ${collection}`)
    return collectionsMap.has(collection) &&  'readOne'
  })

  .set('readMany', function(){
    return collectionsMap.has(collection) &&  'readMany'
  })

  .set('updateOne', function({collection, id}){
    console.log(`update item id:${id} from ${collection}`)
    return collectionsMap.has(collection) &&  'updateOne'
  })

  .set('updateMany', function(){
    return collectionsMap.has(collection) &&  'updateMany'
  })

  .set('deleteOne', function({collection, id}){
    console.log(`delete item id:${id} from ${collection}`)
    return  collectionsMap.has(collection) && 'deleteOne'
  })

  .set('deleteMany', function(){
    return  collectionsMap.has(collection) && 'deleteMany'
  })