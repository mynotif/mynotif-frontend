import { MessageType, containsMessage, messagesEqual } from './message'

describe('message', () => {
  test('messagesEqual()', () => {
    const message1: MessageType = {
      title: 'Title',
      text: 'text',
      variant: 'danger'
    }
    const message2: MessageType = { ...message1 }
    expect(messagesEqual(message1, message2)).toBeTruthy()
    message2.title = 'Title 2'
    expect(messagesEqual(message1, message2)).toBeFalsy()
  })

  test('containsMessage()', () => {
    const message1: MessageType = {
      title: 'Title 1',
      text: 'text 1',
      variant: 'danger'
    }
    const message2: MessageType = {
      title: 'Title 2',
      text: 'text 2',
      variant: 'danger'
    }
    const error3: MessageType = {
      title: 'Title 3',
      text: 'text 3',
      variant: 'danger'
    }
    const messages: MessageType[] = [message1, message2, error3]
    expect(containsMessage(messages, { title: 'Title 2', text: 'text 2', variant: 'danger' })).toBeTruthy()
    expect(containsMessage(messages, { title: 'Title 1', text: 'text 3', variant: 'danger' })).toBeFalsy()
  })
})
