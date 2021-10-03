const isPoster = (req,res,next)=>{
    if(!req.session.isPoster && !req.session.isAdmin){
        
        return res.render('auth/login',{
            pageTitle: 'Login',
            wasRedirect: true
        })
    }
    next()
}

module.exports = isPoster