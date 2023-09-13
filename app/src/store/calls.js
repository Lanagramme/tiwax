import Api from "./api"

const Store = {}

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

Store.getNavigation =()=> {
    return new Promise((resolve, reject) => {
        Api.get('navigation/')
            .then(e => {
                resolve(e.target.response)
            })
    })
}

Store.getMenu =(id)=> {
    return new Promise((resolve, reject) => {
        Api.get('menu/' + id)
            .then(e => {
                resolve(e.target.response)
            })
    })
}

export default Store