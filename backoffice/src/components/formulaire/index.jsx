import Form from 'react-bootstrap/Form';
import FormNumber from './FormNumber';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import FormSelect from './FormSelect';
import FormTagSelect from './FormTagSelect';
import FormCheckbox from './FormCheckbox';
import makeid from '../../store/makeid';

const formatMethods = {
  key(acc, val){ acc.name = val },
  required(acc, val){ acc.required = !!val },
  collection(acc,val){ acc.collection = Array.isArray(val) ? val : capitalize(val) }
}
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1) }
function notFound(x){ console.log('Unknow field => ', x) }
function formatter(acc, [key, val]) {
  (formatMethods[key] || (()=>acc[key]=val))(acc, val)
  return acc
}
function formatData(data){
  return Object.entries(data).reduce(formatter, {disabled: false})
}
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

        return (field||notFound)(formatData(x))
      } ) }
    </Form>
  );
}

export default Formulaire;