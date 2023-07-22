import NavigationLink from './NavigationLink'

const NavigationLinks: React.FC = () => (
  <div className='d-flex align-items-center gap-2'>
    <NavigationLink url='#' icon={['far', 'bell']} />
    <NavigationLink url='#' icon={['fas', 'bars']} />
  </div>
)

export default NavigationLinks
