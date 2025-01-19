import React, { useContext, useState } from 'react'
import { ProfileContext } from '../../context/profile'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../utils/hooks'
import useTranslationHook from '../../hook/TranslationHook'
import { ChevronRightIcon, CreditCard, EditIcon, LogOutIcon, UserIcon } from 'lucide-react'
import Tippy from '@tippyjs/react'
import { Container } from '../../components/home/Container'
import LogoutModal from '../../components/modal/LogoutModal'

export const AccountPage = (): JSX.Element => {
  const { profile } = useContext(ProfileContext)
  const fullName = `${profile?.email ?? ''}`
  const navigate = useNavigate()
  const logout = useLogout()
  const { t } = useTranslationHook()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const accountActions = [
    {
      icon: EditIcon,
      label: t('navigation.account'),
      onClick: () => navigate('/profile'),
      variant: 'default'
    },
    {
      icon: CreditCard,
      label: t('navigation.subscription'),
      onClick: () => navigate('/subscription'),
      variant: 'default'
    },
    {
      icon: LogOutIcon,
      label: t('navigation.logout'),
      onClick: () => setShowLogoutModal(true),
      variant: 'danger'
    }
  ]

  return (
    <Container>
      {showLogoutModal && (
        <LogoutModal
          show={showLogoutModal}
          onConfirm={logout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
      <div className="space-y-6">
        <div className="flex items-center justify-center flex-col">
          <div className="bg-colorprimary/10 rounded-full w-24 h-24 flex items-center justify-center mb-4">
            <UserIcon className="text-colorprimary w-12 h-12" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{fullName}</h2>
          </div>
        </div>

        <div className="space-y-4">
          {accountActions.map((action, index) => (
            <div
              key={index}
              onClick={action.onClick}
              className={`
                bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-4
                flex items-center justify-between cursor-pointer
                hover:bg-white/20 transition-colors
                ${action.variant === 'danger' ? 'text-red-500 hover:bg-red-50' : 'text-colorprimary'}
              `}
            >
              <div className="flex items-center space-x-3">
                <action.icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </div>
              <Tippy disabled>
                <span><ChevronRightIcon className="w-5 h-5 text-gray-400" /></span>
              </Tippy>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
