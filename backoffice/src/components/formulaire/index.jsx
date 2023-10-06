import Form from 'react-bootstrap/Form';
import FormNumber from './FormNumber';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import FormSelect from './FormSelect';
import FormTagSelect from './FormTagSelect';
import FormCheckbox from './FormCheckbox';
import makeid from '../../store/makeid';

function notFound(x){ console.log('Unknow field => ', x) }
function Formulaire({data, submit}) {

  const fields = {
    Input:FormInput,
    TagSelect:FormTagSelect,
    Select:FormSelect,
    Checkbox:FormCheckbox, 
    Number:FormNumber,
    TextArea: FormTextArea
  }
  
  return (
    <Form  key={makeid()}>
      { data.map(x => {
        console.log(x.type)
        const field = fields[x.type]
        return (field||notFound)(x)
      } ) }
    </Form>
  );
}

export default Formulaire;