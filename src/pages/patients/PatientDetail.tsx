import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { strict as assert } from 'assert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Button } from 'react-bootstrap'
import { TokenContext } from '../../context/token'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import { getPatient } from '../../services/api'
import { Patient } from '../../types'
import Spinner from 'react-bootstrap/Spinner'
import useTranslationHook from '../../hook/TranslationHook'

const PatientDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const { token } = useContext(TokenContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  const { t } = useTranslationHook()

  const addErrorMessageCallback = useCallback(
    (error: FlashMessageType) => addErrorMessage(error),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      addErrorMessageCallback({ body: 'Error fetching patient data' })
    }
  }, [token, addErrorMessageCallback, id])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPatientCallback())()
  }, [token, fetchPatientCallback])

  return (
    <div className='mt-5'>
      {patient !== null ? (
        <div className='bg-light p-4'>
          <Card className='text-center'>
            <Card.Header className='bg-primary text-white'>
              <Button variant='link' href='/patients' className='text-white fs-4'>
                &larr;{t('navigation.return')}
              </Button>
              <h2 className='mb-0'>{patient.lastname.toUpperCase()} {patient.firstname.toUpperCase()}</h2>
            </Card.Header>
            <Card.Body className='text-center'>
              <div className='d-flex justify-content-center align-items-center mb-4 position-relative'>
                <div className='flex-grow-1 text-center'>
                  <FontAwesomeIcon icon={['fas', 'user']} size='4x' />
                </div>
                <div>
                  <Button variant='light' href={`/patients/edit/${patient.id}`} className='position-absolute top-5 end-0'>
                    <FontAwesomeIcon icon={['fas', 'pencil-alt']} size='lg' style={{ cursor: 'pointer' }} />
                  </Button>
                </div>
              </div>
              <div className='mb-4'>
                <p className='text-muted'>{t('form.address')} | {t('form.city')}</p>
                <h4>{patient.address}</h4>
                <h4>{patient.city}</h4>
              </div>
              <hr className='my-4' />
              <div className='row'>
                <div className='col'>
                  <p className='text-muted'>{t('form.phone')}</p>
                  <h4>{patient.phone}</h4>
                </div>
                <div className='col'>
                  <p className='text-muted'>{t('form.zipPostal')}</p>
                  <h4>{patient.zip_code}</h4>
                </div>
              </div>
              <hr className='my-4' />
              <div>
                <h4 className='mb-4'>{t('text.prescription')}</h4>
                {patient.prescriptions.length > 0 ? (
                  <ul className='list-inline'>
                    {patient.prescriptions.map((prescription) => (
                      <li className='list-inline-item' key={prescription.id}>
                        {typeof prescription.photo_prescription === 'string' && prescription.photo_prescription !== '' && (
                          <Button variant='info' href={prescription.photo_prescription} target='_blank' className='m-2'>
                            <FontAwesomeIcon icon={['fas', 'eye']} />
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{t('text.noPrescriptionsFound')}</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div className='d-flex justify-content-center vh-100 align-items-center'>
          <Spinner animation='border' />
        </div>
      )}
    </div>
  )
}

export default PatientDetail
