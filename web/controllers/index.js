
const apiGet = require('../models/api-get')

exports.GetIndex = (req, res, next) => {


    let { search } = req.query
    search = search != undefined ? '?search='+search : ''
    console.log(search)
    apiGet.job('api/jobs/all'+search,(datas) =>{
        
        let desingList = [];
        let programacionList = [];
        let desing = 0;
        let programacion = 0;

        datas.forEach(data => {

            if (data.categoria == 'Desing') {
                desing++
                if (desingList.length < 10) {
                    desingList.push(data)
                }
            }
            else if (data.categoria == 'Programacion') {
                programacion++;
                if (programacionList.length < 10) {
                    programacionList.push(data)
                }
            }
        })


        apiGet.categoria((data)=>{

            res.render('index',
            {
                pageTitle: 'Home',
                desing: desingList,
                programacion: programacionList,
                allDesing: desing > 10,
                allProgramcion: programacion > 10,
                search: search,
                activeSearch: true,
                enableDesing: data[0].enable,
                enableProgramacion: data[1].enable,
            })
        })

           
        }).catch(err => {
            console.log(err)
        })


       
    

}