import { useContext } from 'react'
import { useIsLoggedIn } from '../utils/hooks'
import { ProfileContext } from '../context/profile'
import useTranslationHook from '../hook/TranslationHook'
import FooterNav from './FooterNav'
import { Container, Navbar } from 'react-bootstrap'
import { BACKEND_URL } from '../services/constants'
import { useProfile } from '../hook/profile.hook'

const Footer = (): JSX.Element => {
  const { profile } = useContext(ProfileContext)
  const { t } = useTranslationHook()

  useProfile()

  return (
    <Navbar className='shadow-lg' fixed='bottom' bg='body' data-bs-theme='light'>
      <Container>
        {useIsLoggedIn() === true && (
          <>
            {profile.is_staff && (
              <FooterNav url={`${BACKEND_URL}/admin`} icon='user-shield' title={t('text.admin')} />
            )}
            <FooterNav url='/home' icon='house' title={t('text.home')} />
            <FooterNav url='/patients' icon='users' title={t('text.patients')} />
            <FooterNav url='/prescriptions' icon='file-medical' title={t('text.prescription')} />
            <FooterNav url='/account' icon='user-nurse' title={t('text.profile')} />
          </>
        )}
      </Container>
    </Navbar>
  )
}

export default Footer
