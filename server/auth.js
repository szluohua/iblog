const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const qiniu = require('qiniu')
const otplib = require('otplib')
const qrcode = require('qrcode')
const upyun = require('upyun')
let allConfig = require('../config.json')
allConfig = process.env.NODE_ENV === 'production' ? allConfig.prod : allConfig.dev
const { secret, otp_redirect_secret, otp_user, otp_service, accessKey, secretKey, encryptKey, domain, youpaiBucket, youpaiUser, youpaiPass } = allConfig
module.exports = {
    async signQRCode(otp_secret) {
        let url = otplib.authenticator.keyuri(otp_user, otp_service, otp_secret)
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
        const headSign = upyun.sign.getHeaderSign(bucket, payload.method, payload.path, payload.contentMD5)
        return headSign
    }
}
