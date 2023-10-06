import Form from 'react-bootstrap/Form';
import makeid from '../../store/makeid';

const FormNumber =({name, required, label, placeholder, disabled=false})=> {
  return (
    <div  key={makeid()} className="mb-3">
      <label className="form-label">{label}</label>
      <input 
        placeholder={placeholder}  name={name} required={required} disabled={disabled}  
        className="form-control" min={0} data-form-type="other" type='number'
      />
    </div>
  )
}

export default FormNumber;