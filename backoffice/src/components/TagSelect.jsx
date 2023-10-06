import { useState } from 'react';
import Store from '../store/Store';
import makeid from '../store/makeid';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

const TagSelect =({Liste, setListe})=> {
  console.log(Liste)
  const [ingredients, setIngredients] = useState(null)

  if(ingredients == null) {
    Store.GetIngredients()
    .then(x => {
      if (x.success) setIngredients(x.message)
      else {
        console.log(x.message)
        setIngredients(['erreur base de donnée'])
      }
    })
  }


  const handleClick=(id)=> {
    console.log(id)
    console.log(Liste)
    let aa = Liste
    if (!aa.includes(id)) {
      aa.push(id)
      setListe([...aa])
    }
    else {
      setListe([...aa.filter(x => x != id)])
    }
  }


  return (
    <section key={makeid()}>
      <div key={makeid()} className='hidden' id='ingredients'>
      {
        ingredients != null && ingredients.map( x => {
          console.log(Liste, x._id, Liste.includes(x._id))
          let css = Liste.includes(x._id) ? "success" :"outline-success"
          return <Button 
            variant={css}
            onClick={e => handleClick(x._id)}
            className="m-1"
          >{x.name}</Button>
        })
      }
      </div>
      <Card>
        <Card.Body>
          <h5 key={makeid()}>Composition</h5>
          <ul key={makeid()}>
            { Liste.length ? "" : <li key={makeid()}>...</li> }
            {
              ingredients != null 
              && Liste.map(x => {
                return <li key={makeid()}>{ingredients.find(w => w._id == x).name}</li>
              })
              || <li key={makeid()}>...</li>
            }
          </ul>
        </Card.Body>
      </Card>
      
    </section>
  )
}

export default TagSelect;