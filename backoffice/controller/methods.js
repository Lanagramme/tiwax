const fdb = require('../fdb'), collectionsMap = require('./classes')

module.exports = (new Map)
  .set('createOne', function({collection}, data = {}){
    console.log(`createOne for ${collection} collection`)
    if(!collectionsMap.has(collection)) return false
    const aclass = collectionsMap.get(collection)
    const res = new aclass(data)
    if(res.error) {
      return res.error
    } else {
      fdb[collection]?.push(res)
      return 'created'
    }
  })

  .set('readOne', function({collection, id}){
    console.log(`read item id:${id} from ${collection}`)
    return collectionsMap.has(collection) && fdb[collection].find(o => o.id===id)
  })

  .set('readMany', function({collection}){
    console.log(`readMany from ${collection} collection`)
    return collectionsMap.has(collection) &&  fdb[collection]
  })

  .set('updateOne', function({collection, id}, data = {}){
    console.log(`update item id:${id} from ${collection}`)
    if(!collectionsMap.has(collection)) return false
    const item = fdb[collection].find(o => o.id===id)
    const res = new collectionsMap.get(collection)({...item, ...data})
    return res.error || (Object.assign(item,data), "successfully updated")
  })

  .set('updateMany', function(){
    console.log(`updateMany from ${collection} collection`)
    return collectionsMap.has(collection) &&  'updateMany'
  })

  .set('deleteOne', function({collection, id}){
    console.log(`delete item id:${id} from ${collection}`)
    if(!collectionsMap.has(collection)) return false
    return fdb[collection].splice(i,fdb[collection].findIndex(o => o.id===id)) 
  })

  .set('deleteMany', function(){
    console.log(`deleteMany from ${collection} collection`)
    return  collectionsMap.has(collection) && 'deleteMany'
  })