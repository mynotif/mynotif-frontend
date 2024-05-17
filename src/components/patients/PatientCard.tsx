import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PatientCard = (): JSX.Element => {
  return (
    <div className='bg-white rounded-lg p-4 shadow-md'>
      <div className='flex items-center space-x-4 mb-2'>
        <div className='bg-colorsecondary rounded-full w-20 h-20 flex items-center justify-center '>
          <FontAwesomeIcon icon={['fas', 'id-badge']} className='text-colorprimary text-3xl' />
        </div>
        <div>
          <h3 className='font-semibold'>James Smith</h3>
        </div>
      </div>
      <div className='mb-2'>
        <p className='font-semibold' />
      </div>
      <div className='flex flex-row items-baseline justify-center space-x-2 text-gray-600'>
        <FontAwesomeIcon icon={['fas', 'map-marker']} className='text-black text-xl' />
        <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
      </div>
    </div>
  )
}
