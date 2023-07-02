import '../styles/Selecteur.scss'
import { NavLink } from 'react-router-dom'

const Select=({image, title, prix, url, detail})=> {
  return <NavLink 
      className='btn-produit grida1a' 
      to={url}
    >
      <div>{image && <div className="image"></div>}</div>
      <div><div>{title}</div><h3>{detail}</h3></div>
      <div className="prix">{prix}</div>
    </NavLink>
}

export default Select
