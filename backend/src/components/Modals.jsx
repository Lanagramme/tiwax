import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modals({ children, call , title, action, callback}) {
  const [show, setShow] = useState(false);

  const handleClose = (run) => {
    if (run) { callback() }
    setShow(false)
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {call}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ children }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => handleClose(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={e => handleClose(true)}>
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;