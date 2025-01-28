import React from 'react'
import { InfoRow } from '../pageSections/detail/InfoRow';
import { AlertTriangleIcon, EyeIcon, InfoIcon } from 'lucide-react';
import Tippy from '@tippyjs/react';
import { t } from 'i18next';
import { Prescription } from '../../types';
import { formatDate, getIconClass } from '../../utils/helpers';

interface PrescriptionInfoProps {
    prescriptionState: Prescription;
}

export const PrescriptionInfo = ({ prescriptionState }: PrescriptionInfoProps) => {
    return (
        <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
                {t('title.infoPrescription')}
            </h3>
            <div className="space-y-3">
                <InfoRow
                    label="Date d'expiration"
                    value={formatDate(prescriptionState.end_date)}
                    valueClassName={getIconClass(prescriptionState)}
                />
                {prescriptionState.photo_prescription ? (
                    <div>
                        <a
                            href={prescriptionState.photo_prescription}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-colorprimary hover:underline"
                        >
                            <EyeIcon className="w-5 h-5 mr-2" />
                            {t('text.seePrescription')}
                        </a>
                    </div>
                ) : (
                    <div className="flex text-colorprimary items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <AlertTriangleIcon className="w-4 h-4" />
                            <span className="text-xs">{t('text.notSavePrescription')}</span>
                        </div>
                        <Tippy
                            content="Pour ajouter une ordonnance, cliquez sur le bouton 'Modifier' puis ajoutez une ordonnance"
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
                )}
            </div>
        </div>
    );
};
