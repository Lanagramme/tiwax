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

module.exports = {
  collections: Object.keys(formats),
  formats: Object.entries(formats)
}