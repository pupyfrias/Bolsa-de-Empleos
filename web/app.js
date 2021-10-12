const express = require('express');
const app = express();
const path = require('path')
const handlebars = require('express-handlebars')


const multer = require('multer')
const { v4: uuidv4 } = require("uuid");
const helpers = require('./utils/helpers/helpers')
const session = require('express-session')
const flash = require('connect-flash')


//ROUTERS
const index = require('./routers/index')
const page404 = require('./routers/404')
const poster = require('./routers/poster')
const job = require('./routers/job')
const admin = require('./routers/admin')
const login = require('./routers/login')
const account = require('./routers/account')

//MODELS 

const locals = require('./middlewares/locals')
const isAdmin = require('./middlewares/isAdmin')
const isPoster = require('./middlewares/isPoster');


//SETTINGS

app.engine('hbs', handlebars({
    defaultLayout: 'main-layout',
    layoutsDir: 'views/layout',
    extname: 'hbs',
    helpers: {
        compare: helpers.compare,
        sum: helpers.sum,
        min: helpers.min,
        date: helpers.date
    }
}));
app.set('views', "views");
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: fileStorage }).single("logo");

app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: 'anything', resave: true, saveUninitialized: false }))
app.use(flash())
let x = new Date


//MIDLEWARES
app.use(locals)
app.use(index)
app.use(login)
app.use(account)
app.use('/admin', upload, isAdmin, admin)
app.use('/poster', upload, isPoster, poster)
app.use(job)

app.use(page404)

app.listen(5001)