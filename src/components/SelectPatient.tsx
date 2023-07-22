import React, { FunctionComponent } from 'react'
import { Patient } from '../types'
interface SelectProps {
  patient: Patient
}

const SelectPatient: FunctionComponent<SelectProps> = ({ patient }) => {
  return (
    <option key={patient.id} value={patient.id}>
      {patient.lastname + ' ' + patient.firstname}
    </option>
  )
}

export default SelectPatient
