const categorias = require('../models/categorias')

//GET
exports.GetCategoria = (req,res,next)=>{

    categorias.findAll().then(result => {
        res.json(result)

    }).catch(err=>{
        console.log(err)
    })
}


//POTS
exports.PostCategoria = (req,res,next)=>{

    res.send('hi '+req.body.a)

    // categorias.update({ enable: false },
    //     { where: { categoria: 'desing' } }).then(()=>{

    //         res.json({execute:true})
    //     }).catch(err => {
    //         console.log(err)
    //     })
}