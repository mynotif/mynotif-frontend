import React, { useCallback, useContext, useState } from 'react'
import { strict as assert } from 'assert'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { createPatient } from '../services/api'
import { Patient, defaultPatient } from '../types'

const PatientCreatePage = (): JSX.Element => {
  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)
  const navigate = useNavigate()

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const [patient, setPatient] = useState<Patient>(defaultPatient)

  const onCreatePatient = async (): Promise<void> => {
    assert(token)
    try {
      const data = await createPatient(token, patient)
      setPatient(data)
    } catch (error) {
      console.error(error)
      addErrorCallback({ body: 'Error creating patient' })
    }
  }

  const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await onCreatePatient()
    navigate('/patients')
  }
  return (
    <div>
      <h1>Création d'un patient</h1>
      <Form onSubmit={onFormSubmit}>
        <Form.Label>Firstname</Form.Label>
        <Form.Control
          placeholder='Firstname'
          className='me-2'
          name='firstname'
          required
          type='text'
          autoComplete='off'
          onChange={(e) =>
            setPatient({ ...patient, firstname: e.target.value })}
          value={patient.firstname}
        />
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          placeholder='Lastname'
          className='me-2'
          name='lastname'
          required
          autoComplete='off'
          onChange={(e) =>
            setPatient({ ...patient, lastname: e.target.value })}
          value={patient.lastname}
        />
        <Form.Label>Address</Form.Label>
        <Form.Control
          placeholder='Address'
          className='me-2'
          name='address'
          required
          autoComplete='off'
          onChange={(e) =>
            setPatient({ ...patient, address: e.target.value })}
          value={patient.address}
        />
        <Form.Label>Zip_code</Form.Label>
        <Form.Control
          placeholder='Zip_code'
          className='me-2'
          name='zip_code'
          required
          autoComplete='off'
          onChange={(e) =>
            setPatient({ ...patient, zip_code: e.target.value })}
          value={patient.zip_code}
        />
        <Form.Label>City</Form.Label>
        <Form.Control
          placeholder='City'
          className='me-2'
          name='city'
          required
          autoComplete='off'
          onChange={(e) =>
            setPatient({ ...patient, city: e.target.value })}
          value={patient.city}
        />
        <Form.Label>Phone</Form.Label>
        <Form.Control
          placeholder='Phone'
          className='me-2'
          name='phone'
          required
          autoComplete='off'
          onChange={(e) =>
            setPatient({ ...patient, phone: e.target.value })}
          value={patient.phone}
        />
        <Button className='btn btn-success m-2' type='submit'>
          Save
        </Button>
        <Button className='btn btn-primary m-2' href='/patients'>
          Return to list
        </Button>
      </Form>
    </div>
  )
}

export default PatientCreatePage
