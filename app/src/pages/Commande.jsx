import Page from '../components/Page.jsx'
import Header from "../components/Header.jsx"
import MainFooter from '../components/MainFooter.jsx'
import Store from '../store/calls.js'
import { useState } from 'react'

const Commande =()=> {
    let [commande, setCommande] = useState(null)
    commande == null && Store.GetCommande("12345").then(x => x != 'fail' && setCommande(x))
    return <>
        <Page>
            <Header title='Mes Commandes'/>
            {
                commande == null 
                && <p>Aucune commande en cours.</p>
                || typeof commande == "string" 
                    && <span className='loader'></span>
                    || <div className='btn-produit' style={{textAlign:"center"}}>
                            <p>Commande numéro :</p>
                            <h1>{commande.numero}</h1>
                            <p>{commande.statut}</p>
                        </div>
            }
            <MainFooter />
        </Page>
    </>
}

export default Commande