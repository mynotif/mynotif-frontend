import PatientLine from '../components/PatientLine'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import usePatients from '../hook/patient.hook'
import useTranslationHook from '../hook/TranslationHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TitlePage from '../components/TitlePage'
import { useCallback, useState } from 'react'
import { Patient } from '../types'
import SearchBar from '../components/SearchBar'

const PatientsPage = (): JSX.Element => {
  const { patients, reloadPatients } = usePatients()
  const { t } = useTranslationHook()

  // Search Bar
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients)

  const filterByPatients = (patient: Patient, searchValue: string): boolean => {
    searchValue = searchValue.toLocaleLowerCase()
    const fullName = `${patient.lastname} ${patient.firstname}`.toLowerCase()
    return (
      fullName.includes(searchValue) ||
      patient.city.toLowerCase().includes(searchValue)
    )
  }

  const handleSearch = useCallback((searchValue: string) => {
    const filteredData = patients.filter((patient) => filterByPatients(patient, searchValue))
    setFilteredPatients(filteredData)
  }, [patients])

  return (
    <>
      <div className='position-fixed bottom-0 end-0 me-3 mb-5 pb-5' style={{ zIndex: '1030' }}>
        <Button variant='info' href='/patients/create'>
          <FontAwesomeIcon icon={['fas', 'user-plus']} />
        </Button>
      </div>
      <TitlePage title={t('title.myPatients')} />
      <SearchBar onSearch={handleSearch} />
      <Container>
        {filteredPatients.map((patient) => (
          <PatientLine key={patient.id} patient={patient} reloadPatients={reloadPatients} />
        ))}
      </Container>
    </>

  )
}

export default PatientsPage
