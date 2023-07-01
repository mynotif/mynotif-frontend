import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { BACKEND_URL } from './services/constants'

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'fr',
    supportedLngs: ['en', 'fr'], // *** added this ***
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      loadPath: BACKEND_URL + '/locales/{{lng}}/{{ns}}.json'
    },
    resources: {
      en: {
        translation: {
          title: {
            listPrescriptions: 'List of prescriptions',
            pageNotFound: "Hey, this page doesn't exist!",
            addPatient: 'Add a new patient',
            addPrescription: 'Add a new prescription',
            editPrescription: 'Edit prescription',
            myAccount: 'My Account',
            profile: 'Profile',
            editPatient: 'Edit patient',
            noPatientToDisplay: 'No patient to display!',
            noPrescriptionToDisplay: 'No prescription to display!',
            myPatients: 'My patients',
            confirmation: 'Confirmation',
            login: 'Connection to application',
            register: 'Registration',
            renewPrescription: 'I renew this prescription',
            welcomeApp: 'Welcome on Mynotif'
          },
          navigation: {
            update: 'Update',
            login: 'Login',
            logout: 'Logout',
            register: 'Sign up',
            home: 'Back to home page',
            validate: 'Validate',
            delete: 'Delete',
            return: 'Return',
            resetPassword: 'Reset Password '
          },
          form: {
            emailAddress: 'Email address',
            password: 'Password',
            address: 'Address',
            userName: 'Username',
            firstName: 'Firstname',
            lastName: 'Lastname',
            phone: 'Phone',
            city: 'City',
            zipPostal: 'Postal Zip',
            doctor: 'Doctor',
            selectPatient: 'Select a patient',
            endDate: 'End date',
            startDate: 'Start date',
            carteVitale: 'Carte Vitale',
            caisseDeRattachement: 'Caisse de rattachement',
            selectYourPrescription: 'Select your prescription'
          },
          text: {
            confirmationPatient: 'Are you sure you want to remove this patient?',
            confirmationPrescription: 'Are you sure you want to remove this prescription?',
            whichPatientAddOrder: 'Which patient would you like to add this prescription?',
            prescription: 'Prescriptions',
            patients: 'Patients',
            profile: 'Profile',
            admin: 'Admin',
            home: 'Home',
            alreadyAccount: 'Already have an account?',
            notAlreadyAccount: 'Don\'t have an account?',
            createAccount: 'Create an account',
            patient: 'Patient',
            endPrescription: 'End of prescription:',
            dr: 'Dr. ',
            editPatient: 'Edit',
            editPrescription: 'Edit',
            deletePatient: 'Delete',
            deletePrescription: 'Delete',
            actionsPrescriptions: 'I manage prescriptions',
            actionsPatients: 'I manage patients',
            seePatient: 'View',
            seePrescription: 'View',
            standardAccount: 'Standard account',
            notifications: 'Notifications',
            supportHelp: 'Help & Support',
            legalNotices: 'legal notices',
            forgotPassword: 'Forgot your Password?',
            resetPasswordEmail: 'Please enter the e-mail address'
          },
          error: {
            errorLogin: 'Sorry, the email or password is incorrect!'
          }
        }
      },
      fr: {
        translation: {
          title: {
            listPrescriptions: 'Liste des Ordonnances',
            pageNotFound: "Hey, cette page n'existe pas !",
            addPatient: 'Ajouter un nouveau patient',
            addPrescription: 'Ajouter une nouvelle ordonnance',
            editPrescription: "Modifier l'ordonnance",
            myAccount: 'Mon compte',
            profile: 'Profil',
            editPatient: 'Modifier un patient',
            noPatientToDisplay: 'Aucun patient à afficher !',
            noPrescriptionToDisplay: 'Aucune ordonnance à afficher !',
            myPatients: 'Mes patients',
            confirmation: 'Confirmation',
            login: 'Connection à l\'application',
            register: 'Inscription',
            renewPrescription: 'Je renouvelle cette ordonnance',
            welcomeApp: 'Bienvenue sur Mynotif'
          },
          navigation: {
            update: 'Modifier',
            login: 'Connexion',
            logout: 'Deconnexion',
            register: 'Inscription',
            home: "Retourner à l'accueil",
            validate: 'Valider',
            delete: 'Supprimer',
            return: 'Retour',
            resetPassword: 'Réinitialiser'
          },
          form: {
            emailAddress: 'Adresse email',
            password: 'Mot de passe',
            address: 'Adresse',
            userName: "Nom d'utilisateur",
            firstName: 'Prénom',
            lastName: 'Nom',
            phone: 'Téléphone',
            city: 'ville',
            zipPostal: 'code postal',
            doctor: 'Médecin',
            selectPatient: 'Sélectionne un patient',
            endDate: 'Date de fin',
            startDate: 'Date de début',
            carteVitale: 'Carte Vitale',
            caisseDeRattachement: 'Caisse de rattachement',
            selectYourPrescription: 'Séléctionne ton ordonnance'
          },
          text: {
            confirmationPatient: 'Etes vous sur de vouloir supprimer ce patient ?',
            confirmationPrescription: 'Etes vous sur de vouloir supprimer cette ordonnance ?',
            whichPatientAddOrder: 'A quel patient voulez-vous ajouter cette ordonnance ?',
            prescription: 'Ordonnance',
            patients: 'Patients',
            profile: 'Profil',
            admin: 'Admin',
            home: 'Accueil',
            alreadyAccount: 'Vous avez déjà un compte ?',
            notAlreadyAccount: 'Vous n\'avez pas de compte?',
            createAccount: 'Créer un compte',
            patient: 'Patient',
            endPrescription: 'Fin de l\'ordonnance :',
            dr: 'Dr. ',
            editPatient: 'Modifier',
            deletePatient: 'Supprimer',
            seePatient: 'Voir',
            seePrescription: 'Voir',
            editPrescription: 'Modifier',
            deletePrescription: 'Supprimer',
            actionsPrescriptions: 'Je gère l\'ordonnance',
            actionsPatients: 'Je gère mes patients',
            standardAccount: 'Compte standard',
            notifications: 'Notifications',
            supportHelp: 'Aide & Support',
            legalNotices: 'Mentions légales',
            forgotPassword: 'Mot de passe oublié ?',
            resetPasswordEmail: 'Veuillez entrer l\'adresse e-mail'
          },
          error: {
            errorLogin: 'Désolé, l\'email ou le mot de passe est incorrect !'
          }
        }
      }
    }
  })
  .catch(console.error)

export default i18n
