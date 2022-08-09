import { FunctionComponent } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Prescription } from '../types'

// Allows to change the colour if true or false
const toRenew = (renew: boolean): string => renew ? 'warning' : 'success'

interface PrescriptionTrProps {
  prescription: Prescription
  onDelete: (id: number) => Promise<void>
  onEdit: (id: number) => Promise<void>
}

const PrescriptionTr: FunctionComponent<PrescriptionTrProps> = ({ prescription, onDelete, onEdit }) => (
  <tr>
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
    <td>{prescription.photo_prescription === null ? <>N/A</> : <a href={prescription.photo_prescription}>Photo</a>}</td>
    <td>{prescription.patient}</td>
    <td>
      <Button onClick={async () => await onEdit(prescription.id)}><FontAwesomeIcon icon={['fas', 'pencil']} /></Button>
    </td>
    <td>
      <Button variant='danger' onClick={async () => await onDelete(prescription.id)}><FontAwesomeIcon icon={['fas', 'trash']} /></Button>
    </td>
  </tr>
)

export default PrescriptionTr
