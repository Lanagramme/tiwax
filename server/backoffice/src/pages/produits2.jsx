import { useState } from 'react';
import Store from "../store/Store";
import TopBar from "../components/TopBar";
import Modals from "../components/Modals";
import Tableau from "../components/Table";
import Container from 'react-bootstrap/Container';
import Formulaire from "../components/formulaire";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormulaireCreationProduit from '../components/FormulaireProduit';

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

const Produits = () => {
  
  function request(action, data){ return  Store[action + key.slice(0, -1)](data) }
  function updateTable() { Store["Get"+key]().then(x => update(key, x.message)) }

  function update(key,val, data){
    let newVal;
    switch (true) {
      case !DATA[key]: newVal = val; break
      case typeof data === 'string': newVal = val.filter(x => x._id != data); break
      case typeof data === 'object': newVal = (val.push(data), val); break
    }
    return DATA['update'+key](newVal)
  }
  
  function TabControl(key) {
    // debugger
    if (DATA[key] == null) {
      request('Get',key).then(x => {
        const data = x.message
        console.log(key,' => ', data)
        // DATA['update'+key](data)
        update(key, data)
      })
    }
    setKey(key)
  }

  function createOne() {
    let unfilterdForm = document.querySelector('form input').value
    // let data = new FormData(unfilterdForm)
    const object = {name: unfilterdForm};
    // data.forEach(function(value, key){
    //   object[key] = value;
    // });
    const json = JSON.stringify(object);
    // console.log('form data for post', data)
    const Key = key.slice(0, -1);
    console.log("send"+Key)
    Store["Send"+Key](json).then(x => { console.log('x => ',x),updateTable() })
  }

  function updateOne(id) {
    let unfilterdForm = document.querySelector('form input').value
    // let data = new FormData(unfilterdForm)
    const object = {name: unfilterdForm};
    // data.forEach(function(value, key){
    //   object[key] = value;
    // });
    const json = JSON.stringify(object);
    console.log('form data for post', data)
    const Key = key.slice(0, -1);
    console.log("send"+Key)
    Store["Send"+Key](json).then(x => { updateTable() })
  }

  function deleteOne(id) {
    request("Delete", id).then(x => {
      if (x.success) update(key, Produits, id)
      else alert("Erreur, le contenu n'a pas été supprimé")
    })
  }

  const [Ingredients, updateIngredients] = useState(null)
  const [Produits, updateProduits] = useState(null)
  const [Categories, updateCategories] = useState(null)
  const [key, setKey] = useState('Ingredients');

  

  const DATA = {
    Categories: Categories,
    updateCategories: updateCategories,
    Ingredients: Ingredients,
    updateIngredients: updateIngredients,
    Produits: Produits,
    updateProduits: updateProduits
  }

  if (DATA[key] == null ){ updateTable() }
  
  const tabs = [
    {
      key: "Ingredients",
      label: "Ingrédient",
      names: ["nom"],
      properties: ["name"],
    },
    {
      key: "Produits",
      label: "Produit",
      names: ["nom", "Détail", "Prix", 'Catégorie'],
      properties: ["titre", "detail", "prix", 'type'],
    },
    {
      key: "Categories",
      label: "Catégorie",
      names: ["nom"],
      properties: ["name"],
    },
  ]

  return <>
    <TopBar/>
    <Container>
      <h1>Gestion des stocks</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => TabControl(k)}
        className="mb-3 mt-3"
      >
        {
          tabs.map(({label, key, names,properties}) => {
            const name = label.toLowerCase()
            return <Tab eventKey={key} title={label}>
              <>
                <h2>{label}</h2>
                <div className="mt-4 mb-2">
                  <Modals
                    call={`Ajouter un ${name}`}
                    title={`Ajouter un ${name}`}
                    action="Ajouter"
                    callback={createOne}
                  >
                    <Formulaire data={data2} />
                  </Modals>
                </div>
                {
                  DATA[key] == null 
                  ? <p>LOADING ...</p>
                  : <Tableau 
                    names={names}
                    data={DATA[key]}
                    properties={properties}
                    remove={deleteOne}
                    tab = {name}
                    collection = {key.toLowerCase()}
                    update={updateOne}
                  />
                }
              </>
            </Tab>

          })
        }
      </Tabs>
      
    </Container>
  </>
}

export default Produits