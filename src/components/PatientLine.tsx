import { Patient } from '../types'
import { strict as assert } from 'assert'
import { TokenContext } from '../context/token'
import { FunctionComponent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card'
import { Button, Modal } from 'react-bootstrap'
import useTranslationHook from '../hook/TranslationHook'
import ModalDelete from './ModalDelete'
import { deletePatient } from '../services/api'
import { ErrorContext } from '../context/error'
interface PatientLineProps {
  patient: Patient
  reloadPatients: () => void
  borderColor?: string
}

const PatientLine: FunctionComponent<PatientLineProps> = ({ patient, reloadPatients }) => {
  const navigate = useNavigate()
  const [buttonsModalShow, setButtonsModalShow] = useState(false)
  const handleCloseButtonsModal = (): void => setButtonsModalShow(false)
  const handleShowButtonsModal = (): void => setButtonsModalShow(true)
  const { t } = useTranslationHook()
  const { token } = useContext(TokenContext)

  const [show, setShow] = useState(false)
  const { addError } = useContext(ErrorContext)
  const handleClose = (): void => setShow(false)
  const handleShow = (): void => setShow(true)

  const goToPatient = (): void => {
    navigate(`/patients/${patient.id}`)
    handleCloseButtonsModal()
  }
  const handleEdit = async (): Promise<void> => {
    navigate(`/patients/edit/${patient.id}`)
    handleCloseButtonsModal()
  }

  const onDelete = async (): Promise<void> => {
    assert(token)
    try {
      await deletePatient(token, patient.id)
      navigate('/patients')
      handleClose()
      handleCloseButtonsModal()
      reloadPatients()
    } catch (error) {
      console.error(error)
      addError({ body: 'Error deleting patient' })
    }
  }

  return (
    <>
      <Card className='shadow mt-4'>
        <Card.Body>
          <div className='row align-items-start'>
            <div className='col'>
              <div className='d-flex align-items-center'>
                <h4 style={{ textTransform: 'capitalize' }}>{patient.lastname} {patient.firstname}</h4>
                <div className='d-flex ms-auto align-items-center'>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis']}
                    onClick={handleShowButtonsModal}
                    style={{ cursor: 'pointer' }}
                    size='lg'
                  />
                </div>
              </div>
              <hr className='my-2' />
              <div className='d-flex align-items-center justify-items-center mb-3'>
                <div className='d-flex flex-column'>
                  <small><strong>{t('form.address')}: </strong>{patient?.address}</small>
                  <small><strong>{t('form.city')}: </strong>{patient?.city}</small>
                </div>
                <Button size='sm' variant='dark' className='ms-auto' onClick={goToPatient}>
                  {t('text.seePatient')}
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={buttonsModalShow} onHide={handleCloseButtonsModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('text.actionsPatients')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button size='sm' variant='warning' className='me-2' onClick={handleEdit}>
            {t('text.editPatient')}
          </Button>
          <Button size='sm' variant='danger' onClick={handleShow}>
            {t('text.deletePatient')}
          </Button>
          {show && (
            <ModalDelete handleClose={handleClose} show={show} onDelete={onDelete} confirmText={t('text.confirmationPatient')} />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PatientLine
