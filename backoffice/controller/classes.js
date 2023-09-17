const data = require("../fdb")
const formats = {
  produits: {
    type: ['string'],
    titre: ['string'],
    detail: ['string'],
    prix: ['number'],
    image: ['string'],
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
    title: ['string'],
    qcm(){this.$choice},
    sub: ['string'],
    max: ["number","boolean"],
    targetedtype: ['string'],
  },
  menus: {
    produit: "produits",
    stock: ["number"]
  }
}

function checkItem(collection, id){
  return !!data[collection]?.find(item=> item.id === id)
}

function handleJSON(type, json){
  const data = JSON.parse(json)
  return Array.isArray(data)
    ? data.every(val => checkProperty(type, val))
    : Object.entries(type).every(([key,val]) => checkProperty(val,data[key]) )
}

function checkProperty(type,val){
  switch (true) {
    case Array.isArray(type): return type.some(v=> v === typeof val)
    case type instanceof Function: return handleJSON(type(), val)
    case typeof type === 'string': return checkItem(type, val)
    default: throw new Error('unknow property format');
  }
}

module.exports = Object.entries(formats).reduce((acc, [key, format])=>{
  if(key.charAt(0) === '$') return acc;
  return acc.set(key, class{
    constructor (data){
      Object.entries(format).forEach(([key,val])=>{
        try {
          if(!checkProperty(val,data[key])) throw new Error('Invalid item format');
          this[key] = data[key]
        } catch (error) {
          return error
        }
      })
    }
  })
},(new Map))