import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const useTranslationHook = (): { t: Function } => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const changeLanguage = async (lng: string): Promise<void> => {
      try {
        await i18n.changeLanguage(lng)
      } catch (error) {
        // Manage language change errors
        console.error('Failed to change language:', error)
      }
    }

    const lng = navigator.language
    changeLanguage(lng)
  }, [i18n])

  return { t }
}

export default useTranslationHook
