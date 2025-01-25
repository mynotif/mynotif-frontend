import { useMemo } from 'react';

export const useDaysRemaining = (endDate: string): number => {
  return useMemo(() => {
    const today = new Date();
    const [year, month, day] = endDate.split('-').map(Number);
    const end = new Date(year, month - 1, day);

    const diffTime = end.getTime() - today.setHours(0, 0, 0, 0);
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return daysRemaining;
  }, [endDate]);
}