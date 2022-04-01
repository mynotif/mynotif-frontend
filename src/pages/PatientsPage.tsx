import React, { FunctionComponent, useEffect, useState } from 'react'

import { Button, Table } from 'react-bootstrap'
import { getPatients } from '../services/api'
import { Patient } from '../types'

interface PatientLineProps {
  id: number
  firstname: string
  lastname: string
  address: string
  zipCode: string
  city: string
  phone: string
}

const PatientLine: FunctionComponent< PatientLineProps> = ({ id, firstname, lastname, address, zipCode, city, phone }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{firstname}</td>
      <td>{lastname}</td>
      <td>{address}</td>
      <td>{zipCode}</td>
      <td>{city}</td>
      <td>{phone}</td>
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
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>address</th>
            <th>zipCode</th>
            <th>city</th>
            <th>phone</th>
            <th />
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
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default PatientPage
