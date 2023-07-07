import { FunctionComponent } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useTranslationHook from '../../hook/TranslationHook'

interface ModalDeleteProps {
  handleClose: () => void
  show: boolean
  onDelete: () => void
  confirmText: string
}

const ModalDelete: FunctionComponent<ModalDeleteProps> = ({ handleClose, show, onDelete, confirmText }) => {
  const { t } = useTranslationHook()

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('title.confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmText}</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            {t('navigation.return')}
          </Button>
          <Button variant='danger' onClick={onDelete}>
            {t('navigation.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalDelete
