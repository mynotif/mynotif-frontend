import HomeCard from '../components/HomeCard'

const HomePage = (): JSX.Element => (
  <div className='my-auto overflow-auto'>
    <div className='p-3 mb-2'>
      <div className='row row-cols-2 row-cols-md-4 g-2'>
        <HomeCard href='#' imgSrc='img/home/schedule.png' title='Appointments' />
        <HomeCard href='/prescriptions' imgSrc='img/home/prescription.png' title='Prescriptions' />
        <HomeCard href='#' imgSrc='img/home/doctor.png' title='Doctors' />
        <HomeCard href='/patients' imgSrc='img/home/medicine.png' title='Patients' />
      </div>
    </div>
  </div>
)

export default HomePage
