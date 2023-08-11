import { FunctionComponent, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import useTranslationHook from '../../hook/TranslationHook'

const NotificationPreferences: FunctionComponent = (): JSX.Element => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday')
  const [weeksBefore, setWeeksBefore] = useState<string>('One')

  const { t } = useTranslationHook()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    // ToDo, backend
    console.log(`Selected day: ${selectedDay}, Weeks before: ${weeksBefore}`)
  }

  return (
    <Container className='container mt-3'>
      <h2>{t('title.preferencesNotifications')}</h2>
      <div className='info mb-4'>
        <p><small>{t('text.receiveMyReports')}</small></p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label className='form-label'>{t('title.dayOfWeek')}</Form.Label>
          <Form.Select className='form-select' value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
            <option value='Monday'>Lundi</option>
            <option value='Tuesday'>Mardi</option>
            <option value='Wednesday'>Mercredi</option>
            <option value='Thursday'>Jeudi</option>
            <option value='Friday'>Vendredi</option>
            <option value='Saturday'>Samedi</option>
            <option value='Sunday'>Dimanche</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='form-label'>{t('title.weeksBeforeExpiration')}</Form.Label>
          <Form.Select className='form-select' value={weeksBefore} onChange={e => setWeeksBefore(e.target.value)}>
            <option value='One'>1</option>
            <option value='Two'>2</option>
            <option value='Three'>3</option>
          </Form.Select>
        </Form.Group>
        <Button type='submit' className='btn btn-primary'>{t('navigation.save')}</Button>
      </Form>
    </Container>
  )
}

export default NotificationPreferences
