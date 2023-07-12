import { containsFlashMessage, flashMessagesEqual } from './flashmessage'

describe('error', () => {
  test('flashMessagesEqual()', () => {
    const error1 = {
      title: 'Title',
      body: 'Body'
    }
    const error2 = { ...error1 }
    expect(flashMessagesEqual(error1, error2)).toBeTruthy()
    error2.title = 'Title 2'
    expect(flashMessagesEqual(error1, error2)).toBeFalsy()
  })

  test('containsFlashMessage()', () => {
    const error1 = {
      title: 'Title 1',
      body: 'Body 1'
    }
    const error2 = {
      title: 'Title 2',
      body: 'Body 2'
    }
    const error3 = {
      title: 'Title 3',
      body: 'Body 3'
    }
    const errors = [error1, error2, error3]
    expect(containsFlashMessage(errors, { title: 'Title 2', body: 'Body 2' })).toBeTruthy()
    expect(containsFlashMessage(errors, { title: 'Title 1', body: 'Body 3' })).toBeFalsy()
  })
})
