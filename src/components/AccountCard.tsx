import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

interface AccountCardProps {
  onClick: () => void
  title: string
}

const AccountCard: FunctionComponent<AccountCardProps> = ({ onClick, title }): JSX.Element => (
  <div onClick={onClick} className='link-dark' style={{ cursor: 'pointer' }}>
    <div className='bg-white d-flex align-items-center justify-content-between p-3 border-bottom'>
      <h6 className='m-0'>{title}</h6>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} />
    </div>
  </div>
)

export default AccountCard
