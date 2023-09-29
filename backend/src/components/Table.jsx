import Table from 'react-bootstrap/Table';
import makeid from '../store/makeid';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Store from '../store/Store';

function Tableau({names, data, properties, update, remove}) {

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

  console.log(data)
  
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
          data.map(item => {
            return <tr key={makeid()}>
              <td><input type={"checkbox"} id={item['id']} /></td>
              { properties.map(prop => {return <td key={makeid()}>{item[prop]}</td>}) }
              <td>
                <Button variant="primary" className='me-2'>Modifier</Button> 
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