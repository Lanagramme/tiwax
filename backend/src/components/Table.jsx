import Table from 'react-bootstrap/Table';
import makeid from '../store/makeid';
import Button from 'react-bootstrap/Button';

function Tableau({names, data, properties, update, remove}) {
  console.log("render")
  
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
              { properties.map(prop => <td key={makeid()}>{item[prop]}</td>) }
              <td>
                <Button variant="primary" className='me-2' onClick={e => update(item.id, item.stock)}>Modifier</Button> 
                <Button variant="danger"  className='me-2' onClick={e => remove(item.id)}>Supprimer</Button>
                { 
                  item['stock'] == "non" 
                  && <Button variant="success" className='me-2'>Disponible</Button>
                  || <Button variant="warning" className='me-2'>Non disponible</Button>
                }
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  );
}

export default Tableau;