import Container from 'react-bootstrap/Container';



const Erreur = () => {
  return <>
    <Container>
      <div className="center fullH">
        <div>
          <p className="bigText">Erreur</p>
          <p>Une erreur s'est produite, veuillez nous en excuser</p>
          {
            localStorage.getItem('lastError') != null && 
            <p>localStorage.getItem('lastError')</p>
          }
          <a href="">Retour à l'accueil</a>
        </div>

      </div>
      

    </Container>
  </>
}

export default Erreur