import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

interface AccountCardProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  title: string
}

const AccountCard: FunctionComponent<AccountCardProps> = ({ onClick, title }): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (onClick != null) {
      onClick(e)
    }
  }

  return (
    <div onClick={handleClick} className='cursor-pointer mt-4'>
      <div className='flex items-center justify-between p-3 border-b border-gray-300'>
        <h6 className='m-0'>{title}</h6>
        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
      </div>
    </div>
  )
}

export default AccountCard
