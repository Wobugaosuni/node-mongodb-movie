var mongoose = require('mongoose');

var MoiveSchema = require('../schemas/movies');
var UserSchema = require('../schemas/user')
var CommentSchema = require('../schemas/comment')

// 模型
var Movie = mongoose.model('movies_collection', MoiveSchema);
var User = mongoose.model('user_collection', UserSchema);
var Comment = mongoose.model('comment_collection', CommentSchema);

const db = {
  Movie,
  User,
  Comment,
}

module.exports = db;
