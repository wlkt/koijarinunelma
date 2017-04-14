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

// Lähetä rekisteröinti (kesken)
router.post('/register', function(req, res){
	
	res.render('register');
});

module.exports = router;
