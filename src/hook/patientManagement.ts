import usePatients from "./patient.hook";
import { useSubscription } from "./subscription";

const FREE_PATIENT_LIMIT = 5;

export const usePatientManagement = () => {
  const { subscription } = useSubscription();
  const { patients } = usePatients();

  const patientCount = patients?.length || 0;
  const isSubscriptionActive = subscription.active;

  const canAddPatient = isSubscriptionActive || patientCount < FREE_PATIENT_LIMIT;
  const remainingFreePatients = isSubscriptionActive 
    ? 'Illimité' 
    : Math.max(0, FREE_PATIENT_LIMIT - patientCount);

  return {
    patientCount,
    isSubscriptionActive,
    canAddPatient,
    remainingFreePatients,
  };
};
