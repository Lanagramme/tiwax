import '../styles/Home.scss'
import '../styles/Loader.scss'
import MainFooter from "../components/MainFooter"
import Store from '../store/calls.js'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

if (localStorage.getItem('panier') == null) localStorage.setItem('panier', JSON.stringify([]))

const Categorie=({titre, url, image})=> {
  return <NavLink className='btn-categorie' 
    to='Navigateur'
    state={{ titre: titre }}
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

// const data_plat ={
//   titre: "PLATS",
//   liste:[
//     item("Menu","repas",8,1, true),
//     item('Sandwich','',3,1, false)
//   ] 
// }
// const data_dessert ={
//   titre: "DESSERT",
//   liste:[
//     item("Gâteau","",2.50,1, true),
//     item("Glace","",3,1, true),
//     item('Salade de fruit','',3,1, true)
//   ] 
// }
// const data_boissons = {
//   titre: "BOISSONS",
//   liste: [
//     item("Canette 33cl","","1.50",0, true),
//     item("Canette 50cl ","","2.00",0, true),
//     item("Bouteille 50cl ","","2.50",0, true),
//     item("Eau 33cl","","1.00",0, true),
//     item("Eau 1l","","2.00",0, true)
//   ]
// }


const Home=()=> {
  const [nav, upNav] = useState("null")
  // Le composant sera chargé sans données, 
  // puis mis à jour à la réponse du server
  if(nav == "null"){
    Store.getNavigation()
      .then(x => {
        console.log(x)
        if (x.success) {
          upNav(x.message)
        }
        else
          alert('Erreur Server')
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
        && nav.map(item =>{
          return <Categorie 
            image=""
            titre={item.name}
          />
        })
      }
    </div>
    <MainFooter />
  </div>
} 
export default Home
