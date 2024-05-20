import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { TokenContextProvider } from './context/token'
import { FlashMessageContextProvider } from './context/flashmessage'
import { ProfileContextProvider } from './context/profile'
import Footer from './components/Footer'
import FlashMessages from './components/flashMessages/FlashMessages'
import PatientsPage from './pages/patients/PatientsPage'
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage'
import PrescriptionEdit from './pages/prescriptions/PrescriptionEdit'
import ProfilePage from './pages/accounts/ProfilePage'
import PatientDetail from './pages/patients/PatientDetail'
import PageNotFound from './pages/PageNotFound'
import PatientEdit from './pages/patients/PatientEdit'
import PatientCreatePage from './pages/patients/PatientCreatePage'
import PrivateRoute from './components/PrivateRoute'
import PrescriptionCreatePage from './pages/prescriptions/PrescriptionCreatePage'
import LoginPage from './pages/authentifications/LoginPage'
import RegisterPage from './pages/authentifications/RegisterPage'
import AccountPage from './pages/accounts/AccountPage'
import './App.css'
import ResetPassword from './pages/authentifications/ResetPassword'
import NewResetPassword from './pages/authentifications/NewResetPassword'
import HomePage from './pages/HomePage'
import OneSignalManager from './services/oneSignal/OneSignalManager'
import PrescriptionDetail from './pages/prescriptions/PrescriptionDetail'

library.add(fas, fab, far)

function App (): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <TokenContextProvider>
          <ProfileContextProvider>
            <OneSignalManager>
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
                    {/* Home */}
                    <Route path='/home' element={<HomePage />} />
                    {/* Account */}
                    <Route path='/account/profile' element={<ProfilePage />} />
                    <Route path='/account' element={<AccountPage />} />
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
                  </Route>
                </Routes>
                <Footer />
              </FlashMessageContextProvider>
            </OneSignalManager>
          </ProfileContextProvider>
        </TokenContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
