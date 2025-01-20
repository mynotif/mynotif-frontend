import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { TokenContextProvider } from './context/token'
import { FlashMessageContextProvider } from './context/flashmessage'
import { ProfileContextProvider } from './context/profile'
import Footer from './components/navigationFooter/Footer'
import FlashMessages from './components/flashMessages/FlashMessages'
import PatientsPage from './pages/patients/PatientsPage'
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage'
import PrescriptionEdit from './pages/prescriptions/PrescriptionEdit'
import PatientDetail from './pages/patients/PatientDetail'
import PageNotFound from './pages/PageNotFound'
import PatientEdit from './pages/patients/PatientEdit'
import PatientCreatePage from './pages/patients/PatientCreatePage'
import PrivateRoute from './components/PrivateRoute'
import PrescriptionCreatePage from './pages/prescriptions/PrescriptionCreatePage'
import LoginPage from './pages/authentifications/LoginPage'
import RegisterPage from './pages/authentifications/RegisterPage'
import './App.css'
import ResetPassword from './pages/authentifications/ResetPassword'
import NewResetPassword from './pages/authentifications/NewResetPassword'
import HomePage from './pages/HomePage'
import OneSignalManager from './services/oneSignal/OneSignalManager'
import PrescriptionDetail from './pages/prescriptions/PrescriptionDetail'
import ProfileDetail from './pages/profile/ProfileDetail'
import ProfileEdit from './pages/profile/ProfileEdit'
import { AccountPage } from './pages/setting/AccountPage'
import Header from './components/Header'
import ReviewSendDoctor from './pages/emails/ReviewSendDoctor'
import 'tippy.js/dist/tippy.css'
import { SubscriptionProvider } from './context/subscription'
import { Subscription } from './pages/subscription/Subscription'
import SubscriptionSuccess from './pages/subscription/SubscriptionSuccess'
import SubscriptionCancel from './pages/subscription/SubscriptionCancel'

library.add(fas, fab, far)

function App (): JSX.Element {
  return (
      <BrowserRouter>
        <TokenContextProvider>
          <ProfileContextProvider>
            <SubscriptionProvider>
            <OneSignalManager>
              <Header />
              <FlashMessageContextProvider>
                <FlashMessages />
                <Routes>
                  <Route path='*' element={<PageNotFound />} />
                  <Route path='/' element={<Navigate to='/login' />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/reset/password' element={<ResetPassword />} />
                  <Route path='/reset/password/:uid/:token' element={<NewResetPassword />} />
                  <Route element={<PrivateRoute />}>
                    {/* subscription */}
                    <Route path='/subscription' element={<Subscription />} />
                    <Route path='/success' element={<SubscriptionSuccess />} />
                    <Route path='/cancel' element={<SubscriptionCancel />} />
                    {/* Home */}
                    <Route path='/home' element={<HomePage />} />
                    {/* Profile */}
                    <Route path='/profile/edit' element={<ProfileEdit />} />
                    <Route path='/profile' element={<ProfileDetail />} />
                    {/* Setting */}
                    <Route path='/setting' element={<AccountPage />} />
                    {/* Patients */}
                    <Route path='/patients' element={<PatientsPage />} />
                    <Route
                      path='/patients/create'
                      element={<PatientCreatePage />}
                    />
                    <Route
                      path='/patients/edit/:id'
                      element={<PatientEdit />}
                    />
                    <Route path='/patients/:id' element={<PatientDetail />} />
                    {/* Prescriptions */}
                    <Route
                      path='/prescriptions'
                      element={<PrescriptionsPage />}
                    />
                    <Route
                      path='/prescriptions/edit/:id'
                      element={<PrescriptionEdit />}
                    />
                    <Route
                      path='/prescriptions/create'
                      element={<PrescriptionCreatePage />}
                    />
                    <Route
                      path='/prescriptions/:id'
                      element={<PrescriptionDetail />}
                    />
                    <Route 
                      path='/prescriptions/send/:prescriptionId' 
                      element={<ReviewSendDoctor />} />
                  </Route>
                </Routes>
                <Footer />
              </FlashMessageContextProvider>
            </OneSignalManager>
            </SubscriptionProvider>
          </ProfileContextProvider>
        </TokenContextProvider>
      </BrowserRouter>
  )
}

export default App
