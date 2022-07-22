
const express = require ('express');
const session = require('express-session')
const path = require('path');
const {engine} =require ('express-handlebars');
const methodOverride= require('method-override');
const morgan = require('morgan');
const MongoStore = require ('connect-mongo');
const flash= require('connect-flash');
const passport =require('passport');

// const MONGO_ATLAS=require('./database')
//Inicializations
const app = express();
require('./config/passport')


//Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join (app.get('views'), 'layouts'),
  partialsDir: path.join (app.get('views'), 'partials'),
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }

}))
app.set('view engine', '.hbs');




//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

app.use(session({
  
  
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://Carla:carla@cluster0.sktlunu.mongodb.net/myprimerdb?retryWrites=true&w=majority'}),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: true,
  saveUninitialized: true,
  cookie: {
  
  maxAge: 600
  
  }
})

  

  )


app.use(passport.initialize());
app.use(passport.session());  
app.use(flash());


//Global Variables
app.use((req, res, next)=> {
  res.locals.mensaje_satisfactorio= req.flash('mensaje_satisfactorio');
  res.locals.mensaje_error= req.flash('mensaje_error');
  res.locals.error= req.flash('error');
  res.locals.user=req.user || null;
  next();
})

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/productos.routes'));
app.use(require('./routes/usuarios.routes'))

//Static Files
app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static(path.join(__dirname,'upload')));










module.exports = app