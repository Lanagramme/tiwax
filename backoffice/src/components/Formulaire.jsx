import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';

function Formulaire({data, submit}) {
  // useEffect(() => {
  //   data.map(x => {
  //     document.querySelector(`[name="${x.name}"]`).value = x.value
  //   })
  // });
  
  const Input =({name, required, label, placeholder, disabled=false})=> {
    return (
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control placeholder={placeholder} name={name} required={required} disabled={disabled} />
      </Form.Group>
    )
  }
  const Select = ({name, required, label, options, disabled=false})=> {
    return (
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Select name={name} required={required} disabled={disabled}>
          { options?.map(x => <option>{x}</option>)}
        </Form.Select>
      </Form.Group>
    )
  }
  const Checkbox = ({name, required, label, disabled=false})=> {
    return (
      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label={label} name={name} required={required} disabled={disabled} />
      </Form.Group>
    )
  }

  const fields = {
    Input, Select, Checkbox
  }
  return (
    <Form>
      { data.map(x => fields[x.type](x.detail) ) }
    </Form>
  );
}

export default Formulaire;