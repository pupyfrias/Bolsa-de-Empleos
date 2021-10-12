const bcrypt = require('bcryptjs')
const mailer = require('../utils/mail/mailer')
const { v4: uuidv4 } = require("uuid");
const apiGet = require('../models/api-get')
const apiPost = require('../models/api-post')

exports.GetCreateAccout = (req, res, next) => {

    res.render('account/create-account', {
        pageTitle: "Create Account"
    })
}

exports.PostCreateAccout = (req, res, next) => {

    let { name, lastname, username, password, email } = req.body
    let exitsEmail = false
    let exitsUser = false

    apiGet.userExist(username, email, (data) => {

        if (username == data.userName) {
            exitsUser = true
        }
        if (email == data.email) {
            exitsEmail = true
        }

        if (exitsEmail || exitsUser) {

            res.render('account/create-account', {
                pageTitle: "Create Account",
                exitsEmail: exitsEmail,
                exitsUser: exitsUser,
                username: username,
                email: email,
                error: true,
                name: name,
                lastname: lastname,
                password: password
            })
        } else {
            const code = uuidv4().substring(0, 6)
            let date = new Date
            date = date.setTime(new Date().getTime() + (5 * 60 * 1000))

            // user.create({
            //     name: name,
            //     lastName: lastname,
            //     userName: username,
            //     password: ,
            //     position: "poster",
            //     email: email,
            //     code: code,
            //     auth: false,
            //     expiration: date

            // })
            apiPost.userCreate(name, lastname, username, bcrypt.hashSync(password, 8), email, code, date, (cb) => {

                const msj = `Este es su código de confirmacion
                    <strong>${code}</strong>, este código 5 minutos de vigencia.`

                mailer.sendMail({
                    from: "radhamesenc2412002@gmail.com",
                    to: email,
                    subject: 'Código de confirmación',
                    html: msj
                }).catch(err => {
                    console.log(err)
                })

                res.render('account/confirmation', {
                    pageTitle: "Create Account"
                })

            })
        }

    })
}

exports.PostConfirmation = (req, res, next) => {

    const { code } = req.body

    // user.findOne({ where: { code: code } }).then(result => {
    apiGet.userConfirm(code, (data) => {
        if (data) {
            console.log('/////')
            console.log(new Date(data.expiration))
            console.log(new Date())
            if (new Date(data.expiration) >= new Date()) {

                apiGet.userUpdate(code, (cb) => {
                    res.render('auth/login', {
                        pageTitle: 'login',
                        messages: true
                    })
                })


            } else {

                res.render('account/confirmation', {
                    pageTitle: "Create Account",
                    errorCode: true,
                    code: code,
                    expiration: true,
                    email: data.email,
                    id: data.id
                })

            }
        } else {

            return res.render('account/confirmation', {
                pageTitle: "Create Account",
                errorCode: true,
                code: code,
                invalidate: true
            })

        }


    })
}


exports.PostNewCode = (req, res, next) => {

    const { id, email } = req.body
    const code = uuidv4().substring(0, 6)
    let date = new Date
    date = date.setTime(new Date().getTime() + (5 * 60 * 1000))

    apiPost.newCode(code, date, id, (cb) => {

        if (cb) {
            const msj = `Este es su código de confirmacion
        <strong>${code}</strong>, este código 5 minutos de vigencia.`

            mailer.sendMail({
                from: "bryantsantana139@gmail.com",
                to: email,
                subject: 'Código de confirmación',
                html: msj
            })

            res.render('account/confirmation', {
                pageTitle: "Create Account"
            })

        }
    })


}