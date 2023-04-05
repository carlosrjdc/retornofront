import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GlobalContext } from "../../../context";

export function ModalConfirmacaoDelete(props) {
  const { show, setar } = props;
  const { abrirModaldelete, setAbrirModalDelete } = useContext(GlobalContext);

  const handleClose = () => setAbrirModalDelete(false);
  const handleShow = () => setAbrirModalDelete(true);
  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={abrirModaldelete}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>CONFIRMAÇÃO</Modal.Title>
        </Modal.Header>
        <Modal.Body>DESEJA REALMENTE EXLUIR ESSE REGISTRO?</Modal.Body>
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
