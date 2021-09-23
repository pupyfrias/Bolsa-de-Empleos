const express = require('express');
const app = express();
const path = require('path')
const handlebars = require('express-handlebars')
const sequelize = require('./utils/database')

const multer = require('multer')
const {v4:uuidv4} = require("uuid");

//ROUTERS
const index = require('./routers/index')
const page404 = require('./routers/404')
const poster = require('./routers/poster')

//SETTINGS

app.engine('hbs',handlebars(
    {   defaultLayout: 'main-layout',
        layoutsDir: 'views/layout',
        extname: 'hbs'

    }
));
app.set('views',"views");
app.set('view engine','hbs')

app.use(express.static(path.join(__dirname,'public')))
app.use('/images',express.static(path.join(__dirname,'images')))

const fileStorage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images");
    },
    filename: (req, file, cb)=>{
        cb(null,uuidv4()+path.extname(file.originalname))
    }
});
const upload = multer({storage: fileStorage}).single("logo");

app.use(express.urlencoded({extended:false}))



//MIDLEWARES
app.use(index)
app.use('/poster',upload,poster)


app.use(page404)

sequelize.sync().then(result=>{
    app.listen(5001)
}).catch(err=>{
    console.log(err)
})

