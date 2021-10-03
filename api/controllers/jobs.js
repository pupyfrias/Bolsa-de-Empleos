const jobs = require('../models/jobs')
const {Op} = require('sequelize')

exports.GetAllJobs = (req,res,next)=>{

    let { search } = req.query
    search = search != undefined ? search : ''
    jobs.findAll({
        where: {
            active: true,
            [Op.or]: [{ categoria: { [Op.substring]: search } },
            { type: { [Op.substring]: search } },
            { company: { [Op.substring]: search } },
            { position: { [Op.substring]: search } },
            { location: { [Op.substring]: search } },
            { description: { [Op.substring]: search } }
            ]
        }, order: [['updatedAt', 'DESC']]
    }).then(result=>{

        res.json(result)
    }).catch(err=>{
        console.log(err)
    })
}