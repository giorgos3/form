import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from './context';


const Dialog = (props) => {

	const {visible, messages ,item} = props.data;

	const [data, setData] = useContext(Context);
	

	const [show, setShow] = useState(visible);

	const handleClose = () => setShow(false);

	const removeItem = () => {

		setData(data => data.filter(function(i) {
			return i !== item
		}))

    setShow(false);

	}

return (
	<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{messages.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
		{messages.title}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
		  {messages.buttons.cancel}
          </Button>
          <Button variant="primary" onClick={removeItem}>{messages.buttons.confirm}</Button>
        </Modal.Footer>
      </Modal>
  
  );
}

export default Dialog;
