import '../styles/Header.scss'
import Back from './svg/back.jsx'

const goBack = ()=> history.back()
const handleClick=(e)=> {
  e.preventDefault()
  console.log('test')
  history.back()
}

const Header =({title, title2, price})=> <div className="grid1a1 header">
    <button onClick={goBack} >
      <img src={"./static/back.png"} />
    </button>
    <div>
      <h1>{title}</h1>
      {title2 && <h3>{title2}</h3> }
    </div>
    <div className="prix"> {price ? price : ""} </div>
  </div>

export default Header
