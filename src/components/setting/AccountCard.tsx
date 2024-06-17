import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, useState } from 'react'
import ModalDelete from '../modal/ModalDelete'

interface AccountCardProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  title: string
  isDanger?: boolean
}

const AccountCard: FunctionComponent<AccountCardProps> = ({ onClick, title, isDanger }): JSX.Element => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (isDanger) {
      setShowModal(true)
    } else if (onClick != null) {
      onClick(e)
    }
  }

  const handleModalClose = (): void => {
    setShowModal(false)
  }

  const handleDelete = (e: React.MouseEvent<HTMLElement>): void => {
    setShowModal(false)
    if (onClick != null) {
      onClick(e)
    }
  }

  return (
    <div>
      {showModal && (
        <ModalDelete
          show={showModal}
          handleClose={handleModalClose}
          onDelete={handleDelete}
          confirmText='Veux tu vraiment te deconnecter ?'
          noSuccessText='Annuler'
          successText='Se deconnecter'
        />
      )}
      <div onClick={handleClick} className='cursor-pointer mt-4'>
        <div className='flex items-center justify-between p-3 border-b border-gray-300'>
          <h6 className='m-0'>{title}</h6>
          <FontAwesomeIcon icon={['fas', 'chevron-right']} />
        </div>
      </div>
    </div>
  )
}

export default AccountCard
