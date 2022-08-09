import { strict as assert } from 'assert'
import { FunctionComponent, useState, useContext, useCallback } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Patient } from '../types'
import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { createPatient, deletePatient, deletePrescription, updatePatient } from '../services/api'
import Prescriptions from './Prescriptions'

interface PatientFormProps {
  patient: Patient
  isEditForm: boolean
}

const PatientForm: FunctionComponent<PatientFormProps> = ({ patient, isEditForm }) => {
  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)

  const [patientState, setPatientState] = useState<Patient>(patient)
  const prescriptions = patientState.prescriptions

  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setPatientState({ ...patientState, [name]: value })
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

  const onCreatePatient = async (): Promise<void> => {
    assert(token)
    try {
      const data = await createPatient(token, patientState)
      setPatientState(data)
    } catch (error) {
      console.error(error)
      addErrorCallback({ body: 'Error creating patient' })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    isEditForm ? await editPatient() : await addPatient()
  }

  const addPatient = async (): Promise<void> => {
    await onCreatePatient()
    navigate('/patients')
  }

  const editPatient = async (): Promise<void> => {
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

  const onDeletePrescription = async (id: number): Promise<void> => {
    assert(token)
    try {
      await deletePrescription(token, id)
    } catch (error) {
      console.error(error)
      addError({ body: 'Error deleting prescription' })
    }
    // TODO
    // updates the prescriptions state
    // await fetchPrescriptions(token)
  }

  const onEditPrescription = async (id: number): Promise<void> => {
    navigate(`/prescriptions/${id}`)
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
      {prescriptions.length > 0 && <Prescriptions prescriptions={prescriptions} onDelete={onDeletePrescription} onEdit={onEditPrescription} />}
      <Button variant='success' type='submit'>
        Valider
      </Button>
      <Button onClick={onDelete} className='ms-4' variant='danger'>Supprimer</Button>
      <Button className='btn btn-primary ms-4' href='/patients'>
        Retour
      </Button>
    </Form>
  )
}

export default PatientForm
