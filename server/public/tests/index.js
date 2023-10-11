import Api from '../../../backoffice/src/store/api'
function getBool(){ return Math.random() > .5 }
function getString(word){ return `some amazing ${word} ` }
function getArray(word){ return [..."ABC"].map(key=>word+key) }
function getNumber(){ return Math.floor(Math.random() * 15)+1 }

function getData(){
  return {
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
  }
}

function testApi(method, url, data){
  return Api[method](url, data)
    .then(response=> (console.table({method, url, response}), response))
    .catch(err => console.error(err))
}

['ingredients', 'categories', 'produits', 'menus'].forEach(collection => {
  testApi('post', `/api/v1/${collection}`, getData()).then(() =>
  testApi('get', `/api/v1/${collection}`).then(records => {
  const id = records[records.length-1]?.id
  console.log(records,id)
  if(id){
    testApi('get',`/api/v1/${collection}/${id}`)
    collection !== "commandes" && testApi('put', `/api/v1/${collection}/${id}`, getData())
    testApi('delete', `/api/v1/${collection}/${id}`)
  } else console.error('cannot find id => ', records, id)
}))})