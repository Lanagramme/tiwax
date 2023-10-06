import Form from 'react-bootstrap/Form';
import makeid from '../../store/makeid';

const FormInput =({name, required, label, placeholder, disabled=false})=> {
  return (
    <Form.Group key={makeid()} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control placeholder={placeholder} name={name} required={required} disabled={disabled} />
    </Form.Group>
  )
}

export default FormInput;