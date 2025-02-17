import { t } from 'i18next';
import { Prescription } from '../../types';
import { MailIcon } from 'lucide-react';

interface ContactDoctorProps {
  prescriptionState: Prescription;
  goToSendEmail: () => void;
}

export const ContactDoctor = ({ prescriptionState, goToSendEmail }: ContactDoctorProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          {t('title.reniewPrescription')}
        </h3>
      </div>
      <div className="space-y-3">
        <button
          onClick={goToSendEmail}
          className="w-full bg-colorprimary text-white px-4 py-2 rounded-lg hover:bg-shade1 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MailIcon className="w-5 h-5 mr-2" />
          {t('text.contactDoctor')}
        </button>
      </div>
    </div>
  );
};
