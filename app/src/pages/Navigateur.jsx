import Page from '../components/Page.jsx'
import Header from '../components/Header.jsx'
import Select from '../components/Select.jsx'
import Store from '../store/calls.js'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/Selecteur.scss'
import '../styles/Navigateur.scss'

if (localStorage.getItem('panier') == null) localStorage.setItem('panier', JSON.stringify([]))

const Navigateur =({data})=>{
  const [nav, upNav] = useState("null")
  let location = useLocation()

  const titre = location.state.titre
  if(nav == "null"){
    Store.getProduits("?t=" + titre + "&s=" + true)
      .then(x => {
        console.log(x)
        if (x.success) upNav(x.message)
        else alert('Erreur Server')
      }) 
  }

  console.log("loc",titre)
  return <>
    <Page>
      <Header title={titre} price=""/>
      <div className='scroll'>
        {
          nav == 'null'
          && <p>LOADING ...</p>
        }
        {
          nav != 'null'
          && nav.map(item => 
             <Select 
              key={Date.now()} 
              detail={item.detail} 
              image={item.image || ""} 
              title={item.titre} 
              prix={item.prix+"€"} 
              data={item}
              dispo={item.stock}
            />
          )
        }
      </div>
    </Page>
  </>
}
export default Navigateur
