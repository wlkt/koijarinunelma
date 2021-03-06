const fs = require('fs');
var express = require('express');
var formidable = require('formidable');
var bodyParser = require('body-parser');

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

	Image.find({name: req.user.username}, function(err, images){
		var context = {
			images: images.map(function(image){
				return{
					name: image.name,
					email: image.email,
					imgPath: image.imgPath.substring(7)
				}
			})
		};
		res.render('edit', context);
	});
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

// Käyttäjän kuvan poisto post menetelmällä, pyynnön lähettäjän nimellä.
router.post('/edit/remove', ensureAuthd.ensureAuthd, function(req, res){

	var filename = req.body.file;

	// Poistaa tiedoston tiedot tietokannasta
	Image.findOne({name: req.user.username, imgPath: 'public/'+filename}).remove().exec();

	// Poistaa itse tiedoston palvelimelta
	fs.unlink('public/'+filename, function(err){
		
		//if(err) { throw err };
	});	
	req.flash('success_msg', 'Tiedosto poistettiin');
    res.redirect(303, '/edit');
});

module.exports = router;
