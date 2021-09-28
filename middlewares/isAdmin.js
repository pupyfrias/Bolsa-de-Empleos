const isAdmin = (req,res,next)=>{
    if(!req.session.isAdmin){
    
        return res.render('auth/login',{
            pageTitle: 'Login'
            
        })
    }
    next()
}

module.exports = isAdmin