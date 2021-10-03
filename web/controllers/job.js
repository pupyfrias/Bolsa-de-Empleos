
const fs = require('fs')
const path = require('path')


exports.GetJob = (req,res,next)=>{

    const {id} = req.params
    
    jobs.findOne({where: {id:id}}).then(result=>{
        const datos = result.dataValues
        res.render('jobs/job-details',{
            pageTitle: datos.categoria+ 'Job',
            datos: datos

        })
    }).catch(err=>{
        console.log(err)
    })
    
}

exports.GetAllJobs = (req,res,next)=>{
    let {search,page} = req.query
    let {categoria} = req.params

    categoria = categoria.charAt(0).toUpperCase() + categoria.substr(1).toLowerCase();
    let limit = 0
    page = page!= undefined? page-1:0 
    search = search!=undefined?search:''
    let url = new URL('https://pupy.com'+req.url)
    url.searchParams.delete('page')
    url = url.pathname+url.search
 

    fs.readFile(path.join(__dirname,'../utils/pagination.txt'), 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        limit= parseInt(data)

        console.log(limit)
    jobs.findAndCountAll({where:{categoria:categoria, active:true,
                [Op.or]:[{categoria:{[Op.substring]:search}},
                {type:{[Op.substring]:search}},
                {company:{[Op.substring]:search}},
                {position:{[Op.substring]:search}},
                {location:{[Op.substring]:search}},
                {description:{[Op.substring]:search}}
                ]},order:[['updatedAt','DESC']],
                limit:limit,
                offset: page*limit
            })
    .then(result=>{
        
        const datos = result.rows.map(result=> result.dataValues)
        let last = result.count/limit
        last = Number.isInteger(last)?last: parseInt(last)+1

        res.render('jobs/all-jobs',{
            pageTitle: `All ${categoria} Jobs`,
            datos: datos,
            activeSearch: true,
            search:search,
            categoria: categoria,
            page: page+1,
            last: last,
            activePagination: last>1,
            url:url,
            hasParams: url.includes('?')
        })
    }).catch(err=>{
        console.log(err)
    })

      })
    
}