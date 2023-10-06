import Form from 'react-bootstrap/Form';
import makeid from '../../store/makeid';

const FormTextArea =({name, required, label, placeholder, disabled=false})=> {
  return (
    <Form.Group key={makeid()} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control as="textarea" placeholder={placeholder} name={name} required={required} disabled={disabled} />
    </Form.Group>
  )
}

export default FormTextArea;