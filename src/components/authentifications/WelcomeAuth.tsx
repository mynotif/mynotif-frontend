interface WelcomeAuthProps {
  title: string
  description?: string
}

export const WelcomeAuth = ({ title, description }: WelcomeAuthProps): JSX.Element => {
  return (
    <div className='flex flex-col items-center'>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
