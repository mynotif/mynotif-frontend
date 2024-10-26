import usePrescription from '../../hook/prescription.hook'
import { useCallback, useContext, useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { PrescriptionCard } from '../../components/prescriptions/PrescriptionCard'
import { getPatient } from '../../services/api'
import assert from 'assert'
import { Patient, Prescription } from '../../types'
import useTranslationHook from '../../hook/TranslationHook'
import { TokenContext } from '../../context/token'
import { formatDate } from '../../utils/helpers'
import { Container } from '../../components/home/Container'
import { Loading } from '../../components/loading/Loading'
import PrescriptionFilter from '../../components/PrescriptionFilter'

const PrescriptionsPage = (): JSX.Element => {
  const [prescriptions] = usePrescription()

  const { t } = useTranslationHook()
  const { token } = useContext(TokenContext)

  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>(prescriptions)
  const [searchPatient, setSearchPatient] = useState<string>('')

  // Using Record to get a key-value array
  const [patients, setPatients] = useState<Record<number, Patient>>({})

  // Function to check if the prescription's doctor name matches the search
  const isDoctorMatch = (prescription: Prescription, searchValue: string): boolean => {
    const doctorName = prescription.prescribing_doctor.toLowerCase()
    const searchLowerCase = searchValue.toLowerCase()
    return doctorName.includes(searchLowerCase)
  }

  // Function to check if the prescription's patient name matches the search
  const isPatientMatch = (prescription: Prescription, searchValue: string): boolean => {
    const patient = patients[prescription.id]
    assert(patient)
    const patientFullName = getPatientFullName(patient).toLowerCase()
    const searchLowerCase = searchValue.toLowerCase()
    return patientFullName.includes(searchLowerCase)
  }

  // Utility function to get the full name of a patient
  const getPatientFullName = (patient: Patient): string => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!patient) return ''
    assert(patient)
    const { firstname, lastname } = patient
    return `${firstname} ${lastname}`
  }

  const updatePatientsData = (prevPatients: Record<number, Patient>, patientResults: Array<{ id: number, patient: Patient }>): Record<number, Patient> =>
    patientResults.reduce((newPatientsData, { id, patient }) => (
      { ...newPatientsData, [id]: patient })
      , { ...prevPatients })

  const filterByPrescriptions = useCallback((prescription: Prescription, searchValue: string) => (
    isDoctorMatch(prescription, searchValue) ||
    isPatientMatch(prescription, searchValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [patients])

  useEffect(() => {
    const fetchPatients = async (): Promise<void> => {
      assert(token)
      try {
        // Create a promise for each prescription
        const patientPromises = prescriptions.map(async (prescription) => {
          const patientData = await getPatient(token, prescription.patient)
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (!patientData) throw new Error('Patient data is missing')
          // Returns an object with patient data and prescription id
          return { id: prescription.id, patient: patientData }
        })
        // Waits for patientPromises to be loaded
        const patientResults = await Promise.all(patientPromises)

        setPatients(prevPatients => {
          return updatePatientsData(prevPatients, patientResults)
        })

        const filteredData = prescriptions.filter((prescription) =>
          filterByPrescriptions(prescription, searchPatient)
        )
        setFilteredPrescriptions(filteredData)
      } catch (error) {
        console.error(error)
      }
    }

    // eslint-disable-next-line no-void
    void fetchPatients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, prescriptions])

  /**
   * Manages the search by filtering prescriptions according to the value entered by the user.
   */
  const handleSearch = useCallback((searchValue: string) => {
    const filteredData = prescriptions.filter((prescription) => filterByPrescriptions(prescription, searchValue))
    setFilteredPrescriptions(filteredData)
    setSearchPatient(searchValue)
  }, [prescriptions, filterByPrescriptions])

  return (
    <>
      {filteredPrescriptions && patients ?
        (
          <Container>
            <SearchBar onSearch={handleSearch} placeholderText={t('text.searchDoctor')} />
            <PrescriptionFilter prescriptions={prescriptions} onFilterChanged={setFilteredPrescriptions} />
            {
              filteredPrescriptions.map((prescription) => (
                <PrescriptionCard
                  key={prescription.id}
                  doctorName={prescription.prescribing_doctor}
                  endDate={formatDate(prescription.end_date)}
                  patientName={getPatientFullName(patients[prescription.id])}
                  prescription={prescription}
                />
              ))
            }
            <div className='h-20' /> {/* Added space for the bottom */}
          </Container>
        ) : (
          <Loading />
        )
      }
    </>
  )
}

export default PrescriptionsPage
