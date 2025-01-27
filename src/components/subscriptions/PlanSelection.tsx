import { SubscriptionPlanType } from '../../types';
import { plans } from '../../utils/constants';

interface PlanSelectionProps {
  selectedPlan: SubscriptionPlanType | null;
  setSelectedPlan: (planType: SubscriptionPlanType) => void;
}

export const PlanSelection = ({ selectedPlan, setSelectedPlan }: PlanSelectionProps): JSX.Element => (
  <div className="space-y-4">
    {plans.map((plan) => (
      <div
        key={plan.id}
        onClick={() => setSelectedPlan(plan.id as SubscriptionPlanType)}
        className={`
          bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 
          flex items-center justify-between cursor-pointer transition-all
          ${selectedPlan === plan.id 
            ? 'ring-2 ring-colorprimary' 
            : 'hover:bg-white/20'}
        `}
      >
        <div>
          <h3 className={`
            font-semibold 
            ${selectedPlan === plan.id ? 'text-colorprimary' : 'text-gray-800'}
          `}>
            {plan.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {plan.description}
          </p>
        </div>
        <div className={`
          w-5 h-5 rounded-full border-2 
          ${selectedPlan === plan.id 
            ? 'border-colorprimary bg-colorprimary' 
            : 'border-gray-300'}
        `}></div>
      </div>
    ))}
  </div>
);
