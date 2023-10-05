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
          console.log('collection', i)
          console.log("res", x)
          if (x.success) {
            console.log(x.message[0])
            if (i == 'store ') console.log(store)
            else DATA['set'+i](x.message)
          }
        })
      }
    }
    first = false
  }
  updt()
  // console.log('store', store)

  const door=() => {
    let status = store.open
    console.log("store", store)

    Store.updateStore(store._id, JSON.stringify({open: !status}))
    .then(x => {
      if (x.success){
        x.message.open = !x.message.open
        console.log(x)
        setstore(x.message)
      }
      console.log(x.message)
    })
  }

  if (Array.isArray(store)) setstore(store[0])

  return <>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Plat du jour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
          {
            Produits.filter(x => x.type == "Plats").map( x => {
              return <Card style={{ width: '10rem' }} className="shadow mx-2">
                <Card.Body>
                  {x.titre}
                </Card.Body>
              </Card>
            })
          }
          </div>
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
            <li>Plat</li>
            <li>Plat</li>
            <li>Plat</li>
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