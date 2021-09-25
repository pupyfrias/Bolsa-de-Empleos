const jobs = require('../models/jobs')

exports.GetIndex = (req, res, next) => {

    jobs.findAll({where:{active:true},order:[['updatedAt','DESC']]}).then(result => {

        const resultado = result.map(datos => datos.dataValues)
        let desingList = [];
        let programacionList = [];
        let desing = 0;
        let programacion = 0;

        resultado.forEach(data=>{

            if (data.categoria== 'Desing'){
                desing ++
                if(desingList.length <10){
                    desingList.push(data)
                }
            }
            else if(data.categoria== 'Programacion'){
                programacion ++;
                if(programacionList.length <10){
                    programacionList.push(data)
                }
                
            }
        })
  
        res.render('index',
            {
                pageTitle: 'Home',
                desing: desingList,
                programacion: programacionList,
                allDesing: desing >10,
                allProgramcion: programacion>10

            })
        
    }).catch(err=>{
        console.log(err)
    })

}