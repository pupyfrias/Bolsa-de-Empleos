const express = require('express')
const app = express();
const sequelize = require('./utils/database')
const users = require('./models/users')
const  categorias = require('./models/categorias')

//ROUTER
const jobs = require('./routers/jobs')
const rCategorias = require('./routers/categorias')
const rUser = require('./routers/users')
app.use(express.json())

app.use('/api',jobs)
app.use('/api',rCategorias)
app.use('/api',rUser)

sequelize.sync().then(()=>{
    app.listen(5002)
}).catch(err=>{
    console.log(err)
})
