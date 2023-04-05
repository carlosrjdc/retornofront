import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GlobalContext } from "../../../context";

export function ModalConfirmacao(props) {
  const { show, setar } = props;
  const { abrirModal, setAbrirModal } = useContext(GlobalContext);

  const handleClose = () => setAbrirModal(false);
  const handleShow = () => setAbrirModal(true);
  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={abrirModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>CONFIRMAÇÃO</Modal.Title>
        </Modal.Header>
        <Modal.Body>DESEJA REALMENTE REALIZAR ESSA AÇÃO?</Modal.Body>
        <Modal.Footer>
          <div style={{ padding: "2%" }}>
            <Button onClick={props.acao} variant="contained">
              Sim
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
