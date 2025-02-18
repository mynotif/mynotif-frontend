export const useDaysRemaining = (endDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = endDate.split('-').map(Number);
  const end = new Date(year, month - 1, day);

  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
