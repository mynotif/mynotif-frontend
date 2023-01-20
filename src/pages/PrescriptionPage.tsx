import { useCallback, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorContext } from '../context/error'
import { TokenContext } from '../context/token'
import { getPrescription } from '../services/api'
import { Prescription } from '../types'
import PrescriptionForm from '../components/PrescriptionForm'

const PrescriptionPage = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const [prescription, setPrescription] = useState<Prescription | null>(null)
  const { token } = useContext(TokenContext)

  const { addError } = useContext(ErrorContext)

  // allows us to pick up prescription
  const fetchPrescription = async (
    token: string,
    id: number
  ): Promise<void> => {
    try {
      const data = await getPrescription(token, id)
      setPrescription(data)
    } catch (error) {
      console.error(error)
      addError({ body: 'Error fetching prescription data' })
    }
  }

  const fetchPrescriptionCallback = useCallback(fetchPrescription, [addError])

  // when the component is loaded, the Prescription are picked up
  useEffect(() => {
    if (token === null || token === undefined || id === undefined) return
    // eslint-disable-next-line no-void
    void (async () =>
      await fetchPrescriptionCallback(token, parseInt(id, 10)))()
  }, [fetchPrescriptionCallback, id, token])

  return (
    <>
      {prescription !== null ? (
        <>
          <h1>Prescription patient {prescription.patient}</h1>
          <PrescriptionForm prescription={prescription} isEditForm />
        </>
      ) : (
        <h4 className='center'>Aucune ordonnance à afficher !</h4>
      )}
    </>
  )
}

export default PrescriptionPage
