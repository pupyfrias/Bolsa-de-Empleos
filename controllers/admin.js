const jobs = require('../models/jobs')

exports.GetAllJobs =(req,res,next)=>{

    jobs.findAll().then(result=>{
        const datos = result.map(result=> result.dataValues)
        res.render('admin/all-jobs',{
            pageTitle:"Admin",
            datos:datos

        })
    }).catch(err=>{
        console.log(err)
    })
}

exports.GetEditJob =(req,res,next)=>{

    const {id}= req.params
    const {edit} = req.query
    
    if(edit== undefined){
        return res.redirect('/')
    }

    jobs.findOne({where: {id:id}}).then(result=>{
        const datos = result.dataValues
        res.render('admin/post-jobs',{
            pageTitle: "Edit admin",
            datos: datos
        })
    }).catch(err=>{
        console.log(err)
    })
}

exports.PostUpdateJob =(req,res,next)=>{
    const {id} = req.params
    const {categoria,type,company,url,position,location,description,oldLogo,active} = req.body;
    let old_Logo = oldLogo!= undefined? oldLogo: ''
    let logo = req.file!= undefined? '/'+req.file.path: old_Logo
  
    jobs.update({
        categoria:categoria,
        type:type,
        company:company,
        url:url,
        logo:logo,
        position:position,
        location:location,
        description:description,
        active: active
    },
    {where:{id:id}}).catch(err=>{
        console.log(err)
    })
    res.redirect('/admin/job/all')
}

exports.GetDeleteJob = (req,res,next)=>{
    const list = req.params.id.split(',')
    jobs.destroy({where:{id:list}}).then(result=>{
        res.redirect('/admin/job/all')
    }).catch(err=>{
        console.log(err)
    })
}