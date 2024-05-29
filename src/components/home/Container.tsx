import clsx from "clsx"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container = ({ children, className }: ContainerProps): JSX.Element => (
  <main className={clsx(className, 'mt-20 px-4')}>
    {children}
  </main>
)
