const nodemailer = require('nodemailer')



const mailer = nodemailer.createTransport({

    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "af1369b03d07e9",
        pass: "a4aae4a9620d11"
    }


})

module.exports = mailer