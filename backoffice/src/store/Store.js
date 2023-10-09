import socket from "./websocket"
import Api from "./api"

const Store = {}

Store.GetIngredient =(id)=> {
  return new Promise((resolve, reject) => {
    Api.get('ingredients/'+ id)
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.GetCategories =()=> {
  return new Promise((resolve, reject) => {
    Api.get('categories/')
    .then(e => {
      var data = JSON.parse(e.target.responseText)
      if (data.hasOwnProperty('fail')) resolve('fail')
      else resolve(data)
    })
  })
}

Store.GetIngredients =()=> {
  return new Promise((resolve, reject) => {
    Api.get('ingredients/')
    .then(e => {
      var data = JSON.parse(e.target.responseText)
      if (data.hasOwnProperty('fail')) resolve('fail')
      else resolve(data)
    })
  })
}

Store.SendIngredient =(data)=> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/v1/ingredients/", {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => resolve(response.json()))
  })
}

Store.UpdateIngredient =(id, data)=> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/v1/ingredients/"+id, {
      method: "PUT",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => resolve(response.json()))
  })
}

Store.DeleteIngredient =(id)=> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/v1/ingredients/"+id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => resolve(response.json()))
  })
}

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

Store.UpdateProduit =(id, data)=> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/v1/produits/"+id, {
      method: "PUT",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => resolve(response.json()))
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

// Store.GetPlat =(id)=> {
//   return new Promise((resolve, reject) => {
//     Api.get('commande/'+ id)
//       .then(e => {
//         var data = JSON.parse(e.target.responseText)
//         if (data.hasOwnProperty('fail')) resolve('fail')
//         else resolve(data)
//       })
//   })
// }

Store.Getstore =()=> {
  return new Promise((resolve, reject) => {
    Api.get('store/')
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.updateStore =(id, data)=> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/v1/store/"+id, {
      method: "PUT",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) =>{
      resolve(response.json())
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

Store.GetModel =(id)=> {
  return new Promise((resolve, reject) => {
    Api.get('models/'+ id)
      .then(e => {
        var data = JSON.parse(e.target.responseText)
        if (data.hasOwnProperty('fail')) resolve('fail')
        else resolve(data)
      })
  })
}

Store.wsConnect = () => socket.connect()

Store.wsDisconnect = () => socket.disconnect()

export default Store