const jobs = require('../models/jobs')
const { Op } = require('sequelize')

exports.GetAllJobs = (req, res, next) => {

    let { search, limit, offset, category } = req.query
    search = search != undefined ? search : ''
    category = category != undefined ? category : ['Design', 'Programming']
    jobs.findAndCountAll({
        where: {
            active: true,
            category: category,
            [Op.or]: [{
                    category: {
                        [Op.substring]: search
                    }
                },
                {
                    type: {
                        [Op.substring]: search
                    }
                },
                {
                    company: {
                        [Op.substring]: search
                    }
                },
                {
                    position: {
                        [Op.substring]: search
                    }
                },
                {
                    location: {
                        [Op.substring]: search
                    }
                },
                {
                    description: {
                        [Op.substring]: search
                    }
                }
            ]
        },
        order: [
            ['updatedAt', 'DESC']
        ],
        limit: limit,
        offset: offset
    }).then(result => {

        res.json(result)
    }).catch(err => {
        console.log(err)
    })
}



exports.GetOneJob = (req, res, next) => {

    const { id } = req.params
    jobs.findOne({ where: { id: id } }).then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.GetDeleteJob = (req, res, next) => {
    const list = req.params.id.split(',')

    jobs.destroy({ where: { id: list } }).then(result => {
        res.json({ execute: true })
    }).catch(err => {
        console.log(err)
    })
}

//POST

exports.PostPosterJob = (req, res, next) => {
    const { category, type, company, url, position, location, description, email, logo } = req.body;

    jobs.create({
        category: category,
        type: type,
        company: company,
        url: url,
        logo: logo,
        position: position,
        location: location,
        description: description,
        active: true,
        email: email
    }).then(
        res.json({ execute: true })
    ).catch(err => {
        console.log(err)
    })
}

exports.PostUpdateJob = (req, res, next) => {
    const { id } = req.params
    const { category, type, company, url, position, location, description, logo, active } = req.body;

    jobs.update({
        category: category,
        type: type,
        company: company,
        url: url,
        logo: logo,
        position: position,
        location: location,
        description: description,
        active: active
    }, { where: { id: id } }).catch(err => {
        console.log(err)
    }).then(
        res.json({ execute: true })
    )

}