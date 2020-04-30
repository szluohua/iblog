'use strict'
const nodemailer = require('nodemailer')
// async..await is not allowed in global scope, must use a wrapper
class Email {
    constructor({ email, pass, type }) {
        let config = {}

        config = {
            host: 'smtp.qq.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: email,
                pass
            }
        }
        this.email = email
        this.transporter = nodemailer.createTransport(config)
    }

    async sendMail(to, subject, content) {
        const info = await this.transporter.sendMail({
            from: this.email, // 发送人
            to: to, // 接收邮箱
            subject: subject, // 主题
            html: content
        })
        return info
    }
}
module.exports = Email
