import React from 'react'
import { Container, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import Logout from '../../components/Logout'
import AccountCard from '../../components/AccountCard'

const AccountPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()

  const goToProfile = (): void => {
    navigate('/account/profile')
  }
  return (
    <>
      <div className='d-flex flex-column align-items-center justify-content-center mt-5 py-4'>
        <Badge bg='secondary'>{t('text.standardAccount')}</Badge>
      </div>
      <Container className='d-flex flex-column justify-content-center align-items-center mt-5 cursor-pointer'>
        <AccountCard onClick={goToProfile} icon={['fas', 'user-nurse']} title={t('title.profile')} />
        <AccountCard onClick={() => { }} icon={['fas', 'bell']} title={t('text.notifications')} />
        <AccountCard onClick={() => { }} icon={['fas', 'headset']} title={t('text.supportHelp')} />
        <AccountCard onClick={() => { }} icon={['fas', 'scale-balanced']} title={t('text.legalNotices')} />
      </Container>
      <Container className='d-flex justify-content-center align-items-center mt-5 '>
        <Logout />
      </Container>
    </>

  )
}

export default AccountPage
