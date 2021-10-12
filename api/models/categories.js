const connection = require('../utils/database')
const sequelize = require('sequelize')

const category = connection.define('category', {

    category: {
        type: sequelize.STRING,
        allowNull: false
    },
    enable: {
        type: sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = category