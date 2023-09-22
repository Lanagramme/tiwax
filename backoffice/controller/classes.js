const fdb = require('../fdb')
// const fdb = require("../fdb")
console.log(fdb)
const formats = {
  produits: {
    type: ['string'],
    titre: ['string'],
    detail: ['string'],
    prix: ['number'],
    image: ['string', "boolean"],
  },
  commandes: {
    $item: {
      $option: {
        type: ['string'],
        value: ['string'],
        quantité: ['number']
      },
      produit: 'produits',
      options(){ return this.$option },
      note: ['string']
    },
    items(){
      return this.$item
    },
    number: ["number"],
    deliveryDate: ['string']
  },
  options: {
    $choice: ['string'],
    type: ['string'],
    titre: ['string'],
    qcm(){ return this.$choice},
    sub: ['string', 'undefined'],
    max: ["number","boolean"],
    typeProduit: ['string'],
  },
  navigation:{
    $list: {
      produit: "produits",
      stock: ["number"]
    },
    titre: ['string'],
    liste(){ return this.$list }
  }
}

function checkItem(collection, id){
  collection = fdb[collection]
  return !!collection?.find(item=> item.id === id)
}

function handleJSON(type, json){
  const data = JSON.parse(json)
  return Array.isArray(data)
    ? data.every(val => checkProperty(type, val))
    : Object.entries(type).every(([key,val]) => checkProperty(val,data[key]) )
}

function checkProperty(type,val,o){
  switch (true) {
    // simple type: number, string, bool, etc
    case Array.isArray(type): return type.some(v=> v === typeof val)
    // JSON format
    case type instanceof Function: return handleJSON(type.bind(o)(), val)
    // Identifier
    case typeof type === 'string': return checkItem(type, val)
    // 
    case typeof type === 'object': return Object.entries(type).every(([key,subval]) => checkProperty(subval,val[key]))
    default: throw new Error('unknow property format');
  }
}

module.exports = Object.entries(formats).reduce((acc, [key, format])=>{
  if(key.charAt(0) === '$') return acc;
  return acc.set(key, class{
    constructor (data){
      try {
        Object.entries(format).filter(([key])=>key[0]!=="$").forEach(([key,val])=>{
          if(!checkProperty(val,data[key], format)) throw new Error('Invalid item format');
          this[key] = data[key]
        })
      } catch (error) {
        return {error}
      }
    }
  })
},(new Map))