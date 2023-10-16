import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import makeid from '../store/makeid';

function CommandCard({commande}) {

  console.log(commande)

  return (
    <Card key={makeid()} style={{ width: '18rem' }} className='m-2 border-0 shadow'>
      <Card.Body>
        <Card.Title>Commande n°: {commande.numero}</Card.Title>
        <Card.Text>
          { commande.status == 1 && <h6 className="text-primary">Commande en attente</h6> }
          { commande.status == 2 && <h6 className="text-warning">Commande prête</h6> }
          { commande.status == 3 && <h6 className="text-success">Commande payée</h6> }
          {
            commande.data.map(item =>{
              return <div>
                <div className="mb-2 text-decoration-underline card-subtitle h6">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                <div>
                  {
                    Object.getOwnPropertyNames(item.options).map(x=>
                      <>
                        <span className="text-muted">{x.charAt(0).toUpperCase() + x.slice(1)}:</span><br/>
                        { typeof item.options[x] == "string" && <>{item.options[x]}<br/></> }
                        { 
                          item.options[x] instanceof Array && item.options[x].map( x => 
                            <div key={e => makeid(9)}>
                              {typeof x == 'string' && <><span>{x}</span><br/></>}
                              {typeof x == 'object' && <><span>{x.name} ({x.nb})</span><br/></>} 
                            </div>
                          )
                        }
                        <br/>
                      </>
                    )
                  }
                </div>
              </div>
            })
          }
        </Card.Text>
        { commande.status == 1 && <Button variant="primary ">Commande prête</Button> }
        { commande.status == 2 && <Button variant="success ">Commande payée</Button> }
      </Card.Body>
    </Card>
  );
}

export default CommandCard;