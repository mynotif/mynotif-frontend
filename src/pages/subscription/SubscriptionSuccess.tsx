import React, { useEffect } from 'react'
import SubscriptionContent from '../../components/subscriptions/SubscriptionContent';
import confetti from 'canvas-confetti';
import { useSubscription } from '../../hook/subscription';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
            const duration = 3 * 1000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 10, // Number of confetti per frame
                    startVelocity: 30,
                    spread: 360, // Large spread to cover the entire width
                    ticks: 60,
                    origin: {
                        x: Math.random(), // Random horizontal position
                        y: 0 // Starts from the top
                    },
                });

                // Continue animation until the end of the duration
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
        <div className="min-h-screen bg-colorsecondary flex flex-col items-center justify-center p-4">
            <SubscriptionContent />
        </div>
    )
}

export default SubscriptionSuccess;
