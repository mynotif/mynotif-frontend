import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TokenContext } from '../context/token'
import { getPatientPage } from '../services/patientList'
import { SessionFailure } from '../services/session'
import { PatientSummary } from '../types'

interface ListState {
  owner: string | null | undefined
  search: string
  patients: PatientSummary[]
  count: number | null
  page: number
  nextPage: number | null
  loading: boolean
  error: unknown
}
const emptyState = (owner: ListState['owner'], search: string): ListState => ({
  owner, search, patients: [], count: null, page: 1, nextPage: null, loading: true, error: null
})

const usePatients = ({ pageSize = 20 }: { pageSize?: number } = {}) => {
  const { token } = useContext(TokenContext)
  const [search, setSearch] = useState('')
  const [state, setState] = useState(() => emptyState(token, search))
  const request = useRef({ sequence: 0, controller: null as AbortController | null,
    active: false, owner: token, search })

  const fetchPage = useCallback(async (page: number): Promise<void> => {
    if (!request.current.active || request.current.owner !== token || request.current.search !== search) return
    request.current.controller?.abort()
    const controller = new AbortController()
    const sequence = ++request.current.sequence
    request.current.controller = controller
    setState(previous => ({
      ...(previous.owner === token && previous.search === search ? previous : emptyState(token, search)),
      page, loading: true, error: null
    }))
    try {
      if (!token) throw new SessionFailure('expired')
      const data = await getPatientPage(token, { page, pageSize, search }, controller.signal)
      if (controller.signal.aborted || sequence !== request.current.sequence) return
      setState({ owner: token, search,
        patients: Array.from(new Map(data.results.map(row => [row.id, row])).values()),
        count: data.count, page: data.page, nextPage: data.next_page, loading: false, error: null })
    } catch (error) {
      if (controller.signal.aborted || sequence !== request.current.sequence) return
      setState(previous => ({ ...previous, loading: false, error }))
    }
  }, [token, search, pageSize])

  useEffect(() => {
    const active = request.current
    active.active = true
    active.owner = token
    active.search = search
    void fetchPage(1)
    return () => { active.active = false; active.sequence++; active.controller?.abort() }
  }, [fetchPage, token, search])

  // Cleanup follows rendering, so account ownership is also checked before exposing rows.
  const current = state.owner === token && state.search === search ? state : emptyState(token, search)
  const reloadPatients = useCallback(() => fetchPage(1), [fetchPage])
  const retryPatients = () => fetchPage(current.page)
  const loadNextPatients = () => {
    if (current.nextPage !== null && !current.loading) void fetchPage(current.nextPage)
  }
  const loadPreviousPatients = () => {
    if (current.page > 1 && !current.loading) void fetchPage(current.page - 1)
  }
  return { patients: current.patients, count: current.count, search, setSearch,
    patientsLoading: current.loading, patientsError: current.error, nextPage: current.nextPage,
    previousPage: current.page > 1 ? current.page - 1 : null,
    reloadPatients, retryPatients, loadNextPatients, loadPreviousPatients }
}

export function usePatientCount() {
  const { count, patientsLoading, patientsError, reloadPatients } = usePatients({ pageSize: 1 })
  return { patientCount: count, countLoading: patientsLoading, countError: patientsError, retryCount: reloadPatients }
}

export default usePatients
