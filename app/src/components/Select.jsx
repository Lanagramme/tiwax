import '../styles/Selecteur.scss'
import { NavLink } from 'react-router-dom'

const Select=({image, title, prix, url, detail, data, dispo})=> {
  if (dispo) {
    return <NavLink 
        className='btn-produit grida1a' 
        // to={url}
        to='/Selecteur'
        state={{from: data}}
      >
        <div>{image && <div className="image"></div>}</div>
        <div><div>{title}</div><h3>{detail}</h3></div>
        <div className="prix">{prix}</div>
      </NavLink>
  } else {
    return <div 
        className='btn-produit grida1a' 
      >
        <div>{image && <div className="image"></div>}</div>
        <div><div>{title}</div><h3>{detail}</h3></div>
        <div className="prix">Epuisé</div>
      </div>
  }
}

export default Select
