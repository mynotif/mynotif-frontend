import { useNavigate } from 'react-router-dom'
import Prescriptions from '../components/Prescriptions'
import usePrescription from '../hook/prescription.hook'

const PrescriptionsPage = (): JSX.Element => {
  const [prescriptions, deletePrescriptionById] = usePrescription()
  const navigate = useNavigate()

  const onDelete = async (id: number): Promise<void> => {
    await deletePrescriptionById(id)
  }

  const onEdit = async (id: number): Promise<void> => {
    navigate(`/prescriptions/${id}`)
  }

  return <Prescriptions prescriptions={prescriptions} onDelete={onDelete} onEdit={onEdit} />
}

export default PrescriptionsPage
