export const PAGE_CONFIG = [
  { path: '/patients/edit', title: 'Edit Patient', showBackButton: true },
  { path: '/prescriptions/edit', title: 'Edit Prescription', showBackButton: true },
  { path: 'patients/create', title: 'Create Patient', showBackButton: true },
  { path: 'prescriptions/create', title: 'Create prescriptions', showBackButton: true },
  { path: '/account', title: 'Account', showBackButton: false },
  { path: '/profile/edit', title: 'Edit Profile', showBackButton: true },
  { path: '/profile', title: 'Profile', showBackButton: false },
  { path: '/setting', title: 'Parametre', showBackButton: false },
  { path: 'prescriptions/send', title: 'Renouvellement', showBackButton: true }
]

export const COLOR_STATUS = {
  DANGER: 'bg-red-100 text-red-500',
  WARNING: 'bg-yellow-100 text-yellow-600',
  SUCCESS: 'bg-colorsecondary text-colorprimary'
}
