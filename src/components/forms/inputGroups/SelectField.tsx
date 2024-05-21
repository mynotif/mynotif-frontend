import { t } from 'i18next'
import { Patient } from '../../../types'

interface SelectFieldProps {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  name: string
  patients: Patient[]
}

export const SelectField = ({ value, onChange, name, patients }: SelectFieldProps): JSX.Element => {
  return (
    <select
      className='flex-grow outline-none text-gray-600'
      name={name}
      value={value}
      onChange={onChange}
    >
      <option>--{t('form.selectPatient')}--</option>
      <option value='addNewPatient'>--{t('title.addPatient')}--</option>
      {
        patients?.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.lastname + ' ' + patient.firstname}
          </option>
        ))
      }
    </select>
  )
}
