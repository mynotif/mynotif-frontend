import { t } from "i18next";
import { Patient } from "../../types";
import { EyeIcon } from "lucide-react";
import { InfoRow } from "../pageSections/detail/InfoRow";

interface PatientInformationProps {
    patientState: Pick<Patient, 'id' | 'health_card_number'>;
    goToPatient: (patient: Pick<Patient, 'id'>) => void;
    }

export const PatientInformation = ({ patientState, goToPatient }: PatientInformationProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            {t('title.informationPatient')}
          </h3>
          <button
            onClick={() => goToPatient(patientState)}
            className="text-sm font-semibold text-colorprimary hover:bg-colorsecondary px-3 py-1 rounded transition-colors"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <InfoRow
            label="N° Carte Vitale"
            value={patientState.health_card_number}
          />
        </div>
      </div>
    </div>
  );
};
