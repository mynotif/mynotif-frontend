import Tippy from '@tippyjs/react';
import { t } from 'i18next';
import { capitalize } from 'lodash';
import { InfoRow } from '../pageSections/detail/InfoRow';
import { Prescription } from '../../types';
import { AlertTriangleIcon, InfoIcon, MailIcon } from 'lucide-react';

interface ContactDoctorProps {
    prescriptionState: Prescription;
    goToSendEmail: () => void;
    }

export const ContactDoctor = ({ prescriptionState, goToSendEmail }: ContactDoctorProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          {t('title.contactDoctor')}
        </h3>
        <Tippy
          content="Pour contacter votre médecin par email, ajoutez son adresse email en haut à droite cliquer sur l'icon modifier. Lorsqu'une ordonnance est proche de l'expiration, un bouton de renouvellement par email sera automatiquement disponible."
          placement="bottom"
          theme="custom"
          trigger="click"
          interactive={true}
          onClickOutside={(instance) => instance.hide()}
        >
          <span className='cursor-help text-gray-400 hover:text-colorprimary transition-colors'>
            <InfoIcon className="w-5 h-5 text-blue-400" />
          </span>
        </Tippy>
      </div>
      <div className="space-y-3">
        <InfoRow
          label="Nom"
          value={`Dr. ${capitalize(prescriptionState.prescribing_doctor)}`}
        />
        {prescriptionState.email_doctor ? (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email</span>
            <a
              href={`mailto:${prescriptionState.email_doctor}`}
              className="text-colorprimary hover:underline flex items-center"
            >
              <MailIcon className="w-5 h-5 mr-2" />
              {prescriptionState.email_doctor}
            </a>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <AlertTriangleIcon className="w-4 h-4 font-bold" />
            <span className="text-xs">{t('text.notEmailDoctor')}</span>
          </div>
        )}
        {prescriptionState.email_doctor && (
          <button
            onClick={goToSendEmail}
            className="w-full bg-colorprimary text-white px-4 py-2 rounded-lg hover:bg-shade1 transition-colors flex items-center justify-center"
          >
            <MailIcon className="w-5 h-5 mr-2" />
            {t('text.contactDoctor')}
          </button>
        )}
      </div>
    </div>
  );
};
