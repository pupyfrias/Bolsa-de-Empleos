const nodemailer = require('nodemailer')



const mailer = nodemailer.createTransport({

    service:'gmail',
    auth: {
        user: "bryantsantana139@gmail.com",
        pass: "doukfsmwujbqykry"
        
    }


})

module.exports = mailer