import { useState, useEffect } from 'react';
import { Prescription } from '../types';
import { CheckIcon } from 'lucide-react';

interface PrescriptionFilterProps {
    prescriptions: Prescription[];
    onFilterChanged: (filteredPrescriptions: Prescription[]) => void;
}
type PrescriptionFilterType = 'expiring_soon' | 'in_progress' | 'completed' | null
type FiltersType = Record<string, (p: Prescription) => boolean>

const PrescriptionFilter = ({ prescriptions, onFilterChanged }: PrescriptionFilterProps) => {
    const [activeFilter, setActiveFilter] = useState<PrescriptionFilterType>(null);

    useEffect(() => {
        if (activeFilter === null) return onFilterChanged(prescriptions);
        let filtered = [...prescriptions];

        const filters: FiltersType = {
            expiring_soon: (p) => p.expiring_soon && p.is_valid,
            in_progress: (p) => p.is_valid && !p.expiring_soon,
            completed: (p) => !p.is_valid && !p.expiring_soon,
        };

        if (filters[activeFilter]) {
            filtered = filtered.filter(filters[activeFilter]);
        }

        onFilterChanged(filtered);
    }, [prescriptions, activeFilter, onFilterChanged]);

    const handleFilterChange = (filter: PrescriptionFilterType) => {
        setActiveFilter(activeFilter === filter ? null : filter);
    };

    const filterOptions = [
        { 
            id: 'completed', 
            label: 'Expiré', 
            type: 'completed' as PrescriptionFilterType 
        },
        { 
            id: 'expiring-soon', 
            label: 'Expire bientôt', 
            type: 'expiring_soon' as PrescriptionFilterType 
        },
        { 
            id: 'in-progress', 
            label: 'Valide', 
            type: 'in_progress' as PrescriptionFilterType 
        }
    ];

    return (
        <div className="flex items-center justify-center space-x-2 mb-4 overflow-x-auto">
            {filterOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => handleFilterChange(option.type)}
                    className={`
                        flex items-center space-x-2 px-3 py-2 rounded-lg transition-all
                        ${activeFilter === option.type 
                            ? 'bg-colorprimary text-white' 
                            : 'bg-white/10 backdrop-blur-sm border border-gray-400 text-gray-700 hover:bg-colorsecondary/30'}
                    `}
                >
                    {activeFilter === option.type && <CheckIcon className="w-4 h-4" />}
                    <span className="text-sm">{option.label}</span>
                </button>
            ))}
        </div>
    );
};

export default PrescriptionFilter;