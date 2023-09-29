import { useState } from 'react';
import Store from "../store/Store";
import TopBar from "../components/TopBar";
import Modals from "../components/Modals";
import Tableau from "../components/Table";
import Container from 'react-bootstrap/Container';
import Formulaire from "../components/Formulaire";

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

  const createOne =()=> {
    let unfilterdForm = document.getElementsByTagName('form')[0]
    // if (unfilterdForm.strip() == '') {
    //   alert('Erreur, le champs ne peut pas être vide')
    //   return 
    // }
    let data = new FormData(unfilterdForm)
    var object = {};
    data.forEach(function(value, key){
      object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json)
    Store.SendIngredient(json)
      .then(x => {
        updateTable()
      })
      console.log(Ingredients)
  }

  const DeleteIngredient =(id)=> {
    Store.DeleteIngredient(id)
      .then(x => {
        if (x.success) x.success && updateIngredients(Ingredients.filter(x => x._id != id))
        else alert("Erreur, le contenu n'a pas été supprimé")
      })
  }

  const updateTable = ()=> {
    Store.GetIngredients()
      .then(x => {
        const data = JSON.parse(x).message
        console.log(data)
        updateIngredients(data)
      })
  }

  if (Ingredients == null ){ updateTable() }

  console.log(Ingredients)

  return <>
    <TopBar/>
    <Container>
      <h2>Ingrédients</h2>
      <div className="mt-4 mb-2">
        <Modals
          call="Ajouter un Ingredient"
          title="Ajouter un Ingredient"
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
      />
      }
      
    </Container>
  </>
}

export default Produits