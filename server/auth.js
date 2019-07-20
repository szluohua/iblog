const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const secret = 'secret'
const qiniu = require('qiniu')
const accessKey = '2ggKxYmve6LqD4Y0QfgW0T3Yx192-WvEMaCxWrwy'
const secretKey = '0Tm6lAuHvTXvBYqs3_ULGoPYJ-Z4ebSxHx6UySM4'
// 时间戳防盗链密钥
const encryptKey = '099ae9b9d5b8bca877987fb8cd9b6e8a61a9119a'
const domain = 'http://cdn.jscode.top'

module.exports = {
    /* 通过token获取JWT的payload部分 */
    getJWTPayload(token) {
    // 验证并解析JWT
        return jwt.verify(token.split(' ')[1], secret)
    },
    /* 获取一个期限为4小时的token */
    getToken(payload = {}) {
        return jwt.sign(payload, secret, { expiresIn: '7d' })
    },
    getQiniuUploadToken() {
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        // 自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
        const putPolicy = new qiniu.rs.PutPolicy({
            scope: 'jscode',
            expires: 7200
        })
        return putPolicy.uploadToken(mac)
    },
    fileSign(key) {
        const cdnManager = new qiniu.cdn.CdnManager(null)
        const deadline = parseInt(Date.now() / 1000) + 3600
        return cdnManager.createTimestampAntiLeechUrl(domain, key, null, encryptKey, deadline)
    }
}
