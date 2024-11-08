import { t } from 'i18next'

export const PAGE_CONFIG = [
  { path: '/patients/edit', title: t('title.editPatient'), showBackButton: true },
  { path: '/prescriptions/edit', title: t('title.editPrescription'), showBackButton: true },
  { path: 'patients/create', title: t('title.createPatient'), showBackButton: true },
  { path: 'prescriptions/create', title: t('title.createPrescription'), showBackButton: true },
  { path: '/profile/edit', title: t('title.editProfile'), showBackButton: true },
  { path: '/profile', title: t('title.profile'), showBackButton: false },
  { path: '/setting', title: t('title.setting'), showBackButton: false },
  { path: 'prescriptions/send', title: t('title.reniew'), showBackButton: true }
]

export const COLOR_STATUS = {
  DANGER: 'bg-red-100 text-red-500',
  WARNING: 'bg-yellow-100 text-yellow-600',
  SUCCESS: 'bg-colorsecondary text-colorprimary'
}
