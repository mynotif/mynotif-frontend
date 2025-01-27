import { AlertTriangleIcon } from "lucide-react";

interface InfoRowProps {
  label: string
  value: string | null
  valueClassName?: string
}

export const InfoRow = ({
  label,
  value,
  valueClassName = '',
}: InfoRowProps) => {
  if (!value) return (
    <div className="flex justify-between items-center text-gray-400 italic">
      <span>{label}</span>
      <div className="flex items-center space-x-2">
        <AlertTriangleIcon className="w-4 h-4" />
        <span className="text-xs">À compléter</span>
      </div>
    </div>
  );

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">{label}</span>
      </div>
      <span className={`font-medium ${valueClassName}`}>{value}</span>
    </div>
  );
};
