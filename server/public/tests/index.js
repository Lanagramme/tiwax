import Api from './api.js'
function getBool(){ return Math.random() > .5 }
function getString(word){ return `some amazing ${word} ` }
function getArray(word){ return [..."ABC"].map(key=>word+key) }
function getNumber(){ return Math.floor(Math.random() * 15)+1 }
function getData(){
  return JSON.stringify({
    name: getString('name'),
    titre: getString('titre'),
    detail: getString('detail'),
    prix: getNumber(),
    onSale: getBool(),
    type: getString('type'),
    image: getString('image'),
    stock: getBool(),
    jour: getBool(),
    ingredients: getArray('ingredient'),
    options: getArray('option') ,
    // menu : [],
    open : getBool()
  })
}
function testApi(method, url, data, toLog){
  return Api[method](url, data)
    .then(data => {
      if (data.hasOwnProperty('fail') || data.success !== 1) throw data.message
      else return data.message
    })
    .then(res=> ( toLog(!0, method, url, res), res ))
    .catch(err => { toLog(!1, method, url, err); throw err })
}
function setTests(collection){
  const tests = {}

  return {
    show(){ console.table(tests) },
    add(key){ return (success, method, url, response) => tests[`${collection}: ${key}`] = {success, method, url, response} }
  }
}
function runTests(collections){
  collections.forEach(collection => {
    const { show, add } = setTests(collection)
    const Promises = []
    // create
    testApi('post', collection, getData(), add(`create`)).then((item) => {
      const id = item._id
      if(id){
        // readOne
        Promises.push(testApi('get',`${collection}/${id}`, undefined, add(`read one`)))
        
        // readMany
        Promises.push(testApi('get', collection, undefined, add(`read many`)))
        
        // update
        collection !== "commandes" && Promises.push(testApi('put', `${collection}/${id}`, getData(), add(`update`)))
  
        // delete
        Promises.push(testApi('delete', `${collection}/${id}`, undefined, add(`delete`)))
      } else console.error('cannot find id => ', item, id)
      
    }).finally(()=>Promise.all(Promises).finally(show)).catch(()=>{})
    
  })
}

runTests(['ingredients', 'categories', 'produits', 'menus'])