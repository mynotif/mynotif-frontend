export const PAGE_CONFIG = [
  // Main pages
  { path: '/home', titleKey: 'text.home', showBackButton: false },
  { path: '/patients', titleKey: 'text.patients', showBackButton: true },
  { path: '/prescriptions', titleKey: 'text.prescriptions', showBackButton: true },
  { path: '/profile', titleKey: 'title.profile', showBackButton: true },
  { path: '/setting', titleKey: 'title.setting', showBackButton: true },
  
  // Patient related
  { path: '/patients/create', titleKey: 'title.createPatient', showBackButton: true },
  { path: '/patients/edit', titleKey: 'title.editPatient', showBackButton: true },
  { path: '/patients/:id', titleKey: 'text.detailPatient', showBackButton: true },
  
  // Prescription related
  { path: '/prescriptions/create', titleKey: 'title.createPrescription', showBackButton: true },
  { path: '/prescriptions/edit', titleKey: 'title.editPrescription', showBackButton: true },
  { path: '/prescriptions/:id', titleKey: 'text.detailPrescription', showBackButton: true },
  { path: '/prescriptions/send', titleKey: 'title.reniew', showBackButton: true },
  
  // Profile related
  { path: '/profile/edit', titleKey: 'title.editProfile', showBackButton: true },
  
  // Subscription related
  { path: '/subscription', titleKey: 'title.subscription', showBackButton: true },
  { path: '/success', titleKey: 'title.subscriptionConfirm', showBackButton: true },
  { path: '/cancel', titleKey: 'title.subscriptionCancel', showBackButton: true }
]

export const COLOR_STATUS = {
  DANGER: 'bg-red-100 text-red-500',
  WARNING: 'bg-yellow-100 text-yellow-600',
  SUCCESS: 'bg-colorsecondary text-colorprimary'
}

export const SUBSCRIPTION_PRICES_CONFIG = {
  monthly: 18.00,
  annual: 172,
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
