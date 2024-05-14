import { Image } from 'react-bootstrap'
import NavigationLink from './NavigationLink'

interface NavigationLinksProps {
  onMenuClick?: () => void
}

const NavigationLinks = ({ onMenuClick }: NavigationLinksProps): JSX.Element => (
  <div className='d-flex align-items-center gap-2'>
    <NavigationLink url='#' icon={['far', 'bell']} />
    <Image src='holder.js/171x180' roundedCircle />
  </div>
)

export default NavigationLinks
