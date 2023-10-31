import FormNumber from './FormNumber';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import FormSelect from './FormSelect';
import FormTagSelect from './FormTagSelect';
import FormCheckbox from './FormCheckbox';

const fields = {
  Input:FormInput,
  TagSelect:FormTagSelect,
  Select:FormSelect,
  Checkbox:FormCheckbox, 
  Number:FormNumber,
  TextArea: FormTextArea
}

const formatters = {
  key(acc, val){ acc.name = val },
  required(acc, val){ acc.required = !!val },
  collection(acc,val){ acc.collection = Array.isArray(val) ? val : capitalize(val) }
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1) }
function notFound(x){ console.log('Unknow field => ', x) }
function formatData(data){ return Object.entries(data).reduce(format, {disabled: false}) }
function format(acc, [key, val]) { return (formatters[key] || (()=>acc[key]=val))(acc, val), acc }


export default function ({data}) { return (fields[data.type] || notFound)(formatData(data)) };
// export default FormField;