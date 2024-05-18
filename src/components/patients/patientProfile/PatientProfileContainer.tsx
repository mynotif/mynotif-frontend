interface PatientProfileContainerProps {
  children: React.ReactNode
}

export const PatientProfileContainer = ({ children }: PatientProfileContainerProps): JSX.Element => (
  <div className='relative m-4 rounded-xl overflow-hidden'>
    {children}
  </div>
)
