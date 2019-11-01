const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const qiniu = require('qiniu')
const otplib = require('otplib')
const qrcode = require('qrcode')
const upyun = require('upyun')
const secret = 'secret'
const otp_redirect_secret = 'otp_redirect_secret'
const accessKey = '2ggKxYmve6LqD4Y0QfgW0T3Yx192-WvEMaCxWrwy'
const secretKey = '0Tm6lAuHvTXvBYqs3_ULGoPYJ-Z4ebSxHx6UySM4'
// 时间戳防盗链密钥
const encryptKey = '099ae9b9d5b8bca877987fb8cd9b6e8a61a9119a'
const domain = '//cdn.jscode.top'
const youpaiBucket = 'jscode-top'
const youpaiUser = 'upload'
const youpaiPass = 'MVvAyC296PZtZjc7EYdE8i8CuXNLGpbi'
// const youpaiPass = 'a42dbb9ca5ef0eba20cf155cd98d7433'
module.exports = {
    async signQRCode(otp_secret) {
        const user = 'jscode'
        const service = 'service name'
        let url = otplib.authenticator.keyuri(user, service, otp_secret)
        url = await qrcode.toDataURL(url)
        return url
    },
    generateOtpToken(otp_secret) {
        return otplib.authenticator.generate(otp_secret)
    },
    verifyOtpToken(token, otp_secret) {
        return otplib.authenticator.verify({ token, secret: otp_secret })
    },
    generateOTPSecret() {
        return otplib.authenticator.generateSecret()
    },
    /* 通过token获取JWT的payload部分 */
    getJWTPayload(token, secret) {
    // 验证并解析JWT
        return jwt.verify(token, secret)
    },
    getToken(payload = {}) {
        return jwt.sign(payload, secret, { expiresIn: '7d' })
    },
    getRedirectToken(payload = {}) {
        return jwt.sign(payload, otp_redirect_secret, { expiresIn: '6h' })
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
    },
    youpaiSignHeader(payload) {
        const bucket = new upyun.Service(youpaiBucket, youpaiUser, youpaiPass)
        console.log('bucket', bucket, payload)
        const headSign = upyun.sign.getHeaderSign(bucket, payload.method, payload.path, payload.contentMD5)
        return headSign
    }
}
