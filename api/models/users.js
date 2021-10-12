const conenxion = require('../utils/database')
const sequelize = require('sequelize')

const users = conenxion.define("users", {

    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    position: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    code: {
        type: sequelize.STRING,
        allowNull: false
    },
    auth: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    expiration: {
        type: sequelize.DATE,
        allowNull: false

    }

})
module.exports = users