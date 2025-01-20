import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import LogoPng from '../module/LogoPng';

const SubscriptionContent = () => (
    <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className='flex justify-center'>
            <LogoPng size={200} />
        </div>
        <h1 className="text-2xl font-bold text-colorprimary mb-4">
            Abonnement Réussi !
        </h1>
        <p className="text-gray-600 mb-6">
            Félicitations, votre abonnement est maintenant actif.
        </p>
        <div className="bg-colorsecondary rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-4">
                <FontAwesomeIcon icon={faHeartPulse} className="text-colorprimary w-12 h-12" />
                <FontAwesomeIcon icon={faStethoscope} className="text-colorprimary w-12 h-12" />
            </div>
        </div>
        <div className="space-y-4">
            <div className="bg-colorsecondary p-3 rounded-lg">
                <h2 className="font-semibold text-colorprimary">Prochaines Étapes</h2>
                <p className="text-gray-600">Commencez à explorer vos nouveaux outils et ressources</p>
            </div>
        </div>
        <button
            className="mt-6 w-full bg-colorprimary text-white py-3 rounded-lg"
            onClick={() => window.location.href = '/home'}
        >
            Accéder à mon espace
        </button>
    </div>
);

export default SubscriptionContent;
