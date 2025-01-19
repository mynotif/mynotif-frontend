import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface StartPaymentSubscribeProps {
    current_period_start: string;
}

const StartPaymentSubscribe = ({ current_period_start }: StartPaymentSubscribeProps): JSX.Element => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center text-gray-600 mb-2">
            <FontAwesomeIcon className="h-5 w-5 mr-2" icon={['fas', 'calendar-days']} />
            <span>Date de début</span>
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
