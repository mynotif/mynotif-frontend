import clsx from "clsx"

interface ProfileContainerProps {
  children: React.ReactNode
  className?: string
}

export const ProfileContainer = ({ children, className }: ProfileContainerProps): JSX.Element => (
  <div className={clsx(className,'relative mx-4 mt-4 rounded-xl overflow-hidden')}>
    {children}
  </div>
)
