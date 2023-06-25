import { Button } from 'react-bootstrap'
import { useLogout } from '../utils/hooks'
import useTranslationHook from '../hook/TranslationHook'

const Logout = (): JSX.Element => {
  // TODO: ideally hit the backend to invalidate the token too
  const logout = useLogout()
  const onLogoutClick = (e: React.MouseEvent<HTMLElement>): void => logout()
  const { t } = useTranslationHook()

  return (
    <Button type='submit' onClick={onLogoutClick}>
      {t('navigation.logout')}
    </Button>
  )
}

export default Logout
