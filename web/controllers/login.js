const bcrypt = require('bcryptjs');
const apiGet = require('../models/api-get')
const apiPost = require('../models/api-post')

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

    apiGet.user(username, (data) => {

        if (data.exist) {
            apiPost.user(username, (data) => {
                if (bcrypt.compareSync(password, data.password)) {

                    req.session.isLoggedIn = true
                    req.session.userId = data.id
                    req.session.email = data.email
                    url = url == "" ? '/' : url

                    if (data.position == "admin") {
                        req.session.isAdmin = true
                    } else {
                        req.session.isPoster = true
                    }
                    return res.redirect(url)

                } else {
                    res.render('auth/login', {
                        pageTitle: 'Login',
                        error: true,
                        errorPassword: true,
                        username: username,
                        password: password
                    })
                }

            })
        } else {
            res.render('auth/login', {
                pageTitle: 'Login',
                error: true,
                errorUser: true,
                username: username,
                password: password
            })
        }
    })

}


exports.PostLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err)
    })
    res.redirect('/')
}