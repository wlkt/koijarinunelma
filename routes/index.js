var express = require('express');
var router = express.Router();

// Hae kotisivu
router.get('/', function(req, res){
	
	res.render('index');
});

module.exports = router;
