import React, { useEffect } from 'react'
import confetti from 'canvas-confetti';
import { useSubscription } from '../../hook/subscription';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HeartPulseIcon, StethoscopeIcon } from 'lucide-react';
import { Container } from '../../components/home/Container';
import { Button } from '../../components/forms/inputGroups/Button';
import LogoPng from '../../components/module/LogoPng';

const SubscriptionSuccess = () => {
    const { subscription } = useSubscription();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isFromCheckout = searchParams.get('checkout') === 'true';

    useEffect(() => {
        if (!subscription.active || !isFromCheckout) {
            navigate('/home', { replace: true });
            return;
        }

        const createConfettiRain = () => {
            const duration = 3 * 2000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 10,
                    startVelocity: 30,
                    spread: 360,
                    ticks: 60,
                    origin: {
                        x: Math.random(),
                        y: 0
                    },
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        };

        createConfettiRain();

        const timeout = setTimeout(() => {
            window.history.replaceState({}, '', window.location.pathname);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [subscription, navigate, isFromCheckout]);

    return (
        <Container>
            <div className="max-w-md mx-auto space-y-6">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
                    <div className='flex justify-center mb-4'>
                        <LogoPng size={150} />
                    </div>

                    <h1 className="text-2xl font-semibold text-colorprimary mb-4">
                        Abonnement Réussi !
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Félicitations, votre abonnement est maintenant actif.
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-6 flex justify-center space-x-4">
                        <HeartPulseIcon className="text-colorprimary w-10 h-10" />
                        <StethoscopeIcon className="text-colorprimary w-10 h-10" />
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-6">
                        <h2 className="font-semibold text-colorprimary mb-2">Prochaines Étapes</h2>
                        <p className="text-gray-600 text-sm">
                            Commencez à explorer vos nouveaux outils et ressources
                        </p>
                    </div>

                    <Button
                        variant="accent"
                        className="w-full"
                        onClick={() => window.location.href = '/home'}
                    >
                        Accéder à mon espace
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default SubscriptionSuccess;
