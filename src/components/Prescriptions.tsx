import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Patient, Prescription } from '../types'
import PrescriptionTr from './PrescriptionTr'
import useTranslationHook from '../hook/TranslationHook'
import SearchBar from './SearchBar'
import { TokenContext } from '../context/token'
import { strict as assert } from 'assert'
import { getPatient } from '../services/api'
interface PrescriptionsProps {
  prescriptions: Prescription[]
  onDelete: (id: number) => Promise<void>
  onEdit: (id: number) => Promise<void>
}

const Prescriptions: FunctionComponent<PrescriptionsProps> = ({
  prescriptions,
  onDelete,
  onEdit
}) => {
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
      <div className='position-fixed bottom-0 end-0 me-3 mb-5 pb-5' style={{ zIndex: '1030' }}>
        <Button variant='info' href='/prescriptions/create'>
          <FontAwesomeIcon icon={['fas', 'file-medical']} />
        </Button>
      </div>
      <SearchBar onSearch={handleSearch} placeholderText={t('text.searchDoctor')} />
      {
        filteredPrescriptions.map((prescription) => (
          <PrescriptionTr
            key={prescription.id}
            prescription={prescription}
            patient={patients[prescription.id]}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      }
    </>
  )
}

export default Prescriptions
