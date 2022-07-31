import { strict as assert } from 'assert'
import { useCallback, useEffect, useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ErrorContext, ErrorType } from '../context/error'
import { TokenContext } from '../context/token'
import { getPrescription, updatePrescription } from '../services/api'
import { Prescription, defaultPrescription } from '../types'

const PrescriptionPage = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const [prescription, setPrescription] = useState<Prescription>(defaultPrescription)
  const { token } = useContext(TokenContext)

  const { addError } = useContext(ErrorContext)

  // allows us to pick up prescription
  const fetchPrescription = async (token: string, id: number): Promise<void> => {
    try {
      const data = await getPrescription(token, id)
      setPrescription(data)
    } catch (error) {
      console.error(error)
      addError({ body: 'Error fetching prescription data' })
    }
  }

  const fetchPrescriptionCallback = useCallback(
    fetchPrescription,
    [addError]
  )

  const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await handleSave()
  }

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const handleSave = async (): Promise<void> => {
    assert(token)
    try {
      await updatePrescription(token, prescription)
    } catch (error) {
      addErrorCallback({ body: 'Error updating prescription' })
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setPrescription({
      ...prescription,
      [name]: value
    })
  }

  // when the component is loaded, the Prescription are picked up
  useEffect(() => {
    if (token === null || token === undefined || id === undefined) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPrescriptionCallback(token, parseInt(id, 10)))()
  }, [fetchPrescriptionCallback, id, token])

  return (
    <>
      <h1>Prescription</h1>
      <Form onSubmit={onFormSubmit}>
        {/* TODO: dropdown patient list */}
        <Form.Label>Patient</Form.Label>
        <Form.Control
          className='me-2'
          autoComplete='off'
          name='patient'
          value={prescription.patient}
          onChange={onInputChange}
          disabled
        />
        <Form.Label>Carte vitale</Form.Label>
        <Form.Control
          className='me-2'
          autoComplete='off'
          name='carte_vitale'
          value={prescription.carte_vitale}
          onChange={onInputChange}
        />
        <Form.Label>Caisse rattachement</Form.Label>
        <Form.Control
          className='me-2'
          autoComplete='off'
          name='caisse_rattachement'
          value={prescription.caisse_rattachement}
          onChange={onInputChange}
        />
        <Form.Label>Prescribing doctor</Form.Label>
        <Form.Control
          className='me-2'
          autoComplete='off'
          name='prescribing_doctor'
          value={prescription.prescribing_doctor}
          onChange={onInputChange}
        />
        {/* TODO: photo upload refs #77 */}
        <Form.Label>Photo</Form.Label>
        <Form.Control
          className='me-2'
          autoComplete='off'
          name='photo_prescription'
          value={prescription.photo_prescription}
          onChange={onInputChange}
          disabled
        />
        <Form.Label>Start date</Form.Label>
        <Form.Control
          className='me-2'
          autoComplete='off'
          name='start_date'
          value={prescription.start_date}
          onChange={onInputChange}
        />
        <Form.Label>End date</Form.Label>
        <Form.Control
          className='me-2'
          autoComplete='off'
          name='end_date'
          value={prescription.end_date}
          onChange={onInputChange}
        />
        <Button className='mt-2' type='submit' onClick={() => null}>
          Save
        </Button>
      </Form>
    </>
  )
}

export default PrescriptionPage
