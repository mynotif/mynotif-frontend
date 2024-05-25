import { Link } from 'react-router-dom'

interface HomeCardProps {
  href: string
  imgSrc: string
  title: string
}

const HomeCard = ({ href, imgSrc, title }: HomeCardProps): JSX.Element => (
  <div className='col'>
    <div className='bg-white text-center rounded-4 p-2 shadow-sm'>
      <Link to={href} className='link-dark text-decoration-none'>
        <img src={imgSrc} alt={title} className='img-fluid px-2' />
        <p className='text-truncate small pt-2 m-0'>{title}</p>
      </Link>
    </div>
  </div>
)

export default HomeCard
