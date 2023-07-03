import React, { FunctionComponent } from 'react'
import { Patient } from '../types'
interface SelectProps {
  patient: Patient
  selected?: boolean
}

const SelectPatient: FunctionComponent<SelectProps> = ({ patient, selected }) => {
  return (
    <option key={patient.id} value={patient.id} selected={selected}>
      {patient.lastname + ' ' + patient.firstname}
    </option>
  )
}

export default SelectPatient
