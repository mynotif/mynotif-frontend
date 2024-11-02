import assert from 'assert'
import { useCallback, useContext, useEffect, useState } from 'react'
import { getPatients } from '../services/api'
import { Patient } from '../types'
import axios from 'axios'
import { TokenContext } from '../context/token'

const usePatients = (fields?: string[]): { patients: Patient[], reloadPatients: () => Promise<void> } => {
  const [patients, setPatients] = useState<Patient[]>([])
  const { token } = useContext(TokenContext)

  // allows us to pick up patients
  const fetchPatients = useCallback(async (): Promise<void> => {
    assert(token)
    try {
      const data = await getPatients(token, fields)
      setPatients(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error?.response)
      } else {
        console.error(error)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const reloadPatients = useCallback(async () => {
    await fetchPatients()
  }, [fetchPatients])

  const fetchPatientsCallback = useCallback(fetchPatients, [fetchPatients])

  // when the component is loaded, the patients are picked up
  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => await fetchPatientsCallback())()
  }, [fetchPatientsCallback])

  return { patients, reloadPatients }
}

export default usePatients
