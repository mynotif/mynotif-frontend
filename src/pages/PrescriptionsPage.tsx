import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getPrescriptions } from '../services/api'
import { Prescription } from '../types'

// Allows to change the colour if true or false
const toRenew = (renew: boolean): string => !renew ? 'danger' : 'success'

const PrescriptionsPage = (): JSX.Element => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])

  // allows us to pick up prescriptions
  const fetchPrescriptions = async (): Promise<void> => {
    try {
      const data = await getPrescriptions()
      setPrescriptions(data)
    } catch (error) {
      console.error(error.response)
    }
  }

  // when the component is loaded, the Prescriptions are picked up
  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => await fetchPrescriptions())()
  }, [])

  return (
    <>
      <h1>Liste des Ordonnances</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>carte_vitale</th>
            <th>caisse_rattachement</th>
            <th>prescribing_doctor</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>to_renew</th>
            <th>photo_prescription</th>
            <th>patient</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {prescriptions.map(prescription =>
            <tr key={prescription.id}>
              <td>{prescription.carte_vitale}</td>
              <td>{prescription.caisse_rattachement}</td>
              <td>{prescription.prescribing_doctor}</td>
              <td>{prescription.start_date}</td>
              <td>{prescription.end_date}</td>
              <td>
                <span className={'badge bg-' + toRenew(prescription.at_renew)}>{prescription.at_renew}</span>
              </td>
              <td>{prescription.photo_prescription}</td>
              <td>{prescription.patient}</td>
              <td>
                <button className='btn btn-sm btn-primary mx-1'>Update</button>
                <button className='btn btn-sm btn-danger'>Delete</button>
              </td>
            </tr>)}
        </tbody>
      </Table>
    </>
  )
}

export default PrescriptionsPage
