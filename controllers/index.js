const jobs = require('../models/jobs')

exports.GetIndex = (req, res, next) => {

    jobs.findAll().then(result => {

        const resultado = result.map(datos => datos.dataValues)
        res.render('index',
            {
                pageTitle: 'Home',
                datos: resultado
            })
        

    }).catch(err=>{
        console.log(err)
    })

}