import { SubscriptionPlanType } from '../../types';
import { plans } from '../../utils/constants';

interface PlanSelectionProps {
  selectedPlan: SubscriptionPlanType | null;
  setSelectedPlan: (planType: SubscriptionPlanType) => void;
}

export const PlanSelection = ({ selectedPlan, setSelectedPlan }: PlanSelectionProps): JSX.Element => (
  <div className="w-full max-w-md mt-8 space-y-4">
    {plans.map((plan) => (
      <div
        key={plan.id}
        onClick={() => setSelectedPlan(plan.id as SubscriptionPlanType)}
        className={`flex items-center justify-between px-4 py-3 border rounded-full shadow-sm cursor-pointer transition ${selectedPlan === plan.id
            ? "bg-colorprimary text-white"
            : "bg-white text-gray-800"
          }`}
      >
        <div>
          <p
            className={`font-semibold text-sm ${selectedPlan === plan.id ? "text-white" : "text-gray-800"
              }`}
          >
            {plan.title}
          </p>
          <p
            className={`text-xs mt-1 ${selectedPlan === plan.id ? "text-white" : "text-gray-500"
              }`}
          >
            {plan.description}
          </p>
        </div>
        <div
          className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${selectedPlan === plan.id
              ? "border-white"
              : "border-gray-300"
            }`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${selectedPlan === plan.id ? "bg-white" : "bg-transparent"
              }`}
          ></div>
        </div>
      </div>
    ))}
  </div>
);

export default PlanSelection;
