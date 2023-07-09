import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../App";

const Dialog = ({ open, onClose, type, value }) => {
  const [data, setData] = useContext(Context);

  const removeItem = () => {
    setData((current) => {
      return current.filter((data, i) => i !== value.item);
    });
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{value.messages.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {value.messages.title}
        {type === "info" ? (
          <textarea rows="10" cols="60" defaultValue={JSON.stringify(data)} />
        ) : null}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {value.messages.buttons.cancel}
        </Button>
        {type === "info" ? null : (
          <Button className="btn btn-danger" onClick={removeItem}>
            {value.messages.buttons.confirm}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
