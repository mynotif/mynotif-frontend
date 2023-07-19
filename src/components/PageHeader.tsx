import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav } from 'react-bootstrap'
interface PageHeaderProps {
  url: string
  title: string
}

const PageHeader = ({ url, title }: PageHeaderProps): JSX.Element => (
  <div className='ms-5'>
    <div className='ps-1 d-flex align-items-center justify-content-between mb-auto'>
      <Nav.Link as={Link} to={url}>
        <FontAwesomeIcon icon={['fas', 'arrow-left']} className='text-dark' />
      </Nav.Link>
      <h6 className='mb-0 ms-3 me-auto fw-bold'>{title}</h6>
    </div>
  </div>
)

export default PageHeader
