const jobs = require('../models/jobs')
const categarias = require('../models/categorias')
const { Op } = require('sequelize')
const fs = require('fs')
const path = require('path')


exports.GetAllJobs =  (req, res, next) => {
    let { search, desing, programacion } = req.query
    search = search != undefined ? search : ''
    if (desing) {

        if(desing =='disable'){

            categarias.update({ enable: false },
                { where: { categoria: 'desing' } }).catch(err => {
                    console.log(err)
                })
        }else{
            categarias.update({ enable: true },
                { where: { categoria: 'desing' } }).catch(err => {
                    console.log(err)
                })
        }
        
    }
    if (programacion) {

        if(programacion =='disable'){

            categarias.update({ enable: false },
                { where: { categoria: 'programacion' } }).catch(err => {
                    console.log(err)
                })
        }
        else{
            categarias.update({ enable: true },
                { where: { categoria: 'programacion' } }).catch(err => {
                    console.log(err)
                })

        }
       
    }
    fs.readFile(path.join(__dirname,'../utils/pagination.txt'), 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
       let limit= parseInt(data)

       jobs.findAll({
        where: {
            [Op.or]: [{ categoria: { [Op.substring]: search } },
            { type: { [Op.substring]: search } },
            { company: { [Op.substring]: search } },
            { position: { [Op.substring]: search } },
            { location: { [Op.substring]: search } },
            { description: { [Op.substring]: search } }
            ]
        }
    }).then(result => {

        const datos = result.map(result => result.dataValues)

        categarias.findAll().then(result => {
            
            const datos2 = result.map(result => result.dataValues)
            console.log(datos2[0].enable)
            console.log(datos2[1].enable)
        
            res.render('admin/all-jobs', {
                pageTitle: "Admin",
                datos: datos,
                search: search,
                activeSearch: true,
                enableDesing: datos2[0].enable,
                enableProgramacion: datos2[1].enable,
                limit:limit
            })
        }).catch(err => {
            console.log(err)
        })

    }).catch(err => {
        console.log(err)
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