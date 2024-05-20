import PatientLine from '../../components/patients/PatientsPage/PatientLine'
import usePatients from '../../hook/patient.hook'
import { useCallback, useState } from 'react'
import { Patient } from '../../types'
import SearchBar from '../../components/SearchBar'
import Header from '../../components/Header'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ContainerBodyPage } from '../../components/pageSections/ContainerBodyPage'
import { AddButton } from '../../components/module/AddButton'
import { ContainerPage } from '../../components/pageSections/ContainerPage'

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
    <ContainerPage>
      <Header />
      <ContainerBodyPage>
        <SearchBar onSearch={handleSearch} />
        {filteredPatients.map((patient) => (
          <PatientLine key={patient.id} patient={patient} />
        ))}
        <div className='h-20' /> {/* Added space for the bottom */}
      </ContainerBodyPage>
      <AddButton icon={faUserPlus} url='/patients/create' />
    </ContainerPage>
  )
}

export default PatientsPage
