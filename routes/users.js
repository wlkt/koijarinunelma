var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Rekisteröidy
router.get('/register', function(req, res){
	
	res.render('register');
});

// Kirjaudu
router.get('/login', function(req, res) {

	res.render('login');
});

// Lähetä rekisteröintilomake, validointi
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

	else {	

		// Olemassa olevan käyttäjänimen tarkistus
		User.count({username: username}, function (err, count){ 
			if(count>0){

				req.flash('error_msg', 'Käyttäjänimi on jo olemassa');

				res.redirect('/users/register');
			}

			else {

				var newUser = new User({
				name: name,
				email: email,
				username: username,
				password: password
				});

				User.createUser(newUser, function(err, user){
		
				if(err) { throw err };
				//console.log(user);

				req.flash('success_msg', 'Rekisteröinti onnistui. Voit nyt kirjautua sivulle.');

				res.redirect('/users/login');

				});
			}
		});
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {

		User.getUserByUsername(username, function(err, user){
		
			if(err) throw err;
			if(!user) {
				return done(null, false, { message: 'Tuntematon käyttäjä' });
			}
			User.comparePassword(password, user.password, function(err, isMatch){

				if(err) throw err;
				if(isMatch) { return done(null, user);}
				else { return done(null, false, { message: 'Salasana on väärä' });}
		});
	});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}), function(req, res) {
    
	// Tätä kutsutaan autentikoinnin onnistuessa.
	res.redirect('/');
});

router.get('/logout', function(req, res){

	req.logout();
	req.flash('success_msg', 'Olet kirjautunut ulos');
	res.redirect('/users/login');
});

module.exports = router;
