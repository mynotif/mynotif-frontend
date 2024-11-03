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

  const initials = (profile?.first_name?.charAt(0) ?? '').toUpperCase() + (profile?.last_name?.charAt(0) ?? '').toUpperCase()
  const fullName = `${profile?.email ?? ''}`

  return (
    <>
      {profile !== null ? (
        <Container className=''>
          <BannerDetail fullName={fullName} initials={initials} onEditClick={onEdit} />
          <CardDetail icon={['fas', 'address-card']} content={profile.first_name} defaultContent='Prénom manquant' title={t('form.firstName')} />
          <CardDetail icon={['fas', 'address-card']} content={profile.last_name} defaultContent='Nom manquant' title={t('form.lastName')} />
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
