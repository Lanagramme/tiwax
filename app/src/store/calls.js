import Api from "./api"

const Store = {}

// Obtenir une commande par son id
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

// envoyer une commande
Store.SendCommande =(data)=> {
    console.log('store')
    return new Promise((resolve, reject) => {
        Api.post('commande/', data)
            .then(e => {
                console.log(e)
                if (e.hasOwnProperty('fail')) resolve('fail')
                else resolve("success")
            })
    })
}

// Obtenir la liste des produits d'un type
Store.getProduits =(data)=> {
    return new Promise((resolve, reject) => {
        Api.get('produits/' + data)
            .then(e => {
                resolve(JSON.parse(e.target.response))
            })
    })
}

// Obtenir les informations de navigation
Store.getNavigation =()=> {
    return new Promise((resolve, reject) => {
        // Api.get('navigation/')
        Api.get('categories/')
            .then(e => {
                resolve(JSON.parse(e.target.response))
            })
    })
}

// Obtenire les informations d'un menu
Store.getMenu =(id)=> {
    return new Promise((resolve, reject) => {
        Api.get('menus/' + id)
            .then(e => {
                resolve(e.target.response)
            })
    })
}

export default Store