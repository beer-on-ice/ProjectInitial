import Cookies from 'js-cookie'

// 过期时间
const inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000)

// 获取cookie
const getCookie = (name: string) => {
  return Cookies.get(name)
}

// 存储cookie
const setCookie = (name: string, val: string, expires = inFifteenMinutes) => {
  return Cookies.set(name, val, expires)
}

// 删除cookie
const delCookie = (name: string) => {
  return Cookies.remove(name)
}

export { getCookie, setCookie, delCookie }
