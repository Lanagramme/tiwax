import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// ======== Pages
import Home from './pages/Home.jsx'
import Produits from './pages/produits'
import Plats from './pages/plats'
import Commandes from './pages/commandes'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/'          element={<Home  />} />
          <Route exact path='/Plats'     element={<Plats />} />
          <Route exact path='/Produits'  element={<Produits  />} />
          <Route exact path='/Commandes' element={<Commandes />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App