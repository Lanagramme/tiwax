import Modals from './Modals';
import { useState } from 'react';
import Store from '../store/Store';
import FormInput from './formulaire/FormInput';
import FormRadio from './formulaire/FormRadio';
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
const Radio = FormRadio

const Options = (addOption)=> {
  const [Liste, setListe] = useState([])
  const [hidden, setHidden] = useState(true)
  const pikaboo = (id, setDisplay)=> { setDisplay(!id) }

  const add_option = ()=> {

    let ele = document.getElementsByName('type')
    let type = ''
    for (i = 0; i < ele.length; i++) 
      if (ele[i].checked)type = ele[i].value;

    const option = {
      id: makeid(),
      type: type,
      liste: liste
    }

    addOption(option)
  }

  return <section className='contaier mt-3 pt-3 border-top'>
  <Button 
    className='mb-2' 
    variant='dark' 
    key={makeid()}
    onClick={()=>pikaboo(/* tagContainerId */ hidden, setHidden)}
  >Ajouter une ou plusieurs options</Button>
  <div  key={makeid()}  hidden={hidden}>
    <Input
      key={makeid()}
      name='choix'
      required={true}
      label="Décrivez l'option (*)"
      Placeholder=''
    />
    <Radio
      key={makeid()}
      name='type'
      label='Option à choix unique'
    />
    <Radio
      key={makeid()}
      name='type'
      label='Option à choix multiple'
    />
    <TagSelect
      Liste ={Liste}
      setListe={setListe}
      collection="Ingredients"
      placeholder="Selectionnez les options"
      titre='Choisir les options'
    />
  </div>
  <Card>
    <Card.Body>
      <h5 key={makeid()}>Options</h5>
      <ul key={makeid()}>
        { Liste.length ? "" : <li key={makeid()}>...</li> }
        {
          Array.isArray(Liste) && Liste.map(x => {
            return <>
              <li key={makeid()}>
                {options.find(w => w._id == x).name}
              </li>
            </>
          })
          || <li key={makeid()}>...</li>
        }
      </ul>
    </Card.Body>
  </Card>

</section>
}

const FormulaireCreationProduit =()=> {
  const [Liste, setListe] = useState([])
  
  return (
    <>
      <Input
        key={makeid()}
        name='name'
        required={true}
        label="Nom du produit (*)"
        Placeholder=''
      />
      <Input
        key={makeid()}
        name='detail'
        required={false}
        label="Description"
        Placeholder=''
      />
      <Number
        name='prix'
        required={true}
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
      <section className='contaier mt-3 pt-3 border-top'>
        <TagSelect
          Liste ={Liste}
          setListe={setListe}
          collection="Ingredients"
          placeholder="Selectionnez un ou plusieurs ingredients"
          titre="Composition"
        />
      </section>
      <Options/>
    </>
  )
}

export default FormulaireCreationProduit;