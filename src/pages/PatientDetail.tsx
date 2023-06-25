import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { strict as assert } from 'assert'

import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { getPatient } from '../services/api'
import { Patient } from '../types'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTranslationHook from '../hook/TranslationHook'

const PatientDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)
  const { t } = useTranslationHook()

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const [patient, setPatient] = useState<Patient | null>(null)

  const navigate = useNavigate()

  const returnPreviousPage = (): void => {
    navigate(-1)
  }

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
      {patient !== null ? (
        <Card className='mt-4'>
          <Card.Body>
            <Card.Title>
              {patient.firstname} {patient.lastname}
              <Button variant='warning' href={`/patients/edit/${patient.id}`} className='ms-4'>{t('navigation.update')}</Button>
            </Card.Title>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>{t('form.address')}</td>
                  <td>
                    <strong>{patient.address}</strong>
                  </td>
                </tr>
                <tr>
                  <td>{t('form.city')}</td>
                  <td>
                    <strong>{patient.city}</strong>
                  </td>
                </tr>
                <tr>
                  <td>{t('form.zipPostal')}</td>
                  <td>
                    <strong>{patient.zip_code}</strong>
                  </td>
                </tr>
                <tr>
                  <td>{t('form.phone')}</td>
                  <td>
                    <strong>{patient.phone}</strong>
                  </td>
                </tr>
                <tr>
                  <td>{t('text.prescription')}</td>
                  <td>
                    {patient.prescriptions.length > 0 ? (
                      <ul>
                        {patient.prescriptions.map((prescription) => (
                          <React.Fragment key={prescription.id}>
                            {typeof prescription.photo_prescription === 'string' && prescription.photo_prescription !== '' && (
                              <Button variant='info' href={prescription.photo_prescription} className='m-2'>
                                <FontAwesomeIcon icon={['fas', 'eye']} />
                              </Button>
                            )}
                          </React.Fragment>
                        ))}
                      </ul>
                    ) : (
                      <p />
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className='card-action'>
              <Button onClick={returnPreviousPage}>{t('navigation.return')}</Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className='d-flex justify-content-center vh-100 align-items-center'>
          <Spinner animation='border' />
        </div>
      )}
    </div>
  )
}

export default PatientDetail
