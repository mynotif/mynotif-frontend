interface ProfileContainerProps {
  children: React.ReactNode
}

export const ProfileContainer = ({ children }: ProfileContainerProps): JSX.Element => (
  <div className='relative m-4 rounded-xl overflow-hidden'>
    {children}
  </div>
)
