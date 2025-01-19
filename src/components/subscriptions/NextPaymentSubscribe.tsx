import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface NextPaymentSubscribeProps {
    current_period_end: string;
    cancel_at_period_end: boolean;
}

const NextPaymentSubscribe = ({ current_period_end, cancel_at_period_end }: NextPaymentSubscribeProps): JSX.Element => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center text-gray-600 mb-2">
            <FontAwesomeIcon className="h-5 w-5 mr-2" icon={['fas', 'calendar-days']} />
            <span>Prochain prélèvement</span>
        </div>

        {cancel_at_period_end ? (
            <p className="text-sm text-red-600">
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
