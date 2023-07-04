import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Badge, Button, Card, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Patient, Prescription } from '../types'
import { useNavigate } from 'react-router-dom'
import ModalDelete from './ModalDelete'
import useTranslationHook from '../hook/TranslationHook'
import { getPatient } from '../services/api'
import { strict as assert } from 'assert'
import { TokenContext } from '../context/token'

// Allows to change the colour if true or false
interface PrescriptionTrProps {
  prescription: Prescription
  onDelete: (id: number) => Promise<void>
  onEdit: (id: number) => Promise<void>
}

const PrescriptionTr: FunctionComponent<PrescriptionTrProps> = ({ prescription, onDelete, onEdit }) => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const prescriptionEndDate = prescription?.end_date ?? 'N/A'
  const prescriptionIsValid = prescription?.is_valid ?? false
  const isValidIconClass = prescriptionIsValid ? 'success' : 'danger'
  const [show, setShow] = useState(false)
  const handleClose = (): void => setShow(false)
  const handleShow = (): void => setShow(true)
  const [buttonsModalShow, setButtonsModalShow] = useState(false)
  const handleCloseButtonsModal = (): void => setButtonsModalShow(false)
  const handleShowButtonsModal = (): void => setButtonsModalShow(true)
  const [patient, setPatient] = useState<Patient | null>(null)
  const { token } = useContext(TokenContext)

  const handleEdit = async (): Promise<void> => {
    await onEdit(prescription.id)
    handleCloseButtonsModal()
  }

  const goToPatient = (id: number): void => {
    navigate(`/patients/${id}`)
  }

  useEffect(() => {
    // eslint-disable-next-line
    const fetchPatient = async () => {
      assert(token)
      try {
        const patientData = await getPatient(token, prescription.patient)
        setPatient(patientData)
      } catch (error) {
        console.error(error)
      }
    }

    // eslint-disable-next-line
    void (fetchPatient())
  }, [token, prescription.patient])

  return (
    <>
      <Card className='shadow mt-4'>
        <Card.Body>
          <div className='row align-items-start'>
            <div className='col'>
              <div className='d-flex align-items-center mb-3'>
                {t('text.dr')}{prescription.prescribing_doctor}
                <div className='d-flex ms-auto align-items-center'>
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis']}
                    onClick={handleShowButtonsModal}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className='d-flex align-items-start '>
                <small>
                  <strong className='me-5'>
                    {t('text.endPrescription')}
                  </strong>
                </small>
                <Badge className='ms-4' pill bg={isValidIconClass}>
                  {prescriptionEndDate}
                </Badge>
              </div>
              <div className='d-flex align-items-center'>
                <small><strong>{t('text.prescription')}:</strong></small>
                <small>
                  <Button size='sm' className='ms-2' variant='primary' href={prescription.photo_prescription} disabled={prescription.photo_prescription === null} target='_blank'>
                    <FontAwesomeIcon size='sm' icon={['fas', 'eye']} />
                  </Button>
                </small>
                <small className='ms-4'>
                  <strong>
                    {t('text.patient')}:
                  </strong> {patient?.lastname}
                </small>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={buttonsModalShow} onHide={handleCloseButtonsModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('text.actionsPrescriptions')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button size='sm' className='me-2' variant='dark' onClick={() => goToPatient(prescription.patient)}>
            {t('text.seePrescription')}
          </Button>
          <Button size='sm' variant='warning' className='ms-2' onClick={handleEdit}>
            {t('text.editPrescription')}
          </Button>
          <Button size='sm' variant='danger' className='ms-3' onClick={handleShow}>
            {t('text.deletePrescription')}
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
