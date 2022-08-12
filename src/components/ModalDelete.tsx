import { FunctionComponent } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface ModalDeleteProps {
  handleClose: () => void
  show: boolean
  onDelete: () => void
}

const ModalDelete: FunctionComponent<ModalDeleteProps> = ({ handleClose, show, onDelete }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes vous sur de vouloir supprimer ce patient ?</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Retour
          </Button>
          <Button variant='danger' onClick={onDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalDelete
