import { useCallback, useContext, useEffect, useState } from 'react'
import { deletePrescription, getPrescriptions } from '../services/api'
import { Prescription } from '../types'
import { TokenContext } from '../context/token'
import { FlashMessageContext } from '../context/flashmessage'
import assert from 'assert'

const usePrescription = (): [Prescription[], (id: number) => Promise<void>] => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const { token } = useContext(TokenContext)
  const { addErrorMessage } = useContext(FlashMessageContext)

  // allows us to pick up prescriptions
  const fetchPrescriptions = async (token: string): Promise<void> => {
    try {
      const data = await getPrescriptions(token)
      setPrescriptions(data)
    } catch (error) {
      console.error(error)
      addErrorMessage({ body: 'Error fetching prescription data' })
    }
  }

  const deletePrescriptionById = async (id: number): Promise<void> => {
    assert(token)
    try {
      await deletePrescription(token, id)
      // Met à jour la liste des prescriptions
      await fetchPrescriptions(token)
    } catch (error) {
      console.error(error)
      addErrorMessage({ body: 'Error deleting prescription' })
    }
  }

  const fetchPrescriptionsCallback = useCallback(
    fetchPrescriptions,
    [addErrorMessage]
  )

  // when the component is loaded, the Prescriptions are picked up
  useEffect(() => {
    if (token === null || token === undefined) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPrescriptionsCallback(token))()
  }, [fetchPrescriptionsCallback, token])

  return [prescriptions, deletePrescriptionById]
}

export default usePrescription
