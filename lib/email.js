var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "admin@arkene.com",
        pass: "ComArk123"
    }
});

exports.transport = transport;