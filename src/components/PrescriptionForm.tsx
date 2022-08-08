import React, { FunctionComponent } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Prescription } from '../types'

interface PrescriptionFormProps {
  prescription: Prescription
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFormSubmit: (e: React.FormEvent) => void
}

const PrescriptionForm: FunctionComponent<PrescriptionFormProps> = ({ prescription, onInputChange, onFormSubmit }) => (
  <Form onSubmit={onFormSubmit}>
    {/* TODO: dropdown patient list */}
    <Row>
      <Form.Group as={Col}>
        <Form.Label>Médecin</Form.Label>
        <Form.Control
          type='text'
          placeholder='Dr.Simon'
          name='prescribing_doctor'
          value={prescription.prescribing_doctor}
          onChange={onInputChange}
        />
      </Form.Group>
      {/* TODO: photo upload refs #77 */}
      <Form.Group as={Col}>
        <Form.Label>Séléctionne ton ordonnance</Form.Label>
        <Form.Control
          type='file'
          name='photo_prescription'
        />
      </Form.Group>
    </Row>
    <Row className='my-3'>
      <Form.Group as={Col}>
        <Form.Label>Caisse de rattachement</Form.Label>
        <Form.Control
          type='text'
          placeholder='N° mutuelle'
          value={prescription.caisse_rattachement}
          name='caisse_rattachement'
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Carte Vitale</Form.Label>
        <Form.Control
          type='text'
          placeholder='Carte vitale'
          value={prescription.carte_vitale}
          name='carte_vitale'
          onChange={onInputChange}
        />
      </Form.Group>
    </Row>
    <Row className='my-3'>
      <Form.Group as={Col}>
        <Form.Label>Date de début</Form.Label>
        <Form.Control
          type='text'
          placeholder='2022-03-20'
          value={prescription.start_date}
          name='start_date'
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Date de fin</Form.Label>
        <Form.Control
          type='text'
          placeholder='2022-05-20'
          value={prescription.end_date}
          name='end_date'
          onChange={onInputChange}
        />
      </Form.Group>
    </Row>
    <Row className='my-3'>
      <Form.Check
        type='switch'
        id='custom-switch'
        label='Renouveller la prescription'
      />
    </Row>
    <Button className='mt-2' type='submit' onClick={() => null}>
      Save
    </Button>
  </Form>
)

export default PrescriptionForm
