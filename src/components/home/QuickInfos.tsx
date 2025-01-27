import { t } from "i18next";
import { StatCard } from "./StatCard";

interface QuickInfosProps {
    expiredSoon: any[];
    prescriptions: any[];
}

export const QuickInfos = ({ expiredSoon, prescriptions }: QuickInfosProps) => {
    const validPrescriptionsCount = prescriptions.filter(p => p.expiring_soon && p.is_valid).length;

    return (
        <div className='grid grid-cols-2 gap-4'>
            <StatCard 
                count={expiredSoon.length} 
                label={t('text.expiringInSevenDays')} 
                tooltipContent="Ordonnance bientot terminée" 
            />
            <StatCard 
                count={validPrescriptionsCount} 
                label={`${t('text.prescriptions')} ${t('text.running').toLocaleLowerCase()}`} 
                tooltipContent="Cela correspond aux prescriptions en cours de validité" 
            />
        </div>
    );
};
