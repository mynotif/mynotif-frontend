import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core'
import React, { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'

interface AccountCardProps {
  onClick: () => void
  icon: [IconPrefix, IconName]
  title: string
}
const AccountCard: FunctionComponent<AccountCardProps> = ({ onClick, title, icon }): JSX.Element => {
  return (
    <Card onClick={onClick} className='text-center w-75 border-white'>
      <Card.Body className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <FontAwesomeIcon className='me-2' icon={icon} />
          {title}
        </div>
        <div className='ms-auto'>
          <FontAwesomeIcon className='align-self-center' icon={['fas', 'angle-right']} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default AccountCard
