import Modals from './Modals';
import { useState } from 'react';
import Store from '../store/Store';
import FormInput from './formulaire/FormInput';
import makeid from '../store/makeid';
import FormNumber from './formulaire/FormNumber';
import FormSelect from './formulaire/FormSelect';
import FormCheckbox from './formulaire/FormCheckbox';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import TagSelect from './formulaire/FormTagSelect';
const Input = FormInput
const Select = FormSelect
const Checkbox = FormCheckbox
const Number = FormNumber

const FormulaireCreationProduit =()=> {
  const [Liste, setListe] = useState([])
  
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
        collection={['Plats', 'Boissons', "Déssert"]}
      />
      {/* <section className='border-top pt-3'  key={makeid()}>
        <Button 
          className='mb-2' 
          variant='dark' 
          key={makeid()}
          onClick={pikaboo}
        >Ajouter des ingredients</Button>
        <div  key={makeid()}>
            <TagSelect
              Liste ={Liste}
              setListe={setListe}
              collection="ingredients"
            />
        </div>
        <p  key={makeid()}>Ajouter une option à choix unique</p>
        <div  key={makeid()}>
          
        </div>
        <p  key={makeid()}>Ajouter une option à choix multiple</p>
        <div  key={makeid()}>
          
        </div>
      </section> */}
      <TagSelect
        Liste ={Liste}
        setListe={setListe}
        collection="Ingredients"
      />
      <p  key={makeid()}>Ajouter une option à choix unique</p>
      <div  key={makeid()}>
        
      </div>
      <p  key={makeid()}>Ajouter une option à choix multiple</p>
      <div  key={makeid()}></div>
    </>
  )
}

export default FormulaireCreationProduit;