import { CalendarIcon } from 'lucide-react';

interface NextPaymentSubscribeProps {
  current_period_end: string;
  cancel_at_period_end: boolean;
}

const NextPaymentSubscribe = ({ current_period_end, cancel_at_period_end }: NextPaymentSubscribeProps): JSX.Element => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
    <div className="flex items-center text-gray-600 mb-2">
      <CalendarIcon className="w-5 h-5 mr-2 text-colorprimary" />
      <span className="text-sm">Prochain prélèvement</span>
    </div>

    {cancel_at_period_end ? (
      <p className="text-sm text-red-500">
        À la fin de cette période, vous ne serez plus prélevé et vos accès seront terminés.
      </p>
    ) : (
      <p className="text-lg font-medium text-gray-800">
        {new Date(current_period_end).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>
    )}
  </div>
);

export default NextPaymentSubscribe;
