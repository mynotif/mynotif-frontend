interface PatientBodyContainerProps {
  children: React.ReactNode
}

export const PatientBodyContainer = ({ children }: PatientBodyContainerProps): JSX.Element => {
  return (
    <div className='pt-4 space-y-4'>{children}</div>
  )
}
