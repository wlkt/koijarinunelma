module.exports = {

	ensureAuthd : function (req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		else {
			req.flash('error_msg', 'Et ole kirjautunut sisään.'); 
			res.redirect('/users/login');
		}
	}
}
