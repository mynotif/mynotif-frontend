import { useContext } from 'react'
import { Container, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import Logout from '../../components/Logout'
import AccountCard from '../../components/AccountCard'
import { ProfileContext } from '../../context/profile'
import PersonalInfo from '../../components/PersonalInfo'

const AccountPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const { profile } = useContext(ProfileContext)

  const onEdit = (): void => {
    navigate('/account/profile')
  }

  return (
    <div className='my-auto'>
      <div className='d-flex flex-column align-items-center justify-content-center py-4'>
        <Badge bg='secondary'>{t('text.standardAccount')}</Badge>
      </div>
      <div className='p-3'>
        <PersonalInfo profile={profile} onEdit={onEdit} />
        <div className='rounded-3 shadow overflow-hidden'>
          <AccountCard onClick={() => { }} title={t('text.notifications')} />
          <AccountCard onClick={() => { }} title={t('text.supportHelp')} />
          <AccountCard onClick={() => { }} title={t('text.legalNotices')} />
        </div>
      </div>
      <Container className='d-flex justify-content-center align-items-center mt-5 '>
        <Logout />
      </Container>
    </div>
  )
}

export default AccountPage
