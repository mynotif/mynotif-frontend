import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { strict as assert } from 'assert'

import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { getPatient } from '../services/api'
import { Patient } from '../types'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'

const PatientDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const [patient, setPatient] = useState<Patient | null>(null)

  const fetchPatientCallback = useCallback(async (): Promise<void> => {
    assert(token)
    assert(id)
    try {
      const data = await getPatient(token, parseInt(id, 10))
      setPatient(data)
    } catch (error) {
      console.error(error)
      addErrorCallback({ body: 'Error fetching patient data' })
    }
  }, [token, addErrorCallback, id])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPatientCallback())()
  }, [token, fetchPatientCallback])

  return (
    <div>
      {patient != null ? (
        <Card className='mt-4'>
          <Card.Body>
            <Card.Title>
              {patient.firstname} {patient.lastname}
            </Card.Title>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Adresse</td>
                  <td>
                    <strong>{patient.address}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Ville</td>
                  <td>
                    <strong>{patient.city}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Code postal</td>
                  <td>
                    <strong>{patient.zip_code}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Téléphone</td>
                  <td>
                    <strong>{patient.phone}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Ordonnance</td>
                  <td>Afficher les elements de l'ordonnance</td>
                </tr>
              </tbody>
            </Table>
            <div className='card-action'>
              <Link to='/patients'>Retour</Link>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <h4 className='center'>Aucun patient à afficher !</h4>
      )}
    </div>
  )
}

export default PatientDetail
