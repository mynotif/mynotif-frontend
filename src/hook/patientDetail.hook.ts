import { useCallback, useContext, useEffect, useState } from 'react'
import { TokenContext } from '../context/token'
import { getPatient } from '../services/api'
import { patientId, patientReadFailure, PatientReadStatus } from '../services/patientDetail'
import { PatientDetail } from '../types'

interface PatientRead {
  status: PatientReadStatus
  patient: PatientDetail | null
}
interface PatientIdentity {
  token: string | null | undefined
  id: number | null
  attempt: number
}
interface PatientRequest extends PatientRead {
  identity: PatientIdentity
}
export function usePatientDetail(routeId: string | undefined): PatientRead & { retry: () => void } {
  const { token } = useContext(TokenContext)
  const id = patientId(routeId)
  const [attempt, setAttempt] = useState(0)
  const [identity, setIdentity] = useState<PatientIdentity>({ token, id, attempt })
  if (identity.token !== token || identity.id !== id || identity.attempt !== attempt) {
    setIdentity({ token, id, attempt })
  }
  const [result, setResult] = useState<PatientRequest | null>(null)
  const retry = useCallback(() => setAttempt(value => value + 1), [])

  useEffect(() => {
    const { token, id } = identity
    if (!token || id === null) return
    const controller = new AbortController()
    let active = true
    getPatient(token, id, controller.signal).then(patient => {
      if (active) setResult({ identity, status: 'ready', patient })
    }, error => {
      if (active) setResult({ identity, status: patientReadFailure(error), patient: null })
    })
    return () => { active = false; controller.abort() }
  }, [identity])

  // Derive visibility during render: cleanup alone would expose the previous dossier for a frame.
  const current = result?.identity === identity && identity.token === token &&
    identity.id === id && identity.attempt === attempt
  const read: PatientRead = id === null ? { status: 'invalid', patient: null }
    : current && result ? result : { status: 'loading', patient: null }
  return { ...read, retry }
}
