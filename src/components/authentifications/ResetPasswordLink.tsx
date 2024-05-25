import { Link } from 'react-router-dom'

interface ResetPasswordLinkProps {
  content: string
}

export const ResetPasswordLink = ({ content }: ResetPasswordLinkProps): JSX.Element => (
  <div className='flex justify-end mr-6'>
    <Link to='/reset/password' className='text-gray-500 text-sm no-underline hover:text-colorprimary'>
      <span>{content}</span>
    </Link>
  </div>
)
