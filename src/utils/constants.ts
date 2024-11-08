export const PAGE_CONFIG = [
  { path: '/patients/edit', titleKey: 'title.editPatient', showBackButton: true },
  { path: '/prescriptions/edit', titleKey: 'title.editPrescription', showBackButton: true },
  { path: 'patients/create', titleKey: 'title.createPatient', showBackButton: true },
  { path: 'prescriptions/create', titleKey: 'title.createPrescription', showBackButton: true },
  { path: '/profile/edit', titleKey: 'title.editProfile', showBackButton: true },
  { path: '/profile', titleKey: 'title.profile', showBackButton: false },
  { path: '/setting', titleKey: 'title.setting', showBackButton: false },
  { path: 'prescriptions/send', titleKey: 'title.reniew', showBackButton: true }
]

export const COLOR_STATUS = {
  DANGER: 'bg-red-100 text-red-500',
  WARNING: 'bg-yellow-100 text-yellow-600',
  SUCCESS: 'bg-colorsecondary text-colorprimary'
}
