const jobs = require('../models/jobs')

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
    const {categoria,type,company,url,position,location,description} = req.body;
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
        active: true
    }).catch(err=>{
        console.log(err)
    })
    res.render('poster/post-jobs')
}