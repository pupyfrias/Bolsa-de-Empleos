const users = require('../models/users')
const bcrypt = require('bcryptjs');


//GET
exports.GetLogin = (req, res, next) => {

    const { redirect } = req.query

    res.render('auth/login', {
        pageTitle: 'Login',
        redirect: redirect

    })
}


//POST  
exports.PostLogin = (req, res, next) => {
    let { username, password, url } = req.body

    users.findOne({ where: { username: username,auth:true } }).then((result) => {
        if (result) {

            const data = result.dataValues
            if (bcrypt.compareSync(password, data.password)) {

                req.session.isLoggedIn = true
                req.session.userId = data.id
                req.session.email = data.email
                url = url == "" ? '/' : url

                if (data.position == "admin") {
                    req.session.isAdmin = true
                }
                else {
                    req.session.isPoster = true
                }
                return res.redirect(url)

            }
            else{

                res.render('auth/login', {
                    pageTitle: 'Login',
                    error: true,
                    errorPassword: true,
                    username: username,
                    password: password
                })

            }
        }
        else {
            res.render('auth/login', {
                pageTitle: 'Login',
                error: true,
                errorUser: true,
                username: username,
                password: password
            })
        }


    }).catch

}


exports.PostLogout = (req, res, next) => {

    req.session.destroy(err => {
        console.log(err)
    })
    res.redirect('/')
}