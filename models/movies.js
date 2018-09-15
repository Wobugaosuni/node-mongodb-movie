var mongoose = require('mongoose');
var MoiveSchema = require('../schemas/movies');

var Movie = mongoose.model('movies_collection', MoiveSchema);

module.exports = Movie;
