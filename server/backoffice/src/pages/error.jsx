import Container from 'react-bootstrap/Container';
const 
  genererMsg = (status) => Number(status) == 404
    ? 'Page not found'
    :'Une erreur s\'est produite, veuillez nous en excuser',

  MsgErreur = ({ status, title, message }) => {
    return <>
      <p className="bigText">{title || `Erreur ${status}`}</p>
      <p>{message || genererMsg(status)}</p>
    </>
  },

  Erreur = () => {
    const appError = JSON.parse(localStorage.getItem('lastError')||'{}');
    return <>
      <Container>
        <div className="center fullH">
          <div>
            <MsgErreur
              status={appError.status||404}
              message={appError.message}
              title={appError.title}
            />
            <a href="/">Retour à l'accueil</a>
          </div>

        </div>
        

      </Container>
    </>
  }

export default Erreur