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

  const TabControl = (key) => {
    // debugger
    if (DATA[key] == null) {
      console.log(Store['get'+key])
      Store['Get'+key]()
        .then(x => {
          const data = x.message
          console.log('produit', data)
          DATA['update'+key](data)
      })
    }
    setKey(key)
  }

  const createOne =()=> {
    let unfilterdForm = document.getElementsByTagName('form')[0]
    let data = new FormData(unfilterdForm)
    var object = {};
    data.forEach(function(value, key){
      object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json)
    const Key = key.slice(0, -1);
    console.log("send"+Key)
    Store["Send"+Key](json)
      .then(x => {
        updateTable()
      })
  }

  const DeleteIngredient =(id)=> {
    Store.DeleteIngredient(id)
      .then(x => {
        if (x.success) x.success && updateIngredients(Ingredients.filter(x => x._id != id))
        else alert("Erreur, le contenu n'a pas été supprimé")
      })
  }

  const UpdateIngredient =(x)=> {
    console.log(x)
  }

  const updateTable = ()=> {
    Store["Get"+key]()
      .then(x => {
        const data = x.message
        DATA['update'+key](data)
      })
  }

  if (Ingredients == null ){ updateTable() }

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
        <Tab eventKey="Ingredients" title="Ingredients">
          <>
            <h2>Ingrédients</h2>
            <div className="mt-4 mb-2">
              <Modals
                call="Ajouter un ingrédient"
                title="Ajouter un ingrédient"
                action="Ajouter"
                callback={createOne}
              >
                <Formulaire data={data2} />
              </Modals>
            </div>
            {
              Ingredients == null 
              && <p>LOADING ...</p>
              || <Tableau 
              names={["nom"]}
              data={Ingredients}
              properties={["name"]}
              remove={DeleteIngredient}
              tab = {"ingrédient"}
              collection = {"ingredients"}
              update={UpdateIngredient}
            />
            }
          </>
        </Tab>
        <Tab eventKey="Categories"  title="Categories">
        <>
          <h2>Catégories</h2>
          <div className="mt-4 mb-2">
            <Modals
              call="Ajouter une catégorie"
              title="Ajouter une catégorie"
              action="Ajouter"
              callback={createOne}
            >
              <Formulaire data={data2} />
            </Modals>
          </div>
          {
            Categories == null 
            && <p>LOADING ...</p>
            || <Tableau 
            names={["nom"]}
            data={Categories}
            properties={["name"]}
            remove={DeleteIngredient}
            tab = {"catégorie"}
            collection = {"categories"}
            update={UpdateIngredient}
          />
          }
        </>
        </Tab>
        <Tab eventKey="Produits"    title="Produits">
        <>
          <h2>Produits</h2>
          <div className="mt-4 mb-2">
            <Modals
              call="Ajouter un produit"
              title="Ajouter un produit"
              action="Ajouter"
              callback={createOne}
            >
              <FormulaireCreationProduit />
            </Modals>
          </div>
          {
            Produits == null 
            && <p>LOADING ...</p>
            || <Tableau 
            names={["nom", "Détail", "Prix", 'Catégorie']}
            data={Produits}
            properties={["titre", "detail", "prix", 'type']}
            remove={DeleteIngredient}
            tab = {"produit"}
            collection = {"produits"}
            update={UpdateIngredient}
          />
          }
        </>
        </Tab>
      </Tabs>
      
    </Container>
  </>
}

export default Produits