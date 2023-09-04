import Page from '../components/Page.jsx'
import Header from "../components/Header.jsx"
import Footer from '../components/Footer.jsx'
import '../styles/Utils.scss'
import '../styles/Tiquet.scss'

if (localStorage.getItem('panier') == null) localStorage.setItem('panier', JSON.stringify([]))

const Liste_render =({item})=> {
  return <div className="btn-produit grida1a">
      <div className="image"></div>
        <div>
          <div className="flexi">
            <div className="bold">{item.name}</div>
            <div className="prix">{item.prix}</div>
          </div>
          <p>{
            Object.getOwnPropertyNames(item.options).map(x=>
              <>
               <span>{x}:</span><br/>
               { typeof item.options[x] == "string" && <>{item.options[x]}<br/></> }
               { 
                 item.options[x] instanceof Array && item.options[x].map( x => <>
                    {typeof x == 'string' && <><span>{x}</span><br/></>}
                    {typeof x == 'object' && <><span>{x.name} ({x.nb})</span><br/></>} 
                </>
                 )
               }
              <br/>
              </>
            )
          }</p>
        </div>
    </div>
}

const Test =()=>{
  return <p>test</p>
}

const Tiquet =()=> {
  let monPanier = JSON.parse(localStorage.getItem('panier'))
  return <>
  <Page>
    <Header title='COMMANDE' />
    <div className='scroll'>
      <section className='tiquet'>
        <h4>Récapitulatif de commande</h4>
        {
          monPanier.map(x=>{
            return <Liste_render item={x} />
          })
        }
        
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
</>}
export default Tiquet
