const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const MySQLStore = require('express-mysql-session');

const path = require('path');
const flash = require('connect-flash');

const morgan = require('morgan');

const { database } = require('./keys');

// intialiaztions
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // here are views
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', // files' extentions
    helpers: require('./lib/handlebars'),
  })
);
app.set('view engine', '.hbs');

// middlewares
app.use(
  session({
    secret: 'linksappsuccess',
    resave: false,
    saveUninitialized: false,
    store: MySQLStore(database),
  })
);
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // accept only simple data
app.use(express.json());

// global variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  next();
});

// routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// public files
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(app.get('port'));
console.log(`Server on port ${app.get('port')}`);
