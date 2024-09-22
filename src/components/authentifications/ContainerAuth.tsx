import clsx from "clsx"

interface ContainerAuthProps {
  children: React.ReactNode
  className?: string
}

export const ContainerAuth = ({ children, className }: ContainerAuthProps): JSX.Element => (
  <main className={clsx(className, 'h-screen bg-gray-50 flex flex-col items-center justify-start pt-10 space-y-6')}>
    {children}
  </main>
)
