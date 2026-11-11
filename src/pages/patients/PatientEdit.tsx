import React from 'react'
import { useParams } from 'react-router-dom'
import PatientForm from '../../components/forms/PatientForm'
import { Container } from '../../components/home/Container'
import { usePatientDetail } from '../../hook/patientDetail.hook'
import { PatientReadFeedback } from './PatientDetail'

const PatientEdit = (): JSX.Element => {
  const { id } = useParams<'id'>()
  const { patient, status, retry } = usePatientDetail(id)
  return (
    <Container>
      {patient ? <PatientForm key={patient.id} patient={patient} isEditForm />
        : <PatientReadFeedback status={status} retry={retry} />}
    </Container>
  )
}

export default PatientEdit
