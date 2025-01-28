import { useCallback, useMemo, useState } from 'react'
import usePrescription from '../../hook/prescription.hook'
import SearchBar from '../../components/SearchBar'
import { Prescription } from '../../types'
import useTranslationHook from '../../hook/TranslationHook'
import { Container } from '../../components/home/Container'
import { Loading } from '../../components/loading/Loading'
import PrescriptionFilter from '../../components/PrescriptionFilter'
import { Button } from '../../components/forms/inputGroups/Button'
import { useNavigate } from 'react-router-dom'
import PrescriptionLine from '../../components/prescriptions/PrescriptionLine'
import { InfoIcon } from 'lucide-react'
import Tippy from '@tippyjs/react'
import { usePrescriptionManagement } from '../../hook/prescriptionManagement'


const PrescriptionsPage = (): JSX.Element => {
  const [prescriptions] = usePrescription()
  const { t } = useTranslationHook()
  const navigate = useNavigate()
  const { prescriptionCount, isSubscriptionActive, remainingFreePrescriptions } = usePrescriptionManagement()

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

  const groupedPrescriptions = useMemo(() => {
    return filteredPrescriptions
      .sort((a, b) => a.prescribing_doctor.localeCompare(b.prescribing_doctor))
      .reduce((acc, prescription) => {
        const firstLetter = prescription.prescribing_doctor[0].toUpperCase()
        if (!acc[firstLetter]) {
          acc[firstLetter] = []
        }
        acc[firstLetter].push(prescription)
        return acc
      }, {} as Record<string, Prescription[]>)
  }, [filteredPrescriptions])

  if (!prescriptions) {
    return <Loading />
  }


  return (
    <Container>
         {!isSubscriptionActive && (
        <>
        <p>Nombre total de prescriptions : {prescriptionCount}</p>
        <p className='pb-4 text-sm text-gray-600'>Prescriptions restants dans le plan gratuit : {remainingFreePrescriptions}</p>
        </>
      )}
      <SearchBar className='flex-grow' onSearch={handleSearch} />
      <div className="flex justify-around">
        <PrescriptionFilter
          prescriptions={prescriptions}
          onFilterChanged={setFilteredPrescriptions}
        />
        <Tippy
          content={`Filtrez vos ${t('text.prescriptions')} en cliquant sur les boutons`}
          placement="bottom"
          theme="custom"
          trigger="click"
          interactive={true}
          onClickOutside={(instance) => instance.hide()}
        >
          <span className='cursor-help text-gray-400 hover:text-colorprimary transition-colors'>
            <InfoIcon className="w-5 h-5 text-blue-400" />
          </span>
        </Tippy>
      </div>
      <div className="flex justify-start items-center space-x-2 mb-4">
        <Button
          type='button'
          variant='icon'
          size='small'
          icon={['fas', 'plus']}
          onClick={() => navigate('/prescriptions/create')}
        />
        <span className="text-sm pt-4 text-gray-700 hover:text-colorprimary transition-colors cursor-pointer" onClick={() => navigate('/prescriptions/create')}>
          {t('title.addPrescription')}
        </span>
      </div>
      <div className="space-y-4">
        {filteredPrescriptions.length > 0 ? (
          Object.entries(groupedPrescriptions).map(([letter, prescriptionGroup]) => (
            <div key={letter}>
              <div className='top-16 bg-colorsecondary/50 backdrop-blur-sm z-10 py-2 px-4 text-gray-700 font-semibold'>
                {letter}
              </div>
              {prescriptionGroup.map((prescription) => (
                <PrescriptionLine
                  key={prescription.id}
                  prescription={prescription}
                />
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            Aucune prescription trouvée
          </div>
        )}
      </div>
    </Container>
  )
}

export default PrescriptionsPage
