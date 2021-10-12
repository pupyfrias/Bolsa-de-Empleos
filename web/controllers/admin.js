const fs = require('fs')
const path = require('path')
const apiPost = require('../models/api-post')
const apiGet = require('../models/api-get')

exports.GetAllJobs = (req, res, next) => {
    let { search, design, programming } = req.query
    search = search != undefined ? '?search=' + search : ''
    if (design) {

        if (design == 'disable') {
            apiGet.setCategory('design', false)

        } else {
            apiGet.setCategory('design', true)
        }
    }
    if (programming) {

        if (programming == 'disable') {
            apiGet.setCategory('programming', false)
        } else {
            apiGet.setCategory('programming', true)
        }
    }
    fs.readFile(path.join(__dirname, '../utils/pagination.txt'), 'utf8', (err, data) => {
        if (err) {
            return console.error(err)
        }

        let limit = parseInt(data)
        apiGet.JobAll(search, (datos) => {

            apiGet.category((datos2) => {
                res.render('admin/all-jobs', {
                    pageTitle: "Admin",
                    datos: datos.rows,
                    search: search.replace('?search=', ''),
                    activeSearch: true,
                    enableDesign: datos2[0].enable,
                    enableProgramming: datos2[1].enable,
                    limit: limit
                })

            })

        })

    })

}

exports.GetEditJob = (req, res, next) => {

    const { id } = req.params
    const { edit } = req.query

    if (edit == undefined) {
        return res.redirect('/')
    }

    apiGet.JobOne(id, (datos) => {

        res.render('admin/post-jobs', {
            pageTitle: "Edit admin",
            datos: datos
        })
    })

}



exports.PostUpdateJob = (req, res, next) => {
    const { id } = req.params
    const { category, type, company, url, position, location, description, oldLogo, active } = req.body;
    let old_Logo = oldLogo != undefined ? oldLogo : ''
    let logo = req.file != undefined ? '/' + req.file.path : old_Logo

    apiPost.posterUpdate(id, category, type, company, url, position, location, description, logo, active)
    res.redirect('/admin/job/all')
}

exports.GetDeleteJob = (req, res, next) => {

    const list = req.params.id
    apiGet.DeleteJob(list, (info) => {

        if (info) {
            res.redirect('/admin/job/all')
        }
    })

}

exports.GetLimit = (req, res, next) => {
    const limit = req.params.id

    fs.writeFile(path.join(__dirname, '../utils/pagination.txt'), limit, (err) => {
        if (err) {
            console.error(err)
            return
        }
        res.redirect('/admin/job/all')
    })
}