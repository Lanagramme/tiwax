import Form from 'react-bootstrap/Form';
import makeid from '../../store/makeid';
import FormField from "./FormField";


function Formulaire({data:fieldsData, submit}) {
  console.log('render => Formulaire')
  return (
    <Form  key={makeid()}>
      { fieldsData.map(x => (<FormField data={x} />)) }
    </Form>
  );
}

export default Formulaire;