import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { TokenContextProvider } from './context/token'
import Header from './components/Header'
import Home from './pages/Home'
import PatientsPage from './pages/PatientsPage'

library.add(fas, fab, far)

function App (): JSX.Element {
  return (
    <div className='App'>
      <BrowserRouter>
        <TokenContextProvider>
          <Header />
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/patient' element={<PatientsPage />} />
            </Routes>
          </Container>
        </TokenContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
