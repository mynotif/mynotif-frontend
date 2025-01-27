import clsx from "clsx"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container = ({ children, className }: ContainerProps): JSX.Element => (
  <main className={clsx(className, 'px-4 py-24 bg-gradient-to-br from-colorsecondary via-colorsecondary to-shade3 min-h-screen')}>
    {children}
  </main>
)
