interface ResetPasswordLinkProps {
  content: string
}

export const ResetPasswordLink = ({ content }: ResetPasswordLinkProps): JSX.Element => (
  <div className='flex justify-end mr-6'>
    <a href='/reset/password' className='text-gray-500 text-sm no-underline hover:text-colorprimary'>
      <span>{content}</span>
    </a>
  </div>
)
