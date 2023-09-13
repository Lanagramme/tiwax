import Page from '../components/Page.jsx'
import Header from '../components/Header.jsx'
import Select from '../components/Select.jsx'
import { useLocation } from 'react-router-dom'
import '../styles/Selecteur.scss'
import '../styles/Navigateur.scss'

if (localStorage.getItem('panier') == null) localStorage.setItem('panier', JSON.stringify([]))

const Navigateur =({data})=>{
  let location = useLocation()
  console.log("loc",location.state.from)
  return <>
    <Page>
      <Header title={location.state.from.titre} price=""/>
      <div className='scroll'>
        {
          location.state.from.liste.map(item => 
            console.log(item)
          )
        }
        {
          location.state.from.liste.map(item => 
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
