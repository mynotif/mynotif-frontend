import { t } from 'i18next'
import { PatientSummary } from '../../../types'

interface SelectFieldProps {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  name: string
  patients: PatientSummary[]
}

export const SelectField = ({ value, onChange, name, patients }: SelectFieldProps): JSX.Element => {
  return (
    <select
      className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-2 pr-8 text-gray-900 focus:ring-0 sm:text-sm/6"
      name={name}
      aria-label={t('form.selectPatient')}
      value={value}
      onChange={onChange}
      autoComplete="off"
    >
      <option value="">--{t('form.selectPatient')}--</option>
      <option value="addNewPatient" className="font-medium">
        --{t('title.addPatient')}--
      </option>
      {patients?.map((patient) => (
        <option
          key={patient.id}
          value={patient.id}
          className="py-1"
        >
          {patient.lastname + ' ' + patient.firstname}
        </option>
      ))}
    </select>
  )
}
