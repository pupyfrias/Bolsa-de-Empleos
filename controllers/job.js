const jobs = require('../models/jobs')

exports.GetJob = (req,res,next)=>{

    const {id} = req.params
    
    jobs.findOne({where: {id:id}}).then(result=>{
        const datos = result.dataValues
        res.render('jobs/job-details',{
            pageTitle: datos.categoria+ 'Job',
            datos: datos

        })
    }).catch(err=>{
        console.log(err)
    })
    
}

exports.GetAllDesing = (req,res,next)=>{

    jobs.findAll({where:{categoria:'Desing', active:true},order:[['updatedAt','DESC']]})
    .then(result=>{
        const datos = result.map(result=> result.dataValues)
        res.render('jobs/all-jobs',{
            pageTitle: "All Desing Jobs",
            datos: datos,
            activeDesing: true
        })
    }).catch(err=>{
        console.log(err)
    })
}

exports.GetAllProgramacion = (req,res,next)=>{

    jobs.findAll({where:{categoria:'Programacion', active:true},order:[['updatedAt','DESC']]})
    .then(result=>{
        const datos = result.map(result=> result.dataValues)
        res.render('jobs/all-jobs',{
            pageTitle: "All Programacion Jobs",
            datos: datos,
            activeProgramacion: true
        })
    }).catch(err=>{
        console.log(err)
    })
}