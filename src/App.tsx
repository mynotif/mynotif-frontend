import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
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
import Header from './components/Header'

library.add(fas, fab, far)

function App (): JSX.Element {
  return (
    <div className='App bg-light'>
      <BrowserRouter>
        <TokenContextProvider>
          <ProfileContextProvider>
            <FlashMessageContextProvider>
              <Header />
              <Container className='mb-5 pb-5'>
                <FlashMessages />
                <Routes>
                  <Route path='*' element={<PageNotFound />} />
                  <Route path='/' element={<Navigate to='/login' />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/reset/password' element={<ResetPassword />} />
                  <Route path='/reset/password/:uid/:token' element={<NewResetPassword />} />
                  <Route element={<PrivateRoute />}>
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
                      path='/prescriptions/:id'
                      element={<PrescriptionEdit />}
                    />
                    <Route
                      path='/prescriptions/create'
                      element={<PrescriptionCreatePage />}
                    />
                  </Route>
                </Routes>
              </Container>
              <Footer />
            </FlashMessageContextProvider>
          </ProfileContextProvider>
        </TokenContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
