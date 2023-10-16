import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import makeid from '../../store/makeid';
import {getOptions} from './helpers';

const FormSelect = ({name, required, label, collection, disabled=false}) => {
  const [options, setOptions] = useState(collection)

  !Array.isArray(options) && getOptions(collection, setOptions)

  return (
    <Form.Group key={makeid()} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select name={name} required={required} disabled={disabled}>
        { Array.isArray(options) && options.map(x => {
          const {value, label} = typeof x === "string" ? ({value:x,label:x}) : x
          return <option value={value} key={makeid()}>{ label }</option>
        })}
      </Form.Select>
    </Form.Group>
  )
}

export default FormSelect;