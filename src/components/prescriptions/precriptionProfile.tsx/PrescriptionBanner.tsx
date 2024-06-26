import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AvatarCircle from '../../AvatarCircle'

interface PrescriptionBannerProps {
  onEditClick: () => void
  fullName: string
  initials: string
}

export const PrescriptionBanner = ({ onEditClick, initials, fullName }: PrescriptionBannerProps): JSX.Element => {
  return (
    <div className='relative bg-colorprimary rounded-b-lg pt-16 pb-8'>
      <div
        className='absolute top-1 right-5 bg-colorsecondary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer'
        onClick={onEditClick}
      >
        <FontAwesomeIcon icon={['fas', 'pencil-alt']} size='lg' />
      </div>
      <div className='flex justify-center'>
        <AvatarCircle initials={initials} size={90} fontSize={32} />
      </div>
      <div className='text-center mt-4 text-white'>
        <h2 className='text-2xl font-semibold'>{fullName}</h2>
      </div>
    </div>
  )
}
