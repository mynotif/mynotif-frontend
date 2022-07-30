import { containsError, errorsEqual } from './error'

describe('error', () => {
  test('errorsEqual()', () => {
    const error1 = {
      title: 'Title',
      body: 'Body'
    }
    const error2 = { ...error1 }
    expect(errorsEqual(error1, error2)).toBeTruthy()
    error2.title = 'Title 2'
    expect(errorsEqual(error1, error2)).toBeFalsy()
  })

  test('containsError()', () => {
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
    expect(containsError(errors, { title: 'Title 2', body: 'Body 2' })).toBeTruthy()
    expect(containsError(errors, { title: 'Title 1', body: 'Body 3' })).toBeFalsy()
  })
})
