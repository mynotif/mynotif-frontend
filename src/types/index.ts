interface Patient {
  id: number
  firstname: string
  lastname: string
  street: string
  zip_code: string
  city: string
  phone: string
  birthday: string | null
  health_card_number: string
  ss_provider_code: string
  prescriptions: Prescription[]
  expire_soon_prescriptions: Prescription[]
}

interface OneSignal {
  subscription_id: string
}

interface SubscriptionInfo {
  subscription_id: string
  user: number
}

const defaultPatient = {
  id: 0,
  firstname: '',
  lastname: '',
  street: '',
  zip_code: '',
  city: '',
  phone: '',
  birthday: null,
  health_card_number: '',
  ss_provider_code: '',
  prescriptions: [],
  expire_soon_prescriptions: []
}

interface Prescription {
  id: number
  prescribing_doctor: string
  email_doctor: string
  start_date: string
  end_date: string
  photo_prescription: string
  is_valid: boolean
  patient: number
  patient_firstname: string
  patient_lastname: string
  expiring_soon: boolean
}

const defaultPrescription = {
  id: 0,
  prescribing_doctor: '',
  email_doctor: '',
  start_date: '',
  end_date: '',
  photo_prescription: '',
  is_valid: false,
  patient: 0,
  patient_firstname: '',
  patient_lastname: '',
  expiring_soon: false
}

interface Profile {
  id: number
  email: string
  first_name: string
  last_name: string
  is_staff: boolean
}

interface Token {
  token: string
}

interface PrescriptionUploadResponse {
  id: number
  photo_prescription: string
}

interface ErrorResponse {
  detail: string
}

interface AuthFormType {
  email: string
  password: string
}

interface LoginFormType {
  username: string
  password: string
}

interface ProfileFormType {
  username: string
  email: string
  first_name: string
  last_name: string
}

interface Subscription {
  id: number;
  stripe_subscription_id: string;
  status: string;
  payment_status: string;
  active: boolean;
  product_name: string;
  current_period_start: string; // ISO date string
  current_period_end: string;   // ISO date string
  cancel_at_period_end: boolean;
  trial_end: string | null;     // ISO date string or null
  total_price: string;          // Price in string format
  hosted_invoice_url: string;
  invoice_pdf: string;
  created_at: string;           // ISO date string
  updated_at: string;           // ISO date string
  user: number;
}

const defaultSubscription = {
  id: 0,
  stripe_subscription_id: '',
  status: 'inactive',
  payment_status: 'unpaid',
  active: false,
  product_name: '',
  current_period_start: new Date().toISOString(),
  current_period_end: new Date().toISOString(),
  cancel_at_period_end: false,
  trial_end: null,
  total_price: '0.00',
  hosted_invoice_url: '',
  invoice_pdf: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  user: 0,
}

type SubscriptionPlanType = 'monthly' | 'annual';

interface SessionObject {
  sessionId: string;
  checkout_url: string;
}

interface SubscriptionData {
  active: boolean;
  invoice_pdf: string;
  current_period_end: string;
  current_period_start: string;
  product_name: string;
  cancel_at_period_end: boolean;
}

interface CancelSubscriptionResponse {
  message: string;
}

interface SubscriptionContextType {
  subscription: SubscriptionData;
  fetchSubscription: () => Promise<void>;
}

export type {
  ErrorResponse,
  Patient,
  Prescription,
  PrescriptionUploadResponse,
  Profile,
  Token,
  AuthFormType,
  OneSignal,
  SubscriptionInfo,
  ProfileFormType,
  LoginFormType,
  Subscription,
  SessionObject,
  SubscriptionPlanType,
  SubscriptionData,
  CancelSubscriptionResponse,
  SubscriptionContextType,
}

export { defaultPatient, defaultPrescription, defaultSubscription }
