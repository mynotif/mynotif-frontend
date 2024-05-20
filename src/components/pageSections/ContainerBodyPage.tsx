interface ContainerBodyPageProps {
  children: React.ReactNode
}

export const ContainerBodyPage = ({ children }: ContainerBodyPageProps): JSX.Element => (
  <div className='flex-grow overflow-auto'>{children}</div>
)
