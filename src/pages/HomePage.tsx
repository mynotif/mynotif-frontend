import Header from '../components/Header'
import HomeCard from '../components/HomeCard'

const HomePage = (): JSX.Element => (

  <div className='my-auto'>
    <Header />
    <div className='p-3 mb-2'>
      <div className='row'>
        <HomeCard href='/prescriptions' imgSrc='img/home/prescription.png' title='Prescriptions' />
        <HomeCard href='/patients' imgSrc='img/home/medicine.png' title='Patients' />
      </div>
    </div>
  </div>
)

export default HomePage
