const categories = require('../models/categories')

//GET
exports.GetCategory = (req, res, next) => {

    categories.findAll().then(result => {
        res.json(result)

    }).catch(err => {
        console.log(err)
    })
}


//POTS
exports.GetSetCategory = (req, res, next) => {

    const { enable } = req.query
    const { id } = req.params
    console.log('///////////////\n')
    console.log(id)

    categories.update({ enable: enable }, { where: { category: id } }).then(() => {
        res.json({ id: enable })
    }).catch(err => {
        console.log(err)
    })
}