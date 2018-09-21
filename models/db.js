var mongoose = require('mongoose');

var MoiveSchema = require('../schemas/movies');
var UserSchema = require('../schemas/user')

var Movie = mongoose.model('movies_collection', MoiveSchema);
var User = mongoose.model('user_collection', UserSchema);

const db = {
  Movie,
  User,
}

module.exports = db;
