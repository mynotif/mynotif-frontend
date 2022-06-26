import { Prescription } from '../types'
import { FunctionComponent } from 'react'
import { getValidOrLastPrescription } from '../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

interface PatientLineProps {
  id: number
  firstname: string
  lastname: string
  address: string
  zipCode: string
  city: string
  phone: string
  prescriptions: Prescription[]
}

const PatientLine: FunctionComponent<PatientLineProps> = ({
  id,
  firstname,
  lastname,
  address,
  zipCode,
  city,
  phone,
  prescriptions
}) => {
  const prescription = getValidOrLastPrescription(prescriptions)
  const prescriptionEndDate = prescription?.end_date ?? 'N/A'
  const prescriptionIsValid = prescription?.is_valid ?? false
  const isValidIconName = prescriptionIsValid ? 'circle-check' : 'circle-xmark'
  const isValidIconClass = prescriptionIsValid ? 'text-success' : 'text-danger'
  const icon = (
    <FontAwesomeIcon
      icon={['fas', isValidIconName]}
      className={isValidIconClass}
    />
  )
  return (
    <tr>
      <td>
        <Link to={`/patients/${id}`}>{firstname}</Link>
      </td>
      <td>{lastname}</td>
      <td>{address}</td>
      <td>{zipCode}</td>
      <td>{city}</td>
      <td>{phone}</td>
      <td>{icon}</td>
      <td>{prescriptionEndDate}</td>
    </tr>
  )
}

export default PatientLine
