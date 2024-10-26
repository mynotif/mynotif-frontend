import { useState, useEffect } from 'react';
import { Prescription } from '../types';

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

    return (
        <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className='flex-grow outline-none text-gray-400'
                    id="completed"
                    checked={activeFilter === 'completed'}
                    onChange={() => handleFilterChange('completed')}
                />
                <label htmlFor="completed" className="ml-2">Expiré</label>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className='flex-grow outline-none text-gray-400'
                    id="expiring-soon"
                    checked={activeFilter === 'expiring_soon'}
                    onChange={() => handleFilterChange('expiring_soon')}
                />
                <label htmlFor="expiring-soon" className="ml-2">Expire bientôt</label>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className='flex-grow outline-none text-gray-400'
                    id="in-progress"
                    checked={activeFilter === 'in_progress'}
                    onChange={() => handleFilterChange('in_progress')}
                />
                <label htmlFor="in-progress" className="ml-2">Valide</label>
            </div>
        </div>
    );
};

export default PrescriptionFilter;
