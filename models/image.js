var mongoose = require('mongoose');

var db = mongoose.connection;

// User Schema
var imageSchema = mongoose.Schema({

	name: { 
		type: String,
		index: true						
	},
	email: {
		type: String
	},
	imgPath: {
		type: String
	}
});

var Image = module.exports = mongoose.model('Image', imageSchema);

module.exports.createImage = function(newImage, callback){
			
			newImage.save(callback);
}
