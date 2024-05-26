import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import { ProfileContext } from '../../context/profile'
import { ContainerDetailPage } from '../../components/pageSections/ContainerDetailPage'
import Header from '../../components/Header'
import { ProfileContainer } from '../../components/pageSections/ProfileContainer'
import { BannerDetail } from '../../components/pageSections/detail/BannerDetail'
import { BodyContainer } from '../../components/pageSections/detail/BodyContainer'
import { CardDetail } from '../../components/pageSections/detail/CardDetail'
import { ClipLoader } from 'react-spinners'

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
        <ContainerDetailPage>
          <Header />
          <div className='flex-grow overflow-y-auto'>
            <ProfileContainer>
              <BannerDetail fullName={fullName} initials={initials} onEditClick={onEdit} />
              <BodyContainer>
                <CardDetail icon={['fas', 'user']} content={profile.username} title={t('form.userName')} />
                <CardDetail icon={['fas', 'user']} content={profile.first_name} title={t('form.firstName')} />
                <CardDetail icon={['fas', 'user']} content={profile.last_name} title={t('form.lastName')} />
                <CardDetail icon={['fas', 'phone']} content={profile.email} title={t('form.emailAddress')} />
              </BodyContainer>
            </ProfileContainer>
          </div>
          <div className='bg-white p-4 mt-8 relative z-10 shadow-sm' />
        </ContainerDetailPage>
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
