import { CalendarIcon } from 'lucide-react';

interface StartPaymentSubscribeProps {
  current_period_start: string;
}

const StartPaymentSubscribe = ({ current_period_start }: StartPaymentSubscribeProps): JSX.Element => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
    <div className="flex items-center text-gray-600 mb-2">
      <CalendarIcon className="w-5 h-5 mr-2 text-colorprimary" />
      <span className="text-sm">Date de début</span>
    </div>
    <p className="text-lg font-medium text-gray-800">
      {new Date(current_period_start).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}
    </p>
  </div>
);

export default StartPaymentSubscribe;
