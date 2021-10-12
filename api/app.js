const express = require('express')
const app = express();
const sequelize = require('./utils/database')
const users = require('./models/users')
const categories = require('./models/categories')

//ROUTER
const jobs = require('./routers/jobs')
const rCategories = require('./routers/categories')
const rUser = require('./routers/users')
app.use(express.json())

app.use('/api', jobs)
app.use('/api', rCategories)
app.use('/api', rUser)

sequelize.sync().then(() => {
    app.listen(5002)
}).catch(err => {
    console.log(err)
})