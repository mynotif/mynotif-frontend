interface PatientPageContainerProps {
  children: React.ReactNode
}

export const PatientPageContainer = ({ children }: PatientPageContainerProps): JSX.Element => (
  <div className='flex-grow overflow-auto'>{children}</div>
)
