const apiPost = require('../models/api-post')

exports.GetPosterJob = (req, res, next) => {
    res.render("poster/post-jobs", {
        pageTitle: "Post a Jobs"
    })
}

//POST

exports.PostPosterJob = (req, res, next) => {
    const { category, type, company, url, position, location, description, email } = req.body;
    let logo = req.file != undefined ? '/' + req.file.path : ''

    apiPost.poster(category, type, company, url, position, location, description, email, logo, (data) => {

        if (data) {
            req.flash('alert', 'Trabajo creado correctamente')
            res.redirect('/poster')
        }

    })
}