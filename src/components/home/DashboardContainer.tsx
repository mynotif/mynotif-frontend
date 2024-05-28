interface DashboardContainerProps {
  children: React.ReactNode
}

export const DashboardContainer = ({ children }: DashboardContainerProps): JSX.Element => (
  <div className='bg-gray-50 px-4 pt-4 relative z-10 h-screen -mt-60 rounded-t-2xl'>
    {children}
  </div>
)
