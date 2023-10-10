import { useState } from 'react';
import {getOptions} from './helpers';
import makeid from '../../store/makeid';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

const pikaboo = (id, setDisplay)=> {
  /* document.getElementById(id).classList.toggle('hidden') */
  setDisplay(!id)
}
const TagSelect =({collection, placeholder, Liste, setListe, titre})=> {
  const [options, setOptions] = useState(collection)
  const [hidden, setHidden] = useState(true)
  const tagContainerId = makeid(8)
  // console.log(Liste)


  !Array.isArray(options) && getOptions(collection, setOptions)


  const handleClick=(id)=> {
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
    <section className=''  key={makeid()}>
      <Button 
        className='mb-2' 
        variant='dark' 
        key={makeid()}
        onClick={()=>pikaboo(/* tagContainerId */ hidden, setHidden)}
      >{placeholder || "Selectionnez un ou plusieurs tag"}</Button>
      <div  key={makeid()}>
        <section key={makeid()}>
          <div key={makeid()} id={tagContainerId} hidden={hidden}>
          {
            Array.isArray(options) && options.map( x => {
              // console.log(Liste, x._id, Liste.includes(x._id))
              let css = Liste.includes(x._id) ? "success" :"outline-success"
              return <Button
                key={makeid()}
                variant={css}
                onClick={e => handleClick(x._id)}
                className="m-1"
              >{x.name}</Button>
            })
          }
          </div>
          <Card>
            <Card.Body>
              <h5 key={makeid()}>{titre}</h5>
              <ul key={makeid()}>
                { Liste.length ? "" : <li key={makeid()}>...</li> }
                {
                  Array.isArray(options) && Liste.map(x => {
                    return <li key={makeid()}>{options.find(w => w._id == x).name}</li>
                  })
                  || <li key={makeid()}>...</li>
                }
              </ul>
            </Card.Body>
          </Card>
          
        </section>
      </div>
    </section>
  )
}

export default TagSelect;