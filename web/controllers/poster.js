const jobs = require('../models/api-get')

exports.GetPosterJob =(req,res,next)=>{
    jobs.findAll().then(result=>{ 
        res.render("poster/post-jobs",{
            pageTitle: "Post a Jobs"
        })

    }).catch(err=>(
        console.log(err)
    ))
    
}

exports.PostPosterJob = (req,res,next)=>{
    const {categoria,type,company,url,position,location,description,email} = req.body;
    let logo = req.file!= undefined? '/'+req.file.path: ''

    jobs.create({
        categoria:categoria,
        type:type,
        company:company,
        url:url,
        logo:logo,
        position:position,
        location:location,
        description:description,
        active: true,
        email:email
    }).then(()=>{
        req.flash('alert','Trabajo creado correctamente')
        res.redirect('/poster')
    }).catch(err=>{
        console.log(err)
    })
    
}