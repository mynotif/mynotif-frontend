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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>{t('title.listPrescriptions')}</h1>
        <Button href='/prescriptions/create' className='ms-auto'>
          <FontAwesomeIcon icon={['fas', 'file-medical']} />
        </Button>
      </div>
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
    </>
  )
}

export default Prescriptions
