import PatientLine from '../../components/patients/PatientsPage/PatientLine'
import usePatients from '../../hook/patient.hook'
import SearchBar from '../../components/SearchBar'
import { Container } from '../../components/home/Container'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/forms/inputGroups/Button'
import { usePatientManagement } from '../../hook/patientManagement'
import { patientListErrorMessage, patientReadStatus } from '../../services/patientList'

const PatientsPage = (): JSX.Element => {
  const list = usePatients()
  const quota = usePatientManagement()
  const navigate = useNavigate()
  const error = list.patientsError || quota.countError
  const retry = () => {
    if (list.patientsError) void list.retryPatients()
    if (quota.countError) void quota.retryCount()
  }

  return (
    <Container>
      {!quota.isSubscriptionActive && quota.patientCount !== null && <>
        <p>Nombre total de patients : {quota.patientCount}</p>
        <p className='pb-4 text-sm text-gray-600'>Patients restants dans le plan gratuit : {quota.remainingFreePatients}</p>
      </>}
      <SearchBar className='flex-grow' onSearch={list.setSearch} />
      <Button type='button' disabled={!quota.canAddPatient} icon={['fas', 'plus']}
        onClick={() => navigate('/patients/create')}>
        {t('title.addPatient')}
      </Button>
      {quota.countLoading && <p role='status'>Vérification du nombre de patients…</p>}
      {Boolean(error) && <div role='alert'>
        <p>{patientListErrorMessage(error)}</p>
        {patientReadStatus(list.patientsError) === 404
          ? <button type='button' onClick={() => { void list.reloadPatients() }}>Recommencer à la première page</button>
          : <button type='button' onClick={retry}>Réessayer</button>}
      </div>}
      <div className='space-y-4'>
        {list.patients.map(patient => <PatientLine key={patient.id} patient={patient} />)}
      </div>
      {list.patientsLoading && <p role='status'>Chargement des patients…</p>}
      {!list.patientsLoading && !list.patientsError && list.count === 0 &&
        <p role='status'>{list.search ? 'Aucun résultat pour cette recherche.' : 'Aucun patient.'}</p>}
      {list.previousPage !== null && !list.patientsError &&
        <button type='button' className='mr-4 my-4 text-colorprimary' disabled={list.patientsLoading}
          onClick={list.loadPreviousPatients}>Patients précédents</button>}
      {list.nextPage !== null && !list.patientsError &&
        <button type='button' className='my-4 text-colorprimary' disabled={list.patientsLoading}
          onClick={list.loadNextPatients}>Patients suivants</button>}
    </Container>
  )
}

export default PatientsPage
