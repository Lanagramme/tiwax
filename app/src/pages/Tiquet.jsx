import Page from '../components/Page.jsx'
import Header from "../components/Header.jsx"
import Footer from '../components/Footer.jsx'
import Store from '../store/calls.js'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import '../styles/Utils.scss'
import '../styles/Tiquet.scss'

if (localStorage.getItem('panier') == null) localStorage.setItem('panier', JSON.stringify([]))
if (localStorage.getItem('panier') == "null") localStorage.setItem('panier', JSON.stringify([]))


function makeid(length) {
  let result = '';
  let counter = 0;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const Liste_render =({item, trigger})=> {
  function del(id) {
    let pan = JSON.parse(localStorage.getItem('panier'))
    let newPan = pan.filter(x => x.id != id)
    localStorage.setItem('panier', JSON.stringify(newPan))
    trigger(id)
  }
  return <div className="btn-produit grida1a">
      <div className="image"></div>
      <div>
        <div>
          <div className="bold">{item.name}</div>
          <div>
            {
              Object.getOwnPropertyNames(item.options).map(x=>
                <>
                  <span>{x}:</span><br/>
                  { typeof item.options[x] == "string" && <>{item.options[x]}<br/></> }
                  { 
                    item.options[x] instanceof Array && item.options[x].map( x => 
                      <div key={e => makeid(9)}>
                        {typeof x == 'string' && <><span>{x}</span><br/></>}
                        {typeof x == 'object' && <><span>{x.name} ({x.nb})</span><br/></>} 
                      </div>
                    )
                  }
                  <br/>
                </>
              )
            }
          </div>

        </div>
      </div>
      <div>
        <div className="prix text-right">{item.prix} €</div>
        <h3 className='del' onClick={e=>del(item.id)}>Supprimer</h3>
      </div>
    </div>
}
const Test =()=>{
  return <p>test</p>
}

const sendPanier =()=> {
  console.log('commande')
  Store.SendCommande(localStorage.getItem('panier'))
    .then(x => {
      if(x=='success') {
        alert('commande envoyée')
        location.assign("/")
      }
      else alert('Erreur, veuillez reessayer')
    })
}

const Tiquet =()=> {
  let monPanier = JSON.parse(localStorage.getItem('panier'))
  const [specimen, trigger] = useState(0)

  let total = 0;
  monPanier.forEach(x => total += x.prix)
  total = total.toString().split('.')
  total = total[0] + "." + total[1][0] + total[1][1]

  return <>
    <Page>
      <Header title='PANIER' />
      <div className='scroll'>
        <section className='tiquet'>
          <h4>Récapitulatif de commande</h4>
          { monPanier.map( x => <Liste_render item={x} trigger={(trigger)}/> ) }

          
          <div className="grid1a">
            <h1>Sous-total</h1>
            <p className="prix bold">{total}€</p>
          </div>
        </section>
      </div>
      <Footer>
        <button className="btn m-auto" onClick={e => sendPanier()}>Commander</button>
      </Footer>

    </Page>
  </>
}
export default Tiquet
