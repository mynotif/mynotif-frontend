import PatientLine from '../../components/patients/PatientsPage/PatientLine'
import usePatients from '../../hook/patient.hook'
import { useCallback, useMemo, useState } from 'react'
import { Patient } from '../../types'
import SearchBar from '../../components/SearchBar'
import { Container } from '../../components/home/Container'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/forms/inputGroups/Button'
import { usePatientManagement } from '../../hook/patientManagement'

const PatientsPage = (): JSX.Element => {
  const { patients } = usePatients(['id', 'firstname', 'lastname'])
  const navigate = useNavigate()
  const { patientCount, isSubscriptionActive, remainingFreePatients } = usePatientManagement();

  // Search Bar
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients)

  const filterByPatients = (patient: Patient, searchValue: string): boolean => {
    searchValue = searchValue.toLocaleLowerCase()
    const fullName = `${patient.lastname} ${patient.firstname}`.toLowerCase()
    return fullName.includes(searchValue)
  }

  const handleSearch = useCallback((searchValue: string) => {
    const filteredData = patients.filter((patient) => filterByPatients(patient, searchValue))
    setFilteredPatients(filteredData)
  }, [patients])

  const groupedPatients = useMemo(() => {
    return filteredPatients
      .sort((a, b) => a.lastname.localeCompare(b.lastname))
      .reduce((acc, patient) => {
        const firstLetter = patient.lastname[0].toUpperCase()
        if (!acc[firstLetter]) {
          acc[firstLetter] = []
        }
        acc[firstLetter].push(patient)
        return acc
      }, {} as Record<string, Patient[]>)
  }, [filteredPatients])

  return (
    <Container>
      {!isSubscriptionActive && (
        <>
        <p>Nombre total de patients : {patientCount}</p>
        <p className='pb-4 text-sm text-gray-600'>Patients restants dans le plan gratuit : {remainingFreePatients}</p>
        </>
      )}
      <SearchBar className='flex-grow' onSearch={handleSearch} />
      <div className="flex justify-start items-center space-x-2 mb-4">
        <Button
          type='button'
          variant='icon'
          size='small'
          icon={['fas', 'plus']}
          onClick={() => navigate('/patients/create')}
        />
        <span className="text-sm pt-4 text-gray-700 hover:text-colorprimary transition-colors cursor-pointer" onClick={() => navigate('/patients/create')}>
          {t('title.addPatient')}
        </span>
      </div>
      <div className="space-y-4">
        {Object.entries(groupedPatients).map(([letter, patientGroup]) => (
          <div key={letter}>
            <div className='top-16 bg-colorsecondary/50 backdrop-blur-sm z-10 py-2 px-4 text-gray-700 font-semibold'>
              {letter}
            </div>
            {patientGroup.map((patient) => (
              <PatientLine key={patient.id} patient={patient} />
            ))}
          </div>
        ))}
      </div>
    </Container>
  )
}

export default PatientsPage
