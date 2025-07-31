// 封装和 token 相关的方法 存取删

const TOKENKEY = 'token_key'
function addLocalToken(token) {
    localStorage.setItem(TOKENKEY, token)
}
function getLocalToken() {
    return localStorage.getItem(TOKENKEY)
}
function removeLocalToken() {
    localStorage.removeItem(TOKENKEY)
}
export {
    addLocalToken,
    getLocalToken,
    removeLocalToken
}