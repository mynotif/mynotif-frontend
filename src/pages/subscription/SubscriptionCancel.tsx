import React, { useEffect } from 'react';
import { XCircleIcon, AlertTriangleIcon } from 'lucide-react';
import LogoPng from '../../components/module/LogoPng';
import { useSubscription } from '../../hook/subscription';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container } from '../../components/home/Container';
import { Button } from '../../components/forms/inputGroups/Button';

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
        <Container>
            <div className="max-w-md mx-auto space-y-6">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
                    <div className='flex justify-center mb-4'>
                        <LogoPng size={150} />
                    </div>

                    <h1 className="text-xl text-gray-600 mb-6">
                        Processus d'abonnement annulé
                    </h1>

                    <div className="bg-red-500/10 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center space-x-4">
                            <XCircleIcon className="text-red-500 w-10 h-10" />
                            <AlertTriangleIcon className="text-red-500 w-10 h-10" />
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-6">
                        <p className="text-gray-600 text-sm">
                            Contacter notre support à{' '}
                            <span className="text-colorprimary">
                                contact@ordopro.fr
                            </span>
                            {' '}si vous rencontrez des difficultés
                        </p>
                    </div>

                    <Button
                        variant="accent"
                        className="w-full"
                        onClick={() => window.location.href = '/subscription'}
                    >
                        Explorer les forfaits
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default SubscriptionCancel;
