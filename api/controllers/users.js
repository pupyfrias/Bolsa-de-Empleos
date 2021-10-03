const users = require('../models/users')


exports.GetValidate = async(req,res,next)=>{

    const {username} = req.params

    await users.findOne({ where: { username: username,auth:true } })
    .then((result) => {

        if(result){
            return res.json({exist: true})
        }
        else{
            return res.json({exist: false})
        }
    }).catch(err=>{
        console.log(err)
    })
}





exports.PostUser = (req,res,next)=>{

    const username = req.body.username 

    users.findOne({ where: { username: username,auth:true } })
    .then((result) => {

        if(result){
            return res.json(result)
        }
        else{
            return res.json({})
        }
    }).catch(err=>{
        console.log(err)
    })

}
