const user = require('../models/users')
const { Op } = require('sequelize')


exports.GetValidate = async(req, res, next) => {

    const { username } = req.params

    await user.findOne({ where: { username: username, auth: true } })
        .then((result) => {

            if (result) {
                return res.json({ exist: true })
            } else {
                return res.json({ exist: false })
            }
        }).catch(err => {
            console.log(err)
        })
}





exports.PostUser = (req, res, next) => {

    const username = req.body.username

    user.findOne({ where: { username: username, auth: true } })
        .then((result) => {

            if (result) {
                return res.json(result)
            } else {
                return res.json({})
            }
        }).catch(err => {
            console.log(err)
        })

}

exports.GetExist = (req, res, next) => {
    const { email, username } = req.query
    user.findOne({
        where: {
            [Op.or]: [{ email: email }, { userName: username }]
        }
    }).then((result) => {

        res.json(result)
        console.log('///')
        console.log('execute\n')
    }).catch(err => {
        console.log(err)
    })

}
exports.PostCreate = (req, res, next) => {

    const { name, lastname, username, password, email, code, date } = req.body
    user.create({
        name: name,
        lastName: lastname,
        userName: username,
        password: password,
        position: "poster",
        email: email,
        code: code,
        auth: false,
        expiration: date

    }).catch(err => {
        console.log(err)
    })

}

exports.GetConfirm = (req, res, next) => {

    const { code } = req.params
    user.findOne({ where: { code: code } }).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.GetUpdate = (req, res, next) => {

    const { code } = req.params

    user.update({ auth: true }, { where: { code: code } }).catch(err => {
        console.log(err)
    }).then(
        res.json({ execute: true })
    ).catch(
        res.json({ execute: false })
    )
}

exports.PostNewCode = (req, res, next) => {

    const { code, date, id } = req.body

    user.update({ code: code, expiration: date }, { where: { id: id } }).then(
        res.json({ execute: true })
    ).catch(err => {
        console.log(err)
    })

}