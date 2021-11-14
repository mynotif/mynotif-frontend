import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Header from './components/Header'
import PatientsPage from './pages/PatientsPage.jsx'

library.add(fas, fab, far)

function App (): JSX.Element {
  return (
    <div className='App'>
      <Header />
      <Container>
        <PatientsPage />
      </Container>
    </div>
  )
}

export default App
