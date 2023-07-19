import { useContext } from 'react'
import { ProfileContext } from '../context/profile'
import useTranslationHook from '../hook/TranslationHook'

const HeaderProfile: React.FC = () => {
  const { profile } = useContext(ProfileContext)
  const { t } = useTranslationHook()

  return (
    <div className='ms-5'>
      <div className='ps-1'>
        <p className='text-warning fw-bold m-0'>{t('text.welcome')}</p>
        <p className='fw-bold mb-0 text-primary'>{t('text.hey')}, {profile.username}</p>
      </div>
    </div>
  )
}

export default HeaderProfile
