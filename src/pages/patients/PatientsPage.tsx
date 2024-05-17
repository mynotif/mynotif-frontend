import PatientLine from '../../components/PatientLine'
import usePatients from '../../hook/patient.hook'
import { useCallback, useState } from 'react'
import { Patient } from '../../types'
import SearchBar from '../../components/SearchBar'
import Header from '../../components/Header'

const PatientsPage = (): JSX.Element => {
  const { patients } = usePatients()

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
    <div className='bg-gray-50 h-screen'>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {filteredPatients.map((patient) => (
        <PatientLine key={patient.id} patient={patient} />
      ))}
    </div>
  )
}

export default PatientsPage
