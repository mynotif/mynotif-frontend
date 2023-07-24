import NavigationLink from './NavigationLink'

interface NavigationLinksProps {
  onMenuClick?: () => void
}

const NavigationLinks = ({ onMenuClick }: NavigationLinksProps): JSX.Element => (
  <div className='d-flex align-items-center gap-2'>
    <NavigationLink url='#' icon={['far', 'bell']} />
    <NavigationLink url='#' icon={['fas', 'bars']} onClick={onMenuClick} />
  </div>
)

export default NavigationLinks
