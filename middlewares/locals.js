const flash = require('connect-flash')
const locals = (req,res,next)=>{

    const alert =  req.flash('alert');
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.email = req.session.email
    res.locals.alert = alert;
    res.locals.hasAlert = alert.length>0;
    next()
}

module.exports = locals