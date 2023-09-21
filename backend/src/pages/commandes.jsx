import TopBar from "../components/TopBar";
import Container from 'react-bootstrap/Container';
import Store from "../store/Store";
import CommandCard from "../components/Card";

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

const datas = {
  data : [
    {
      id: "test",
      numero: 16,
      status: 1,
      data: [
        {
          id:"bvkq9MKRds",
          name:"Dish A",
          prix: 10.99,
          options: {
            boisson:"7up"
          }
        },
        {
          id:"ou1HjOI6hD",
          name:"Menu",
          prix: 8,
          options: {
            viande:"Boeuf",
            accompagnements: [
              "Pâtes",
              "Gratin de pomme de terre"
            ],
            sauces:[]
          }
        }
      ]
    }
  ]
}


console.log('data', datas.data.filter(x => x.status == 1).length)
console.log('data', datas.data.filter(x => x.status == 2).length)
console.log('data', datas.data.filter(x => x.status == 3).length)
const Commandes = () => {
  return <>
    <TopBar/>
    <Container>
      <h2>Commandes</h2>
      <h3>Commandes en attente</h3>
      <Container className="d-flex container flex-wrap my-3">
        { 
          datas.data.filter(x => x.status == 1).length == 0
            && <p className="text-muted">Aucune commande prêtes</p>
            || datas.data.filter(x => x.status == 1).map(y => <CommandCard commande={y}/>)
        }
        <hr />
      </Container>
      <h3>Commandes prêtes</h3>
      <Container className="d-flex container flex-wrap my-3">
        { 
          datas.data.filter(x => x.status == 2).length == 0
            && <p className="text-muted">Aucune commande prêtes</p>
            || datas.data.filter(x => x.status == 2).map(y => <CommandCard commande={y}/>)
        }
        <hr />
      </Container>
      <h3>Commandes payée</h3>
      <Container className="d-flex container flex-wrap my-3">
        { 
          datas.data.filter(x => x.status == 3).length == 0
            && <p className="text-muted">Aucune commande prêtes</p>
            || datas.data.filter(x => x.status == 3).map(y => <CommandCard commande={y}/>)
        }
        <hr />
      </Container>
    </Container>
  </>
}

export default Commandes