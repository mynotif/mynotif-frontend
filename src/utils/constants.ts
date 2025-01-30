export const PAGE_CONFIG = [
  { path: '/patients/edit', titleKey: 'title.editPatient', showBackButton: true },
  { path: '/prescriptions/edit', titleKey: 'title.editPrescription', showBackButton: true },
  { path: 'patients/create', titleKey: 'title.createPatient', showBackButton: true },
  { path: 'prescriptions/create', titleKey: 'title.createPrescription', showBackButton: true },
  { path: '/profile/edit', titleKey: 'title.editProfile', showBackButton: true },
  { path: '/profile', titleKey: 'title.profile', showBackButton: false },
  { path: '/setting', titleKey: 'title.setting', showBackButton: false },
  { path: 'prescriptions/send', titleKey: 'title.reniew', showBackButton: true },
  { path: '/subscription', titleKey: 'title.subscription', showBackButton: true },
  { path: '/success', titleKey: 'title.subscriptionConfirm', showBackButton: false },
  { path: '/cancel', titleKey: 'title.subscriptionCancel', showBackButton: false },
]

export const COLOR_STATUS = {
  DANGER: 'bg-red-100 text-red-500',
  WARNING: 'bg-yellow-100 text-yellow-600',
  SUCCESS: 'bg-colorsecondary text-colorprimary'
}

export const SUBSCRIPTION_PRICES_CONFIG = {
  monthly: 9.90,
  annual: 106.90,
};

enum SubscriptionPlanEnum {
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
  FLEXIBLE = 'Flexible',
  ANNUAL_FRENCH = 'Économique',
}

export const plans = [
  {
    id: SubscriptionPlanEnum.MONTHLY,
    title: SubscriptionPlanEnum.FLEXIBLE,
    description: `${SUBSCRIPTION_PRICES_CONFIG.monthly.toFixed(2)}€/mois - Liberté de résilier à tout moment`,
  },
  {
    id: SubscriptionPlanEnum.ANNUAL,
    title: SubscriptionPlanEnum.ANNUAL_FRENCH,
    description: `${SUBSCRIPTION_PRICES_CONFIG.annual.toFixed(2)}€/an (soit ${(SUBSCRIPTION_PRICES_CONFIG.annual/12).toFixed(2)}€/mois) - Économisez 10%`,
  },
];
