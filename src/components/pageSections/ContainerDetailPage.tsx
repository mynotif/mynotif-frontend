interface ContainerDetailPageProps {
  children: React.ReactNode
}

export const ContainerDetailPage = ({ children }: ContainerDetailPageProps): JSX.Element => (
  <div className='min-h-screen flex flex-col bg-gray-100'>{children}</div>
)
