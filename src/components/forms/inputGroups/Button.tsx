import { ClipLoader } from 'react-spinners'

interface ButtonProps {
  text: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
  isLoading?: boolean
}

export const Button = ({ text, onClick, isLoading }: ButtonProps): JSX.Element => {
  return (
    <div className='flex justify-center items-center mt-4'>
      <button
        type='submit'
        className='bg-colorprimary text-white font-semibold w-100 h-12 py-2 px-8 rounded-lg'
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading !== null && isLoading &&
          <div>
            <ClipLoader color='#fff' size={30} />
          </div>}
        {text}
      </button>
    </div>
  )
}
