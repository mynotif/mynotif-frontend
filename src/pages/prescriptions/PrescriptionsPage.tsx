import { useCallback, useState } from 'react'
import usePrescription from '../../hook/prescription.hook'
import SearchBar from '../../components/SearchBar'
import { PrescriptionCard } from '../../components/prescriptions/PrescriptionCard'
import { Prescription } from '../../types'
import useTranslationHook from '../../hook/TranslationHook'
import { formatDate } from '../../utils/helpers'
import { Container } from '../../components/home/Container'
import { Loading } from '../../components/loading/Loading'
import PrescriptionFilter from '../../components/PrescriptionFilter'

const PrescriptionsPage = (): JSX.Element => {
  const [prescriptions] = usePrescription()
  const { t } = useTranslationHook()

  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>(prescriptions)

  // Function to check if the prescription's doctor name matches the search
  const isDoctorMatch = (prescription: Prescription, search: string): boolean => {
    const doctorName = prescription.prescribing_doctor.toLowerCase()
    const searchLowerCase = search.toLowerCase()
    return doctorName.includes(searchLowerCase)
  }

  // Function to check if the prescription's patient name matches the search
  const isPatientMatch = (prescription: Prescription, search: string): boolean => {
    const patientFullName = `${prescription.patient_firstname} ${prescription.patient_lastname}`.toLowerCase()
    const searchLowerCase = search.toLowerCase()
    return patientFullName.includes(searchLowerCase)
  }

  const filterByPrescriptions = useCallback((prescription: Prescription, search: string) => (
    isDoctorMatch(prescription, search) ||
    isPatientMatch(prescription, search)
  ), [])

  /**
   * Manages the search by filtering prescriptions according to the value entered by the user.
   */
  const handleSearch = useCallback((search: string) => {
    const filteredData = prescriptions.filter((prescription) =>
      filterByPrescriptions(prescription, search)
    )
    setFilteredPrescriptions(filteredData)
  }, [prescriptions, filterByPrescriptions])

  if (!prescriptions) {
    return <Loading />
  }

  return (
    <Container>
      <SearchBar onSearch={handleSearch} placeholderText={t('text.searchDoctor')} />
      <PrescriptionFilter
        prescriptions={prescriptions}
        onFilterChanged={setFilteredPrescriptions}
      />
      {filteredPrescriptions.map((prescription) => (
        <PrescriptionCard
          key={prescription.id}
          doctorName={prescription.prescribing_doctor}
          endDate={formatDate(prescription.end_date)}
          patientName={`${prescription.patient_firstname} ${prescription.patient_lastname}`}
          prescription={prescription}
        />
      ))}
      <div className='h-20' /> {/* Added space for the bottom */}
    </Container>
  )
}

export default PrescriptionsPage