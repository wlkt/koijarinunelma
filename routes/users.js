var express = require('express');
var router = express.Router();

// Rekisteröidy
router.get('/register', function(req, res){
	
	res.render('register');
});

// Kirjaudu
router.get('/login', function(req, res) {

	res.render('login');
});

// Lähetä rekisteröintilomake (kesken), validointi
router.post('/register', function(req, res){
	
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validointi
	req.checkBody('name', 'Rekisteröinti vaatii nimen').notEmpty();
	req.checkBody('email', 'Rekisteröinti vaatii sähköpostin').notEmpty();
	req.checkBody('email', 'Syötetty sähköposti ei ole kelvollinen').isEmail();
	req.checkBody('username', 'Rekisteröinti vaatii käyttäjänimen').notEmpty();
	req.checkBody('password', 'Rekisteröinti vaatii salasanan').notEmpty();
	req.checkBody('password2', 'Salasanat eivät täsmää').equals(req.body.password);

	var errors = req.validationErrors();
	
	if(errors){

		res.render('register', { errors: errors });
	}
	else{

		console.log('Validointi onnistui');
	}
});

module.exports = router;
