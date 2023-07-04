import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Patient, Prescription } from '../types'
import PrescriptionTr from './PrescriptionTr'
import useTranslationHook from '../hook/TranslationHook'
import SearchBar from './SearchBar'
import TitlePage from './TitlePage'
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

  // Using Record to get a key-value array
  const [patients, setPatients] = useState<Record<number, Patient | null>>({})

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

        const patientsData: Record<number, Patient | null> = {}

        patientResults.forEach(({ id, patient }) => {
          patientsData[id] = patient
        })

        setPatients(patientsData)
      } catch (error) {
        console.error(error)
      }
    }

    // eslint-disable-next-line no-void
    void fetchPatients()
  }, [token, prescriptions])

  const filterByPrescriptions = (prescription: Prescription, searchValue: string): boolean => {
    return (
      prescription.prescribing_doctor.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  /**
   * Manages the search by filtering prescriptions according to the value entered by the user.
   */
  const handleSearch = useCallback((searchValue: string) => {
    const filteredData = prescriptions.filter((prescription) => filterByPrescriptions(prescription, searchValue))
    setFilteredPrescriptions(filteredData)
  }, [prescriptions])

  return (
    <>
      <div className='position-fixed bottom-0 end-0 me-3 mb-5 pb-5' style={{ zIndex: '1030' }}>
        <Button variant='info' href='/prescriptions/create'>
          <FontAwesomeIcon icon={['fas', 'file-medical']} />
        </Button>
      </div>
      <TitlePage title={t('title.listPrescriptions')} />
      <SearchBar onSearch={handleSearch} placeholderText={t('text.searchDoctor')} />
      <Container>
        {
          filteredPrescriptions.map((prescription) => (
            <PrescriptionTr
              key={prescription.id}
              prescription={prescription}
              patient={patients[prescription.id] ?? null}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        }
      </Container>
    </>
  )
}

export default Prescriptions
