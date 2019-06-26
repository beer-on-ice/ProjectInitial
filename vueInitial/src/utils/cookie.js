import Cookies from 'js-cookie'

// 过期时间
const inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000)

// 获取cookie
const getCookie = name => {
  return Cookies.get(name)
}

// 存储cookie
const setCookie = (name, val, expires = inFifteenMinutes) => {
  return Cookies.set(name, val, expires)
}

// 删除cookie
const delCookie = name => {
  return Cookies.remove(name)
}

export { getCookie, setCookie, delCookie }
