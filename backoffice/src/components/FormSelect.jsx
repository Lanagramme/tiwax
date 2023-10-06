import Form from 'react-bootstrap/Form';
import makeid from '../store/makeid';

const FormSelect = ({name, required, label, options, disabled=false})=> {
    return (
      <Form.Group key={makeid()} className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Select name={name} required={required} disabled={disabled}>
          { options?.map(x => <option key={makeid()}>{x}</option>)}
        </Form.Select>
      </Form.Group>
    )
  }

export default FormSelect;