import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface CardProps {
  count: number
  title: string
  onClick: () => void
}

export const Card = ({ count, title, onClick }: CardProps): JSX.Element => (
  <div className='bg-colorprimary rounded-lg p-4 flex justify-between items-center shadow-md'>
    <div>
      <p className='text-4xl font-bold text-white'>{count}</p>
      <p className='text-white'>{title}</p>
    </div>
    <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center' onClick={onClick}>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} className='text-black text-xl' />
    </div>
  </div>
)
