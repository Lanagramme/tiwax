import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
// ======== Pages
import Home from './pages/Home.jsx'
import Produits from './pages/produits'
import Plats from './pages/plats'
import Commandes from './pages/commandes'
import Store from './store/Store'
import Erreur from './pages/error'

Store.wsConnect()
function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <div className="App">
        <Router>
          <Routes>
            <Route exact path='/'           element={<Home  />} />
            <Route exact path='/Plats'      element={<Plats />} />
            <Route exact path='/Produits'   element={<Produits  />} />
            <Route exact path='/Commandes'  element={<Commandes />} />

            {/* must be the last one */}
            <Route exact path='*'           element={<Erreur />} />
          </Routes>
        </Router>
    </div>


    </ThemeProvider>
  )
}

export default App