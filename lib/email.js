var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport("SMTP", {
    service: config.mail.service,
    auth: {
        user: config.mail.user,
        pass: config.mail.password
    }
});

exports.transport = transport;