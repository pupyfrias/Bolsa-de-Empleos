
const bcrypt = require('bcryptjs')
const mailer = require('../utils/mail/mailer')
const {v4:uuidv4} = require("uuid");


exports.GetCreateAccout =(req,res,next)=>{

    res.render('account/create-account',{
        pageTitle:"Create Account"})
}

exports.PostCreateAccout = (req,res,next)=>{

    let {name, lastname,username,password,email} = req.body
    let exitsEmail = false
    let exitsUser = false
   
    user.findOne({where:{
        [Op.or]:[{email:email},{username:username}]}
    }).then(result=>{

        const data = result != null? result.dataValues:[]
        
        if (username == data.userName){
            exitsUser = true
        }
        if (email == data.email){
            exitsEmail = true
        }  
 
        if(exitsEmail || exitsUser){

            res.render('account/create-account',{
                pageTitle:"Create Account",
                exitsEmail: exitsEmail,
                exitsUser: exitsUser,
                username:username,
                email:email,
                error: true,
                name:name,
                lastname:lastname,
                password:password
            })
        }
        else{
            const codigo = uuidv4().substring(0,6)
            let date = new Date
            date = date.setTime(new Date().getTime()+ (5 * 60 * 1000))
           
            user.create({
                name:name,
                lastName: lastname,
                userName:username,
                password:bcrypt.hashSync(password, 8),
                position:"poster",
                email:email,
                codigo: codigo,
                auth: false,
                expiration: date

            }).then(()=>{

                const msj = `Este es su código de confirmacion
                <strong>${codigo}</strong>, este código 5 minutos de vigencia.`
                
                mailer.sendMail({
                    from: "radhamesenc2412002@gmail.com",
                    to: email,
                    subject: 'Código de confirmación',
                    html: msj
                }).catch(err=>{
                    console.log(err)
                })

                res.render('account/confirmation',{
                    pageTitle:"Create Account"})

            }).catch(err=>{
                console.log(err)
            })   
        }


    }).catch(err=>{
        console.log(err)
    })
    
}

exports.PostConfirmation =(req, res, next)=>{

    const {code} = req.body

    user.findOne({where:{codigo:code}}).then(result=>{

        const data = result != null? result.dataValues:null

        if(data == null ){

            return res.render('account/confirmation',{
                pageTitle:"Create Account",
                errorCode: true,
                code: code,
                invalidate: true
            })
        }
        else{

            if(data.expiration>=new Date()){

                user.update({auth: true},{where:{codigo:code}}).then(()=>{
                    res.render('auth/login',{
                        pageTitle:'login',
                        messages: true
                    })

                }).catch(err=>{
                    console.log(err)
                })

            }else{

                res.render('account/confirmation',{
                    pageTitle:"Create Account",
                    errorCode: true,
                    code: code,
                    expiration: true,
                    email:data.email,
                    id: data.id
                })

            }
        }
    })
}


exports.PostNewCode =(req,res,next)=>{

    const {id, email} = req.body
    const codigo = uuidv4().substring(0,6)
    let date = new Date
    date = date.setTime(new Date().getTime()+ (5 * 60 * 1000))

    user.update({codigo:codigo,expiration: date},
        {where:{id:id}}).then(()=>{

            const msj = `Este es su código de confirmacion
                <strong>${codigo}</strong>, este código 5 minutos de vigencia.`
                
                mailer.sendMail({
                    from: "bryantsantana139@gmail.com",
                    to: email,
                    subject: 'Código de confirmación',
                    html: msj
                })

                res.render('account/confirmation',{
                    pageTitle:"Create Account"})

        }).catch(err=>{
            console.log(err)
        })
}