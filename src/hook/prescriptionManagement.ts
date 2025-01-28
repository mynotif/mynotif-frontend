import usePrescription from "./prescription.hook";
import { useSubscription } from "./subscription";

const FREE_PRESCRIPTION_LIMIT = 5;

export const usePrescriptionManagement = () => {
  const { subscription } = useSubscription();
    const prescriptions = usePrescription();

  const prescriptionCount = prescriptions[0]?.length || 0;
  const isSubscriptionActive = subscription.active;

  const canAddPrescription = isSubscriptionActive || prescriptionCount < FREE_PRESCRIPTION_LIMIT;
  const remainingFreePrescriptions = isSubscriptionActive 
    ? 'Illimité' 
    : Math.max(0, FREE_PRESCRIPTION_LIMIT - prescriptionCount);

  return {
    prescriptionCount,
    isSubscriptionActive,
    canAddPrescription,
    remainingFreePrescriptions,
  };
};