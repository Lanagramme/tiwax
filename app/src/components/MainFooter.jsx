import { NavLink } from 'react-router-dom'
import Footer from './Footer'

const MainFooter =()=> {
    return <Footer>
    <NavLink className="svg" to='/' >
      <img src={"./static/home.svg"} />
    </NavLink>
    <NavLink className="svg" to='/Tiquet' >
      <img src={"./static/cart.svg"} />
    </NavLink>
    <NavLink  className="svg" to='/Commande' >
      <img src={"./static/bag.svg"} />
    </NavLink>
    </Footer >
}

export default MainFooter