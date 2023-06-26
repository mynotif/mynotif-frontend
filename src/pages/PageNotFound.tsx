import React from 'react'
import { Link } from 'react-router-dom'
import useTranslationHook from '../hook/TranslationHook'

const PageNotFound = (): JSX.Element => {
  const { t } = useTranslationHook()

  return (
    <div>
      {/* TO DO Display image */}
      <h1>{t('title.pageNotFound')}</h1>
      <Link to='/login'>
        {t('navigation.return')}
      </Link>
    </div>
  )
}

export default PageNotFound
