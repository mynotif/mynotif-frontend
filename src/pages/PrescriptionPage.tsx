import { strict as assert } from 'assert'
import { useCallback, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorContext, ErrorType } from '../context/error'
import { TokenContext } from '../context/token'
import { getPrescription, updatePrescription, uploadPrescription } from '../services/api'
import { Prescription, defaultPrescription } from '../types'
import PrescriptionForm from '../components/PrescriptionForm'

const PrescriptionPage = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const [prescription, setPrescription] = useState<Prescription>(defaultPrescription)
  const [file, setFile] = useState<File>()
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
      if (file !== null && file !== undefined) {
        await uploadPrescription(token, prescription.id, file)
      }
    } catch (error) {
      addErrorCallback({ body: 'Error updating prescription' })
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = event.target
    setPrescription({
      ...prescription,
      [name]: value
    })
    if (files !== null && files !== undefined) {
      setFile(files[0])
    }
  }

  // when the component is loaded, the Prescription are picked up
  useEffect(() => {
    if (token === null || token === undefined || id === undefined) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPrescriptionCallback(token, parseInt(id, 10)))()
  }, [fetchPrescriptionCallback, id, token])

  return (
    <>
      <h1>Prescription patient {prescription.patient}</h1>
      <PrescriptionForm prescription={prescription} onInputChange={onInputChange} onFormSubmit={onFormSubmit} />
    </>
  )
}

export default PrescriptionPage
