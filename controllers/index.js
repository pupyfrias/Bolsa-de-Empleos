const jobs = require('../models/jobs')
const categorias = require('../models/categorias')

const { Op } = require('sequelize')

exports.GetIndex = async (req, res, next) => {


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
    }).then(result => {

        const resultado = result.map(datos => datos.dataValues)
        let desingList = [];
        let programacionList = [];
        let desing = 0;
        let programacion = 0;

        resultado.forEach(data => {

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
        categorias.findAll().then(result => {
            const data = result.map(result => result.dataValues)

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

        }).catch(err => {
            console.log(err)
        })

    }).catch(err => {
        console.log(err)
    })

}