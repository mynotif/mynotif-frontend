import { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getPatients } from '../services/api'
import { Patient, Prescription } from '../types'
import { getValidOrLastPrescription } from '../utils/helpers'

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

const PatientLine: FunctionComponent< PatientLineProps> = ({ id, firstname, lastname, address, zipCode, city, phone, prescriptions }) => {
  const prescription = getValidOrLastPrescription(prescriptions)
  const prescriptionEndDate = prescription?.end_date ?? 'N/A'
  const prescriptionIsValid = prescription?.is_valid ?? false
  const isValidIconName = (prescriptionIsValid ? 'circle-check' : 'circle-xmark')
  const isValidIconClass = (prescriptionIsValid ? 'text-success' : 'text-danger')
  const icon = <FontAwesomeIcon icon={['fas', isValidIconName]} className={isValidIconClass} />
  return (
    <tr>
      <td><Link to={`/patients/${id}`}>{firstname}</Link></td>
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

const PatientPage = (): JSX.Element => {
  const [patients, setPatients] = useState<Patient[]>([])

  // allows us to pick up patients
  const fetchPatients = async (): Promise<void> => {
    try {
      const data = await getPatients()
      setPatients(data)
    } catch (error) {
      console.error(error.response)
    }
  }

  // when the component is loaded, the patients are picked up
  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => await fetchPatients())()
  }, [])

  return (
    <div>
      <div className='mb-3 d-flex justify-content-between align-items-center'>
        <h1>Liste des Patients</h1>
        <Button href='patients/new'>Créer un patient</Button>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Address</th>
            <th>Zip code</th>
            <th>City</th>
            <th>Phone</th>
            <th>Valid</th>
            <th>Prescription end date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <PatientLine
              key={patient.id}
              id={patient.id}
              firstname={patient.firstname}
              lastname={patient.lastname}
              address={patient.address}
              zipCode={patient.zip_code}
              city={patient.city}
              phone={patient.phone}
              prescriptions={patient.prescriptions}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default PatientPage
