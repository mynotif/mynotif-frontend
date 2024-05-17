interface ExpirationBannerProps {
  expiration: string
}

export const ExpirationBanner = ({ expiration }: ExpirationBannerProps): JSX.Element => (
  <div className='flex justify-between items-center mb-4 mt-6'>
    <h2 className='text-lg font-semibold'>{expiration}</h2>
  </div>
)
