var express = require('express');
var formidable = require('formidable');

// Kirjautumisen varmistus
var ensureAuthd = require('./ensureAuthd.js'); 

var router = express.Router();

// Hae kotisivu
router.get('/', function(req, res){
	
	res.render('index');
});

router.get('/edit', ensureAuthd.ensureAuthd, function(req, res){
    var now = new Date();
    res.render('edit', { year: now.getFullYear(), month: now.getMonth() });
});

router.post('/edit', ensureAuthd.ensureAuthd, function(req, res){
    var form = new formidable.IncomingForm();
	form.uploadDir = './public/img/gallery';
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error'); // error puuttuu
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/edit');
    });
});


module.exports = router;
