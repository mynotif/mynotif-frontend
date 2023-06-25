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
            editPatient: 'Edit patient',
            noPatientToDisplay: 'No patient to display!',
            noPrescriptionToDisplay: 'No prescription to display!',
            myPatients: 'My patients',
            confirmation: 'Confirmation'
          },
          navigation: {
            update: 'Update',
            login: 'Login',
            logout: 'Logout',
            register: 'Register',
            home: 'Back to home page',
            validate: 'Validate',
            delete: 'Delete',
            return: 'Return'
          },
          form: {
            emailAddress: 'Email address',
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
            prescription: 'Prescription',
            patients: 'Patients',
            profile: 'Profile',
            admin: 'Admin',
            home: 'Home'
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
            editPatient: 'Modifier un patient',
            noPatientToDisplay: 'Aucun patient à afficher !',
            noPrescriptionToDisplay: 'Aucune ordonnance à afficher !',
            myPatients: 'Mes patients',
            confirmation: 'Confirmation'
          },
          navigation: {
            update: 'Modifier',
            login: 'Connexion',
            logout: 'Déconnexion',
            register: 'Inscription',
            home: "Retourner à l'accueil",
            validate: 'Valider',
            delete: 'Supprimer',
            return: 'Retour'
          },
          form: {
            emailAddress: 'Adresse email',
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
            home: 'Accueil'
          }
        }
      }
    }
  })

export default i18n
