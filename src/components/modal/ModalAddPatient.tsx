import React from 'react'
import { Modal, Form, Button, Col, Alert } from 'react-bootstrap'
import { Patient } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTranslationHook from '../../hook/TranslationHook'

interface ModalAddPatientProps {
  patientState: Patient
  handleChangeNewPatient: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleNewPatientSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
  onHide: () => void
  show: boolean
  error: string
}

const ModalAddPatient: React.FC<ModalAddPatientProps> = ({
  patientState,
  handleChangeNewPatient,
  handleNewPatientSubmit,
  onHide,
  show,
  error
}) => {
  const { t } = useTranslationHook()

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('title.addPatient')}</Modal.Title>
      </Modal.Header>
      {error !== '' && (
        <Alert variant='danger'>
          {error}
        </Alert>
      )}
      <Modal.Body>

        {/* Form to add a new patient */}
        <Form className='mt-4'>
          <Form.Group as={Col} className='mt-2'>
            <Form.Label><FontAwesomeIcon icon={['fas', 'id-card']} /> {t('form.lastName')}</Form.Label>
            <Form.Control
              name='lastname'
              type='text'
              value={patientState.lastname}
              onChange={handleChangeNewPatient}
            />
          </Form.Group>

          <Form.Group as={Col} className='mt-2'>
            <Form.Label><FontAwesomeIcon icon={['fas', 'id-card']} /> {t('form.firstName')}</Form.Label>
            <Form.Control
              name='firstname'
              type='text'
              value={patientState.firstname}
              onChange={handleChangeNewPatient}
            />
          </Form.Group>

          <Form.Group as={Col} className='mt-2'>
            <Form.Label><FontAwesomeIcon icon={['fas', 'address-card']} /> {t('form.emailAddress')}</Form.Label>
            <Form.Control
              name='address'
              type='text'
              value={patientState.address}
              onChange={handleChangeNewPatient}
            />
          </Form.Group>

          <Form.Group as={Col} className='mt-2'>
            <Form.Label><FontAwesomeIcon icon={['fas', 'mobile']} /> {t('form.phone')}</Form.Label>
            <Form.Control
              name='phone'
              type='text'
              value={patientState.phone}
              onChange={handleChangeNewPatient}
            />
          </Form.Group>

          <Form.Group as={Col} className='mt-2'>
            <Form.Label><FontAwesomeIcon icon={['fas', 'city']} /> {t('form.city')}</Form.Label>
            <Form.Control
              name='city'
              type='text'
              value={patientState.city}
              onChange={handleChangeNewPatient}
            />
          </Form.Group>

          <Form.Group as={Col} className='mt-2'>
            <Form.Label><FontAwesomeIcon icon={['fas', 'city']} />  {t('form.zipPostal')}</Form.Label>
            <Form.Control
              name='zip_code'
              type='text'
              value={patientState.zip_code}
              onChange={handleChangeNewPatient}
            />
          </Form.Group>
          <div className='d-flex align-items-center mt-4'>
            <Button variant='success' type='button' onClick={handleNewPatientSubmit}>
              {t('navigation.validate')}
            </Button>
            <Button className='btn btn-primary ms-4' href='/patients'>
              {t('navigation.return')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalAddPatient
