import WebStorageCache from 'web-storage-cache'

const wsCache = new WebStorageCache()
export function setLocalStorage (key, value) {
  return wsCache.set(key, value)
}

export function getLocalStorage (key) {
  return wsCache.get(key)
}

export function removeLocalStorage (key) {
  return wsCache.delete(key)
}

export function clearLocalStorage () {
  return wsCache.clear()
}

export function getLocale () {
  return getLocalStorage('locale')
}

export function saveLocale (locale) {
  return setLocalStorage('locale', locale)
}
