import { useState } from 'react'

import { Modal, Form, Button, Col, Alert, Accordion } from 'react-bootstrap'
import { Patient } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTranslationHook from '../../hook/TranslationHook'
import ReactDatePicker from 'react-datepicker'
import { USER_DATE_FORMAT } from '../../services/constants'

interface ModalAddPatientProps {
  patientState: Patient
  handleChangeNewPatient: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleNewPatientSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
  updatePatientDate: (date: Date, field: string) => void
  onHide: () => void
  show: boolean
  error: string
}

const ModalAddPatient: React.FC<ModalAddPatientProps> = ({
  patientState,
  handleChangeNewPatient,
  handleNewPatientSubmit,
  updatePatientDate,
  onHide,
  show,
  error
}) => {
  const { t } = useTranslationHook()
  const birthdayDateValue: Date | null = patientState.birthday !== null && patientState.birthday !== undefined && patientState.birthday !== '' ? new Date(patientState.birthday) : null
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(birthdayDateValue)

  const onBirthdayChange = (date: Date): void => {
    setBirthdayDate(date)
    updatePatientDate(date, 'birthday')
  }

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

        {/* Form to add a new patientState */}
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
          {/* Accordion for additional details */}
          <Accordion defaultActiveKey=''>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>{t('form.additionalDetails')}</Accordion.Header>
              <Accordion.Body>
                <Form.Group as={Col} className='mt-2'>
                  <Form.Label><FontAwesomeIcon icon={['fas', 'address-card']} /> {t('form.address')}</Form.Label>
                  <Form.Control
                    name='street'
                    type='text'
                    value={patientState.street}
                    onChange={handleChangeNewPatient}
                  />
                </Form.Group>
                <Form.Group as={Col} className='mt-2'>
                  <Form.Label className='me-2'><FontAwesomeIcon icon={['fas', 'calendar-days']} /> {t('form.birthday')}</Form.Label>
                  <ReactDatePicker
                    selected={birthdayDate}
                    onChange={onBirthdayChange}
                    dateFormat={USER_DATE_FORMAT}
                    className='form-control'
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode='select'
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
                <Form.Group as={Col} className='mt-2'>
                  <Form.Label><FontAwesomeIcon icon={['fas', 'id-card']} /> {t('form.caisseDeRattachement')}</Form.Label>
                  <Form.Control
                    type='text'
                    value={patientState.ss_provider_code}
                    name='ss_provider_code'
                    onChange={handleChangeNewPatient}
                  />
                </Form.Group>
                <Form.Group as={Col} className='mt-2'>
                  <Form.Label><FontAwesomeIcon icon={['fas', 'id-card']} /> {t('form.carteVitale')}</Form.Label>
                  <Form.Control
                    type='text'
                    value={patientState.health_card_number}
                    name='health_card_number'
                    onChange={handleChangeNewPatient}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

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
