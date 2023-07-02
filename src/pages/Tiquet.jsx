import Page from '../components/Page.jsx'
import Header from "../components/Header.jsx"
import Footer from '../components/Footer.jsx'
import '../styles/Utils.scss'
import '../styles/Tiquet.scss'

const Tiquet =()=> <>
  <Page>
    <Header title='COMMANDE' />
    <div className='scroll'>
      <section className='tiquet'>
        <h4>Récapitulatif de commande</h4>
        <div className="btn-produit grida1a">

          <div className="image"></div>
          <div>
            <div className="flexi">
            <div className="bold">Menu Repas</div>
            <div className="prix">11.50€</div>
            </div>
            <p>
              <span>Viande:</span><br/>
              Poisson (2.00€)<br/>
              <span>Accompagnement:</span><br/>
              Riz<br/>
              Haricots rouge<br/>
              <span>sauce:</span><br/>
              Créole<br/>
              <span>Boisson:</span><br/>
              Coca 33cl (1.50€)<br/>
            </p>
          </div>
                  </div>
        <div className='btn-produit grida1a'>
          <div className='image'></div>
          <div>
            <div className="bold">Glace</div> 
            <p>Vanille</p> 
          </div>
          <div className="prix">3.00€</div>
        </div>
        <div className="grid1a">
          <h1>Sous-total</h1>
          <p className="prix bold">14.50€</p>
        </div>
      </section>
    </div>
    <Footer>
      <button className="btn m-auto">Commander</button>
    </Footer>

  </Page>
</>
export default Tiquet
