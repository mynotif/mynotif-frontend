import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Prescription } from '../types'
import PrescriptionTr from './PrescriptionTr'
import useTranslationHook from '../hook/TranslationHook'

interface PrescriptionsProps {
  prescriptions: Prescription[]
  onDelete: (id: number) => Promise<void>
  onEdit: (id: number) => Promise<void>
}

const Prescriptions: FunctionComponent<PrescriptionsProps> = ({
  prescriptions,
  onDelete,
  onEdit
}) => {
  const { t } = useTranslationHook()

  return (
    <>
      <div className='position-fixed bottom-0 end-0 me-3 mb-5 pb-5' style={{ zIndex: '1030' }}>
        <Button variant='info' href='/prescriptions/create'>
          <FontAwesomeIcon icon={['fas', 'file-medical']} />
        </Button>
      </div>
      <div className='d-flex align-items-center justify-content-center py-4'>
        <h1>{t('title.listPrescriptions')}</h1>
      </div>
      <div className='mb-5 pb-5'>
        <Container>
          {
            prescriptions.map((prescription) => (
              <PrescriptionTr
                key={prescription.id}
                prescription={prescription}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          }
        </Container>
      </div>
    </>
  )
}

export default Prescriptions
