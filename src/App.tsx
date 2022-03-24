import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { TokenContextProvider } from './context/token'
import { ErrorContextProvider } from './context/error'
import Header from './components/Header'
import Errors from './components/Errors'
import Home from './pages/Home'
import PatientsPage from './pages/PatientsPage'
import PatientCreatePage from './pages/PatientCreatePage'
import PrescriptionsPage from './pages/PrescriptionsPage'
import ProfilePage from './pages/ProfilePage'

library.add(fas, fab, far)

function App (): JSX.Element {
  return (
    <div className='App'>
      <BrowserRouter>
        <TokenContextProvider>
          <ErrorContextProvider>
            <Header />
            <Container>
              <Errors />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/patients' element={<PatientsPage />} />
                <Route path='/patients/:id' element={<PatientCreatePage />} />
                <Route path='/prescriptions' element={<PrescriptionsPage />} />
              </Routes>
            </Container>
          </ErrorContextProvider>
        </TokenContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
