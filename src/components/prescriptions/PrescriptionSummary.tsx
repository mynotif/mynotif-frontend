import { t } from "i18next";
import { capitalize } from "lodash";
import { FileTextIcon } from "lucide-react";
import { Patient, Prescription } from "../../types";

interface PrescriptionSummaryProps {
    prescriptionState: Prescription;
    patientState: Patient;
}

export const PrescriptionSummary = ({ prescriptionState, patientState }: PrescriptionSummaryProps) => (
    <div className="flex items-center space-x-4">
        <div className="bg-colorprimary/10 rounded-full w-12 h-12 flex items-center justify-center">
            <FileTextIcon className="text-colorprimary w-6 h-6" />
        </div>
        <div>
            <h2 className="text-xl font-semibold text-gray-800">
                {t('text.dr')} {capitalize(prescriptionState.prescribing_doctor)}
            </h2>
            <p className="text-sm text-gray-500">
                {t('text.prescriptionFor')} {patientState.firstname} {patientState.lastname}
            </p>
        </div>
    </div>
);
