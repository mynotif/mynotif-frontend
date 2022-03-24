import { strict as assert } from 'assert'
import { useCallback, useEffect, useState, useContext } from 'react'
import { Badge, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorContext } from '../context/error'
import { TokenContext } from '../context/token'
import { deletePrescription, getPrescriptions } from '../services/api'
import { Prescription } from '../types'

// Allows to change the colour if true or false
const toRenew = (renew: boolean): string => renew ? 'warning' : 'success'

const PrescriptionsPage = (): JSX.Element => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const { token } = useContext(TokenContext)

  const { addError } = useContext(ErrorContext)

  // allows us to pick up prescriptions
  const fetchPrescriptions = async (): Promise<void> => {
    try {
      const data = await getPrescriptions()
      setPrescriptions(data)
    } catch (error) {
      console.error(error)
      addError({ body: 'Error fetching prescription data' })
    }
  }

  const fetchPrescriptionsCallback = useCallback(
    fetchPrescriptions,
    [addError]
  )

  // when the component is loaded, the Prescriptions are picked up
  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => await fetchPrescriptionsCallback())()
  }, [fetchPrescriptionsCallback])

  const onDelete = async (id: number): Promise<void> => {
    assert(token)
    try {
      await deletePrescription(token, id)
    } catch (error) {
      console.error(error)
      addError({ body: 'Error deleting prescription' })
    }
    // updates the prescriptions state
    await fetchPrescriptions()
  }

  return (
    <>
      <h1>Liste des Ordonnances</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Carte vitale</th>
            <th>Caisse rattachement</th>
            <th>Prescribing doctor</th>
            <th>Start date</th>
            <th>End date</th>
            <th>To renew</th>
            <th>Photo prescription</th>
            <th>Patient</th>
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
                <Badge bg={toRenew(prescription.at_renew)}>
                  {prescription.at_renew ? 'Yes' : 'No'}
                </Badge>
              </td>
              <td>{prescription.photo_prescription}</td>
              <td>{prescription.patient}</td>
              <td>
                <Button variant='danger' onClick={async () => await onDelete(prescription.id)}><FontAwesomeIcon icon={['fas', 'trash']} /></Button>
              </td>
            </tr>)}
        </tbody>
      </Table>
    </>
  )
}

export default PrescriptionsPage
