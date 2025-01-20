import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import LogoPng from '../../components/module/LogoPng';
import { useSubscription } from '../../hook/subscription';
import { useNavigate, useSearchParams } from 'react-router-dom';


const SubscriptionCancel = () => {
    const { subscription } = useSubscription();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isFromCheckout = searchParams.get('checkout') === 'true';

    useEffect(() => {
        if (!isFromCheckout) {
            navigate('/home', { replace: true });
            return;
        }
        const timeout = setTimeout(() => {
            window.history.replaceState({}, '', window.location.pathname);
        }, 0.01);

        return () => clearTimeout(timeout);
    }, [subscription, navigate, isFromCheckout]);

    return (
        <div className="min-h-screen bg-colorsecondary flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
                <div className='flex justify-center'>
                    <LogoPng size={200} />
                </div>
                <h1 className="text-xl text-gray-600 mb-6">
                    Processus d'abonnement annulé
                </h1>
                <div className="bg-red-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center space-x-4">
                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 w-12 h-12" />
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 w-12 h-12" />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="bg-colorsecondary p-3 rounded-lg">
                        <p className="text-gray-600">
                            Contacter notre support à
                            <span className="text-colorprimary">
                                contact@ordopro.fr
                            </span>
                            si vous rencontrez des difficultés
                        </p>
                    </div>
                </div>
                <button
                    className="mt-6 w-full bg-colorprimary text-white py-3 rounded-lg"
                    onClick={() => window.location.href = '/subscription'}
                >
                    Explorer les forfaits
                </button>
            </div>
        </div>
    )
}

export default SubscriptionCancel;
