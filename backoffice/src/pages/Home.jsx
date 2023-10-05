import TopBar from "../components/TopBar"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Store from "../store/Store";
import Modal from 'react-bootstrap/Modal';

import "../App.scss"
let first = true

const Home =()=> {
  const [Ingredients, setIngredients] = useState(null)
  const [Commandes, setCommandes] = useState(null)
  const [Produits, setProduits] = useState(null)
  const [store, setstore] = useState(false)
  const [Jour, setJour] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const DATA = {
    Commandes: Commandes,
    setCommandes: setCommandes,
    Ingredients: Ingredients,
    setIngredients: setIngredients,
    Produits: Produits,
    setProduits: setProduits,
    store: store,
    setstore: setstore
  }

  function updt() {
    for (let i of ['Commandes', "Ingredients", 'Produits', "store"]){
      if (first){
        Store['Get'+i]()
        .then(x => {
          if (x.success) {
            if (i == 'store ') console.log(store)
            else DATA['set'+i](x.message)
          }
        })
      }
    }
    first = false
  }
  updt()

  const door=() => {
    Store.updateStore(store._id, JSON.stringify({open: !store.open}))
    .then(x => {
      if (x.success){
        x.message.open = !x.message.open
        setstore(x.message)
      }
    })
  }

  const updateProduit = () => {
    Store.GetProduits()
    .then(x => {
      setProduits(x.message)
    })
  }

  const jour=(id)=> {
    let produit = Produits.find(x => x._id == id)
    Store.UpdateProduit(id, JSON.stringify({'jour': !produit.jour}))
    .then(x => {
      updateProduit()
    })
  }

  if (Array.isArray(store)) setstore(store[0])

  return <>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Plat du jour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Plats disponibles</h5>
          <div className="d-flex">
          {
            Produits != null && Produits.filter(x => x.type == "Plats").map( x => {
              return <Button 
                variant={x.jour ? "primary" :"outline-primary"}
                onClick={e => jour(x._id)}
                className="m-1"
              >{x.titre}</Button>
            })
          }
          </div>
          <h5>Plats du jour</h5>
          <ul>
            {
              Produits != null  && Produits.filter(x => x.jour ).length ? "" : <li>...</li>
            }
            {
              Produits != null 
              && Produits.filter(x => x.jour ).map(x => {
                return <li>{x.titre}</li>
              })
              || <li>...</li>
            }
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    <TopBar/>
    <Container fluid className={"my-2 border"}>
      <Container className="p-1">
        <div className="d-flex justify-content-between">
          <div> 
            <h3 className={"m-0 "}>
              Le magasin est
              {
                store 
                && (
                  store.open 
                    ? <Badge bg="success" className="mx-3">Ouvert</Badge> 
                    : <Badge bg="danger" className="mx-3">Fermé</Badge>
                )
                || " ..."
              }
            </h3>
          </div>
          <div>
            <Button 
              variant="outline-dark"
              onClick={door}
            >
              {
                store 
                && (
                  store.open 
                    ? "Fermer"
                    : "Ouvrir"
                )
                || " ..."
              }
            </Button>
          </div>
        </div>
        <Row>
          {
            store 
            && (
              store.open 
                ? <span className="text-muted text-center">Les commandes peuvent arriver</span>
                : <span className="text-muted text-center">Aucune commande ne sera acceptée</span>
            )
            || " ..."
          }
        </Row>
      </Container>
      
    </Container>
    <Container>
      <Card
          bg={"Primary".toLowerCase()}
          key={"Primary"}
          text={'white'}
          className="mb-2 shadow-sm h200"
        >
        <Card.Body>
          <h1>Plat du jour</h1>
          <ul>
            {
              Produits != null && Produits.filter(x => x.jour ).length ? "" : <li>...</li>
            }
            {
              Produits != null 
              && Produits.filter(x => x.jour ).map(x => {
                return <li>{x.titre}</li>
              })
              || <li>...</li>
            }
          </ul>
          <div className="d-flex justify-content-end">
            <Button variant="outline-light" onClick={handleShow}>Choisir le plat du jour</Button>
          </div>
        </Card.Body>
        
      </Card>
    </Container>
   
    <Container className="my-3">
      <Row>
        <Col>
          <Card className="shadow-sm h100" >
            <Card.Body>
              <h4>Commandes</h4>
              <span>En attente: XX</span>
              <br/>
              <span>Prêtes: XX</span>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm h100">
            <Card.Body>
              <h4>Carte</h4>
              <span>Produits en vente: {Produits && Produits.length.toString() || "..."}</span>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm h100">
            <Card.Body>
              <>Ajouter un plat</>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Container>
    <Container>
      <Card className="shadow-sm">
        <Card.Header>
          <h5>Stock</h5>
        </Card.Header>
        <Card.Body>
          <Row className="border-bottom">
            <Col><p>ingredients</p></Col>
            <Col>En stock: {Ingredients && Ingredients.filter(x => x.stock).length.toString() || "..."} </Col>
            <Col>Hors stock: {Ingredients && Ingredients.filter(x => !x.stock).length.toString() || "..."}</Col>
            <Col>Total: {Ingredients && Ingredients.length.toString() || "..."}</Col>
          </Row>
          <Row className="border-bottom">
            <Col><p>plats</p></Col>
            <Col>En stock: {Produits && Produits.filter(x => x.type == 'Plats' && x.stock).length.toString() || "..." } </Col>
            <Col>Hors stock: {Produits && Produits.filter(x => x.type == 'Plats' && !x.stock).length.toString() || "..."} </Col>
            <Col>Total: {Produits && Produits.filter(x => x.type == 'Plats').length.toString() || "..."} </Col>
          </Row>
          <Row className="border-bottom">
            <Col><p>boissons</p></Col>
            <Col>En stock:  {Produits && Produits.filter(x => x.type == 'Boissons' && x.stock).length.toString() || "..."} </Col>
            <Col>Hors stock:  {Produits && Produits.filter(x => x.type == 'Boissons' && !x.stock).length.toString() || "..."} </Col>
            <Col>Total: {Produits && Produits.filter(x => x.type == 'Boissons').length.toString() || "..."}</Col>
          </Row>
          <Row className="border-bottom">
            <Col><p>desserts</p></Col>
            <Col>En stock:  {Produits && Produits.filter(x => x.type == 'Desserts' && x.stock).length.toString() || "..."} </Col>
            <Col>Hors stock:  {Produits && Produits.filter(x => x.type == 'Desserts' && !x.stock).length.toString() || "..."} </Col>
            <Col>Total: {Produits && Produits.filter(x => x.type == 'Desserts').length.toString() || "..."}</Col>
          </Row>
        </Card.Body>
      </Card>

    </Container>
  </>
}
export default Home