const data = require('../fdb'), collectionsMap = require('./classes')

module.exports = (new Map)
  .set('createOne', function({collection}, data = {}){
    console.log(`create item for ${collection}`)
    if(!collectionsMap.has(collection)) return false
    const res = new collectionsMap.get(collection)(data)
    return res.error || res
  })

  .set('readOne', function({collection, id}){
    console.log(`read item id:${id} from ${collection}`)
    return collectionsMap.has(collection) && data[collection].find(o => o.id===id)
  })

  .set('readMany', function({collection}){
    return collectionsMap.has(collection) &&  data[collection]
  })

  .set('updateOne', function({collection, id}, data = {}){
    console.log(`update item id:${id} from ${collection}`)
    if(!collectionsMap.has(collection)) return false
    const item = data[collection].find(o => o.id===id)
    const res = new collectionsMap.get(collection)({...item, ...data})
    return res.error || (Object.assign(item,data), "successfully updated")
  })

  .set('updateMany', function(){
    return collectionsMap.has(collection) &&  'updateMany'
  })

  .set('deleteOne', function({collection, id}){
    console.log(`delete item id:${id} from ${collection}`)
    if(!collectionsMap.has(collection)) return false
    return data[collection].splice(i,data[collection].findIndex(o => o.id===id)) 
  })

  .set('deleteMany', function(){
    return  collectionsMap.has(collection) && 'deleteMany'
  })