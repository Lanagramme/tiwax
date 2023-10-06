import Modals from './Modals';
import { useState } from 'react';
import Store from '../store/Store';
import FormInput from './FormInput';
import makeid from '../store/makeid';
import FormNumber from './FormNumber';
import FormSelect from './FormSelect';
import FormCheckbox from './FormCheckbox';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
const Input = FormInput
const Select = FormSelect
const Checkbox = FormCheckbox
const Number = FormNumber

const Ingredients =({Liste, setListe})=> {
  console.log(Liste)
  const [ingredients, setIngredients] = useState(null)

  if(ingredients == null) {
    Store.GetIngredients()
    .then(x => {
      if (x.success) setIngredients(x.message)
      else {
        console.log(x.message)
        setIngredients(['erreur base de donnée'])
      }
    })
  }


  const handleClick=(id)=> {
    console.log(id)
    console.log(Liste)
    let aa = Liste
    if (!aa.includes(id)) {
      aa.push(id)
      setListe([...aa])
    }
    else {
      setListe([...aa.filter(x => x != id)])
    }
  }


  return (
    <section key={makeid()}>
      <div key={makeid()} className='hidden' id='ingredients'>
      {
        ingredients != null && ingredients.map( x => {
          console.log(Liste, x._id, Liste.includes(x._id))
          let css = Liste.includes(x._id) ? "success" :"outline-success"
          return <Button 
            variant={css}
            onClick={e => handleClick(x._id)}
            className="m-1"
          >{x.name}</Button>
        })
      }
      </div>
      <Card>
        <Card.Body>
          <h5 key={makeid()}>Composition</h5>
          <ul key={makeid()}>
            { Liste.length ? "" : <li key={makeid()}>...</li> }
            {
              ingredients != null 
              && Liste.map(x => {
                return <li key={makeid()}>{ingredients.find(w => w._id == x).name}</li>
              })
              || <li key={makeid()}>...</li>
            }
          </ul>
        </Card.Body>
      </Card>
      
    </section>
  )
}

const FormulaireCreationProduit =()=> {
  const [Liste, setListe] = useState([])
  const pikaboo = ()=> {
    document.getElementById('ingredients').classList.toggle('hidden')
  }
  return (
    <>
      <Input
        key={makeid()}
        name='name'
        required='true'
        label="Nom du produit (*)"
        Placeholder=''
      />
      <Input
        key={makeid()}
        name='detail'
        required='false'
        label="Description"
        Placeholder=''
      />
      <Number
        name='prix'
        required='true'
        label="Prix (*)"
        Placeholder=''
      />
      <Checkbox
        name='onSale'
        label='Ajouter à la carte'
      />
      <Select
        name='type'
        label='Catégorie'
        options={['Plats', 'Boissons', "Déssert"]}
      />
      <section className='border-top pt-3'  key={makeid()}>
        <Button 
          className='mb-2' 
          variant='dark' 
          key={makeid()}
          onClick={pikaboo}
        >Ajouter des ingredients</Button>
        <div  key={makeid()}>
            <Ingredients
              Liste ={Liste}
              setListe={setListe}
            />
        </div>
        <p  key={makeid()}>Ajouter une option à choix unique</p>
        <div  key={makeid()}>
          
        </div>
        <p  key={makeid()}>Ajouter une option à choix multiple</p>
        <div  key={makeid()}>
          
        </div>
      </section>
    </>
  )
}

export default FormulaireCreationProduit;