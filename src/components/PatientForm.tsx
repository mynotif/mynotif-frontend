import React, { FunctionComponent, useState, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Patient } from '../types'
import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'

import { strict as assert } from 'assert'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { deletePatient, updatePatient } from '../services/api'

interface PatientFormProps {
  patient: Patient
}

const PatientForm: FunctionComponent<PatientFormProps> = ({ patient }) => {
  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)

  const [patientState, setPatientState] = useState<Patient>(patient)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name
    const fieldValue: string = e.target.value
    const newField = { [fieldName]: fieldValue }
    setPatientState({ ...patientState, ...newField })
  }

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const onUpdate = async (): Promise<void> => {
    assert(token)
    try {
      await updatePatient(token, patientState)
    } catch (error) {
      addErrorCallback({ body: 'Error updating patient' })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    await onUpdate()
    navigate(`/patients/${patient.id}`)
  }

  const onDelete = async (): Promise<void> => {
    assert(token)
    try {
      await deletePatient(token, patientState.id)
      navigate('/patients')
    } catch (error) {
      console.error(error)
      addError({ body: 'Error deleting patient' })
    }
  }

  return (
    <Form onSubmit={async e => await handleSubmit(e)}>
      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            name='lastname'
            type='text'
            placeholder='Enter lastname'
            value={patientState.lastname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            name='firstname'
            type='text'
            placeholder='Enter firstname'
            value={patientState.firstname}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>Adresse</Form.Label>
          <Form.Control
            name='address'
            placeholder='1234 Main St'
            value={patientState.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Téléphone</Form.Label>
          <Form.Control
            name='phone'
            placeholder='(123) 456-7890'
            value={patientState.phone}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>Ville</Form.Label>
          <Form.Control
            name='city'
            value={patientState.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Code postale</Form.Label>
          <Form.Control
            name='zip_code'
            value={patientState.zip_code}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Button variant='primary' type='submit'>
        Valider
      </Button>
      <Button onClick={onDelete} className='ms-4' variant='danger'>Supprimer</Button>{' '}
    </Form>
  )
}

export default PatientForm
