import React, { useContext } from 'react'
import { ProfileContainer } from '../../components/pageSections/ProfileContainer'
import AvatarCircle from '../../components/AvatarCircle'
import { ProfileContext } from '../../context/profile'
import AccountCard from '../../components/setting/AccountCard'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../utils/hooks'
import useTranslationHook from '../../hook/TranslationHook'

export const AccountPage = (): JSX.Element => {
  const { profile } = useContext(ProfileContext)
  const initials = (profile?.first_name?.charAt(0) ?? '').toUpperCase() + (profile?.last_name?.charAt(0) ?? '').toUpperCase()
  const fullName = `${profile?.email ?? ''}`
  const navigate = useNavigate()
  const logout = useLogout()
  const onLogoutClick = (e: React.MouseEvent<HTMLElement>): void => logout()
  const { t } = useTranslationHook()

  const onAccountDetail = (): void => {
    navigate('/profile')
  }
  return (
    <>
      <ProfileContainer className='h-screen space-y-6 bg-gray-50 m-0'>
        <div className='relative pt-16 pb-8'>
          <div />
          <div className='flex justify-center'>
            <AvatarCircle initials={initials} size={100} fontSize={32} />
          </div>
          <div className='text-center mt-4 text-black'>
            <h2 className='text-2xl font-semibold'>{fullName}</h2>
          </div>
        </div>
        <AccountCard title='Account' onClick={onAccountDetail} />
        <AccountCard title={t('navigation.logout')} onClick={onLogoutClick} isDanger/>
      </ProfileContainer>
    </>

  )
}
