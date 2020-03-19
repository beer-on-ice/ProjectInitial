import WebStorageCache from 'web-storage-cache'

const wsCache = new WebStorageCache()
export function setLocalStorage(key: string, value: string) {
  return wsCache.set(key, value)
}

export function getLocalStorage(key: string) {
  return wsCache.get(key)
}

export function removeLocalStorage(key: string) {
  return wsCache.delete(key)
}

export function clearLocalStorage() {
  return wsCache.clear()
}

export function getLocale() {
  return getLocalStorage('locale')
}

export function saveLocale(locale: string) {
  return setLocalStorage('locale', locale)
}
