import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container, Card, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../hook/TranslationHook'

const AccountPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()

  const goToProfile = (): void => {
    navigate('/account/profile')
  }
  return (
    <>
      <Container>
        <div>
          <h1 className='h1'>{t('title.myAccount')}</h1>
          <p className='hstack'>
            <Badge bg='secondary'>{t('text.standardAccount')}</Badge>
          </p>
        </div>
      </Container>
      <Container style={{ cursor: 'pointer' }} onClick={goToProfile} className='d-flex justify-content-center align-items-center mt-5'>
        <Card className='text-center w-75' style={{ borderRadius: '15px' }}>
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
      <Container style={{ cursor: 'pointer' }} onClick={() => {}} className='d-flex justify-content-center align-items-center mt-5'>
        <Card className='text-center w-75' style={{ borderRadius: '15px' }}>
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
      <Container style={{ cursor: 'pointer' }} onClick={() => {}} className='d-flex justify-content-center align-items-center mt-5'>
        <Card className='text-center w-75' style={{ borderRadius: '15px' }}>
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
      <Container style={{ cursor: 'pointer' }} onClick={() => {}} className='d-flex justify-content-center align-items-center mt-5'>
        <Card className='text-center w-75' style={{ borderRadius: '15px' }}>
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
    </>

  )
}

export default AccountPage
