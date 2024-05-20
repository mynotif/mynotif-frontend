interface CardListProps {
  children: React.ReactNode
}

export const CardList = ({ children }: CardListProps): JSX.Element => {
  return (
    <div className='mt-4 space-y-4'>
      {children}
    </div>
  )
}
