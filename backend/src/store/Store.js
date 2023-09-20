import Api from "./api"

const Store = {}

Store.GetProduit =(id)=> {
  return new Promise((resolve, reject) => {
    Api.get('produit/'+ id)
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.GetProduits =()=> {
  return new Promise((resolve, reject) => {
    Api.get('produits/')
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.SendProduit =(data)=> {
  return new Promise((resolve, reject) => {
    Api.post('produits/', data)
      .then(e => {
        console.log(e)
        if (e.target.status == 404) resolve('fail')
        else resolve("success")
      })
  })
}

Store.DeleteProduit =(data)=> {
  return new Promise((resolve, reject) => {
    Api.post('produits/', data)
      .then(e => {
        console.log(e)
        if (e.target.status == 404) resolve('fail')
        else resolve("success")
      })
  })
}

Store.UpdateStock = (data)=> {
  return new Promise((resolve, reject) => {
    Api.post('produits/' + data.id, data.data)
      .then(e => {
        console.log(e)
        if (e.target.status == 404) resolve('fail')
        else resolve("success")
      })
  })
}


Store.GetCommande =(id)=> {
  return new Promise((resolve, reject) => {
    Api.get('commande/'+ id)
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.GetCommandes =()=> {
  return new Promise((resolve, reject) => {
    Api.get('commandes/')
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.GetPlat =(id)=> {
  return new Promise((resolve, reject) => {
    Api.get('commande/'+ id)
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.GetPlats =()=> {
  return new Promise((resolve, reject) => {
    Api.get('commandes/')
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.SendPlat =(data)=> {
  return new Promise((resolve, reject) => {
    Api.post('plats/', data)
      .then(e => {
        console.log(e)
        if (e.target.status == 404) resolve('fail')
        else resolve("success")
      })
  })
}

Store.CommandeStatus =(id, data)=> {
  return new Promise((resolve, reject) => {
    Api.post(`commande/${id}/status`, data)
      .then(e => {
        console.log(e)
        if (e.target.status == 404) resolve('fail')
        else resolve("success")
      })
  })
}
export default Store