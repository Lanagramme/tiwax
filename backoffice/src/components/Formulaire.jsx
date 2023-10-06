import Form from 'react-bootstrap/Form';
import FormNumber from './FormNumber';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormCheckbox from './FormCheckbox';
import makeid from '../store/makeid';

function Formulaire({data, submit}) {

  const fields = {
    Input:FormInput,
     Select:FormSelect, 
     Checkbox:FormCheckbox, 
     Number:FormNumber
  }
  
  return (
    <Form  key={makeid()}>
      { data.map(x => {
        console.log(x.type)
        return fields[x.type](x.detail)
      } ) }
    </Form>
  );
}

export default Formulaire;