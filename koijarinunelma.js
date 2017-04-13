var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

// Yksinkertainen aloitussivu
app.get('/', function(req, res){
	
	res.type('text/plain');
	res.send('Galleria Koijarin Unelma');
});

// 404 sivu
app.use(function(req, res) {

	res.type('text/plain');
	res.status(404);
	res.send('404 - Sivua ei löydy.');
});

// 500 virhesivu
app.use(function(err, req, res, next){

	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Palvelinvirhe.');
});

app.listen(app.get('port'), function() {

	console.log('Express käynnistyi osoitteella http://localhost:' + app.get('port') + '; Paina Ctrl-C lopettaaksesi.');
});
