const Categories = {
  id,
  titre,
}

const Plats = {
  id,
  nom,
  detail,
  categorie: id,
  prix,
  image,
  disponible: bool,
  menu: {single: bool, detail: Ingredients || [Options]}
}

const Options = {
  id,
  type,
  nom,
  qcm: [Choix],
  detail,
  max: false
}

const Choix = {
  id,
  nom,
  ingredients: [Ingredients]
}

const Ingredients = {
  id,
  nom,
  stock
}