const nodemailer = require('nodemailer')



const mailer = nodemailer.createTransport({

    service:'gmail',
    auth: {
        // user: "bryantsantana139@gmail.com",
        // pass: "doukfsmwujbqykry"
        user: "radhamesenc2412002@gmail.com",
        pass: "teyebifuxyvpmudg"

    }


})

module.exports = mailer