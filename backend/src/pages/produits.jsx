import TopBar from "../components/TopBar";
import Container from 'react-bootstrap/Container';
import Tableau from "../components/Table";
import Formulaire from "../components/Formulaire";
import Modals from "../components/Modals";
import Api from "../store/api";
import Store from "../store/Store";

const data = [
  {id:"1", nom:"thon", stock: "oui"},
  {id:"2", nom:"steak", stock: "oui"},
  {id:"3", nom:"laitue", stock: "oui"},
  {id:"4", nom:"oeuf", stock: "non"},
  {id:"5", nom:"tomate", stock: "oui"},
]

const data2 = [
  {
    type: "Input",
    detail: {
      name: "name",
      label: "Produit",  
      placeholder:"",
      required: true,
      disabled: false
    }
  }
]

const create =()=> {
  let unfilterdForm = document.getElementsByTagName('form')[0]
  let data = new FormData(unfilterdForm)
  return new Promise((resolve,reject)=>{
    Store.SendProduit(data)
      .then(x => {
        console.log(x)
        resolve(x)
      })
  })
}

const updatestock =(id, stock)=> {
  return new Promise((resolve,reject)=>{
    stock = stock == 'oui' 
    ? false
    : true
    Store.SendProduit({id, stock})
      .then(x => {
        console.log(x)
        resolve(x)
      })
  })
}

const DeleteProduit =(id)=> {
  return new Promise((resolve,reject)=>{
    Store.DeleteProduit({id})
      .then(x => {
        console.log(x)
        resolve(x)
      })
  })
}

const Produits = () => {
  return <>
    <TopBar/>
    <Container>
      <h2>Ingrédients</h2>
      <div className="mt-4 mb-2">
        <Modals
          call="Ajouter un produit"
          title="Ajouter un produit"
          action="Ajouter"
          callback={create}
        >
          <Formulaire data={data2} />
        </Modals>
      </div>
      <Tableau 
        names={["nom", "stock"]}
        data={data}
        properties={["nom", "stock"]}
        update={updatestock}
        remove={DeleteProduit}
      />
    </Container>
  </>
}

export default Produits