import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTranslationHook from '../hook/TranslationHook'
import { Profile } from '../types'

interface PersonalInfoProps {
  profile: Profile
  onEdit: () => void
}

const PersonalInfo = ({ profile, onEdit }: PersonalInfoProps): JSX.Element => {
  const { t } = useTranslationHook()

  return (
    <div className='bg-white rounded-3 px-3 pt-3 overflow-hidden shadow mb-3'>
      <div className='d-flex align-items-center justify-content-between'>
        <h6>
          {t('title.personalInfo')}
        </h6>
        <FontAwesomeIcon icon={['fas', 'pen-to-square']} size='lg' className='text-primary h6' onClick={onEdit} />
      </div>
      <div className='d-flex'>
        <div className='col'>
          <p><span className='text-muted small'>{t('text.name')}</span><br />{profile.first_name}</p>
        </div>
        <div className='col'>
          <p><span className='text-muted small'>{t('text.surName')}</span><br />{profile.last_name}</p>
        </div>
      </div>
      <div className='d-flex'>
        <div className='col'>
          <p><span className='text-muted small'>{t('text.email')}</span><br />{profile.email}</p>
        </div>
        <div className='col'>
          <p><span className='text-muted small'>{t('text.phone')}</span><br />06886***37</p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
