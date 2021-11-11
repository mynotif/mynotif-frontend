import React, { useEffect, useState } from 'react'
import { getPatients } from '../services/api'

const PatientPage = () => {
  const [patients, setPatients] = useState([])

  // allows us to pick up patients
  const fetchPatients = async () => {
    try {
      const data = await getPatients()
      setPatients(data)
    } catch (error) {
      console.error(error.response)
    }
  }

  // when the component is loaded, the patients are picked up
  useEffect(() => fetchPatients(), [])

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
          {
            patients.map(patient =>
              <tr key={patient.firstname}>
                <td>{patient.id}</td>
                <td>{patient.firstname}</td>
                <td>{patient.lastname}</td>
                <td>{patient.address}</td>
                <td>{patient.zip_code}</td>
                <td>{patient.city}</td>
                <td>{patient.phone}</td>
                <td><button className='btn btn-sm btn-danger'>supprimer</button></td>
              </tr>)
          }

        </tbody>
      </table>
    </div>
  )
}

export default PatientPage
