var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');

// View Enginen asetus
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Staattisten asetus, public kansio
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {

	console.log('Express käynnistyi osoitteella http://localhost:' + app.get('port') + '; Paina Ctrl-C lopettaaksesi.');
});
