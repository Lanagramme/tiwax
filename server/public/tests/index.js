import Api from './api.js'
const testsCount = {__progress__:[]}

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
function countTests(){
  Promise.all(testsCount.__progress__).finally(() => {
    let passed = 0, failed = 0, total = 0;
    const totals = {
      get passed(){ return passed },
      set passed(val){ passed += val },
      get failed(){ return failed },
      set failed(val){ failed += val },
      get total(){ return total },
      set total(val){ total += val },
    }
    testsCount.totals = {...Object.values(testsCount).reduce((acc, o) => Object.assign(acc, o), totals)}
    console.table(testsCount)
  })
  delete testsCount.__progress__
}

function setTests(collection){
  const tests = {}
  const count = testsCount[collection] = { passed: 0, failed: 0, total: 0 }
  let resolveTests
  testsCount.__progress__.push(new Promise((resolve)=>{ resolveTests = resolve}))
  return {
    show(){ console.table(tests), resolveTests() },
    add(key){
      return (success, method, url, response) => {
        count.total++
        success ? count.passed++ : count.failed++
        tests[`${collection}: ${key}`] = {success, method, url, response}
      }
    }
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

countTests()