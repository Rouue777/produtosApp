//importacoes
import express from 'express';
import {create} from 'express-handlebars';
import { Sequelize } from "sequelize";
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash'
import {fileURLToPath} from 'url';
import path from 'path';
import Admin from './routes/admin.js'
import bodyParser from 'body-parser';
import usuario from './routes/usuario.js'



const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//configurações midlewares
app.use(session({
    secret: 'flash123',
    resave: true,
    saveUninitialized: true
}))

    //flash
    app.use(flash())

//midleware para salvar  mensagem de erro
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
})

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//configs de autenticadao
app.use(session({
    secret: 'produtoapp',
    resave : true,
    saveUninitialized : true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


//view engine
const handlebars = create({
    defaultLayout : 'main',
    runtimeOptions:{
        allowProtoPropertiesByDefault : true,
        allowProtoMethodsByDefault : true
    }
})

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

//public
app.use(express.static(path.join(__dirname, 'public')));


//routes
//configurando a home do projeto
app.get('/', (req,res) =>{
    res.render('index')
})

//exibir produtos


//routas com prefixo
app.use('/admin', Admin)
app.use('/usuario', usuario)

const PORT = 3010 || process.env.PORT
app.listen(PORT, ()=>{
    console.log('servidor rodando na porta ' + PORT + ' http://localhost:3010')
})