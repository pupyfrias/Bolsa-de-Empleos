const conexion = require('../utils/database')
const sequelize = require('sequelize')

const categoria = conexion.define('categoria',{

    categoria:{
        type:sequelize.STRING,
        allowNull: false
    },
    enable:{
        type:sequelize.BOOLEAN,
        allowNull:false
    }
})

module.exports = categoria