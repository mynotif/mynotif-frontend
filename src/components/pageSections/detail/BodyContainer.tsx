interface BodyContainerProps {
  children: React.ReactNode
}

export const BodyContainer = ({ children }: BodyContainerProps): JSX.Element => {
  return (
    <div className='pt-4 space-y-4'>{children}</div>
  )
}
