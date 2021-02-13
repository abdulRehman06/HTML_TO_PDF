// var logMessage = require('logging-module');
var nodemailer = require("nodemailer");
var config = require('config');

var smtpTransport = nodemailer.createTransport({
    host: config.get('EmailSettings.SMTP'),
    port: config.get('EmailSettings.Port'),
    // authMethod: 'NTLM',
    secure: false,
    auth: {
        user: config.get('EmailSettings.FromEmail'),
        pass: config.get('EmailSettings.FromEmailPassword')
    },
    tls: { rejectUnauthorized: false },
    authentication: 'plain'
});
function SendEmailNotification(toemail, subject, message, attachmentData, attachmentName, callback) {
    return new Promise((resolve, reject) => {
        var mailOptions = {
            to: toemail,
            from: config.get('EmailSettings.FromEmail'),
            subject: subject,
            html: message
        };
        if (attachmentData != null)
            mailOptions.attachments = [{ filename: attachmentName, content: attachmentData }];

        smtpTransport.sendMail(mailOptions, function (error) {
            if (error) {
                reject(error)
                console.log('testing')
            }
            else {
                resolve('success')
            }

        });
    })

}

module.exports = {
    SendEmailNotification
} 