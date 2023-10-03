import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// ======== Pages
import Home from './pages/Home.jsx'
import Navigateur from './pages/Navigateur.jsx'
import Selecteur from './pages/Selecteur.jsx'
import Tiquet from './pages/Tiquet.jsx'
import Commande from './pages/Commande.jsx'
// import Tiquet from './pages/Tiquet.jsx'

function App() {
  // const [count, setCount] = useState(0)
          // <Route exact path='/Tiquet'     element={<Tiquet     />} />
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/'           element={<Home       />} />
          <Route exact path='/Navigateur' element={<Navigateur />} />
          <Route exact path='/Selecteur' element={<Selecteur />} />
          <Route exact path='/Tiquet'  element={<Tiquet  />} />
          <Route exact path='/Commande'  element={<Commande  />} />
        </Routes>
      </Router>
      <div className="container hidden">
       <div className="modal ">
        </div>
      </div>
    </div>
  )
}

export default App
