import '../styles/Home.scss'
import Footer from "../components/Footer.jsx"
import { NavLink } from 'react-router-dom'

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

const data_dessert ={
  titre: "DESSERT",
  liste:[
  item("Gâteau","",2.50,1, true),
  item("Glace","",3,1, true),
  item('Salade de fruit','',3,1, true)
] }

const data_plat ={
  titre: "PLATS",
  liste:[
  item("Menu","repas",8,1, true),
  item('Sandwich','',3,1, false)
] }

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

const Home=()=> <div className="App-screen">
    <div className="home_header">
    </div>
    <div className="main home">
      <h3>Bienvenue chez Tiwax</h3>
      <h2>Catégories</h2>
      {
        let navigation = sessionStorage.getItem('navigations')
        if (navigation == null){
          <p>Chargement ...</p>
        } else {
          let data = JSON.parse(navigation)
          for (item of data) {
            <Categorie 
              image=""
              data={data.liste}
              titre={data.title}
            />
          }
        }
      }
      <Categorie 
        image=""
        data={data_plat}
        titre="Plats"
      />
      <Categorie 
        image=""
        data={data_boissons}
        titre="Boissons"
      />
      <Categorie 
        image=""
        data={data_dessert}
        titre="Dessert"
      />
    </div>
    <Footer>
      <button className="svg">
        <img src={"./static/home.png"} />
      </button>
      <NavLink to='Tiquet' className="svg">
        <img src={"./static/cart.png"} />
      </NavLink>
      <button className="svg">
        <img src={"./static/calendar.png"} />
      </button>
    </Footer >
  </div>

export default Home
