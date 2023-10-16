import TopBar from "../components/TopBar";
import Container from 'react-bootstrap/Container';
import Tableau from "../components/Table";
import Formulaire from "../components/formulaire";
import Modals from "../components/Modals";
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
    Store.SendPlat(data)
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
    Store.SendProduit({id})
      .then(x => {
        console.log(x)
        resolve(x)
      })
  })
}

const Plats = () => {
  return <>
    <TopBar/>
    <Container>
      <h2>Plats</h2>
      <div className="mt-4 mb-2">
        <Modals
          call="Ajouter un plat"
          title="Ajouter un plat"
          action="Ajouter"
          callback={create}
        >
          <Formulaire data={data2} />
        </Modals>
      </div>
    </Container>
  </>
}

export default Plats