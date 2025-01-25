import React, { useContext } from 'react'
import { Container } from '../../components/home/Container'
import { ProfileContext } from '../../context/profile'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import { EditIcon, UserIcon } from 'lucide-react'
import { InfoRow } from '../../components/pageSections/detail/InfoRow'
import { Loading } from '../../components/loading/Loading'

const ProfileDetail = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const { profile } = useContext(ProfileContext)

  const onEdit = (): void => {
    navigate('/profile/edit')
  }

  return (
    <Container>
      {profile ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-colorprimary/10 rounded-full w-12 h-12 flex items-center justify-center">
                <UserIcon className="text-colorprimary w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {profile.first_name} {profile.last_name}
                </h2>
                <p className="text-sm text-gray-500">{t('text.profile')}</p>
              </div>
            </div>
            <button
              onClick={onEdit}
              className="bg-colorsecondary text-colorprimary px-3 py-2 rounded-lg hover:bg-shade3 transition-colors flex items-center space-x-2"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                {t('title.personalInformation')}
              </h3>
              <div className="space-y-3">
                <InfoRow
                  label={t('form.firstName')}
                  value={profile.first_name}
                />
                <InfoRow
                  label={t('form.lastName')}
                  value={profile.last_name}
                />
                <InfoRow
                  label={t('form.emailAddress')}
                  value={profile.email}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

export default ProfileDetail
