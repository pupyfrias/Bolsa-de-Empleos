const jobs = require('../models/api-get')
const fs = require('fs')
const path = require('path')
const apiPost = require('../models/api-post')
const apiGet = require('../models/api-get')

exports.GetAllJobs =  (req, res, next) => {
    let { search, desing, programacion } = req.query
    search = search != undefined ? '?'+search : ''
    if (desing) {

        if(desing =='disable'){
            apiPost.categoria('desing',false)
            // categarias.update({ enable: false },
            //     { where: { categoria: 'desing' } }).catch(err => {
            //         console.log(err)
            //     })
        }else{
            apiPost.categoria('desing',true)
            // categarias.update({ enable: true },
            //     { where: { categoria: 'desing' } }).catch(err => {
            //         console.log(err)
            //     })
        }
        
    }
    if (programacion) {

        if(programacion =='disable'){
            apiPost.categoria('programacion',false)
            // categarias.update({ enable: false },
            //     { where: { categoria: 'programacion' } }).catch(err => {
            //         console.log(err)
            //     })
        }
        else{
            apiPost.categoria('programacion',true)
            // categarias.update({ enable: true },
            //     { where: { categoria: 'programacion' } }).catch(err => {
            //         console.log(err)
            //     })

        }
       
    }
    fs.readFile(path.join(__dirname,'../utils/pagination.txt'), 'utf8' , (err, data) => {
        if (err) {
          return console.error(err)
        }

       let limit= parseInt(data)

        apiGet.job(search,(datos)=>{

            apiGet.categoria((datos2)=>{

                res.render('admin/all-jobs', {
                    pageTitle: "Admin",
                    datos: datos,
                    search: search,
                    activeSearch: true,
                    enableDesing: datos2[0].enable,
                    enableProgramacion: datos2[1].enable,
                    limit:limit
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

    jobs.findOne({ where: { id: id } }).then(result => {
        const datos = result.dataValues
        res.render('admin/post-jobs', {
            pageTitle: "Edit admin",
            datos: datos
        })
    }).catch(err => {
        console.log(err)
    })
}



exports.PostUpdateJob = (req, res, next) => {
    const { id } = req.params
    const { categoria, type, company, url, position, location, description, oldLogo, active } = req.body;
    let old_Logo = oldLogo != undefined ? oldLogo : ''
    let logo = req.file != undefined ? '/' + req.file.path : old_Logo

    jobs.update({
        categoria: categoria,
        type: type,
        company: company,
        url: url,
        logo: logo,
        position: position,
        location: location,
        description: description,
        active: active
    },
        { where: { id: id } }).catch(err => {
            console.log(err)
        })
    res.redirect('/admin/job/all')
}

exports.GetDeleteJob = (req, res, next) => {
    const list = req.params.id.split(',')
    jobs.destroy({ where: { id: list } }).then(result => {
        res.redirect('/admin/job/all')
    }).catch(err => {
        console.log(err)
    })
}

exports.GetLimit =(req,res,next)=>{

    const limit = req.params.id

    fs.writeFile(path.join(__dirname,'../utils/pagination.txt'), limit , (err) => {
        if (err) {
          console.error(err)
          return
        }

        res.redirect('/admin/job/all')
    })
}