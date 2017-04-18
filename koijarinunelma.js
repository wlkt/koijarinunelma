// Moduulit
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressValidator = require('express-validator');
var flash = require('connect-flash');

// Reitit
var index = require('./routes/index');
var users = require('./routes/users');

// Sovellus
var app = express();

// Staattisten asetus, public kansio
app.use(express.static(path.join(__dirname, 'public')));

// View Enginen asetus
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middlewaren käyttö
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Sessionin käyttö, tilapäisellä secretillä
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Express Validatorin käyttö
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Flashin käyttö
app.use(flash());

// Globaalit muuttujat
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Reitit
app.use('/', index);
app.use('/users', users);

// Sovelluksen kuuntelu ja käynnistys
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {

	console.log('Express käynnistyi osoitteella http://localhost:' + app.get('port') + '; Paina Ctrl-C lopettaaksesi.');
});
