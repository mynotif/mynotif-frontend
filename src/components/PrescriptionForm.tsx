import assert from 'assert'
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState
} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ErrorContext, ErrorType } from '../context/error'
import { TokenContext } from '../context/token'
import {
  createPrescription,
  updatePrescription,
  uploadPrescription
} from '../services/api'
import { Patient, Prescription } from '../types'
import SelectPatient from './SelectPatient'

interface PrescriptionFormRequiredProps {
  prescription: Prescription
  isEditForm: boolean
}
interface PrescriptionFormOptionalProps {
  patients?: Patient[]
}
interface PrescriptionFormProps
  extends PrescriptionFormRequiredProps,
  PrescriptionFormOptionalProps {}

const PrescriptionForm: FunctionComponent<PrescriptionFormProps> = ({
  prescription,
  isEditForm,
  patients
}) => {
  const { token } = useContext(TokenContext)
  const [file, setFile] = useState<File>()
  const { addError } = useContext(ErrorContext)

  const [prescriptionState, setPrescriptionState] =
    useState<Prescription>(prescription)

  const navigate = useNavigate()

  const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    isEditForm ? await handleSave() : await addPrescription()
  }

  const addPrescription = async (): Promise<void> => {
    await onCreatePrescription()
    navigate('/prescriptions')
  }

  const onCreatePrescription = async (): Promise<void> => {
    assert(token)
    try {
      const data = await createPrescription(token, prescriptionState)
      if (file !== null && file !== undefined) {
        await uploadPrescription(token, prescriptionState.id, file)
      }
      setPrescriptionState(data)
    } catch (error) {
      console.error(error)
      addErrorCallback({ body: 'Error creating prescription' })
    }
  }

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    [addError]
  )

  const handleSave = async (): Promise<void> => {
    assert(token)
    try {
      await updatePrescription(token, prescriptionState)
      if (file !== null && file !== undefined) {
        await uploadPrescription(token, prescriptionState.id, file)
      }
      navigate('/prescriptions')
    } catch (error) {
      addErrorCallback({ body: 'Error updating prescription' })
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = event.target

    setPrescriptionState({
      ...prescriptionState,
      [name]: value
    })
    if (files !== null && files !== undefined) {
      setFile(files[0])
    }
  }

  return (
    <Form onSubmit={onFormSubmit}>
      {/* TODO: dropdown patient list */}
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Médecin</Form.Label>
          <Form.Control
            type='text'
            placeholder='Dr.Simon'
            name='prescribing_doctor'
            value={prescriptionState.prescribing_doctor}
            onChange={onInputChange}
          />
        </Form.Group>
        {/* TODO: photo upload refs #77 */}
        <Form.Group as={Col}>
          <Form.Label>Séléctionne ton ordonnance</Form.Label>
          <Form.Control
            type='file'
            name='photo_prescription'
            onChange={onInputChange}
          />
        </Form.Group>
      </Row>
      <Row className='my-3'>
        <Form.Group as={Col}>
          <Form.Label>Caisse de rattachement</Form.Label>
          <Form.Control
            type='text'
            placeholder='N° mutuelle'
            value={prescriptionState.caisse_rattachement}
            name='caisse_rattachement'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Carte Vitale</Form.Label>
          <Form.Control
            type='text'
            placeholder='Carte vitale'
            value={prescriptionState.carte_vitale}
            name='carte_vitale'
            onChange={onInputChange}
          />
        </Form.Group>
      </Row>
      <Row className='my-3'>
        <Form.Group as={Col}>
          <Form.Label>Date de début</Form.Label>
          <Form.Control
            type='text'
            placeholder='2022-03-20'
            value={prescriptionState.start_date}
            name='start_date'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Date de fin</Form.Label>
          <Form.Control
            type='text'
            placeholder='2022-05-20'
            value={prescriptionState.end_date}
            name='end_date'
            onChange={onInputChange}
          />
        </Form.Group>
      </Row>
      <Row className='my-3'>
        <Form.Check
          type='switch'
          id='custom-switch'
          label='Renouveller la prescription'
        />
        {!isEditForm && (
          <Form.Group>
            <Form.Label className='my-3'>
              A quel patient voulez-vous ajouter une ordonnance ?
            </Form.Label>
            <Form.Control as='select' name='patient' onChange={onInputChange}>
              <option>--Selectionne un patient--</option>
              {
                patients?.map((patient) => (
                  <SelectPatient key={patient.id} patient={patient} />
                ))
              }
            </Form.Control>
          </Form.Group>
        )}
      </Row>
      <Button className='mt-2' type='submit' onClick={() => null}>
        Save
      </Button>
    </Form>
  )
}

export default PrescriptionForm
