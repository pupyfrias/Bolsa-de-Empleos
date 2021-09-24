const jobs = require('../models/jobs')

exports.GetIndex = (req, res, next) => {

    jobs.findAll().then(result => {

        const resultado = result.map(datos => datos.dataValues)
        //console.log(resultado)
        let desing = [];
        let programacion = [];

        resultado.forEach(data=>{

            if (data.categoria== 'Desing'){
                desing.push(data)
            }
            else if(data.categoria== 'Programacion'){
                programacion.push(data)
            }
        })

        res.render('index',
            {
                pageTitle: 'Home',
                desing: desing,
                programacion: programacion
            })
        

    }).catch(err=>{
        console.log(err)
    })

}