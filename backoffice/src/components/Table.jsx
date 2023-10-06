import Table from 'react-bootstrap/Table';
import Modals from "./Modals";
import Formulaire from "./Formulaire";
import makeid from '../store/makeid';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Store from '../store/Store';
const types = {
  Boolean: "Checkbox",
  String: "Input",
  Number: "Number"
}
function Tableau({names, data, properties, update, remove, tab, collection}) {
  const data2 = [
    {
      type: "Input",
      detail: {
        name: "name",
        label: "Name",  
        placeholder:"",
        required: true,
        disabled: false
      }
    },
    {
      type: "Select",
      detail: {
        name: "type",
        label: "Type",  
        placeholder:"",
        required: true,
        disabled: false
      }
    },
    {
      type: "Checkbox",
      detail: {
        name: "good",
        label: "Good",  
        placeholder:"",
        required: true,
        disabled: false
      }
    }
  ]

  const Upd_btn =({item})=> {
    const [Stock, updStock] = useState(item.stock)
    
    const updatestock =(id, stock)=> {
      Store.UpdateIngredient(id, JSON.stringify({"stock": !stock}))
        .then(x => {
          if (x.success) updStock(!Stock)
          else alert("erreur, le produit n'a pas été mis à jour")
        })
    }

    return  <Button 
      variant={Stock ? "success" : "warning"} 
      className='me-2' 
      onClick={e => updatestock(item._id, Stock)}>
        {Stock ? "Disponible" : "Non disponible"}
      </Button>
  }

  // console.log(...arguments)
  Store.GetModel(collection).then(res => {
    data2.length = 0
    // console.log(data2)
    Object.entries(res.message).forEach(([key,val]) => {
      const getType=(val)=> {
        let type = ''
        if (typeof(val)== "string") type = types[val]
        else {
          if (Array.isArray(val)) type = 'Select'
          else type = types[val.type]
        }
        console.log(type)
        return type
      }
      data2.push({
        type: getType(val),
        // type: types[val.type] || "Input",
        detail: {
          name: key,
          label: val.label || key,  
          placeholder:"",
          required: !!val.required,
          disabled: false
        }
      })
    })
    // console.log(data2)
  })
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          { names.map(header => <th key={makeid()}>{header}</th>) }
        </tr>
      </thead>
      <tbody>
        {
          (Array.isArray(data) ? data : []).map(item => {
            return <tr key={makeid()}>
              <td><input type={"checkbox"} id={item['id']} /></td>
              { properties.map(prop => {return <td key={makeid()}>{item[prop]}</td>}) }
              <td>
                <span className='me-2' >
                  <Modals
                    call="Modifier"
                    title={`Modifer un ${tab}`}
                    action="Modifier"
                    callback={update}
                  >
                    <Formulaire data={data2} />
                  </Modals>
                  
                </span>
                {/* <Button variant="primary" className='me-2' onClick={e => update(item)}>Modifier</Button>  */}
                <Button variant="danger"  className='me-2' onClick={e => remove(item._id)}>Supprimer</Button>
                <Upd_btn item={item} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  );
}

export default Tableau;