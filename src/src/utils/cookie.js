import Cookies from 'js-cookie'

const him = 'him-Token'

// 获取Token
export function getToken() {
    return Cookies.get(him)
}
// 设置Token
export function setToken(token) {
    return Cookies.set(him, token)
}
// 删除Token
export function removeToken() {
    return Cookies.remove(him)
}