var express = require('express');
var router = express.Router();

var User = require('../models/user');

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

	var newUser = new User({
		name: name,
		email: email,
		username: username,
		password: password
		});

	User.createUser(newUser, function(err, user){
		
		if(err) throw err;
		console.log(user);
	});

	req.flash('success_msg', 'Rekisteröinti onnistui. Voit nyt kirjautua sivulle.');

	res.redirect('/users/login');
	}
});

module.exports = router;
