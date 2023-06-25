import { useCallback, useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorContext } from '../context/error'
import { TokenContext } from '../context/token'
import { getPrescription } from '../services/api'
import { Prescription } from '../types'
import PrescriptionForm from '../components/PrescriptionForm'
import useTranslationHook from '../hook/TranslationHook'
import { Row, Col, Button } from 'react-bootstrap'

const PrescriptionEdit = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const [prescription, setPrescription] = useState<Prescription | null>(null)
  const { token } = useContext(TokenContext)

  const { addError } = useContext(ErrorContext)
  const { t } = useTranslationHook()
  const navigate = useNavigate()

  // allows us to pick up prescription
  const fetchPrescription = async (
    token: string,
    id: number
  ): Promise<void> => {
    try {
      const data = await getPrescription(token, id)
      setPrescription(data)
    } catch (error) {
      console.error(error)
      addError({ body: 'Error fetching prescription data' })
    }
  }

  const fetchPrescriptionCallback = useCallback(fetchPrescription, [addError])

  // when the component is loaded, the Prescription are picked up
  useEffect(() => {
    if (token === null || token === undefined || id === undefined) return
    // eslint-disable-next-line no-void
    void (async () =>
      await fetchPrescriptionCallback(token, parseInt(id, 10)))()
  }, [fetchPrescriptionCallback, id, token])

  const returnPreviousPage = (): void => {
    navigate(-1)
  }

  return (
    <>
      {prescription !== null ? (
        <>
          <Row className='justify-content-between align-items-center'>
            <Col>
              <h1>{t('title.editPrescription')}</h1>
            </Col>
            <Col xs={4}>
              <Button onClick={returnPreviousPage} className='ml-auto'>{t('navigation.return')}</Button>
            </Col>
          </Row>
          <div className='my-4'>
            <PrescriptionForm prescription={prescription} isEditForm />
          </div>
        </>
      ) : (
        <h4 className='center'>{t('title.noPrescriptionToDisplay')}</h4>
      )}
    </>
  )
}

export default PrescriptionEdit
