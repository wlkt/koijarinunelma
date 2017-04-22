const fs = require('fs');
var express = require('express');
var formidable = require('formidable');

var Image = require('../models/image');

// Kirjautumisen varmistus
var ensureAuthd = require('./ensureAuthd.js'); 

var router = express.Router();

// Hae kotisivu
router.get('/', function(req, res){
	Image.find({}, function(err, images){
		var context = {
			images: images.map(function(image){
				return{
					name: image.name,
					email: image.email,
					imgPath: image.imgPath.substring(7)
				}
			})
		};
		res.render('index', context);
	});
});

router.get('/edit', ensureAuthd.ensureAuthd, function(req, res){

	res.render('edit');
});

router.post('/edit', ensureAuthd.ensureAuthd, function(req, res){
    var form = new formidable.IncomingForm();
	form.uploadDir = './public/img/gallery';
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files){
        if(err) { req.flash('error_msg', 'Lähetyksessä tapahtui virhe'); return res.redirect(303, '/edit'); }
	
		var newImage = new Image({
		name: fields.name,
		email: fields.email,
		imgPath: files.image.path
		});

		Image.createImage(newImage, function(err, image){
		
			if(err) { throw err };
		});

		req.flash('success_msg', 'Lähetys onnistui');
        res.redirect(303, '/edit');

    });
});

module.exports = router;
