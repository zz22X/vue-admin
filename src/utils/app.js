import cookie from "cookie_js"
const adminToken = "admin_token"
const adminUsername = "admin_username"
export function getToken() {
  return cookie.get(adminToken)
}

export function setToken(token) {
  cookie.set(adminToken, token)
}

export function removeToken(token) {
  cookie.remove(adminToken)
}

export function setUsername(username) {
  cookie.set(adminUsername, username)
}
export function getUsername() {
  return cookie.get(adminUsername)
}