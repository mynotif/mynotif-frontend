const tokenLocalStorageKey = 'token'

const getTokenLocalStorage = (): (string|null) => localStorage.getItem(tokenLocalStorageKey)

const setTokenLocalStorage = (token: string): void => localStorage.setItem(tokenLocalStorageKey, token)

const removeTokenLocalStorage = (): void => localStorage.removeItem(tokenLocalStorageKey)

export {
  getTokenLocalStorage,
  setTokenLocalStorage,
  removeTokenLocalStorage
}
