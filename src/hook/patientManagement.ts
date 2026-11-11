import { usePatientCount } from './patient.hook'
import { useSubscription } from './subscription'

const FREE_PATIENT_LIMIT = 15

export const usePatientManagement = () => {
  const { subscription } = useSubscription()
  const count = usePatientCount()
  const isSubscriptionActive = subscription.active
  const knownCount = count.patientCount !== null && !count.countLoading && !count.countError
  const canAddPatient = isSubscriptionActive || (knownCount && count.patientCount! < FREE_PATIENT_LIMIT)
  const remainingFreePatients = !knownCount ? null : isSubscriptionActive
    ? 'Illimité' : Math.max(0, FREE_PATIENT_LIMIT - count.patientCount!)
  return { ...count, isSubscriptionActive, canAddPatient, remainingFreePatients }
}
