import { Link } from 'react-router-dom'

interface RegisterLinkProps {
  textcontent: string
  textAnchor: string
}

export const RegisterLink = ({ textAnchor, textcontent }: RegisterLinkProps): JSX.Element => (
  <p className='text-center text-gray-500 mt-3'>
    {textcontent + ' '}
    <Link to='/register' className='text-colorprimary font-bold no-underline hover:text-colorprimary'>
      {textAnchor}
    </Link>
  </p>
)
