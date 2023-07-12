import { useCallback, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FlashMessageContext } from '../../context/flashmessage'
import { TokenContext } from '../../context/token'
import { getPrescription } from '../../services/api'
import { Prescription } from '../../types'
import PrescriptionForm from '../../components/forms/PrescriptionForm'
import useTranslationHook from '../../hook/TranslationHook'

const PrescriptionEdit = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const [prescription, setPrescription] = useState<Prescription | null>(null)
  const { token } = useContext(TokenContext)

  const { addErrorMessage } = useContext(FlashMessageContext)
  const { t } = useTranslationHook()

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
      addErrorMessage({ body: 'Error fetching prescription data' })
    }
  }

  const fetchPrescriptionCallback = useCallback(fetchPrescription, [addErrorMessage])

  // when the component is loaded, the Prescription are picked up
  useEffect(() => {
    if (token === null || token === undefined || id === undefined) return
    // eslint-disable-next-line no-void
    void (async () =>
      await fetchPrescriptionCallback(token, parseInt(id, 10)))()
  }, [fetchPrescriptionCallback, id, token])

  return (
    <>
      {prescription !== null ? (
        <>
          <div className='d-flex align-items-center justify-content-center bg-info rounded-bottom py-4'>
            <h2 className='header center'>{t('title.renewPrescription')}</h2>
          </div>
          <PrescriptionForm prescription={prescription} isEditForm />
        </>
      ) : (
        <h4 className='center'>{t('title.noPrescriptionToDisplay')}</h4>
      )}
    </>
  )
}

export default PrescriptionEdit
