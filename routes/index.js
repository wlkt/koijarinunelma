var express = require('express');
var router = express.Router();

// Hae kotisivu
router.get('/', ensureAuthenticated, function(req, res){
	
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else {
		req.flash('error_msg', 'Et ole kirjautunut sisään.'); 
		res.redirect('/users/login');
	}
}

module.exports = router;
