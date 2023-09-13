import '../styles/Home.scss'
import '../styles/Loader.scss'
import MainFooter from "../components/MainFooter"
import Store from '../store/calls.js'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

if (localStorage.getItem('panier') == null) localStorage.setItem('panier', JSON.stringify([]))

const Categorie=({titre, url, image, data})=> {
  return <NavLink className='btn-categorie' 
    to='Navigateur'
    state={{ from: data }}
    >
      <h2>{titre}</h2>
    </NavLink>
}
const item = (titre,detail,prix,image,stock)=> {
  return{
    titre,detail,prix, 
    image: image ? true: false,
    stock
  }
}

const data_plat ={
  titre: "PLATS",
  liste:[
    item("Menu","repas",8,1, true),
    item('Sandwich','',3,1, false)
  ] 
}
const data_dessert ={
  titre: "DESSERT",
  liste:[
    item("Gâteau","",2.50,1, true),
    item("Glace","",3,1, true),
    item('Salade de fruit','',3,1, true)
  ] 
}
const data_boissons = {
  titre: "BOISSONS",
  liste: [
    item("Canette 33cl","","1.50",0, true),
    item("Canette 50cl ","","2.00",0, true),
    item("Bouteille 50cl ","","2.50",0, true),
    item("Eau 33cl","","1.00",0, true),
    item("Eau 1l","","2.00",0, true)
  ]
}

// let navigation = sessionStorage.getItem('navigations')

// let interrupteur = 0

sessionStorage.setItem("navigations", "null")
const Home=()=> {
  const [nav, upNav] = useState(sessionStorage.getItem('navigations'))

  if(nav == "null"){
    Store.getNavigation()
      .then(x => {
        console.log(x)
        upNav(x)
      }) 
  }
  
  return <div className="App-screen">
    <div className="home_header"></div>
    <div className="main home">
      <h3>Bienvenue chez Tiwax</h3>
      <h2>Catégories</h2>
      {
        nav == "null"
        && <span className='loader'></span>
      }{
        nav != "null" 
        && JSON.parse(nav).map(item =>{
          return <Categorie 
            image=""
            data={item}
            titre={item.titre}
          />
        })
      }
    </div>
    <MainFooter />
  </div>
} 
export default Home
