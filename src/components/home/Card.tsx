interface CardProps {
  count: number
  title: string
}

export const Card = ({ count, title }: CardProps): JSX.Element => (
  <div className='bg-colorprimary text-white rounded-lg p-4 shadow flex justify-between items-center'>
    <div>
      <h2 className='text-2xl font-bold'>{count}</h2>
      <p className='text-sm'>{title}</p>
    </div>
  </div>
)
