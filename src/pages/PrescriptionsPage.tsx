import { strict as assert } from 'assert'
import { useCallback, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorContext } from '../context/error'
import { TokenContext } from '../context/token'
import Prescriptions from '../components/Prescriptions'
import { deletePrescription, getPrescriptions } from '../services/api'
import { Prescription } from '../types'

const PrescriptionsPage = (): JSX.Element => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)
  const navigate = useNavigate()

  // allows us to pick up prescriptions
  const fetchPrescriptions = async (token: string): Promise<void> => {
    try {
      const data = await getPrescriptions(token)
      setPrescriptions(data)
    } catch (error) {
      console.error(error)
      addError({ body: 'Error fetching prescription data' })
    }
  }

  const fetchPrescriptionsCallback = useCallback(
    fetchPrescriptions,
    [addError]
  )

  // when the component is loaded, the Prescriptions are picked up
  useEffect(() => {
    if (token === null || token === undefined) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPrescriptionsCallback(token))()
  }, [fetchPrescriptionsCallback, token])

  const onDelete = async (id: number): Promise<void> => {
    assert(token)
    try {
      await deletePrescription(token, id)
    } catch (error) {
      console.error(error)
      addError({ body: 'Error deleting prescription' })
    }
    // updates the prescriptions state
    await fetchPrescriptions(token)
  }

  const onEdit = async (id: number): Promise<void> => {
    navigate(`/prescriptions/${id}`)
  }

  return <Prescriptions prescriptions={prescriptions} onDelete={onDelete} onEdit={onEdit} />
}

export default PrescriptionsPage
