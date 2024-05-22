interface ButtonProps {
  text: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}

export const Button = ({ text, onClick }: ButtonProps): JSX.Element => {
  return (
    <div className='flex justify-center items-center mt-4'>
      <button
        type='submit'
        className='bg-colorprimary text-white font-semibold w-100 h-12 py-2 px-8 rounded-lg'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}
