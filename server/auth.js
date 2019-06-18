const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const secret = 'secret'
module.exports = {
    /* 通过token获取JWT的payload部分 */
    getJWTPayload(token) {
    // 验证并解析JWT
        return jwt.verify(token.split(' ')[1], secret)
    },
    /* 获取一个期限为4小时的token */
    getToken(payload = {}) {
        return jwt.sign(payload, secret, { expiresIn: '4h' })
    }
}
