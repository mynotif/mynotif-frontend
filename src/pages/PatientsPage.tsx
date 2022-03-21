import React, { useEffect, useState } from 'react'
import { getPatients } from '../services/api'
import { Patient } from '../types'

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
      <h1>Liste des Patients</h1>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Address</th>
            <th>Zip-code</th>
            <th>City</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.firstname}</td>
              <td>{patient.lastname}</td>
              <td>{patient.address}</td>
              <td>{patient.zip_code}</td>
              <td>{patient.city}</td>
              <td>{patient.phone}</td>
              <td>
                <button className='btn btn-sm btn-primary mx-1'>Update</button>&nbsp;
                <button className='btn btn-sm btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PatientPage
