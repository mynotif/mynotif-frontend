import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import { ProfileContext } from '../../context/profile'
import { BannerDetail } from '../../components/pageSections/detail/BannerDetail'
import { CardDetail } from '../../components/pageSections/detail/CardDetail'
import { ClipLoader } from 'react-spinners'
import { Container } from '../../components/home/Container'

const ProfileDetail = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const { profile } = useContext(ProfileContext)

  const onEdit = (): void => {
    navigate('/profile/edit')
  }

  const initials = (profile?.username?.charAt(0) ?? '').toUpperCase() + (profile?.username?.charAt(1) ?? '').toUpperCase()
  const fullName = `${profile?.username ?? ''}`

  return (
    <>
      {profile !== null ? (
        <Container className=''>
          <BannerDetail fullName={fullName} initials={initials} onEditClick={onEdit} />
          <CardDetail icon={['fas', 'user']} content={profile.username} title={t('form.userName')} />
          <CardDetail icon={['fas', 'user']} content={profile.first_name} title={t('form.firstName')} />
          <CardDetail icon={['fas', 'user']} content={profile.last_name} title={t('form.lastName')} />
          <CardDetail icon={['fas', 'phone']} content={profile.email} title={t('form.emailAddress')} />
        </Container>
      ) : (
        <div className='flex justify-center items-center min-h-screen'>
          <div className='border-4 border-t-4 border-colorprimary rounded-full w-12 h-12 animate-spin'>
            <ClipLoader loading color='#000' />
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileDetail
