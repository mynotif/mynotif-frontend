import { Patient } from '../types'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getValidOrLastPrescription } from '../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card'

interface PatientLineProps {
  patient: Patient
  borderColor?: string
}

const PatientLine: FunctionComponent<PatientLineProps> = ({ patient }) => {
  const navigate = useNavigate()

  const prescription = getValidOrLastPrescription(patient.prescriptions)
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

  const goToPatient = (id: number): void => {
    navigate(`/patients/${id}`)
  }

  return (
    <Card onClick={() => goToPatient(patient.id)} style={{ cursor: 'pointer' }} className='mt-2 shadow'>
      <Card.Body>
        <Card.Title>{patient.lastname}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'><small>{patient.address} à {patient.city}</small></Card.Subtitle>
        <Card.Text>
          <>Renouvellement le: {prescriptionEndDate} - {icon}</>
          {patient.prescriptions.map((prescription) => (
            <small key={prescription.id}>
              Dr. {prescription.prescribing_doctor}
            </small>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PatientLine
