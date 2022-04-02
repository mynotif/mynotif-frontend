import { Prescription } from '../types'
import { getValidPrescription, getLastPrescription, getValidOrLastPrescription } from './helpers'

describe('helpers', () => {
  /**
   * When multiple valid prescriptions are found, we default to the first found.
   */
  test('getValidPrescription() multiple valid', () => {
    const prescriptions = [
      {
        id: 1,
        is_valid: true,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 1',
        prescribing_doctor: 'Doctor 1',
        start_date: '2022-03-20',
        end_date: '2022-05-20',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      },
      {
        id: 2,
        is_valid: true,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 2',
        prescribing_doctor: 'Doctor 2',
        start_date: '2022-03-10',
        end_date: '2022-05-10',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      }
    ]
    expect(getValidPrescription(prescriptions)).toEqual(prescriptions[0])
  })

  test('getValidPrescription() no valid', () => {
    const prescriptions = [
      {
        id: 1,
        is_valid: false,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 1',
        prescribing_doctor: 'Doctor 1',
        start_date: '2022-03-20',
        end_date: '2022-05-20',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      }
    ]
    expect(getValidPrescription(prescriptions)).toEqual(null)
  })

  test('getLastPrescription()', () => {
    const prescriptions = [
      {
        id: 1,
        is_valid: true,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 1',
        prescribing_doctor: 'Doctor 1',
        start_date: '2021-03-20',
        end_date: '2021-05-20',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      },
      {
        id: 2,
        is_valid: true,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 2',
        prescribing_doctor: 'Doctor 2',
        start_date: '2022-01-10',
        end_date: '2022-03-10',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      },
      {
        id: 3,
        is_valid: true,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 2',
        prescribing_doctor: 'Doctor 2',
        start_date: '2022-01-11',
        end_date: '2022-02-10',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      }
    ]
    expect(getLastPrescription(prescriptions)).toEqual(prescriptions[1])
  })

  test('getLastPrescription() none', () => {
    const prescriptions: Prescription[] = []
    expect(getLastPrescription(prescriptions)).toEqual(null)
  })

  test('getValidOrLastPrescription()', () => {
    const prescriptions = [
      {
        id: 1,
        is_valid: false,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 1',
        prescribing_doctor: 'Doctor 1',
        start_date: '2021-03-20',
        end_date: '2021-05-20',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      },
      {
        id: 2,
        is_valid: false,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 2',
        prescribing_doctor: 'Doctor 2',
        start_date: '2022-01-10',
        end_date: '2022-03-10',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      },
      {
        id: 3,
        is_valid: true,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 2',
        prescribing_doctor: 'Doctor 2',
        start_date: '2022-01-11',
        end_date: '2022-02-10',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      }
    ]
    expect(getValidOrLastPrescription(prescriptions)).toEqual(prescriptions[2])
  })

  test('getValidOrLastPrescription() no valid hence last', () => {
    const prescriptions = [
      {
        id: 1,
        is_valid: false,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 1',
        prescribing_doctor: 'Doctor 1',
        start_date: '2021-03-20',
        end_date: '2021-05-20',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      },
      {
        id: 2,
        is_valid: false,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 2',
        prescribing_doctor: 'Doctor 2',
        start_date: '2022-01-10',
        end_date: '2022-03-10',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      },
      {
        id: 3,
        is_valid: false,
        carte_vitale: '0123456789',
        caisse_rattachement: 'Caisse 2',
        prescribing_doctor: 'Doctor 2',
        start_date: '2022-01-11',
        end_date: '2022-02-10',
        at_renew: false,
        photo_prescription: '',
        patient: 1
      }
    ]
    expect(getValidOrLastPrescription(prescriptions)).toEqual(prescriptions[1])
  })
})
