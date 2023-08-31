import Page from '../components/Page.jsx'
import Header from '../components/Header.jsx'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import '../styles/Selecteur.scss'
import '../styles/Navigateur.scss'

const Select=({image, title, prix, url, detail, data})=> {
  return <NavLink 
      className='btn-produit grida1a' 
      to='/Selecteur'
      state={{ from : data}}
    >
      <div>{image && <div className="image"></div>}</div>
      <div><div>{title}</div><h3>{detail}</h3></div>
      <div className="prix">{prix}</div>
    </NavLink>
}

const Navigateur =({data})=>{
  let location = useLocation()
  console.log(location.state.from)
  return <>
    <Page>
      <Header title={location.state.from.titre} price=""/>
      <div className='scroll'>
        {
          location.state.from.liste.map(item => 
            <Select 
              key={Date.now()} 
              detail={item.detail} 
              image={item.image} 
              title={item.titre} 
              prix={item.prix+"€"} 
              data={item}
            />
          )
        }
      </div>
    </Page>
  </>
}
export default Navigateur
