import Form from 'react-bootstrap/Form';
import makeid from '../../store/makeid';

const FormCheckbox = ({name, label, disabled=false})=> {
    return (
      <Form.Group key={makeid()} className="mb-3">
        <Form.Check type="checkbox" label={label} name={name} disabled={disabled} />
      </Form.Group>
    )
  }

export default FormCheckbox;