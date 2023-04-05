import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GlobalContext } from "../context";
import ListaNotaFiscal from "../pages/ListaDevolucoes/ListaNotaFiscal";

export function ModalPopUp(props) {
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
          <Modal.Title>Cadastrar Produtos </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListaNotaFiscal />
        </Modal.Body>
      </Modal>
    </div>
  );
}
