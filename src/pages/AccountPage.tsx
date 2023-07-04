import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container, Card, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../hook/TranslationHook'
import Logout from '../components/Logout'

const AccountPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()

  const goToProfile = (): void => {
    navigate('/account/profile')
  }
  return (
    <>
      <div className='d-flex flex-column align-items-center justify-content-center py-4'>
        <h1>{t('title.myAccount')}</h1>
        <Badge bg='secondary'>{t('text.standardAccount')}</Badge>
      </div>
      <Container onClick={goToProfile} className='d-flex justify-content-center align-items-center mt-5 cursor-pointer'>
        <Card className='text-center w-75 rounded-pill'>
          <Card.Body className='d-flex align-items-center justify-content-between'>
            <Card.Title className='d-flex align-self-center'>
              <FontAwesomeIcon className='me-3' icon={['fas', 'user-nurse']} />
              <small>
                {t('title.profile')}
                <FontAwesomeIcon className='align-self-center ms-2' icon={['fas', 'angle-right']} />
              </small>
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
      <Container onClick={() => { }} className='d-flex justify-content-center align-items-center mt-5 cursor-pointer'>
        <Card className='text-center w-75 rounded-pill'>
          <Card.Body className='d-flex align-items-center justify-content-between'>
            <Card.Title className='d-flex align-self-center'>
              <FontAwesomeIcon className='me-3' icon={['fas', 'bell']} />
              <small>
                {t('text.notifications')}
                <FontAwesomeIcon className='align-self-center ms-2' icon={['fas', 'angle-right']} />
              </small>
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
      <Container onClick={() => { }} className='d-flex justify-content-center align-items-center mt-5 cursor-pointer'>
        <Card className='text-center w-75 rounded-pill'>
          <Card.Body className='d-flex align-items-center justify-content-between'>
            <Card.Title className='d-flex align-self-center'>
              <FontAwesomeIcon className='me-3' icon={['fas', 'headset']} />
              <small>
                {t('text.supportHelp')}
                <FontAwesomeIcon className='align-self-center ms-2' icon={['fas', 'angle-right']} />
              </small>
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
      <Container onClick={() => { }} className='d-flex justify-content-center align-items-center mt-5 cursor-pointer'>
        <Card className='text-center w-75 rounded-pill'>
          <Card.Body className='d-flex align-items-center justify-content-between'>
            <Card.Title className='d-flex align-self-center'>
              <FontAwesomeIcon className='me-3' icon={['fas', 'scale-balanced']} />
              <small>
                {t('text.legalNotices')}
                <FontAwesomeIcon className='align-self-center ms-2' icon={['fas', 'angle-right']} />
              </small>
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
      <Container className='d-flex justify-content-center align-items-center mt-5 '>
        <Logout />
      </Container>
    </>

  )
}

export default AccountPage
