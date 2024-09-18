import { Link } from 'react-router-dom'

interface AuthLinkProps {
  textcontent: string
  textAnchor: string
  urlRedirect: string
}

export const AuthLink = ({ textAnchor, textcontent, urlRedirect }: AuthLinkProps): JSX.Element => (
  <p className='text-center text-gray-500 mt-3'>
    {textcontent + ' '}
    <Link to={'/'+ urlRedirect} className='text-colorprimary font-bold no-underline hover:text-colorprimary'>
      {textAnchor}
    </Link>
  </p>
)
