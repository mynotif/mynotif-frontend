import { FunctionComponent, useState } from 'react'
import { Badge, Button, Card, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Prescription } from '../types'
import { useNavigate } from 'react-router-dom'
import ModalDelete from './ModalDelete'
import useTranslationHook from '../hook/TranslationHook'

// Allows to change the colour if true or false
interface PrescriptionTrProps {
  prescription: Prescription
  onDelete: (id: number) => Promise<void>
  onEdit: (id: number) => Promise<void>
}

const PrescriptionTr: FunctionComponent<PrescriptionTrProps> = ({ prescription, onDelete, onEdit }) => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()

  const [show, setShow] = useState(false)
  const handleClose = (): void => setShow(false)
  const handleShow = (): void => setShow(true)
  const [buttonsModalShow, setButtonsModalShow] = useState(false)
  const handleCloseButtonsModal = (): void => setButtonsModalShow(false)
  const handleShowButtonsModal = (): void => setButtonsModalShow(true)

  const handleEdit = async (): Promise<void> => {
    await onEdit(prescription.id)
    handleCloseButtonsModal()
  }

  const goToPatient = (id: number): void => {
    navigate(`/patients/${id}`)
  }

  return (
    <>
      <Card className='shadow mt-4'>
        <Card.Body>
          <div className='row align-items-start'>
            <div className='col'>
              <div className='d-flex align-items-center'>
                <Badge bg='secondary' text='dark' className='me-2'>
                  {t('text.dr')}{prescription.prescribing_doctor}
                </Badge>
                <div className='d-flex ms-auto align-items-center'>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis']}
                    onClick={handleShowButtonsModal}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <hr className='my-2' />
              <div className='d-flex align-items-center mb-3'>
                <small><strong>{t('text.endPrescription')}</strong> <Badge pill bg='info'>{prescription.end_date}</Badge></small>
              </div>
              <div className='d-flex align-items-center'>
                <small><strong>{t('text.prescription')}:</strong></small>
                <small>{prescription.photo_prescription === null ? <Button size='sm' className='ms-2' variant='primary' href={prescription.photo_prescription} disabled><FontAwesomeIcon icon={['fas', 'eye']} /></Button> : <Button size='sm' className='ms-2' variant='primary' href={prescription.photo_prescription} target='_blank'><FontAwesomeIcon icon={['fas', 'eye']} /></Button>}</small>
                <small className='ms-4'><strong>{t('text.patient')}:</strong></small>
                <Button size='sm' className='ms-2' variant='dark' onClick={() => goToPatient(prescription.patient)}><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={buttonsModalShow} onHide={handleCloseButtonsModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('text.actions')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button size='sm' variant='warning' className='me-2' onClick={handleEdit}>
            {t('text.edit')}
          </Button>
          <Button size='sm' variant='danger' onClick={handleShow}>
            {t('text.delete')}
          </Button>
          {show && (
            <ModalDelete handleClose={handleClose} show={show} onDelete={async () => await onDelete(prescription.id)} confirmText={t('text.confirmationPrescription')} />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PrescriptionTr
